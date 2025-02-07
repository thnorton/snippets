'use client'

import { useState } from 'react'
import { useSnippetService } from '@/services/useSnippetService'
import SearchButton from './SearchButton'


export default function SnippetForm() {
  const { createSnippet } = useSnippetService()
  const [content, setContent] = useState('')
  const [info, setInfo] = useState('')
  const [tags, setTags] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim() || !info.trim()) return

    const tagList = tags.split(',').map((tag) => ({ name: tag.trim() }))

    await createSnippet({
      content,
      info,
      tags: tagList
    })

    setContent('')
    setInfo('')
    setTags('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-lg w-full max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4">Add a Snippet</h2>

      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="Enter snippet content"
          required
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Info</label>
        <input
          type="text"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="Enter snippet info"
          required
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="e.g., JavaScript, Next.js"
        />
      </div>

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md w-full"
      >
        Add Snippet
      </button>
      <div className="mt-4">
        <SearchButton />
      </div>
    </form>
  )
}
