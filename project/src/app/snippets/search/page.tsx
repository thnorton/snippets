'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { useSnippetStore } from '@/stores/snippetStore'
import SnippetList from "@/components/SnippetList"

export default function SnippetSearchPage() {
  const { snippets, fetchSnippets, fetchUniqueTags } = useSnippetStore()
  const [tags, setTags] = useState<string[]>([])
  const [query, setQuery] = useState('') // State for managing use search input
  const [selectedTags, setSelectedTags] = useState<string[]>([]) // Stores currently selected tags
  const [results, setResults] = useState(snippets) // Stores the snippets that match the selected tags

  // Only fetch if they haven't already been fetched (snippets.length 0)
  useEffect(() => {
    async function fetchData() {
      if (snippets.length === 0) {
        await fetchSnippets();
      }
    }
    fetchData();
  }, [snippets.length]);

useEffect(() => {
  async function getTags() {
    const uniqueTags = await fetchUniqueTags();
    setTags(uniqueTags); // Update local state
  }
  getTags();
}, []);


  /**
   * Filters snippets based on the selected tags.
   * Runs when selectedTags changes
   */
  useEffect(() => {
    if (selectedTags.length > 0)
    setResults(
      snippets.filter(snippet => selectedTags.every(tag => snippet.tags.includes(tag)))
    )
  }, [selectedTags])

  /**
   * useMemo lets you cache the result of a function between renders, recalcs only when query changes
   * filters displayed tags based on query input - shows suggestions
   */
  const filteredTags = useMemo(() => {
    return query
      ? tags.filter(tag => tag.toLowerCase().includes(query.toLowerCase()))
      : []
  }, [query])

  /**
   * Adds a tag to the selected tags list if it isn't already included.
   * Clears the search input after selection.
   */
  const addTag = (tag: string) => {
    setSelectedTags(prev => (prev.includes(tag) ? prev : [...prev, tag]))
    setQuery('') // Reset the input field
  }

  /**
   * Removes a tag from the selected tags list.
   */
  const removeTag = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag))
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Search Snippets by Tags</h1>

      {/* Search Input Field */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border text-black rounded w-full"
          placeholder="Type to search for tags..."
        />
        {/* Dropdown List of Filtered Tags */}
        {filteredTags.length > 0 && (
          <ul className="absolute bg-white border mt-1 w-full rounded text-black shadow-md">
            {filteredTags.map(tag => (
              <li
                key={tag}
                onClick={() => addTag(tag)}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Display Selected Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {selectedTags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-gray-300 rounded-full flex items-center">
            {tag}
            <button onClick={() => removeTag(tag)} className="ml-2 text-red-500">×</button>
          </span>
        ))}
      </div>

      {/* Display Snippet List Only When Tags Are Selected */}
      {selectedTags.length > 0 && <SnippetList results={results} />}
    </div>
  )
}
