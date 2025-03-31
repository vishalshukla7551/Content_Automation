"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (query) {
      // Simulate an API call or filter local data
      setResults([
        `Result 1 for "${query}"`,
        `Result 2 for "${query}"`,
        `Result 3 for "${query}"`,
      ]);
    }
  }, [query]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Search Results for "{query}"</h2>
      {results.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {results.map((result, index) => (
            <li key={index} className="bg-gray-100 p-3 rounded-md">{result}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-4">No results found.</p>
      )}
    </div>
  );
}

export default SearchResults;
