"use client"
import React, { useState } from 'react'
import SideNav from './_components/SideNav';
import Header from './_components/Header';
import { TotalUsageContext } from '../(context)/TotalUsageContext';
import { UserSubscriptionContext } from '../(context)/UserSubscriptionContext';
import { UpdateCreditUsageContext } from '../(context)/UpdateCreditUsageContext';

function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const [totalUsage,setTotalUsage]=useState<Number>(0);
    const [userSubscription,setUserSubscription]=useState<boolean>(false);
    const [updateCreditUsage,setUpdateCreditUsage]=useState<any>()

  return (
    <UpdateCreditUsageContext.Provider value={{updateCreditUsage,setUpdateCreditUsage}}>
    <TotalUsageContext.Provider value={{totalUsage,setTotalUsage}}>
      <UserSubscriptionContext.Provider value={{userSubscription,setUserSubscription}}>
    <div className='bg-slate-100 min-h-screen'>
        <div className='md:w-64 hidden md:block fixed'>
            <SideNav/>
        </div>
        <div className='md:ml-64'>
          <Header/>
        {children}
        </div>
    
    </div>
    </UserSubscriptionContext.Provider>
    </TotalUsageContext.Provider>
    </UpdateCreditUsageContext.Provider>
  )
}

export default layout