import { UserProfile } from "@clerk/nextjs";
import React from "react";

function Settings() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="bg-gray-800/60 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-lg w-full max-w-5xl">
        <h2 className="text-white text-2xl font-semibold text-center mb-4">Profile Settings</h2>
        <div className="rounded-lg overflow-hidden">
          <UserProfile />
        </div>
      </div>
    </div>
  );
}

export default Settings;
