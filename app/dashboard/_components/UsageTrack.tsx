"use client"
import { Button } from '@/components/ui/button'
import Link from "next/link";
import { useUser } from '@clerk/nextjs';
import axios from "axios";
import React, { useContext, useEffect, useState } from 'react'
import { HISTORY } from '../history/page';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext';

 function UsageTrack() {

    const {user}=useUser();
    const {totalUsage,setTotalUsage}=useContext(TotalUsageContext)
    const {userSubscription,setUserSubscription}=useContext(UserSubscriptionContext);
    const [maxWords,setMaxWords]=useState(10000)
    const {updateCreditUsage,setUpdateCreditUsage}=useContext(UpdateCreditUsageContext);
    useEffect(()=>{
        user&&GetData();
        user&&IsUserSubscribe();
    },[user]);


    useEffect(()=>{
        user&&GetData();
    },[updateCreditUsage]);

    const GetData=async()=>{
         {/* @ts-ignore */}
        const result=await axios.get("/api/ai")
        
        GetTotalUsage(result.data)
    }

    const IsUserSubscribe=async()=>{
         {/* @ts-ignore */}
        const result=await axios.get("/api/userSubscription");
        console.log(result.data)
        if(result.data.length>0)
            {
                setUserSubscription(true);
                setMaxWords(1000000);
            }
    }



    const GetTotalUsage=(result:HISTORY[])=>{
        let total:number=0;
        result.forEach(element => {
            total=total+Number(element.aiResponse?.length) 
        });

        setTotalUsage(total)
        console.log(total);
    }


  return (
    <div className='m-5'>
        <div className='bg-primary text-white p-3 rounded-lg'>
            <h2 className='font-medium'>Credits</h2>
            <div className='h-2 bg-[#9981f9] w-full rounded-full mt-3'>
                <div className='h-2 bg-white rounded-full'
                style={{
                    width:totalUsage/maxWords>1?100+"%":(totalUsage/maxWords)*100+"%"
                }}
                ></div>
            </div>
            <h2 className='text-sm my-2'>{totalUsage}/{maxWords} credit used</h2>
        </div>
        <Link href="/dashboard/billing">
        <Button variant={'secondary'} className='w-full my-3 text-primary'>Upgrade</Button>
        </Link>
    </div>
  )
}

export default UsageTrack