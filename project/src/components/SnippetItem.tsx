import { Snippet } from '@/types/models'

export default function SnippetItem({ snippet }: { snippet: Snippet }) {
  return (
      <li className="p-2 border rounded bg-white shadow text-black">
            <a href={`/snippets/${snippet.id}`} className="font-mono block">{snippet.info}</a>
      </li>
  )
}
