import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../libs/mongoDB";
import User from "../../libs/mongoDB/models/user";

export async function POST(request: NextRequest) {
  const { email, password, admin } = await request.json();
  await connectMongoDB();
  const current = await User.findOne({ email });
  if (current)
    return NextResponse.json(
      { message: "Email already used" },
      { status: 500 }
    );
  await User.create({
    email,
    password,
    admin,
  });
  return NextResponse.json({ message: "User Created" }, { status: 201 });
}
