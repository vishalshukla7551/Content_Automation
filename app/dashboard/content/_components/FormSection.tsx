"use client"
import React, {useContext, useState } from 'react'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { useRouter } from "next/navigation"; 
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from "@/utils/alert";
interface PROPS {
    selectedTemplate?: TEMPLATE;
    userFormInput:any,
    loading:boolean
}
function FormSection({ selectedTemplate,userFormInput,loading }: PROPS) {
    const router = useRouter(); 
    const {totalUsage,setTotalUsage}=useContext(TotalUsageContext)
    const {userSubscription,setUserSubscription}=useContext(UserSubscriptionContext);

    const [formData,setFormData]=useState<any>();

    const handleInputChange=(event:any)=>{
        const {name,value}=event.target;
        setFormData({...formData,[name]:value})
    }

    const onSubmit=(e:any)=>{
        e.preventDefault();
        if(userSubscription)
        {if(totalUsage/1000000>1) {showErrorAlert("Subscription Required","Purchase Extra Credit");router.push("/dashboard/billing"); 
            return;}
        }
        else
        {if(totalUsage/10000>1) {showErrorAlert("Subscription Required","Purchase Extra Credit");router.push("/dashboard/billing"); 
            return;}}
        userFormInput(formData)
    }

    return (
        <div className='p-5 shadow-md border rounded-lg bg-white'>
            {/* @ts-ignore */}
            <Image src={selectedTemplate?.icon}
                alt='icon' width={70} height={70} />
            <h2 className='font-bold text-2xl mb-2 mt-4 text-primary'>{selectedTemplate?.name}</h2>
            <p className='text-gray-500 text-sm'>{selectedTemplate?.desc}</p>

            <form className='mt-6' onSubmit={onSubmit}>
                {selectedTemplate?.form?.map((item, index) => (
                    <div key={index} className='my-2 flex flex-col gap-2 mb-7'>
                        <label className='font-bold'>{item.label}</label>
                        {item.field == 'input' ?
                            <Input name={item.name} required={item?.required}
                            onChange={handleInputChange}
                            />
                            : item.field == 'textarea' ?
                            <>
                                <Textarea name={item.name} required={item?.required}
                                rows={5}
                                maxLength={2000}
                                onChange={handleInputChange} /> 
                                <label className='text-xs text-gray-400'>Note:Max 2000 Words</label>
                                
                                </>    : null
                        }
                    </div>
                ))}
                <Button type="submit" 
                className='w-full py-6'
                disabled={loading}
                >
                    {loading&&<Loader2Icon className='animate-spin'/>}
                    Generate Content</Button>
            </form>
        </div>
    )
}

export default FormSection