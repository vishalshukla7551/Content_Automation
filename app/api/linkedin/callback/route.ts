import qs from 'querystring';
import axios from 'axios';
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
const CLIENT_ID = "86fw1p2xp17j2g";
const CLIENT_SECRET = "WPL_AP1.UnNAS3wpVvnvgRFB.Plk2ZQ==";
export async function GET(req:NextRequest, res:NextResponse)
{   
    const LINKEDIN_REDIRECT=`${req.nextUrl.origin}/api/linkedin/callback`
    const { searchParams } = new URL(req.url);
    const authCode = searchParams.get("code");

  if (!authCode) {
   return NextResponse.json({error_code:1,message:"authcode not provided"});
  }
  try {
    const response = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      qs.stringify({
        grant_type: 'authorization_code',
        code:authCode,
        redirect_uri: LINKEDIN_REDIRECT,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
     console.log("get acces token")
     const { access_token } = response.data;
     const { id_token } = response.data;
     console.log("access token",access_token)
     console.log("id_token",id_token)
     console.log("response.data",response.data)
     const decoded = jwt.decode(id_token, { complete: true })||{payload:{sub:""}};
     console.log(decoded.payload.sub)
    //  const post_final = await axios.post("http://localhost:3000/api/linkedin/post",{
    //     accessToken:access_token,
    //     message:"HELLO VIDIT", 
    //     profileId:decoded.payload.sub
    //  });
    const userinfo = await axios.get("https://api.linkedin.com/v2/userinfo", {
      headers: {
          Authorization: `Bearer ${access_token}`
      }
  });
  console.log("Get User Info")
  const cleanedText = JSON.stringify(userinfo.data);
  console.log("stringify userinfo")
    return NextResponse.redirect(`${req.nextUrl.origin}/content_post_linkedin?profile_id=${decoded.payload.sub}&access_token=${access_token}&linkedinuserinfo=${encodeURIComponent(cleanedText)}`);
    // return NextResponse.json({access_token:access_token,profile_id:decoded.payload.sub,prompt:"AI IN FUTURE"});
  } catch (error) {
    return NextResponse.json({error_code:2,message:"Error exchanginggggggg code for token:"})
  }
}


// const idToken = "eyJ6aXAiOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImQ5Mjk2NjhhLWJhYjEtNGM2OS05NTk4LTQzNzMxNDk3MjNmZiIsImFsZyI6IlJTMjU2In0.eyJpc3MiOiJodHRwczovL3d3dy5saW5rZWRpbi5jb20vb2F1dGgiLCJhdWQiOiI4NmZ3MXAyeHAxN2oyZyIsImlhdCI6MTc0MzA5MjIyMiwiZXhwIjoxNzQzMDk1ODIyLCJzdWIiOiJfYy14TmhWWi1wIiwibmFtZSI6IlZpZGl0IGphaW4iLCJnaXZlbl9uYW1lIjoiVmlkaXQiLCJmYW1pbHlfbmFtZSI6ImphaW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9tZWRpYS5saWNkbi5jb20vZG1zL2ltYWdlL3YyL0Q1NjAzQVFIQjRZa2RxT0ZfS3cvcHJvZmlsZS1kaXNwbGF5cGhvdG8tc2hyaW5rXzEwMF8xMDAvcHJvZmlsZS1kaXNwbGF5cGhvdG8tc2hyaW5rXzEwMF8xMDAvMC8xNzE1MTI1OTM3NDAwP2U9MjE0NzQ4MzY0NyZ2PWJldGEmdD1Uc2pNTUlUYnRhMlJHX3AzRjZHQ2lTSWRUVjJjZ0pSc3BWSTdSSjI4Q1d3IiwiZW1haWwiOiJqYWludmlkaXQzNjV2aWRpdEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6InRydWUiLCJsb2NhbGUiOiJlbl9VUyJ9.Qt5OAe7YebZWZHn3Au1Fhd2KpSeR8uDaX7LH54aGVIE9U4xId6Nh2A_4FOu5dGq_GPF5BfZdoKJDKUiM_ifESSc7y-pV45wK_OqL4cdhR-6iEmNbcvPwWWwo12du9j6_1t_7N_dtaeGQXesu_yhbz7F_WRPhnCSIT3aVgnJu-vV60e4hAlhdPybC4ig8ZkiGn9prY8vIRvrzZLHOTscQJ2UwzZPsG5nJgHT_-JCvylLZjtBVgKMiUU41eZzZEnoBr44JWCH_3NNpq5xQk5Cql6KRpfvwaAUExZ3mb99Pws_2EQpGT7Q4ElAa-6LTN30FmLz9SiZy6htwWuId0zdz-_KksTR9XVwDSWvpLYmY0xF4jaF4DYBEHsCN6SQhOISvHDSeJ-z2IVqm3muIojs6nKQTHinwwUo5qvGVq2HXJZ7pgzp0d7x16jb6tyiMiN1kVsPkhc8XLaDr0JLQ3afvD2rXwurBG4JAemhfp6oAhYRFfhQXWMDtbwqffBviC5Asd91dLcQmgnUw5aaHbn1AM5CnXWgXXEkaAbOhKFLFZmVPHSaAbbZwa84WphonzfZHYJq9J4j1Fp_cp3N27JM2MMHWroeLNQ3VAFgv-Zrv2_b18322niHLjtg9WyWHS20Umn8RG0jH163qA9_x1QlYRRRlQBEZHv7Meau4YUcoX8E";

// const decoded = jwt.decode(idToken, { complete: true });
// console.log(decoded.payload.sub)



