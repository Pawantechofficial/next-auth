import { connectDB } from "@/lib/config/db.config";
import { UserModel } from "@/lib/models/user.model";
import { SendEmail } from "@/lib/services/Mail.service";
import { GenerateToken, GenerateTokenReset } from "@/lib/services/Token.service";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export const POST = async (request: NextRequest) => {
  try {
    const { email } = await request.json();
    //check already exist
    const existUser = await UserModel.findOne({ email });
    if (!existUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const token = await GenerateTokenReset(existUser._id);
    await SendEmail(existUser.name, existUser.email, token)

    const response = NextResponse.json(
      { msg: "email has been send successfully" },
      { status: 201 }
    );

    return response;
    
  } catch (error: any) {
    NextResponse.json({ error: error.message }, { status: 500 });
  }
};
