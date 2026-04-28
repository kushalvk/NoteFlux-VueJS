# 📝 NoteFlux

A highly responsive, privacy-first note-taking web application built entirely on the frontend with **Vue 3**, **TypeScript**, **Pinia**, and **Vite**. 

NoteFlux requires no backend, syncing, or account creation. All data securely resides within your browser's local storage.

---

## ✨ Features

| Feature | Detail |
|---------|--------|
| ⚡ **Instant Editing** | Auto-saves intelligently on every keystroke. Zero wait times. |
| 🔍 **Deep Search** | Real-time debounced text search resolving across titles, bodies, and tags instantly. |
| 🏷️ **Tag Management** | Attach specific tags and apply multi-tag (AND logic) filtering from the sidebar. |
| 📌 **Pinning System** | Pin critical notes to force them to the top of the stack. |
| 💾 **Robust Persistence** | Bulletproof local storage hydration ensures data integrity smoothly across browser restarts. |
| 📱 **Adaptive UI** | Clean, minimalist, and responsive user experience modeled against premium system mechanics. |

---

## 🚀 Getting Started Locally

Getting the development server up and running is fast and easy.

```bash
# 1. Install all required dependencies
npm install

# 2. Launch the Vite development server
npm run dev

# 3. Open in your browser (usually http://localhost:5173/)
```

---

## 📦 Deployment & Build Instructions

NoteFlux builds into statically hosted pure HTML/JS/CSS assets. It is perfect to drop directly into environments like Vercel, Netlify, or Github Pages.

```bash
# Build the application for production
npm run build
```

This will automatically generate a bundled `dist/` directory.

To test the compiled production version locally:
```bash
npm run preview
```

---

## 🗂️ Project Structure

The codebase strictly adheres to standard Vue composition-level conventions emphasizing reusability:

```text
src/
├── assets/styles/
│   ├── base.css           # Global design system & layout scaffolding
│   └── animations.css     # Universal state micro-animations
├── components/
│   ├── layout/
│   │   └── AppSidebar.vue # Core navigation & filtering host
│   ├── notes/
│   │   ├── NoteCard.vue   # Individual note summary item
│   │   ├── NoteEditor.vue # Core writing/auto-save interface
│   │   ├── NoteList.vue   # Component managing rendering logic of the stack
│   │   └── NoteEmpty.vue  # Placeholder graphical states
│   └── ui/
│       ├── SearchBar.vue
│       ├── TagBadge.vue
│       ├── TagInput.vue
│       └── ConfirmDialog.vue
├── services/
│   └── noteService.ts     # Fully decoupled pure-JS local storage CRUD and searching engine 
├── store/
│   └── noteStore.ts       # Unified Pinia logic integrating noteService reactivity
├── types/
│   └── note.types.ts      # TypeScript interfaces ensuring type-safety 
├── utils/
│   ├── id.ts              # Local hash generation
│   └── date.ts            # Relative date calculation logic
├── views/
│   └── HomeView.vue       # Primary layout shell routing container
├── App.vue               
└── main.ts               
```

---

## 🛠️ Technology Stack

| Layer | Tooling |
|------|---------|
| **Core Framework** | Vue 3 (Composition API) |
| **State Management** | Pinia |
| **Routing** | Vue Router |
| **Build Tooling** | Vite |
| **Typing** | TypeScript |
| **Styles** | Plain CSS / CSS Variables |
