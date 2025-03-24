const OpenAI = require('openai');
const fs = require("fs");
const path = require("path");
import sharp from "sharp";
import { NextRequest, NextResponse } from "next/server";
const client = new OpenAI({
    baseURL: 'https://api.studio.nebius.com/v1/',
    apiKey: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IlV6SXJWd1h0dnprLVRvdzlLZWstc0M1akptWXBvX1VaVkxUZlpnMDRlOFUiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJnb29nbGUtb2F1dGgyfDEwMTA1Mzg4NzE2NjQ3NjQ1MTc2MSIsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIiwiaXNzIjoiYXBpX2tleV9pc3N1ZXIiLCJhdWQiOlsiaHR0cHM6Ly9uZWJpdXMtaW5mZXJlbmNlLmV1LmF1dGgwLmNvbS9hcGkvdjIvIl0sImV4cCI6MTkwMDIyNjAxNiwidXVpZCI6ImNkMmQ3Nzc5LWVhYTctNGY4Ny05OTQwLWJjODRjNzQ2ZGQ3NyIsIm5hbWUiOiJhcGkiLCJleHBpcmVzX2F0IjoiMjAzMC0wMy0yMFQwODozMzozNiswMDAwIn0.hg9_qEKWrcOXD9ZyLS6X6VHF8fbPPLh_ZjxncI3BPb4',
});
export async function POST(req: NextRequest) {
  try {
    const { imagepath, prompt } = await req.json();
    //in production use this 
    const pathstore = path.join("/tmp", imagepath);
    //in development use this
    // const pathstore=path.join(process.cwd(), "public", imagepath);
    const response = await client.images.generate({
      model: "stability-ai/sdxl",
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

    console.log("API Response:", response);
    // 🔹 Extract the Base64 image
    const base64Data = response.data[0].b64_json;
    console.log("buffer created")
    const imageBuffer  = Buffer.from(base64Data, "base64");
     sharp(imageBuffer)
     .toFormat("jpeg") // Ensure conversion to JPEG
    .toFile(pathstore) // Save the output file
   .then(() => console.log("Conversion successful: output.jpg"))
    .catch((err) => console.error("Conversion failed:", err));
    console.log(`✅ Image saved as ${imagepath}`);

    return NextResponse.json({ success: true, imagePath: pathstore });

  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json({ error: "Image generation failed" }, { status: 500 });
  }
}
