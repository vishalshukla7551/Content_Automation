"use client";
import { useSearchParams } from "next/navigation";
import { Button } from '@/components/ui/button';
import { useEffect, useState } from "react";
import { Instagram } from "lucide-react";
import { postToInstagram } from "@/utils/InstaPost";
import { Loader2Icon } from 'lucide-react';
import axios from "axios";
const path = require("path");
const CLIENT_ID = "1351411795877566";
import { useRouter } from "next/navigation";
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from "@/utils/alert";
// const posts=
  // {
  //   title: "Majestic Mountain Landscape",
  //   image_des: "A stunning panoramic view of a mountain range at sunrise or sunset.",
  //   caption: "Lost in the majesty of the mountains. ✨",
  //   hashtags: ["#mountainlife", "#mountainviews", "#naturephotography"]
  // },
export default function InstagramPosts() {
   const router = useRouter(); 
   const [load, setload] = useState<boolean>(false);
   const [loading, setloading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [content, setContent] = useState("");
  const [businessId, setbusinessId] = useState("");
  const [access_Token, setaccess_Token] = useState("");
  const [selectedPost, setSelectedPost] = useState({imageUrl:"",caption:""});
  const [REDIRECT_URI, setREDIRECT_URI] = useState<string>("");
  let posts;
  try{ posts =JSON.parse(decodeURIComponent(content)).posts;}
  catch
  { posts = [];}
  useEffect(()=>{
    const help=async ()=>{
       const response = await axios.get("/api/getdomain");
       setREDIRECT_URI(`${response.data.domainurl}/api/facebook/callback`)
    }
    help();
  },[])
  const handleSelect = (post:any) => setSelectedPost(post);
  const mediapost=async ()=>
    {
      setloading(true);
      const response=await postToInstagram(access_Token,businessId,selectedPost.imageUrl,selectedPost.caption)
      if(response.status==1)
       {showErrorAlert("Required",response.message);}
      else if(response.status==0)
        {showSuccessAlert("Check Insta Account",response.message);}
      else
      {showErrorAlert("Error",response.message);}
      setloading(false);
      if(response.status==0)
      {router.push("/dashboard/content/instagram-post-generator")}
    }
  useEffect(() => {
    let storedContent = searchParams.get("content") || localStorage.getItem("content") || "";
    
    if (searchParams.get("content")) { localStorage.setItem("content", storedContent); }
    setContent(storedContent);

    let storedContent1 = searchParams.get("businessId") || localStorage.getItem("businessId") || "";
    
    if (searchParams.get("businessId")) { localStorage.setItem("businessId",storedContent1);  }
    setbusinessId(storedContent1);

    let storedContent2 = searchParams.get("access_Token") || localStorage.getItem("access_Token") || "";
    
    if (searchParams.get("access_Token")) { localStorage.setItem("access_Token",storedContent2);  }
    setaccess_Token(storedContent2);
     if(storedContent1!=""&&storedContent2!="")
      setload(true);
  }, [searchParams]);

console.log(posts)

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Instagram Post Templates</h1>
      {load ? (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg text-center">
          <strong>✅ Business ID:</strong> {businessId}
          <center>
          <Button
          disabled={loading}
      className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white 
                 text-lg font-semibold px-6 py-3 rounded-lg flex items-center gap-2 
                 hover:opacity-90 transition-all duration-300 shadow-lg"
                 onClick={mediapost}
    >
      <Instagram size={20} />
      Post to Instagram
    </Button>
    {loading&&<Loader2Icon className='animate-spin'/>}
    </center>
        </div>
      ) : (
          <div className="flex justify-center mb-6">
        <a
          href={`https://www.facebook.com/v19.0/dialog/oauth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=instagram_basic,instagram_content_publish,pages_show_list,business_management,pages_read_engagement&response_type=code`}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md text-lg hover:scale-105 transition-transform"
        >
          🔥 Log into Instagram
        </a>
      </div>)}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post:any, index:any) => (
          <div key={index} className={`border rounded-lg overflow-hidden shadow-md bg-white transition-opacity ${
            selectedPost.imageUrl  && selectedPost.imageUrl !== post.imageUrl ? "opacity-50" : "opacity-100"
          }`}>
           <div className="border rounded-lg overflow-hidden shadow-md bg-white h-full flex flex-col">
  <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover" />
  <div className="p-4 flex flex-col flex-grow">
    <p className="text-gray-700 flex-grow">{post.caption}</p>
    <button
      onClick={() => handleSelect(post)}
      className={`mt-2 px-4 py-2 transition-colors ${
        selectedPost.imageUrl === post.imageUrl
          ? "bg-green-500 text-white cursor-not-allowed rounded-full"
          : "bg-blue-500 text-white rounded-full"
      }`}
      disabled={selectedPost.imageUrl === post.imageUrl}
    >
      {selectedPost.imageUrl === post.imageUrl ? "Selected" : "Select Post"}
    </button>
  </div>
</div>

          </div>
        ))}
      </div>
      {/* <h2 className="text-xl font-bold mt-6">Selected Posts (JSON Data)</h2>
      <pre className="bg-gray-200 p-4 rounded mt-2 text-sm overflow-auto">
        {JSON.stringify(selectedPost, null, 2)} 
      </pre> */}
    </div>
  );
}

