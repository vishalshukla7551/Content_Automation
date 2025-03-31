"use client"; 
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TEMPLATE } from "../_components/TemplateListSection";
import CopyButton from "./_components/CopyButton";
import { Loader2Icon } from "lucide-react";
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
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const [HistoryList, setHistoryList] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await axios.get("/api/AiOutput");
        setHistoryList(response.data);
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
    <div className="m-5 p-5 border border-gray-700 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg text-white">
      <h2 className="font-extrabold text-3xl">History</h2>
      <p className="text-gray-400">Search your previously generated AI content</p>

      {/* Table Header */}
      <div className="grid grid-cols-7 font-semibold bg-gray-800 mt-5 py-3 px-3 rounded-md shadow-md text-gray-300">
        <h2 className="col-span-2">TEMPLATE</h2>
        <h2 className="col-span-2">AI RESPONSE</h2>
        <h2>DATE</h2>
        <h2>WORDS</h2>
        <h2>COPY</h2>
      </div>

      {/* Data Rows */}
      {HistoryList.length === 0 ? (
        <div className="text-center text-gray-400 mt-5">
          {loading ? <Loader2Icon className="animate-spin mx-auto text-blue-400 w-8 h-8" /> : `No history found.`}
        </div>
      ) : (
        HistoryList.map((item: any, index: number) => (
          <div key={item.id} className={`grid grid-cols-7 py-4 px-3 ${index % 2 === 0 ? "bg-gray-800/50" : "bg-gray-900/50"} rounded-lg hover:bg-gray-700 transition-all`}>
            <h2 className="col-span-2 flex gap-2 items-center">
              <Image
                src={GetTemplateName(item?.templateSlug)?.icon || "/default-icon.png"}
                width={25}
                height={25}
                alt="icon"
                className="rounded-md shadow-md"
              />
              {GetTemplateName(item.templateSlug)?.name || "Unknown Template"}
            </h2>
            <h2 className="col-span-2 text-gray-300 truncate">{item?.aiResponse}</h2>
            <h2 className="text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</h2>
            <h2 className="text-gray-300">{item?.aiResponse.length}</h2>
            <h2>
              <CopyButton aiResponse={item.aiResponse} />
            </h2>
          </div>
        ))
      )}
    </div>
  );
}

export default History;
