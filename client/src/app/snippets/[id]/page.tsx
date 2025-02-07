'use client'

import { useEffect, useState } from 'react'
import { useSnippetService } from '@/services/useSnippetService'
import { useParams, useRouter } from 'next/navigation'

export default function SnippetDetailPage() {
  const { snippets, fetchSnippets, deleteSnippet } = useSnippetService()
  const { id } = useParams()
  const router = useRouter()
  const [snippet, setSnippet] = useState(null)

  useEffect(() => {
    fetchSnippets()
  }, [])

  useEffect(() => {
    const foundSnippet = snippets.find((s) => s.id === Number(id))
    setSnippet(foundSnippet)
  }, [snippets, id])

  if (!snippet) return <p>Loading...</p>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">{snippet.content}</h1>
      <p className="mt-2 text-gray-600">{snippet.info}</p>

      <div className="mt-4">
        {snippet.tags.map((tag) => (
          <span key={tag.name} className="px-3 py-1 bg-gray-300 rounded-full mr-2">
            {tag.name}
          </span>
        ))}
      </div>

      <button
        onClick={() => {
          deleteSnippet(snippet.id)
          router.push('/snippets')
        }}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Delete Snippet
      </button>
    </div>
  )
}
