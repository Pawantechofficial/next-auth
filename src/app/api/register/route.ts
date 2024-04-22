import { connectDB } from "@/lib/config/db.config";
import { UserModel } from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export const POST = async (request: NextRequest) => {
  try {
    const { name, email, password } = await request.json();
    //check already exist
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return NextResponse.json(
        { error: "This email already exist" },
        { status: 400 }
      );
    }

    await UserModel.create({
      name,
      email,
      password,
    });

    return NextResponse.json(
      { msg: "user register successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    NextResponse.json({ error: error.message }, { status: 500 });
  }
};
