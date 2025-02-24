'use client'

import { useSnippetStore } from '@/stores/snippetStore'
import SnippetForm from '@/components/SnippetForm'
import SearchButton from '@/components/SearchButton'
import AddSnippet from '@/components/AddButton'

export default function SnippetFormPage() {
  const { createSnippet } = useSnippetStore()

  const handleCreateSnippet = async (content: string, info: string, tags: string[]) => {
    await createSnippet(content, info, tags)
  }

  return (
    // Adds 24px of padding, max width of 4xl(768px), centers div horizontally (mx-auto)
    <div className="p-6 max-w-4xl mx-auto">
      <SnippetForm onSubmit={handleCreateSnippet}/>
      <div className="mt-4">
        <SearchButton />
      </div>
    </div>
  )
}
