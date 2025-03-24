import { NextRequest, NextResponse } from "next/server";
const path = require("path");
export async function GET(req:NextRequest) {
    const rootDomain = req.nextUrl.origin; 
    const REDIRECT_URI=path.join(rootDomain, "api/facebook/callback");
    return NextResponse.json({ REDIRECT_URI });
}