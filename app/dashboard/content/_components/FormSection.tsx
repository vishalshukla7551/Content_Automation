"use client"
import React, { useContext, useState } from 'react'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { useRouter } from "next/navigation"; 
import { showSuccessAlert, showErrorAlert } from "@/utils/alert";

interface PROPS {
    selectedTemplate?: TEMPLATE;
    userFormInput: any;
    loading: boolean;
}

function FormSection({ selectedTemplate, userFormInput, loading }: PROPS) {
    const router = useRouter(); 
    const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
    const { userSubscription } = useContext(UserSubscriptionContext);

    const [formData, setFormData] = useState<any>({});

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        if (userSubscription) {
            if (totalUsage / 1000000 > 1) {
                showErrorAlert("Subscription Required", "Purchase Extra Credit");
                router.push("/dashboard/billing");
                return;
            }
        } else {
            if (totalUsage / 10000 > 1) {
                showErrorAlert("Subscription Required", "Purchase Extra Credit");
                router.push("/dashboard/billing");
                return;
            }
        }
        userFormInput(formData);
    };

    return (
        <div className="w-full max-w-lg mx-auto h-full min-h-screen flex flex-col p-4 sm:p-5 shadow-md border rounded-lg bg-white">

            {/* Image & Title */}
            <div className="flex flex-col items-center text-center">
                <Image src={selectedTemplate?.icon||""} alt="icon" width={70} height={70} />
                <h2 className="font-bold text-xl sm:text-2xl mt-4 text-primary">{selectedTemplate?.name}</h2>
                <p className="text-gray-500 text-sm">{selectedTemplate?.desc}</p>
            </div>

            {/* Form */}
            <form className="mt-6 space-y-6" onSubmit={onSubmit}>
                {selectedTemplate?.form?.map((item, index) => (
                    <div key={index} className="flex flex-col gap-2">
                        <label className="font-bold">{item.label}</label>
                        {item.field === 'input' ? (
                            <Input
                                name={item.name}
                                required={item?.required}
                                onChange={handleInputChange}
                                className="w-full"
                            />
                        ) : item.field === 'textarea' ? (
                            <>
                                <Textarea
                                    name={item.name}
                                    required={item?.required}
                                    rows={5}
                                    maxLength={2000}
                                    onChange={handleInputChange}
                                    className="w-full"
                                />
                                <span className="text-xs text-gray-400">Max 2000 characters</span>
                            </>
                        ) : null}
                    </div>
                ))}

                {/* Button */}
                <Button type="submit" className="w-full py-4 sm:py-6" disabled={loading}>
                    {loading && <Loader2Icon className="animate-spin mr-2" />}
                    Generate Content
                </Button>
            </form>
        </div>
    );
}

export default FormSection;
