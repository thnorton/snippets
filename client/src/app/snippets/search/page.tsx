'use client'

import { useState, useEffect } from 'react'
import { useSnippetService } from '@/services/useSnippetService'

export default function SnippetSearchPage() {
  const { snippets, fetchSnippets } = useSnippetService()
  const [query, setQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filteredTags, setFilteredTags] = useState<string[]>([])
  const [allTags, setAllTags] = useState<string[]>([])
  const [results, setResults] = useState(snippets)

  useEffect(() => {
    fetchSnippets()
  }, [])

  useEffect(() => {
    console.log('Snippets:', snippets) // ✅ Debugging output

    if (!Array.isArray(snippets)) {
      console.error('Expected snippets to be an array but got:', snippets)
      return
    }

    // Extract unique tags
    const tags = new Set(snippets.flatMap((snippet) => snippet.tags.map((tag) => tag.name)))
    setAllTags(Array.from(tags))
  }, [snippets])

  useEffect(() => {
    // Filter snippets by selected tags
    if (selectedTags.length > 0) {
      setResults(snippets.filter(snippet => snippet.tags.some(tag => selectedTags.includes(tag.name))))
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
          className="p-2 border rounded w-full"
          placeholder="Type to search for tags..."
        />
        {filteredTags.length > 0 && (
          <ul className="absolute bg-white border mt-1 w-full rounded shadow-md">
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

      <h2 className="text-lg font-semibold mt-6">Results:</h2>
      <ul className="mt-4 space-y-2">
        {results.map((snippet) => (
          <li key={snippet.id} className="p-2 border rounded bg-white shadow">
            <a href={`/snippets/${snippet.id}`} className="font-mono block">{snippet.content}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
