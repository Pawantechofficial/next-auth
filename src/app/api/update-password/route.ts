import { connectDB } from "@/lib/config/db.config";
import { UserModel } from "@/lib/models/user.model";
import { SendEmail } from "@/lib/services/Mail.service";
import {
  GenerateToken,
  GenerateTokenReset,
  VerifyTokenReset,
} from "@/lib/services/Token.service";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export const PUT = async (request: NextRequest) => {
  try {
    const { password, cpassword, token } = await request.json();
    //check already exist

    if (password !== cpassword) {
      return NextResponse.json(
        { error: "Password and Confirm Password not match" },
        { status: 404 }
      );
    }

    const data = await VerifyTokenReset(token);

    const existUser = await UserModel.findByIdAndUpdate(data);

    if (!existUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const hashPassword = await existUser.updatePassword(password);

    await UserModel.findByIdAndUpdate(data, {
      $set: {
        password: hashPassword,
      },
    });

    const response = NextResponse.json(
      { msg: "Password reset successfully" },
      { status: 200 }
    );

    return response;
  } catch (error: any) {
    NextResponse.json({ error: error.message }, { status: 500 });
  }
};
