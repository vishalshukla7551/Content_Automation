"use client"; // ✅ Ensures this runs in the browser
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TEMPLATE } from "../_components/TemplateListSection";
import CopyButton from "./_components/CopyButton";
import { Loader2Icon } from 'lucide-react';
import axios from "axios";

export interface HISTORY {
  id: string;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
}

function History() {
    const [loading,setLoading]=useState(true);
  const { user } = useUser(); // ✅ Use user correctly in Client Component
  const [HistoryList, setHistoryList] = useState([]); // ✅ Store history in state

  // ✅ Fetch history when component mounts
  useEffect(() => {
    async function fetchHistory() {
        
      try {
        const response = await axios.get("/api/ai");
        setHistoryList(response.data); // ✅ Update state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    }
    fetchHistory();
  }, []);

  const GetTemplateName = (slug: string) => {
    const template: TEMPLATE | undefined = Templates?.find(
      (item) => item.slug === slug
    );
    return template;
  };

  return (
    <div className="m-5 p-5 border rounded-lg bg-white">
      <h2 className="font-bold text-3xl">History</h2>
      <p className="text-gray-500">Search your previously generated AI content</p>
      <div className="grid grid-cols-7 font-bold bg-secondary mt-5 py-3 px-3">
        <h2 className="col-span-2">TEMPLATE</h2>
        <h2 className="col-span-2">AI RESP</h2>
        <h2>DATE</h2>
        <h2>WORDS</h2>
        <h2>COPY</h2>
      </div>
      {HistoryList.length === 0 ? (
        <p className="text-gray-500 mt-5"> {loading?<Loader2Icon className='animate-spin'/>:`No history found.`}</p>
      ) : (
        HistoryList.map((item:any) => (
          <div key={item.id}>
            <div className="grid grid-cols-7 my-5 py-3 px-3">
              <h2 className="col-span-2 flex gap-2 items-center">
                <Image
                  src={GetTemplateName(item?.templateSlug)?.icon || "/default-icon.png"}
                  width={25}
                  height={25}
                  alt="icon"
                />
                {GetTemplateName(item.templateSlug)?.name || "Unknown Template"}
              </h2>
              <h2 className="col-span-2 line-clamp-3 mr-3">{item?.aiResponse}</h2>
              <h2>{new Date(item.createdAt).toLocaleDateString()}</h2>
              <h2>{item?.aiResponse.length}</h2>
              <h2>
                <CopyButton aiResponse={item.aiResponse} />
              </h2>
            </div>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default History;
