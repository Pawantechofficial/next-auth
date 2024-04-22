import { connectDB } from "@/lib/config/db.config";
import { UserModel } from "@/lib/models/user.model";
import { GenerateToken, VerifyToken } from "@/lib/services/Token.service";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export const GET = async (request: NextRequest) => {
  try {
    const tokenData = (await request.cookies.get("authentication")) || "";

    if (!tokenData) {
      return NextResponse.json({ error: "Please login" }, { status: 401 });
    }

    const user = await VerifyToken(tokenData.value);
    //check already exist
    const existUser = await UserModel.findById(user).select("name email");
    if (!existUser) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    return NextResponse.json(
      { msg: "Profile fetched", user: existUser },
      { status: 200 }
    );
  } catch (error: any) {
    NextResponse.json({ error: error.message }, { status: 500 });
  }
};
