"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AutoPostPopup() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();


  const handleYesClick = () => {
    setShowModal(false);
    router.push("/dashboard/content/instagram-post-generator"); // Redirect
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* Button to trigger modal */}
      <Button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Auto Post to Instagram
      </Button>

      {/* Modal Popup - Blocks Background Clicks & Scrolling */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pointer-events-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 pointer-events-auto">
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
    </div>
  );
}