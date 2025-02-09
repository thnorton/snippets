import { Snippet } from "@/types/models";

interface SnippetList {
  results: Snippet[];
}

export default function SnippetList({ results }: SnippetList) {
  if (results.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold mt-6">Results:</h2>
      <ul className="mt-4 space-y-2">
        {results.map((snippet) => (
          <li key={snippet.id} className="p-2 border rounded bg-white shadow text-black">
            <a href={`/snippets/${snippet.id}`} className="font-mono block">{snippet.info}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
