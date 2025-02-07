import { useSnippetService } from '@/services/useSnippetService'
import SnippetItem from './SnippetItem'
import { useEffect } from 'react'

export default function SnippetList() {
  const { snippets, fetchSnippets } = useSnippetService()

  useEffect(() => {
    fetchSnippets()
  }, [])

  console.log('Snippets:', snippets) // ✅ Debugging output

  if (!Array.isArray(snippets)) {
    return <p>Loading snippets...</p>
  }

  return (
    <ul className="mt-6 space-y-4">
      {snippets.map((snippet) => (
        <SnippetItem key={snippet.id} snippet={snippet} />
      ))}
    </ul>
  )
}
