import { connectDB } from "@/lib/config/db.config";
import { UserModel } from "@/lib/models/user.model";
import { GenerateToken } from "@/lib/services/Token.service";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();
    //check already exist
    const existUser = await UserModel.findOne({ email });
    if (!existUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    //password Match
    const isMatch = await existUser.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password " },
        { status: 401 }
      );
    }
    //token genrate
    //JWT
    const token = await GenerateToken(existUser._id);

    const response = NextResponse.json(
      { msg: "Login successfully" },
      { status: 201 }
    );

    response.cookies.set("authentication", token,{
        httpOnly: true
    });


    return response;
  } catch (error: any) {
    NextResponse.json({ error: error.message }, { status: 500 });
  }
};
