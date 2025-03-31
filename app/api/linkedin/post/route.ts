import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PassThrough } from "stream";
export async function POST(req:NextRequest, res:NextResponse) {

  const { access_token, caption,profile_id,imageUrl,title } = await req.json();
       if (!access_token||!profile_id||!caption||!imageUrl||!title) {
         return NextResponse.json({status:1,message:"Please select one post"});
     }
        
            try {
                const response = await axios.post(
                    "https://api.linkedin.com/v2/assets?action=registerUpload",
                    {
                        registerUploadRequest: {
                            recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
                            owner: `urn:li:person:${profile_id}`,
                            serviceRelationships: [
                                {
                                    relationshipType: "OWNER",
                                    identifier: "urn:li:userGeneratedContent"
                                }
                            ]
                        }
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                            "Content-Type": "application/json",
                        }
                    }
                );
                console.log("created uploadUrl");
           const uploadUrl=response.data.value.uploadMechanism["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"].uploadUrl;
           const asset=response.data.value.asset;
           console.log("uploadUrl",uploadUrl);
           console.log("asset",asset);
                
                    
           const response1 = await axios.get(imageUrl, { responseType: "stream" });

           // Step 2: Convert it into a pass-through stream
           const bufferStream = new PassThrough();
           response1.data.pipe(bufferStream);
   
   
           // Step 3: Upload the image to LinkedIn
           const upload = await axios.put(uploadUrl, bufferStream, {
               headers: {
                   "Authorization": `Bearer ${access_token}`,
                   "Content-Type": "application/octet-stream",
               },
               maxContentLength: Infinity,
               maxBodyLength: Infinity,
           });

                console.log("Image Uploaded")

                const publishResponse = await axios.post(
                  "https://api.linkedin.com/v2/ugcPosts",
                  {
                    author: `urn:li:person:${profile_id}`,
                    lifecycleState: "PUBLISHED",
                    specificContent: {
                      "com.linkedin.ugc.ShareContent": {
                        shareCommentary: {
                          text: caption,
                        },
                        shareMediaCategory: "IMAGE",
                        media: [
                          {
                            status: "READY",
                            description: {
                              text: title,
                            },
                            media: asset,
                          },
                        ],
                      },
                    },
                    visibility: {
                      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
                    },
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${access_token}`,
                      "Content-Type": "application/json",
                    },
                  }
                );
            
                return NextResponse.json({json:publishResponse.data,status:0,message:"Post Published"});
            } catch (error) {
                return NextResponse.json(
                  {status:2,message:"Failed to post"}
                );
            }

}


// dineshjain