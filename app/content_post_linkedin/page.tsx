"use client";
import { useSearchParams } from "next/navigation";
import { ThumbsUp, MessageCircle, Send, MoreHorizontal,Share2 } from "lucide-react";
import { Button } from '@/components/ui/button';
import { useEffect, useState } from "react";
import { Instagram,Linkedin } from "lucide-react";
import { Loader2Icon } from 'lucide-react';
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import axios from "axios";
const path = require("path");
const CLIENT_ID = "86fw1p2xp17j2g";
import { useRouter } from "next/navigation";
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from "@/utils/alert";
// const posts=
  // {
  //   title: "Majestic Mountain Landscape",
  //   image_des: "A stunning panoramic view of a mountain range at sunrise or sunset.",
  //   caption: "Lost in the majesty of the mountains. ✨",
  //   hashtags: ["#mountainlife", "#mountainviews", "#naturephotography"]
  // },
export default function LinkedinPost() {
   const router = useRouter(); 
   const [load, setload] = useState<boolean>(false);
   const [loading, setloading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [content, setContent] = useState("");
  const [profile_id, setprofile_id] = useState("");
  const [access_token, setaccess_token] = useState("");
  const [selectedPost, setSelectedPost] = useState({imageUrl:"",caption:"",title:""});
  const [REDIRECT_URI, setREDIRECT_URI] = useState<string>("");
  const [linkedinuserinfo, setlinkedinfuserinfo] = useState<any>();
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  let linkedinuser_info;
  try{ linkedinuser_info =JSON.parse(decodeURIComponent(linkedinuserinfo));}
  catch
  { linkedinuser_info = {picture:"Unknown_person.jpg",name:"Unknown"};;}
  const handleSelect = (post:any) => setSelectedPost(post);
  let posts;
  try{ posts =JSON.parse(decodeURIComponent(content)).posts;}
  catch
  { posts = [];}

  const mediapost=async ()=>
    {
      setloading(true);
     const response = await axios.post("/api/linkedin/post", {                //generate Image
      access_token:access_token,
      profile_id:profile_id,
      imageUrl:selectedPost.imageUrl,
      caption:selectedPost.caption,
      title:selectedPost.caption
    });    
      if(response.data.status==1)
       {showErrorAlert("Required",response.data.message)}
      else if(response.data.status==0)
        {showSuccessAlert("Check Linkedin Account",response.data.message);}
      else
      {showErrorAlert("Error",response.data.message);}
      setloading(false);
      if(response.data.status==0)
      {router.push("/dashboard/content/linkedin-post-generator")}
    }
  useEffect(() => {
    let storedContent = searchParams.get("content") || localStorage.getItem("content") || "";
    
    if (searchParams.get("content")) { localStorage.setItem("content", storedContent); }
    setContent(storedContent);

    let storedContent1 = searchParams.get("profile_id") || localStorage.getItem("profile_id") || "";
    
    if (searchParams.get("profile_id")) { localStorage.setItem("profile_id",storedContent1);  }
    setprofile_id(storedContent1);

    let storedContent2 = searchParams.get("access_token") || localStorage.getItem("access_token") || "";
    
    if (searchParams.get("access_token")) { localStorage.setItem("access_token",storedContent2);  }
    setaccess_token(storedContent2);
    

    let storedContent3 = searchParams.get("linkedinuserinfo") || localStorage.getItem("linkedinuserinfo") || "";
    
    if (searchParams.get("linkedinuserinfo")) { localStorage.setItem("linkedinuserinfo", storedContent3); }
    setlinkedinfuserinfo(storedContent3);

     if(storedContent1!=""&&storedContent2!="")
      setload(true);
  }, [searchParams]);
  useEffect(()=>{
    const help=async ()=>{
       const response = await axios.get("/api/getdomain");
       setREDIRECT_URI(`${response.data.domainurl}/api/linkedin/callback`)
    }
    help();
  },[])
console.log(posts)

  return (
      <>
    <div className="flex items-center justify-between w-full p-4">
      <Link href={"/dashboard/content/linkedin-post-generator"}>
        <Button className="flex items-center"> 
          <ArrowLeft/> Back
        </Button>
      </Link> 
      <h1 className="text-2xl font-bold text-center flex-1">Linkedin Post Templates</h1> 
      <div className="w-16"></div> 
       </div>
    
    
            <div className="p-6 max-w-4xl mx-auto">
      {load ? (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg text-center">
          <center>
          <img src={linkedinuser_info.picture} alt={linkedinuser_info.name} className="w-8 h-8 rounded-full" /></center>
          <strong>{linkedinuser_info.name}</strong>
          <center>
      <Button     disabled={loading}
                  onClick={async ()=>{await mediapost()}}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-5 py-2 rounded-lg flex items-center gap-2 transition-all duration-300"
              ><Linkedin className="w-5 h-5" /> Post to Linkedin
    {loading&&<Loader2Icon className='animate-spin'/>}
    </Button>
    </center>
        </div>
      ) : (
          <div className="flex justify-center mb-6">
   <a href={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=profile%20email%20w_member_social%20openid`}
          className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-5 py-2 rounded-lg flex items-center gap-2 transition-all duration-300"
        >
          <Linkedin className="w-5 h-5" /> Log into Linkedin
        </a>
      </div>)}
      <div className="w-full flex justify-center gap-6 flex-nowrap">
            {posts.map((post: any, index: any) => {
                const isExpanded = expandedPost === post.imageUrl;
                const maxCaptionLength = 200; // Adjust max length as needed

                return (
                    <div
                        key={index}
                        className={`rounded-lg overflow-hidden bg-white text-black shadow-lg border border-gray-300 transition-opacity flex flex-col 
                            ${isExpanded ? "h-auto" : "h-[800px]"} ${
                              selectedPost.imageUrl && selectedPost.imageUrl !== post.imageUrl ? "opacity-40" : "opacity-100"
                            }`} // Fixed height initially, expands on click
                        style={{ width: "400px", flex: "0 0 auto" }} 
                    >
                        {/* Post Header */}
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <img
                                    src={linkedinuser_info.picture}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full border border-gray-300"
                                />
                                <div>
                                    <h3 className="font-semibold text-sm">{linkedinuser_info.name}</h3>
                                    <p className="text-xs text-gray-500">0h • 🌎</p>
                                </div>
                            </div>
                            <MoreHorizontal className="text-gray-500 cursor-pointer" />
                        </div>

                        {/* Post Caption - Comes First */}
                        <div 
                            className="px-4 py-2 flex-grow cursor-pointer"
                            onClick={() => setExpandedPost(isExpanded ? null : post.imageUrl)}
                        >
                            <p className="text-sm">
                                {isExpanded
                                    ? post.caption
                                    : post.caption.length > maxCaptionLength
                                    ? `${post.caption.slice(0, maxCaptionLength)}...`
                                    : post.caption}
                            </p>
                        </div>

                        {/* LinkedIn Post Image */}
                        <div className="w-full">
                            <img src={post.imageUrl} alt={post.title} className="w-full object-cover" />
                        </div>

                        {/* Engagement & Action Buttons */}
                        <div className="px-4 py-2 flex flex-col flex-grow">
                            {/* Icons Section (Like, Comment, Share) */}
                            <div className="flex justify-between items-center py-2 border-t border-gray-300 mt-2 pt-2">
                                <div className="flex gap-4">
                                    <ThumbsUp className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-500" />
                                    <MessageCircle className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-500" />
                                    <Share2 className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-500" />
                                </div>
                            </div>

                            {/* Add Comment Input */}
                            <div className="border-t border-gray-300 mt-2 pt-2 flex items-center">
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    className="bg-white text-black text-sm flex-grow p-2 focus:outline-none"
                                />
                            </div>

                            {/* Select Button - Always at Bottom */}
                            <div className="mt-auto p-4">
                                <button
                                    onClick={() => handleSelect(post)}
                                    className={`w-full px-4 py-2 text-sm transition-all rounded-full ${
                                        selectedPost.imageUrl === post.imageUrl
                                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                            : "bg-blue-600 text-white hover:bg-blue-700"
                                    }`}
                                    disabled={selectedPost.imageUrl === post.imageUrl}
                                >
                                    {selectedPost.imageUrl === post.imageUrl ? "Selected" : "Select Post"}
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
    </>
  );
}

