import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "../../../lib/prisma.js"


export async function POST(req: NextRequest) {
    try {
        const {email, username,active,paymentId,joinDate } = await req.json(); 
        const { userId } = getAuth(req); 

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Save subscription to Prisma
        const newSubscription = await prisma.userSubscription.create({
            data: {
                email,
                username,
                active,
                paymentId,
                joinDate
            },
        });

        return NextResponse.json({ success: true, subscription: newSubscription });
    } catch (error) {
        console.error("Subscription Error:", error);
        return NextResponse.json({ error }, { status: 500 });
    }
}

// Get userSubscription
export async function GET(req: NextRequest) {
    try {
        const { userId } = getAuth(req); // ✅ Get the authenticated user

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const user = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
            },
        }).then((res) => res.json());
           const userEmail = user.email_addresses?.find((email: any) => email.id === user.primary_email_address_id)?.email_address;
           if (!userEmail) {
               return NextResponse.json({ error: "User email not found" }, { status: 400 });
           }
        const subscription = await prisma.userSubscription.findFirst({
            where: { email: userEmail, active: true },
        });
        console.log(subscription)
        return NextResponse.json({
            isSubscribed: !!subscription, // Convert to boolean
            maxWords: subscription ? 1000000 : 10000, // If subscribed, increase limit
        });
    } catch (error) {
        console.error("Subscription Check Error:", error);
        return NextResponse.json({ error}, { status: 500 });
    }
}
