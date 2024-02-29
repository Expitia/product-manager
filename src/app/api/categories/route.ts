import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../libs/mongoDB";
import Category from "../../libs/mongoDB/models/category";
import Product from "../../libs/mongoDB/models/product";

export async function POST(request: NextRequest) {
  const { name } = await request.json();
  await connectMongoDB();
  await Category.create({ name });
  return NextResponse.json({ message: "Category Created" }, { status: 201 });
}

export async function GET(request: NextRequest) {
  const text = request.nextUrl.searchParams.get("text");
  await connectMongoDB();
  const categories = await Category.find({
    name: { $regex: text, $options: "i" },
  });
  return NextResponse.json({ data: categories }, { status: 200 });
}

export async function PUT(request: NextRequest) {
  const { name, id } = await request.json();
  await connectMongoDB();
  await Category.findByIdAndUpdate(id, { name });
  return NextResponse.json({ message: "Category updated" }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  const product = await Product.find({ categoryId: id });
  if (product?.length)
    return NextResponse.json(
      { message: "Deleted products with this category frist." },
      { status: 500 }
    );
  await Category.findByIdAndDelete(id);
  return NextResponse.json({ message: "Category deleted" }, { status: 200 });
}
