"use client";
import { useSearchParams } from "next/navigation";
import { Instagram, ArrowLeft, Loader2, MoreHorizontal, Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { Button } from '@/components/ui/button';
import { useEffect, useState } from "react";
import { postToInstagram } from "@/utils/InstaPost";
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link'
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
  const [instauserinfo, setinstauserinfo] = useState<any>("");
  const [showModal, setShowModal] = useState(false);
  
  
    const handleYesClick = () => {
      setShowModal(false);
      router.push(`https://www.facebook.com/v19.0/dialog/oauth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=instagram_basic,instagram_content_publish,pages_show_list,business_management,pages_read_engagement&response_type=code`); // Redirect
    };
  let instauser_info;
  try{ instauser_info =JSON.parse(decodeURIComponent(instauserinfo));}
  catch
  { instauser_info = {profile_picture_url:"Unknown_person.jpg",username:"Unknown"};}
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

    let storedContent3 = searchParams.get("instauserinfo") || localStorage.getItem("instauserinfo") || "";
    
    if (searchParams.get("instauserinfo")) { localStorage.setItem("instauserinfo", storedContent3); }
    setinstauserinfo(storedContent3);

     if(storedContent1!=""&&storedContent2!="")
      setload(true);
  }, [searchParams]);

console.log(posts)

return (
  <>
      {/* Header Section */}
      <div className="flex items-center justify-between w-full p-4">
          <Link href={"/dashboard/content/instagram-post-generator"}>
              <Button className="flex items-center">
                  <ArrowLeft /> Back
              </Button>
          </Link>
          <h1 className="text-2xl font-bold text-center flex-1">Instagram Post Templates</h1>
          <div className="w-16"></div>
      </div>

      <div className="p-6 max-w-2xl mx-auto">
          {/* Business ID Section */}
          {businessId ? (
              <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg text-center">
                  <center>
          <img src={instauser_info.profile_picture_url} alt={instauser_info.name} className="w-8 h-8 rounded-full" /></center>
          <center> <strong>{instauser_info.username}</strong>
        </center>
              
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
                      {loading && <Loader2 className="animate-spin ml-2" />}
                  </center>
              </div>
          ) : 
          <div className="flex justify-center mb-6">
        <button onClick={() => setShowModal(true)}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md text-lg hover:scale-105 transition-transform"
                  >
                      🔥 Log into Instagram
                  </button>
              </div>
          }

          {/* Instagram Post Feed */}
           {/* Instagram Post Feed */}
    <div className="w-full flex justify-center gap-6 flex-nowrap">
        {posts.map((post: any, index: any) => (
            <div
                key={index}
                className="rounded-lg overflow-hidden bg-white text-black shadow-lg border border-gray-300 transition-opacity flex flex-col"
                style={{ width: "400px", flex: "0 0 auto" }} // Fixed size, prevents shrinking
            >
                {/* Post Header */}
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <img
                            src={instauser_info.profile_picture_url}
                            alt="Profile"
                            className="w-10 h-10 rounded-full border border-gray-300"
                        />
                        <div>
                            <h3 className="font-semibold text-sm">{instauser_info.username}</h3>
                        </div>
                    </div>
                    <MoreHorizontal className="text-gray-500 cursor-pointer" />
                </div>

                {/* Instagram Post Image */}
                <div className="w-full">
                    <img src={post.imageUrl} alt={post.title} className="w-full object-cover" />
                </div>

                {/* Engagement & Caption */}
                <div className="px-4 py-2 flex flex-col flex-grow">
                    {/* Icons Section (Like, Comment, Share) */}
                    <div className="flex justify-between items-center py-2">
                        <div className="flex gap-4">
                            <Heart className="w-6 h-6 text-black cursor-pointer hover:text-red-500" />
                            <MessageCircle className="w-6 h-6 text-black cursor-pointer hover:text-gray-500" />
                            <Send className="w-6 h-6 text-black cursor-pointer hover:text-gray-500" />
                        </div>
                        <Bookmark className="w-6 h-6 text-black cursor-pointer hover:text-gray-500" />
                    </div>

                    {/* Likes Count */}
                    <p className="text-sm font-semibold py-1">0 likes</p>

                    {/* Post Caption */}
                    <p className="text-sm flex-grow">
                        <span className="font-semibold">{instauser_info.username} </span>
                        {post.caption}
                    </p>

                    {/* View Comments */}
                    <p className="text-gray-500 text-sm cursor-pointer py-1">View all 0 comments</p>

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
        ))}
    </div>
      </div>

      {/* Modal Popup - Blocks Background Clicks & Scrolling */}
    {showModal && (
       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
         <div className="bg-white rounded-lg shadow-lg p-6 w-[500px]">
            <h2 className="text-xl font-bold mb-2">Prerequisites</h2>
            <p className="text-gray-700">
              ✅ You must have an **Instagram Business Account**.<br />
              ✅ Your account must be **linked to a Facebook Page**.
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <Button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                No
              </Button>
              <Button onClick={handleYesClick} className="bg-green-600 text-white px-4 py-2 rounded">
                Yes, I Have
              </Button>
            </div>
          </div>
        </div>
      )}
  </>
);
}

