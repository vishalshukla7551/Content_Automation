"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation
import { Search } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

function Header() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(query)}`); // Redirect to search page
    }
  };

  return (
    <div className="p-4 shadow-md border-b bg-[#111827] flex justify-between items-center text-white">
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex gap-2 items-center p-3 border rounded-full bg-[#1F2937] max-w-lg w-[70%] md:w-[300px] transition-all focus-within:ring-2 focus-within:ring-blue-500"
      >
        <Search className="text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-white w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {/* User Button */}
      <div className="flex items-center">
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
