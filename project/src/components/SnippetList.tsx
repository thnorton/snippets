"use client"
import { useEffect } from "react"
import { useSnippetStore } from "@/stores/snippetStore"
import SnippetItem from "./SnippetItem"

export default function SnippetList() {
  const { snippets, fetchSnippets } = useSnippetStore()

  useEffect(() => {
    fetchSnippets()
  }, [fetchSnippets])

  if (!snippets.length) return <p>Loading snippets...</p>

  return (
    <ul className="mt-6 space-y-4">
      {snippets.map((snippet) => (
        <SnippetItem key={snippet.id} snippet={snippet} />
      ))}
    </ul>
  )
}