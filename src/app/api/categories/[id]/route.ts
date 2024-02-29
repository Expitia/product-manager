import Category from "@/app/libs/mongoDB/models/category";
import { QueryParams } from "@/interfaces";
import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongoDB";

export async function GET(_: NextRequest, { params }: QueryParams) {
  const { id } = params;
  await connectMongoDB();
  const topic = await Category.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}
