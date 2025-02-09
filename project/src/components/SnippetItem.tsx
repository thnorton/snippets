import { Snippet } from '@/types/models'

export default function SnippetItem({ snippet }: { snippet: Snippet }) {
  return (
    <li className="p-4 border rounded shadow">
      <p className="font-bold text-black">{snippet.content}</p>
      <p className="text-black-600">{snippet.info}</p>
      <div className="mt-2 space-x-2">
        {snippet.tags.map((tag) => (
          <span key={tag} className="px-2 py-1 text-black rounded">
            {tag}
          </span>
        ))}
      </div>
    </li>
  )
}
