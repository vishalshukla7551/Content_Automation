import React from 'react'
import { TEMPLATE } from './TemplateListSection'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, BadgeCheck } from "lucide-react";
function TemplateCard(item:TEMPLATE) {
  return (
    <Link href={'/dashboard/content/'+item?.slug}>
      <div className='p-5 shadow-md rounded-md border bg-white 
      flex flex-col gap-3  cursor-pointer h-full hover:scale-105 transition-all relative'>
       {/* Special Feature Icon (Always inside the card) */}
       {item.isSpecial && (
          <div
            className="absolute top-3 right-3 flex items-center gap-1"
          >
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 font-semibold">
              Auto Posting Feature
            </span>
          </div>
        )}
          <Image src={item.icon} alt='icon' 
          width={50} height={50} />
          <h2 className='font-medium text-lg'>{item.name}</h2>
          <p className="text-gray-500 text-base">{item.desc}</p>
      </div>
    </Link>
  )
}

export default TemplateCard