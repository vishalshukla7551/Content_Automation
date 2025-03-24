const axios = require('axios');
import { NextRequest, NextResponse } from "next/server";
const CLIENT_ID = "1351411795877566";
const CLIENT_SECRET = "bb3872ff8f6d921dc1d96bc3f7241308";

export async function GET(req:NextRequest, res:NextResponse)
{   
    const REDIRECT_URI=`${req.nextUrl.origin}/api/facebook/callback`;
    console.log(REDIRECT_URI);
    const { searchParams } = new URL(req.url);
    const authCode = searchParams.get("code");
    if (!authCode) {
        return NextResponse.json({error_code:1,message:"authcode not provided"});
    }

    try {
        // Exchange "code" for an access token
        const tokenResponse = await axios.get("https://graph.facebook.com/v19.0/oauth/access_token", {
            params: {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                redirect_uri: REDIRECT_URI,
                code: authCode,
            }
        });

        const accessToken = tokenResponse.data.access_token;
        console.log("accessToken",accessToken);

        const longlivedtoken=await axios.get(`${req.nextUrl.origin}/api/facebook/long-lived-token?access_token=${accessToken}`);
        console.log("longlivedtoken",longlivedtoken.data.long_lived_access_token);
        const page= await axios.get(`https://graph.facebook.com/v19.0/me/accounts?access_token=${longlivedtoken.data.long_lived_access_token}`)
        const pageData = page.data.data[0]; // First page in the list

       const access_Token_pageId = pageData.access_token;
        const pageId= pageData.id;
        console.log("access_Token_pageId" ,access_Token_pageId);
        console.log("pageId" ,pageId);
        const businessAccountData= await axios.get(`https://graph.facebook.com/v19.0/${pageId}?fields=instagram_business_account&access_token=${access_Token_pageId}`)
        const businessId=businessAccountData.data.instagram_business_account.id;
        console.log("businessId",businessId)
        // Respond with the access token (or store it for future use)
        // return NextResponse.json({ access_Token_pageId,businessId });
        return NextResponse.redirect(`${req.nextUrl.origin}/content_post?businessId=${businessId}&access_Token=${access_Token_pageId}`);

    } catch (error) {
        console.log(error);
        return NextResponse.json({error_code:2,message:"Error exchanging code for token:"})
        // res.status(500).send("Error exchanging code for token: " + error.response.data.error.message);
    }
}






