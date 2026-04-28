/**
 * noteService.ts
 *
 * Full CRUD + search service for notes.
 * All persistence is via localStorage (key: notes_app_v1).
 * Pure functions — no Vue / Pinia dependencies.
 */

import type { Note, NoteCreatePayload, NoteUpdatePayload } from '../types/note.types'
import { generateId } from '../utils/id'

const STORAGE_KEY = 'notes_app_v1'

// ─── Migration ───────────────────────────────────────────────

/**
 * Migrates a raw persisted object to the current Note shape.
 * Handles legacy notes that used `body` instead of `content`
 * and ISO date strings instead of Unix ms timestamps.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function migrateNote(raw: any): Note {
  return {
    id: raw.id ?? generateId(),
    title: raw.title ?? '',
    // v1 used `body`, v2 uses `content`
    content: raw.content ?? raw.body ?? '',
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    // v1 used ISO strings, v2 uses Unix ms
    createdAt: typeof raw.createdAt === 'number'
      ? raw.createdAt
      : new Date(raw.createdAt ?? Date.now()).getTime(),
    updatedAt: typeof raw.updatedAt === 'number'
      ? raw.updatedAt
      : new Date(raw.updatedAt ?? Date.now()).getTime(),
    isPinned: raw.isPinned ?? false,
  }
}

// ─── Internal helpers ────────────────────────────────────────

function readAll(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown[]
    const migrated = parsed.map(migrateNote)
    // Re-persist if data was migrated (one-time cost)
    writeAll(migrated)
    return migrated
  } catch {
    return []
  }
}

function writeAll(notes: Note[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

// ─── Public API ──────────────────────────────────────────────

/**
 * Returns all stored notes (unsorted).
 *
 * @example
 * const notes = getNotes()
 */
export function getNotes(): Note[] {
  return readAll()
}

/**
 * Creates a new note, persists it, and returns the created note.
 *
 * @example
 * const note = createNote({ title: 'Hello', content: 'World', tags: ['work'] })
 */
export function createNote(payload: NoteCreatePayload): Note {
  const now = Date.now()
  const note: Note = {
    id: generateId(),
    title: payload.title.trim(),
    content: payload.content,
    tags: payload.tags.map((t) => t.toLowerCase().trim()).filter(Boolean),
    createdAt: now,
    updatedAt: now,
    isPinned: false,
  }
  const notes = readAll()
  notes.unshift(note)
  writeAll(notes)
  return note
}

/**
 * Applies a partial update to an existing note by id.
 * Automatically bumps updatedAt.
 * Returns the updated note, or null if not found.
 *
 * @example
 * const updated = updateNote('abc123', { title: 'New title' })
 */
export function updateNote(id: string, payload: NoteUpdatePayload): Note | null {
  const notes = readAll()
  const idx = notes.findIndex((n) => n.id === id)
  if (idx === -1) return null

  const updated: Note = {
    ...notes[idx],
    ...payload,
    // Normalize tags if provided
    tags: payload.tags
      ? payload.tags.map((t) => t.toLowerCase().trim()).filter(Boolean)
      : notes[idx].tags,
    updatedAt: Date.now(),
  }
  notes[idx] = updated
  writeAll(notes)
  return updated
}

/**
 * Deletes a note by id.
 * Returns true if the note was found and deleted, false otherwise.
 *
 * @example
 * const deleted = deleteNote('abc123') // true | false
 */
export function deleteNote(id: string): boolean {
  const notes = readAll()
  const filtered = notes.filter((n) => n.id !== id)
  if (filtered.length === notes.length) return false
  writeAll(filtered)
  return true
}

/**
 * Case-insensitive full-text search across title, content, and tags.
 * Returns matching notes (unsorted).
 *
 * @example
 * const results = searchNotes('vue')
 */
export function searchNotes(query: string): Note[] {
  const q = query.toLowerCase().trim()
  if (!q) return readAll()
  return readAll().filter(
    (n) =>
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q) ||
      n.tags.some((t) => t.includes(q))
  )
}

/**
 * Filters notes by an array of tags (AND logic).
 * All provided tags must be present on the note.
 *
 * @example
 * const results = filterByTags(['vue', 'work'])
 */
export function filterByTags(tags: string[]): Note[] {
  if (!tags.length) return readAll()
  return readAll().filter((n) => tags.every((t) => n.tags.includes(t)))
}

/**
 * Sorts notes: pinned first, then by updatedAt descending.
 * Pure function — does not mutate the input array.
 *
 * @example
 * const sorted = sortNotes(notes)
 */
export function sortNotes(notes: Note[]): Note[] {
  return [...notes].sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1
    return b.updatedAt - a.updatedAt
  })
}

/**
 * Removes all notes from localStorage.
 *
 * @example
 * clearNotes()
 */
export function clearNotes(): void {
  localStorage.removeItem(STORAGE_KEY)
}
