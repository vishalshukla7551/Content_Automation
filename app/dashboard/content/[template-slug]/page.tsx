"use client";
import React, { useContext, useState } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AiModal";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { useRouter } from "next/navigation";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

interface PROPS {
  params: {
    "template-slug": string;
  };
}

function CreateNewContent(props: PROPS) {
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug == props.params["template-slug"]
  );
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");
  const { user } = useUser();
  const router = useRouter();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(
    UpdateCreditUsageContext
  );

  const GenerateAIContent = async (formData: any) => {
    setLoading(true);
    const SelectedPrompt = selectedTemplate?.aiPrompt;
    const FinalAIPrompt = JSON.stringify(formData) + ", " + SelectedPrompt;
    const result = await chatSession.sendMessage(FinalAIPrompt);

    setAiOutput(result?.response.text());
    await SaveInDb(
      JSON.stringify(formData),
      selectedTemplate?.slug,
      result?.response.text()
    );
    setLoading(false);
    setUpdateCreditUsage(Date.now());
  };

  const SaveInDb = async (
    formData: any,
    templateSlug: any,
    aiResponse: string
  ) => {
    const response = await axios.post("/api/AiOutput", {
      formData,
      templateSlug,
      aiResponse,
    });

    console.log(response.data);
  };

  return (
    <div className="p-6 w-full h-full min-h-screen flex flex-col">
      {/* Back Button */}
      <div className="mb-4">
        <Link href={"/dashboard"}>
          <Button variant="outline">
            <ArrowLeft className="mr-2" size={16} /> Back
          </Button>
        </Link>
      </div>

      {/* Content Sections */}
      <div className="flex flex-col md:flex-row gap-6 flex-grow">
        {/* Form Section */}
        <div className="w-full md:w-1/3 flex-grow">
          <FormSection
            selectedTemplate={selectedTemplate}
            userFormInput={(v: any) => GenerateAIContent(v)}
            loading={loading}
          />
        </div>

        {/* Output Section */}
        <div className="w-full md:w-2/3 flex-grow">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
