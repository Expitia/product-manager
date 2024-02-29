import { QueryParams } from "@/interfaces";
import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongoDB";
import Product from "../../../libs/mongoDB/models/product";

export async function GET(_: NextRequest, { params }: QueryParams) {
  const { id } = params;
  await connectMongoDB();
  const topic = await Product.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}
