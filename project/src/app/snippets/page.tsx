'use client'

import SnippetForm from '@/components/SnippetForm'
import Header from '@/components/Header'
import SnippetList from '@/components/SnippetList'

export default function SnippetPage() {
  return (
    <div>
      <Header />
      <div className="p-6 max-w-4xl mx-auto">
        <SnippetForm />
        <SnippetList />
      </div>
    </div>
  )
}
