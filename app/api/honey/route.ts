import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
const path = require("path");
export async function GET(req:NextRequest,res:NextResponse) {
    const userId = "17841469696092614";  // Replace with actual Instagram User ID
const accessToken = "EAATNGhQJ3r4BO2L1YXIts1UHzzBbKMwqwRHX40dPPdE081ZAjaZAzZAlG7HxF3zE0Wz6HO3YMlGcSubfzDW3pG0Ixim18Hvq8jOHNtZAho2woGySAW9xMiM8ZCjp6PCoKYozvvQRp3Wa1SxDVACkbA4oomrHZAwscFA14BenCMxEvGS3rZBljfLDs8AFD5vVjL6woJoANkm";  // Replace with a valid access token
    try {
        const response = await axios.get(`https://graph.facebook.com/v19.0/${userId}?fields=id,username,media_count,profile_picture_url&access_token=${accessToken}`);
        console.log("✅ Instagram Profile Data:", response.data);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("❌ Error fetching Instagram profile:", );
        return NextResponse.json(error);
    }
};
