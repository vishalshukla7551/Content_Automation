"use client"
import React, { useEffect, useRef } from 'react'
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {Prompt} from '@/app/(data)/prompt'
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { marked } from "marked";
import { useState } from "react";
import { Instagram } from "lucide-react";
import { usePathname } from 'next/navigation'
import { chatSession } from '@/utils/AiModal'
import { generateRandomString } from '@/utils/random_function'

import { useRouter } from "next/navigation"; 
import { Loader2Icon } from 'lucide-react';
import axios from "axios";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
interface props{
  aiOutput:string;
}
function OutputSection({aiOutput}:props) {
  const [loading, setloading] = useState<boolean>(false);
  const router = useRouter(); 
  const path=usePathname();
  console.log(path)
  const [content, setContent] = useState(aiOutput);
  const [load, setload] = useState<boolean>(false);
  const [jsondata,setjsondata]=useState<string>("");
  useEffect(() => {
    setContent(aiOutput);
  }, [aiOutput]);

  async function jsongenerator(){
    setloading(true);
    let cleanedText;
    try{
      const AIPrompt =Prompt ;
  const FinalAIPrompt=JSON.stringify(content)+", "+AIPrompt;
    const result=await chatSession.sendMessage(FinalAIPrompt);
      cleanedText = result?.response.text().trim().replace(/^```json|```$/g, "");
      const finaljson=cleanedText.posts;
      console.log("jsonwithout parse",cleanedText);
// const jsonData = JSON.parse(cleanedText);

const parsedJson = JSON.parse(cleanedText);
console.log("Parsed JSON Output:", parsedJson);
const updatedPosts = [];
    
for (const [index, post] of parsedJson.posts.entries()) {
  const string=generateRandomString(10);
    try {
        const response = await axios.post("/api/generateImage", {                //generate Image
            imagepath: `${string}.jpeg`,    
            prompt: post.image_des
        });
        const imageUrl = await axios.post("/api/upload_image", {                  //Upload Imgae to get  Public Url
          imagePath: `${string}.jpeg`,
      });
      
        console.log(response);
        updatedPosts.push({ ...post, imageUrl: imageUrl.data.publicUrl});
    } catch (error) {
        console.error("Error generating image:", error);
        updatedPosts.push({ ...post, imageUrl: "/placeholder.jpg" });
    }
}
    
// ✅ Stringify JSON before encoding it for URL
cleanedText = JSON.stringify({posts:updatedPosts});
    
    console.log("Event")
  }
    catch(error){
      console.log("Error in creating Proper organised formate");}
      finally{
        console.log("ok");
        router.push(`/content_post?content=${encodeURIComponent(cleanedText)}`)
        setloading(false);
      }
      }
    

  return (
    
    <div className='bg-white shadow-lg border rounded-lg'>
      <div className='flex justify-between items-center p-5'>
        <h2 className='font-medium text-lg'>Your Result</h2>
        {
        load&&
        path===`/dashboard/content/instagram-post-generator`&&<>
        <Button
      className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white 
                 text-lg font-semibold px-6 py-3 rounded-lg flex items-center gap-2 
                 hover:opacity-90 transition-all duration-300 shadow-lg"
                 onClick={jsongenerator}
    >
      <Instagram size={20} />
      Post to Instagram
      {loading&&<Loader2Icon className='animate-spin'/>}
    </Button>
    </>
  }
        <Button className='flex gap-2'
        onClick={()=>navigator.clipboard.writeText(content)}
        ><Copy className='w-4 h-4'/> Copy </Button>
      </div>
            <ReactQuill
        value={marked.parse(content)}
        theme="snow" // WYSIWYG Theme
        placeholder="Type something..."
        onChange={(data)=>{setContent(data),setload(true);}}
        style={{
          height: "600px", // Set editor height
          overflowY: "auto", // Enable vertical scrolling
        }}
      />
    </div>
  )
}

export default OutputSection;