"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const postsData = [
  {
    title: "Majestic Mountain Landscape",
    image_des: "A stunning panoramic view of a mountain range at sunrise or sunset.",
    caption: "Lost in the majesty of the mountains. ✨",
    hashtags: ["#mountainlife", "#mountainviews", "#naturephotography"]
  },
  {
    title: "Hiking Adventure",
    image_des: "A photo or video of someone hiking a mountain trail.",
    caption: "Conquered another peak today! 💪",
    hashtags: ["#hikingadventures", "#mountainhiking", "#getoutside"]
  },
  {
    title: "Close-up Mountain Detail",
    image_des: "A close-up shot focusing on a detail of a mountain – unique rock formations.",
    caption: "Finding beauty in the details. ⛰️",
    hashtags: ["#mountaindetails", "#naturedetails", "#texture"]
  }
];

export default function InstagramPosts() {
  const [posts, setPosts] = useState(postsData.map(post => ({ ...post, imageUrl: "" })));
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      const updatedPosts = await Promise.all(
        posts.map(async (post) => {
          try {
            const response = await axios.get(`/api/generateImage?prompt=${encodeURIComponent(post.image_des)}`);
            return { ...post, imageUrl: response.data.imageUrl }; // ✅ Corrected data access
          } catch (error) {
            console.error("Error generating image:", error);
            return { ...post, imageUrl: "/placeholder.jpg" }; // Handle errors
          }
        })
      );
      setPosts(updatedPosts);
    }
    fetchImages();
  }, []);

  const handleSelect = (post:any) => setSelectedPost(post);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Instagram Post Templates</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <div key={index} className="border rounded-lg overflow-hidden shadow-md bg-white">
            <img src={post.imageUrl || "/placeholder.jpg"} alt={post.title} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-gray-700">{post.caption}</p>
              <p className="text-blue-500 text-sm mt-2">{post.hashtags.join(" ")}</p>
              <button
                onClick={() => handleSelect(post)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Select Post
              </button>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold mt-6">Selected Posts (JSON Data)</h2>
      <pre className="bg-gray-200 p-4 rounded mt-2 text-sm overflow-auto">
        {JSON.stringify(selectedPost, null, 2)}
      </pre>
    </div>
  );
}
