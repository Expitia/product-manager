import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../libs/mongoDB";
import Product from "../../libs/mongoDB/models/product";

export async function POST(request: NextRequest) {
  const { name, description, categoryId } = await request.json();
  await connectMongoDB();
  await Product.create({
    name,
    description,
    categoryId,
  });
  return NextResponse.json({ message: "Product Created" }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const { name, description, categoryId, id } = await request.json();
  await connectMongoDB();

  const toUpdate: Record<string, string> = {};

  if (name) toUpdate.name = name;
  if (categoryId) toUpdate.categoryId = categoryId;
  if (description) toUpdate.description = description;

  await Product.findByIdAndUpdate(id, toUpdate);
  return NextResponse.json({ message: "Product updated" }, { status: 200 });
}

export async function GET(request: NextRequest) {
  const text = request.nextUrl.searchParams.get("text");
  await connectMongoDB();
  const products = await Product.find({
    name: { $regex: text, $options: "i" },
  });
  return NextResponse.json({ data: products }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Product deleted" }, { status: 200 });
}
