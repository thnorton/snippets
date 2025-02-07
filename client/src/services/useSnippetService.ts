import { create } from 'zustand'

// Define the Snippet and Tag types
export interface Tag {
  id?: number
  name: string
}

export interface Snippet {
  id: number
  content: string
  info: string
  tags: Tag[]
}

// Define Zustand store for managing snippets
interface SnippetState {
  snippets: Snippet[]
  fetchSnippets: () => Promise<void>
  createSnippet: (snippet: Omit<Snippet, 'id'>) => Promise<void>
  deleteSnippet: (snippetId: number) => Promise<void>
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const useSnippetService = create<SnippetState>((set) => ({
  snippets: [],

  // Fetch snippets from API
  fetchSnippets: async () => {
    const response = await fetch(`${API_BASE_URL}/api/snippets/`)
    if (response.ok) {
      const data = await response.json()
      set({ snippets: data.results }) // Update Zustand state
    }
  },

  // Create a new snippet
  createSnippet: async (snippet) => {
    const response = await fetch(`${API_BASE_URL}/api/snippets/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(snippet)
    })
    if (response.ok) {
      const newSnippet = await response.json()
      set((state) => ({ snippets: [...state.snippets, newSnippet] }))
    }
  },

  // Delete a snippet
  deleteSnippet: async (snippetId) => {
    const response = await fetch(`${API_BASE_URL}/api/snippets/${snippetId}/`, {
      method: 'DELETE'
    })
    if (response.ok) {
      set((state) => ({
        snippets: state.snippets.filter((snippet) => snippet.id !== snippetId)
      }))
    }
  }
}))
