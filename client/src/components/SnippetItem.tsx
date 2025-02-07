import { Snippet } from '@/services/useSnippetService'

export default function SnippetItem({ snippet }: { snippet: Snippet }) {
  return (
    <li className="p-4 border rounded shadow">
      <p className="font-bold">{snippet.content}</p>
      <p className="text-gray-600">{snippet.info}</p>
      <div className="mt-2 space-x-2">
        {snippet.tags.map((tag) => (
          <span key={tag.name} className="px-2 py-1 text-sm bg-gray-200 rounded">
            {tag.name}
          </span>
        ))}
      </div>
    </li>
  )
}
