import { Search } from "lucide-react";
import React from "react";

function SearchSection({ onSearchInput }: any) {
  return (
    <div className="relative w-full flex flex-col items-center justify-center p-12 bg-gradient-to-br from-blue-900 via-gray-800 to-black text-white">
      {/* Frosted Glass Effect */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-xl w-full h-full"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h2 className="text-4xl font-extrabold tracking-wide">Find Your Perfect Template</h2>
        <p className="text-lg opacity-80 mt-2">What would you like to create today?</p>

        {/* Search Bar */}
        <div className="w-full flex justify-center mt-6">
  <div className="flex items-center gap-2 p-3 border border-gray-400 bg-white/10 backdrop-blur-md rounded-full shadow-lg w-[80%] max-w-xl transition-all hover:bg-white/20">
    <Search className="text-gray-300" />
    <input
      type="text"
      placeholder="Search templates..."
      onChange={(event) => onSearchInput(event.target.value)}
      className="bg-transparent w-full outline-none text-white placeholder-gray-400"
    />
  </div>
</div>


      </div>
    </div>
  );
}

export default SearchSection;
