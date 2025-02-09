'use client'

import { useState } from 'react'
import { useSnippetStore } from '@/stores/snippetStore'
import SearchButton from './SearchButton'


export default function SnippetForm() {
  const { createSnippet } = useSnippetStore()
  const [content, setContent] = useState('')
  const [info, setInfo] = useState('')
  const [tags, setTags] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createSnippet(content, info, tags)
    setContent('')
    setInfo('')
    setTags([])
    alert('Snippet added!')
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Add a Snippet</h1>

      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="p-2 border rounded w-full text-black"
        placeholder="Enter snippet content"
        required
      />

      <input
        type="text"
        value={info}
        onChange={(e) => setInfo(e.target.value)}
        className="p-2 border rounded w-full text-black"
        placeholder="Additional info (optional)"
      />

      <input
        type="text"
        value={tags.join(', ')}
        onChange={(e) => setTags(e.target.value.split(',').map((tag) => tag.trim()))}
        className="p-2 border rounded w-full text-black"
        placeholder="Enter tags (comma-separated)"
      />

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md w-full">
        Add Snippet
      </button>
      <div className="mt-4">
        <SearchButton />
      </div>
    </form>
  )
}
