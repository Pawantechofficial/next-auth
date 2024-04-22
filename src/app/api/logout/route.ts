import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const response = NextResponse.json(
      { msg: "Logout success" },
      { status: 200 }
    );
    response.cookies.delete("authentication");

    return response;
  } catch (error: any) {
    NextResponse.json({ error: error.message }, { status: 500 });
  }
};
