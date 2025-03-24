const axios = require('axios');
import { NextRequest, NextResponse } from "next/server";
const CLIENT_ID = "1351411795877566";
const CLIENT_SECRET = "bb3872ff8f6d921dc1d96bc3f7241308";

export async function GET(req:NextRequest, res:NextResponse)
{  
    const { searchParams } = new URL(req.url);
    const shortLivedToken = searchParams.get("access_token");

    if (!shortLivedToken) 
        return NextResponse.json({error_code:1,message:"Short-lived access token is required!"});

    try {
        // Exchange short-lived token for a long-lived token
        const tokenResponse = await axios.get("https://graph.facebook.com/v19.0/oauth/access_token", {
            params: {
                grant_type: "fb_exchange_token",
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                fb_exchange_token: shortLivedToken,
            }
        });

        const longLivedToken = tokenResponse.data.access_token;
        console.log("Long-lived token:", longLivedToken);

        // Respond with the long-lived token
        return NextResponse.json({ long_lived_access_token: longLivedToken });
    } catch (error) {
        console.log(error);
        return NextResponse.json({error_code:2,message:"Error converting to long-lived token: "});
    }
};