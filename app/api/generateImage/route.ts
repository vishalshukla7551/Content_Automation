import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey ?? "");

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get("prompt");

  if (!prompt) {
    return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const response = await model.generateContent([prompt]);

    // Adjust this based on actual Gemini API response structure
    const imageUrl = response.response?.text() || ""; 

    if (!imageUrl) {
      throw new Error("Failed to generate image.");
    }

    return NextResponse.json({ imageUrl }); // ✅ Returning JSON object
  } catch (error) {
    return NextResponse.json({ error}, { status: 500 });
  }
}
