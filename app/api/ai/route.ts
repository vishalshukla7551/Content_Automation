import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma.js"
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    const { userId } = getAuth(req);
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const { formData, templateSlug, aiResponse,} = await req.json();

        if (!formData || !templateSlug || !aiResponse) {
            return NextResponse.json({ error:"Missing required fields" }, { status: 400 });
        }

        const newAIOutput = await prisma.aiOutput.create({
            data: {
                formData,
                templateSlug,
                aiResponse,
                createdBy:userId,
            },
        });

        return NextResponse.json(newAIOutput);
    } catch (error) {
        return NextResponse.json({ error}, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const { userId } = getAuth(req);
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {

        // Fetch history from the database
        const result = await prisma.aiOutput.findMany({
            where: { createdBy: userId },
        });
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}