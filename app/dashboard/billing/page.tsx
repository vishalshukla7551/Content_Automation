"use client";
import { Button } from "@/components/ui/button";
import React, { useContext, useState } from "react";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import axios from "axios";
import { Loader2Icon } from "lucide-react";

function Billing() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject(false);
      document.body.appendChild(script);
    });
  };

  const CreateSubscription = async () => {
    try {
      setLoading(true);
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        alert("Failed to load Razorpay. Please check your internet connection.");
        setLoading(false);
        return;
      }
      const response = await axios.post("/api/create-subscription", {});
      OnPayment(response.data.id);
    } catch (error) {
      console.error("Error creating subscription:", error);
      alert("Failed to create subscription. Please try again.");
      setLoading(false);
    }
  };

  const OnPayment = (subId: string) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      subscription_id: subId,
      name: "Content Posting App",
      description: "Monthly Subscription",
      handler: async (resp: any) => {
        if (resp) {
          SaveSubscription(resp?.razorpay_payment_id);
        }
        setLoading(false);
      },
      modal: {
        escape: true,
        ondismiss: () => {
          setLoading(false);
        },
      },
    };
    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const SaveSubscription = async (paymentId: string) => {
    const result = await axios.post("/api/userSubscription", {
      email: user?.primaryEmailAddress?.emailAddress,
      username: user?.fullName,
      active: true,
      paymentId: paymentId,
      joinDate: moment().format("DD/MM/yyyy"),
    });
    if (result) {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="w-full max-w-5xl">
        <h2 className="text-center font-extrabold text-4xl text-white mb-8">Upgrade Your Plan</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Plan */}
          <div className="bg-gray-800/60 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-lg text-white">
            <h2 className="text-2xl font-semibold text-center">Free Plan</h2>
            <p className="text-center text-gray-400 mt-2">
              <strong className="text-4xl font-bold text-white">₹0</strong> / month
            </p>

            <ul className="mt-6 space-y-3 text-gray-300">
              <li>✅ 10,000 Words/Month</li>
              <li>✅ 50+ Content Templates</li>
              <li>✅ Unlimited Download & Copy</li>
              <li>✅ 1 Month of History</li>
            </ul>
          </div>

          {/* Monthly Plan */}
          <div className="bg-gray-800/60 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-lg text-white relative">
            <div className="absolute top-0 left-0 bg-indigo-600 text-xs font-bold px-4 py-1 rounded-br-lg">
              Best Value
            </div>
            <h2 className="text-2xl font-semibold text-center">Monthly Plan</h2>
            <p className="text-center text-gray-400 mt-2">
              <strong className="text-4xl font-bold text-white">₹299</strong> / month
            </p>

            <ul className="mt-6 space-y-3 text-gray-300">
              <li>🚀 1,00,000 Words/Month</li>
              <li>🚀 50+ Template Access</li>
              <li>🚀 Unlimited Download & Copy</li>
              <li>🚀 1 Year of History</li>
            </ul>

            <Button
              disabled={loading}
              onClick={!userSubscription ? () => CreateSubscription() : () => {}}
              className="w-full bg-indigo-600 text-white mt-6 py-3 rounded-full hover:bg-indigo-500 transition-all flex items-center justify-center"
            >
              {loading && <Loader2Icon className="animate-spin mr-2" />}
              {userSubscription ? "Active Plan" : "Get Started"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;
