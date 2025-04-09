import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const APP_SECRET = "bb3872ff8f6d921dc1d96bc3f7241308"; // Load from .env

function verifySignedRequest(signedRequest: string, secret: string) {
    const [encodedSig, payload] = signedRequest.split(".");
  
    const sig = Buffer.from(encodedSig, "base64");
    const expectedSig = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest();
  
    const isValid = crypto.timingSafeEqual(
      new Uint8Array(sig),
      new Uint8Array(expectedSig)
    );
  
    const decodedPayload = JSON.parse(
      Buffer.from(payload, "base64").toString("utf8")
    );
  
    return isValid ? decodedPayload : null;
  }
  

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const signedRequest = formData.get('signed_request') as string;

  if (!signedRequest) {
    return NextResponse.json({ error: 'Missing signed_request' }, { status: 400 });
  }

  const data = verifySignedRequest(signedRequest, APP_SECRET);
  if (!data) {
    return NextResponse.json({ error: 'Invalid signed_request' }, { status: 403 });
  }

  const userId = data.user_id;

  // 🧹 Delete user data from your database here (e.g., Prisma, Mongo, etc.)
  console.log('Delete user data for Facebook user:', userId);

  const confirmationCode = `${userId}_deleted`;

  return NextResponse.json({
    url: `${req.nextUrl.origin}/deletion-status?code=${confirmationCode}`,
    confirmation_code: confirmationCode,
  });
}
