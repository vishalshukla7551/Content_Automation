"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { HISTORY } from "../history/page";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";

function UsageTrack() {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);
  const [maxWords, setMaxWords] = useState(10000);

  useEffect(() => {
    if (user) {
      GetData();
      IsUserSubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      GetData();
    }
  }, [updateCreditUsage]);

  const GetData = async () => {
    const result = await axios.get("/api/AiOutput");
    GetTotalUsage(result.data);
  };

  const IsUserSubscribe = async () => {
    const result = await axios.get("/api/userSubscription");
    setUserSubscription(result.data.isSubscribed);
    setMaxWords(result.data.maxWords);
  };

  const GetTotalUsage = (result: HISTORY[]) => {
    let total = 0;
    result.forEach((element) => {
      total = total + Number(element.aiResponse?.length);
    });

    setTotalUsage(total);
  };

  // Progress Bar Color Logic
  const progressPercentage = Math.min((totalUsage / maxWords) * 100, 100);
  const progressColor = progressPercentage > 80 ? "bg-red-500" : "bg-green-500"; // Turns red when usage is high

  return (
    <div className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl shadow-lg text-white">
      {/* Credits Section */}
      <h2 className="font-semibold text-lg">Usage Credits</h2>
      
      {/* Progress Bar */}
      <div className="relative w-full h-3 bg-gray-700 rounded-full mt-3">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${progressColor}`}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="text-sm mt-2 text-gray-300">{totalUsage} / {maxWords} credits used</p>

      {/* Upgrade Button */}
      <Link href="/dashboard/billing">
        <Button className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg">
          Upgrade Plan
        </Button>
      </Link>
    </div>
  );
}

export default UsageTrack;
