'use client'

import { useState, useEffect } from 'react'
import { useSnippetStore } from '@/stores/snippetStore'
import SnippetList from "@/components/SnippetList"


export default function SnippetSearchPage() {
  const { snippets, fetchSnippets } = useSnippetStore()
  const [query, setQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filteredTags, setFilteredTags] = useState<string[]>([])
  const [allTags, setAllTags] = useState<string[]>([])
  const [results, setResults] = useState(snippets)

  useEffect(() => {
    fetchSnippets()
  }, [])

  useEffect(() => {
    // Extract only unique tags
    const tags = new Set(snippets.flatMap((snippet) => snippet.tags.map((tag) => tag)))
    setAllTags(Array.from(tags))
  }, [snippets])

  useEffect(() => {
    if (selectedTags.length > 0) {
      setResults(
        snippets.filter(snippet =>
          selectedTags.every(tag => snippet.tags.includes(tag))
        )
      )
    } else {
      setResults(snippets)
    }
  }, [selectedTags, snippets])

  const handleTagSearch = (input: string) => {
    setQuery(input)
    setFilteredTags(allTags.filter(tag => tag.toLowerCase().includes(input.toLowerCase())))
  }

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag])
    }
    setQuery('')
    setFilteredTags([])
  }

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag))
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Search Snippets by Tags</h1>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleTagSearch(e.target.value)}
          className="p-2 border text-black rounded w-full"
          placeholder="Type to search for tags..."
        />
        {filteredTags.length > 0 && (
          <ul className="absolute bg-white border mt-1 w-full rounded text-black shadow-md">
            {filteredTags.map((tag) => (
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

      <div className="flex flex-wrap gap-2 mt-4">
        {selectedTags.map((tag) => (
          <span key={tag} className="px-3 py-1 bg-gray-300 rounded-full flex items-center">
            {tag}
            <button onClick={() => removeTag(tag)} className="ml-2 text-red-500">×</button>
          </span>
        ))}
      </div>
      {selectedTags.length > 0 && (
        <SnippetList results={results} /> )}
      </div>
  )
}
