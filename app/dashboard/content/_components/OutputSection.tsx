"use client"
import React, { useEffect, useRef } from 'react'
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { marked } from "marked";
import { useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
interface props{
  aiOutput:string;
}
function OutputSection({aiOutput}:props) {
  const [content, setContent] = useState(aiOutput);
  useEffect(() => {
    setContent(aiOutput);
  }, [aiOutput]);
  return (
    
    <div className='bg-white shadow-lg border rounded-lg'>
      <div className='flex justify-between items-center p-5'>
        <h2 className='font-medium text-lg'>Your Result</h2>
        <Button className='flex gap-2'
        onClick={()=>navigator.clipboard.writeText(content)}
        ><Copy className='w-4 h-4'/> Copy </Button>
      </div>
            <ReactQuill
        value={marked.parse(content)}
        theme="snow" // WYSIWYG Theme
        placeholder="Type something..."
        onChange={setContent}
        style={{
          height: "600px", // Set editor height
          overflowY: "auto", // Enable vertical scrolling
        }}
      />
    </div>
  )
}

export default OutputSection