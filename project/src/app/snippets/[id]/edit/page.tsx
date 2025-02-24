'use client'

import { useEffect, useState } from 'react'
import { useSnippetStore } from '@/stores/snippetStore'
import { useParams, useRouter } from 'next/navigation'
import { Snippet } from '@/types/models'
import SnippetForm from '@/components/SnippetForm'

export default function EditSnippetPage() {
  const { getSnippetById, updateSnippet } = useSnippetStore()
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

  const handleUpdateSnippet = async (content: string, info: string, tags: string[]) => {
    if (!snippet) return

    const updatedSnippet: Snippet = { ...snippet, content, info, tags }
    await updateSnippet(snippet.id, updatedSnippet)

    alert('Snippet updated successfully!')
    router.push(`/snippets/${id}`) // Redirect back to snippet detail page
  }

  if (loading) return <p className="text-center mt-10">Loading snippet...</p>
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>
  if (!snippet) return <p className="text-center text-gray-500 mt-10">Snippet not found</p>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Snippet</h1>

      {/* ✅ SnippetForm pre-filled with snippet data */}
      <SnippetForm onSubmit={handleUpdateSnippet} initialData={snippet} />

      {/* ✅ Back Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => router.push(`/snippets/${id}`)}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
