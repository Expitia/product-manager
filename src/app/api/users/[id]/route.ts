import { QueryParams } from "@/interfaces";
import connectMongoDB from "../../../libs/mongoDB";
import User from "../../../libs/mongoDB/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: QueryParams) {
  const { id } = params;
  const { password } = await request.json();
  await connectMongoDB();
  await User.findByIdAndUpdate(id, {
    password,
  });
  return NextResponse.json({ message: "User updated" }, { status: 200 });
}
