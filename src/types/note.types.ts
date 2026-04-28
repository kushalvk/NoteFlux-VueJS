// ============================================================
// Note — core data model
// ============================================================
export interface Note {
  id: string        // nanoid unique identifier
  title: string     // Plain text, max 100 chars
  content: string   // Note body (markdown-friendly plain text)
  tags: string[]    // Lowercase trimmed tag array e.g. ["work", "ideas"]
  createdAt: number // Unix timestamp ms — Date.now() on creation
  updatedAt: number // Unix timestamp ms — updated on every edit
  isPinned: boolean // Pinned notes sort to the top
}

// Payload used when creating a note (id + timestamps auto-generated)
export type NoteCreatePayload = Pick<Note, 'title' | 'content' | 'tags'>

// Payload used when patching an existing note
export type NoteUpdatePayload = Partial<Pick<Note, 'title' | 'content' | 'tags' | 'isPinned'>>
