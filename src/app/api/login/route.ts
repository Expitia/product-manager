import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../libs/mongoDB";
import User from "../../libs/mongoDB/models/user";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  await connectMongoDB();
  const user = await User.findOne({
    $and: [{ email }, { password }],
  });
  const jsonUser = user.toJSON();
  jsonUser.id = jsonUser._id;
  delete jsonUser.password;
  delete jsonUser._id;
  return NextResponse.json({ ...jsonUser }, { status: 200 });
}
