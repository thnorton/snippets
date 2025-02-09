import { create } from "zustand"
import { db } from "@/lib/firebase"
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore"
import { Snippet } from '@/types/models'
// Snippet Type


// Firestore collection name
const SNIPPETS_COLLECTION = "snippets"

interface SnippetStore {
  snippets: Snippet[]
  fetchSnippets: () => Promise<void>
  createSnippet: (content: string, info: string, tags: string[]) => Promise<string>
  getSnippetById: (snippetId: string) => Promise<Snippet | null>
  updateSnippet: (snippetId: string, updatedData: Partial<Snippet>) => Promise<void>
  deleteSnippet: (snippetId: string) => Promise<void>
  searchSnippetsByTags: (tags: string[]) => Promise<Snippet[]>
}

// Create Zustand Store
export const useSnippetStore = create<SnippetStore>((set, get) => ({
  snippets: [],

  // Fetch all snippets from Firestore and store in Zustand state
  fetchSnippets: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, SNIPPETS_COLLECTION))
      const snippets = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Snippet, "id">),
      }))
      set({ snippets })
    } catch (error) {
      console.error("Error fetching snippets:", error)
    }
  },

  // Create a new snippet
  createSnippet: async (content, info, tags) => {
    try {
      const docRef = await addDoc(collection(db, SNIPPETS_COLLECTION), {
        content,
        info,
        tags,
        createdAt: new Date()
      })
      get().fetchSnippets() // Refresh snippet list
      return docRef.id
    } catch (error) {
      console.error("Error adding snippet:", error)
      throw error
    }
  },

  // Fetch a single snippet by ID
  getSnippetById: async (snippetId) => {
    try {
      const docRef = doc(db, SNIPPETS_COLLECTION, snippetId)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Snippet : null
    } catch (error) {
      console.error("Error fetching snippet:", error)
      throw error
    }
  },

  // Update a snippet
  updateSnippet: async (snippetId, updatedData) => {
    try {
      const docRef = doc(db, SNIPPETS_COLLECTION, snippetId)
      await updateDoc(docRef, updatedData)
      get().fetchSnippets() // Refresh snippet list
    } catch (error) {
      console.error("Error updating snippet:", error)
      throw error
    }
  },

  // Delete a snippet
  deleteSnippet: async (snippetId) => {
    try {
      await deleteDoc(doc(db, SNIPPETS_COLLECTION, snippetId))
      get().fetchSnippets() // Refresh snippet list
    } catch (error) {
      console.error("Error deleting snippet:", error)
      throw error
    }
  },

  // Search snippets by multiple tags (optimized for multiple tag search)
  searchSnippetsByTags: async (tags) => {
    try {
      if (tags.length === 0) return get().snippets // Return all if no tags selected
      const q = query(collection(db, SNIPPETS_COLLECTION), where("tags", "array-contains-any", tags))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Snippet, "id">),
      }))
    } catch (error) {
      console.error("Error searching snippets:", error)
      throw error
    }
  }
}))
