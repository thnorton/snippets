'use client'

import { useEffect, useState } from 'react'
import { useSnippetStore } from '@/stores/snippetStore'
import { useParams, useRouter } from 'next/navigation'
import { Snippet } from '@/types/models'

export default function SnippetDetailPage() {
  const { getSnippetById, deleteSnippet } = useSnippetStore()
  const { id } = useParams() as { id: string }
  const router = useRouter()

  const [snippet, setSnippet] = useState<Snippet | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        setLoading(true)
        const fetchedSnippet = await getSnippetById(id)
        if (!fetchedSnippet) {
          setError('Snippet not found')
        } else {
          setSnippet(fetchedSnippet)
        }
      } catch (err) {
        setError('Failed to load snippet')
      } finally {
        setLoading(false)
      }
    }

    fetchSnippet()
  }, [getSnippetById, id])

  const handleDelete = async () => {
    if (!snippet) return

    const confirmDelete = window.confirm('Are you sure you want to delete this snippet?')
    if (confirmDelete) {
      await deleteSnippet(snippet.id)
      router.push('/snippets/search') // Redirect to snippet search after deletion
    }
  }

  if (loading) return <p className="text-center mt-10">Loading snippet...</p>
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>
  if (!snippet) return <p className="text-center text-gray-500 mt-10">Snippet not found</p>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Snippet Details</h1>

      {/* ✅ Display snippet details */}
      <div className="border border-gray-300 rounded-md p-4 bg-white shadow">
        <p className="font-semibold">Description:</p>
        <p className="text-gray-700">{snippet.info}</p>

        <p className="font-semibold mt-4">Content:</p>
        <pre className="bg-gray-100 p-2 rounded text-gray-800 whitespace-pre-wrap">{snippet.content}</pre>

        <p className="font-semibold mt-4">Tags:</p>
        <div className="flex flex-wrap gap-2">
          {snippet.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-gray-300 rounded-full text-sm">{tag}</span>
          ))}
        </div>
      </div>

      {/* ✅ Buttons */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => router.push(`/snippets/${id}/edit`)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Edit Snippet
        </button>

        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Delete Snippet
        </button>
      </div>
    </div>
  )
}
