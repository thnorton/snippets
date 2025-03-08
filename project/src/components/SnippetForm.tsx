'use client'

import { useState, useEffect } from 'react'

interface SnippetFormProps {
  onSubmit: (content: string, info: string, tags: string[]) => Promise<void>
  initialData?: { content: string; info: string; tags: string[] }
}

export default function SnippetForm({ onSubmit, initialData }: SnippetFormProps) {
  const [content, setContent] = useState(initialData?.content || '')
  const [info, setInfo] = useState(initialData?.info || '')
  const [tagInput, setTagInput] = useState(initialData?.tags?.join(', ') || '') // Store as a string

  useEffect(() => {
    if (initialData) {
      setContent(initialData.content)
      setInfo(initialData.info)
      setTagInput(initialData.tags?.join(', ') || '')
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    //Process tags only on submit
    const tagsArray = tagInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '') // Remove empty tags

    await onSubmit(content, info, tagsArray)
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto space-y-4 border border-gray-300 shadow-md rounded-md bg-white">
      <h1 className="text-2xl font-bold text-center">{initialData ? 'Edit Snippet' : 'Add Snippet'}</h1>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="p-2 border rounded w-full text-black resize-y min-h-[150px] max-h-[300px]"
        placeholder="Enter snippet content"
        required
      />

      <input
        type="text"
        value={info}
        onChange={(e) => setInfo(e.target.value)}
        className="p-2 border rounded w-full text-black"
        placeholder="Enter snippet description"
      />

      <input
        type="text"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        className="p-2 border rounded w-full text-black"
        placeholder="Enter tags separated by commas"
      />

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md w-full">
        {initialData ? 'Update Snippet' : 'Add Snippet'}
      </button>
    </form>
  )
}
