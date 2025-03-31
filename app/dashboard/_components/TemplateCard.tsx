import React from "react";
import { TEMPLATE } from "./TemplateListSection";
import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";

function TemplateCard(item: TEMPLATE) {
  return (
    <Link href={"/dashboard/content/" + item?.slug}>
      <div
        className="relative p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
        shadow-lg rounded-xl border border-gray-700 flex flex-col gap-4 
        cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl 
        text-white backdrop-blur-md h-64"  // Increased height from h-52 to h-64
      >
        {/* Special Feature Icon (Auto Posting) */}
        {item.isSpecial && (
          <div className="absolute top-3 right-3 flex items-center gap-2 bg-blue-500/20 p-2 rounded-lg backdrop-blur-sm shadow-md">
            <Sparkles className="w-5 h-5 text-blue-300 animate-pulse" />
            <span className="text-blue-300 font-semibold text-xs">Auto Posting</span>
          </div>
        )}

        {/* Template Icon */}
        <div className="flex justify-center">
          <Image
            src={item.icon}
            alt="icon"
            width={50}
            height={50}
            className="drop-shadow-lg"
          />
        </div>

        {/* Template Title */}
        <h2 className="font-extrabold text-lg tracking-wide text-gray-100">{item.name}</h2>

        {/* Full Description - No Truncation */}
        <p className="text-gray-300 text-sm leading-relaxed flex-grow">{item.desc}</p>

        {/* Bottom Glow Line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 opacity-75"></div>
      </div>
    </Link>
  );
}

export default TemplateCard;
