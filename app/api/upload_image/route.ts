import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import path from "path";

const CLOUD_NAME = "dizhnvety"; // Replace with your Cloudinary cloud name
const API_KEY = "938992545161844"; // Replace with your API Key
const API_SECRET = "068zjxzUARYbrev8XlXlnJj4NRc"; // Replace with your API Secret


export async function POST(req: NextRequest) {
    try {
        // Parse JSON request body
        const { imagePath } = await req.json();
        if (!imagePath) {
            return NextResponse.json({ error: "Missing imagePath in request body" }, { status: 400 });
        }

        //  in production use this 
    const IMAGE_PATH = path.join("/tmp", imagePath);
    //in development use this
    // const IMAGE_PATH=path.join(process.cwd(), "public", imagePath);

        // Check if file exists
        if (!fs.existsSync(IMAGE_PATH)) {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }
        // Prepare FormData
        const formData = new FormData();
        formData.append("file", fs.createReadStream(IMAGE_PATH)); // ✅ Upload file
        formData.append("upload_preset", "estate");
        // Upload to Cloudinary
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            formData,
            { headers: formData.getHeaders() } // ✅ Proper multipart headers
        );
        console.log("api direct")

       console.log("✅ Upload Completed:", response.data.secure_url)
        return NextResponse.json({ publicUrl: response.data.secure_url });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.response?.data || error.message },
            { status: 500 }
        );
    }
}
