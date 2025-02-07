import Link from 'next/link'

export default function SearchButton() {
  return (
    <Link href="/snippets/search">
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 w-full">
        Search for Snippet
      </button>
    </Link>
  )
}
