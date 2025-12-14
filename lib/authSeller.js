import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const authSeller = async (userId) => {
  try {
    const user = await clerkClient.users.getUser(userId);

    if (user?.publicMetadata?.role === "seller") {
      return true;
    }

    return false;
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message || "Failed to authenticate seller",
    });
  }
};

export default authSeller;
