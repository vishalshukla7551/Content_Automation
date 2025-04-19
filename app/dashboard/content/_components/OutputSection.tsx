"use client"
import React, { useEffect, useRef } from 'react'
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {Prompt,Prompt1} from '@/app/(data)/prompt'
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { marked } from "marked";
import { useState } from "react";
import { Instagram,Linkedin } from "lucide-react";
import { usePathname } from 'next/navigation'
import {jsoninsta,jsonlinkedin} from '@/utils/random_function'
import { useRouter } from "next/navigation"; 
import { Loader2Icon } from 'lucide-react';
import { FaLinkedin } from "react-icons/fa";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface Props {
  aiOutput: string;
}

function OutputSection({ aiOutput }: Props) {
  const [content, setContent] = useState(aiOutput);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setloading] = useState<boolean>(false);
  const router = useRouter(); 
  const path=usePathname();
  console.log(path)
  const [load, setload] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setContent(aiOutput);
  }, [aiOutput]);

  if (!isMounted) {
    return <div className="bg-white shadow-lg border rounded-lg h-full min-h-screen flex flex-col p-5">Loading...</div>;
  }

  return (
    <div className="bg-white shadow-lg border rounded-lg h-full min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium text-lg">Your Result</h2>
        {
        load&&
        (path===`/dashboard/content/instagram-post-generator`)&&<>
        <Button
        disabled={loading}
      className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white 
                 text-lg font-semibold px-6 py-3 rounded-lg flex items-center gap-2 
                 hover:opacity-90 transition-all duration-300 shadow-lg"
                 onClick={()=>{jsoninsta(Prompt,setloading,content,router)}}
    >
      <Instagram size={20} />
      Generate Post By This Content
      {loading&&<Loader2Icon className='animate-spin'/>}
    </Button>
    </>
}
{
    load&&(path===`/dashboard/content/linkedin-post-generator`)&& <Button
            onClick={()=>{jsonlinkedin(Prompt1,setloading,content,router)}}
            className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-5 py-2 rounded-lg flex items-center gap-2 transition-all duration-300"
        ><Linkedin className="w-5 h-5" />Generate Post By This Content</Button>
  }
        <Button className="flex gap-2" onClick={() => navigator.clipboard.writeText(content)}>
          <Copy className="w-4 h-4" /> Copy
        </Button>
      </div>

      {/* ReactQuill Editor */}
      <ReactQuill
        value={marked.parse(content)}
        theme="snow"
        placeholder="Type something..."
        onChange={(data) => {setContent(data);setload(true);}}
        className="flex-1 h-[calc(100vh-150px)] overflow-hidden"
      />
    </div>
  );
}

export default OutputSection;
