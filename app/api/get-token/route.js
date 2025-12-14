import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { getToken } = getAuth(request);
    const token = await getToken();
    return NextResponse.json(token);
  } catch (error) {
    console.error("Error getting token:", error);
    return NextResponse.json(null, { status: 500 });
  }
}
