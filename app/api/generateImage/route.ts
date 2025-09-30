const OpenAI = require('openai');
const fs = require("fs");
const path = require("path");
import axios from "axios";
import sharp from "sharp";
import { NextRequest, NextResponse } from "next/server";
const client = new OpenAI({
    baseURL: 'https://api.studio.nebius.com/v1/',
    apiKey: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IlV6SXJWd1h0dnprLVRvdzlLZWstc0M1akptWXBvX1VaVkxUZlpnMDRlOFUiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJnb29nbGUtb2F1dGgyfDEwNjQ5ODU2NTQwNDM4NTg0MzAxMSIsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIiwiaXNzIjoiYXBpX2tleV9pc3N1ZXIiLCJhdWQiOlsiaHR0cHM6Ly9uZWJpdXMtaW5mZXJlbmNlLmV1LmF1dGgwLmNvbS9hcGkvdjIvIl0sImV4cCI6MTkxNjkzNzkyNiwidXVpZCI6IjAxOTk5YmYxLTljYTQtN2ZhMC1hMWE4LTU4YWUzMjRjY2VjZiIsIm5hbWUiOiJwb3N0aWZ5LmFpIiwiZXhwaXJlc19hdCI6IjIwMzAtMDktMjlUMTg6NDU6MjYrMDAwMCJ9.AVVJdN2182nY6TodrDOwXELpHeLY2gV-71qKkqKCxvM',
});
export async function POST(req: NextRequest) {
  try {
    const { imagepath, prompt} = await req.json();

    const response = await client.images.generate({
      model: "black-forest-labs/flux-schnell",
      response_format: "b64_json",
      extra_body: {
        response_extension: "webp",
        width: 1024,
        height: 1024,
        num_inference_steps: 30,
        negative_prompt: "",
        seed: -1,
      },
      prompt: prompt,
    });

    console.log("GET image Model Data");
  
    const base64Data = response.data[0].b64_json;
    console.log("buffer created")
    const imageBuffer  = Buffer.from(base64Data, "base64");
    const jpegBuffer = await sharp(imageBuffer)
    .toFormat("jpeg")
    .toBuffer();
     console.log("jpeg Coverted")
     const imageurl=await axios.post(`${req.nextUrl.origin}/api/upload_image`,{    
      imagepath: imagepath,
      jpegBuffer:jpegBuffer
  });
  console.log("Get image url",imageurl.data.publicUrl)

    return NextResponse.json({ success: true, publicUrl: imageurl.data.publicUrl });

  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json({ error: "Image generation failed" }, { status: 500 });
  }
}