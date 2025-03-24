import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import path from "path";

const CLOUD_NAME = "dizhnvety"; 

export async function POST(req: NextRequest) {
    try {
      
        const {imagepath, jpegBuffer } = await req.json();
        if (!jpegBuffer) {
            return NextResponse.json({ error: "Missing jpegBuffer in request body" }, { status: 400 });
        }

      
        const formData = new FormData();
        formData.append("file", Buffer.from(jpegBuffer, "base64"), {
          filename: imagepath, 
          contentType: "image/jpeg"
        });
        formData.append("upload_preset", "estate");
    
        
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formData,
          { headers: formData.getHeaders() }
        );
    
        console.log("✅ Upload Completed:", response.data.secure_url);
        return NextResponse.json({ publicUrl: response.data.secure_url });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.response?.data || error.message },
            { status: 500 }
        );
    }
}
