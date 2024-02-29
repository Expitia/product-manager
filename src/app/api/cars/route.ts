import Car from "@/app/libs/mongoDB/models/car";
import { ServerProductUser } from "@/interfaces";
import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../libs/mongoDB";

export async function POST(request: NextRequest) {
  const { product, user } = await request.json();
  await connectMongoDB();

  let current: ServerProductUser | null = await Car.findOne({ product, user });

  if (!current)
    current = await Car.create({
      user,
      product,
      amount: 0,
    });

  if (current)
    await Car.findOneAndUpdate(
      { _id: current._id },
      { $inc: { amount: 1 } },
      { upsert: true, new: true }
    );

  return NextResponse.json({ message: "Car Product Added" }, { status: 201 });
}

export async function GET(request: NextRequest) {
  const user = request.nextUrl.searchParams.get("id");
  const text = request.nextUrl.searchParams.get("text");
  await connectMongoDB();
  const products = await Car.aggregate([
    {
      $addFields: {
        userId: { $toObjectId: "$user" },
        productId: { $toObjectId: "$product" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "users",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "products",
      },
    },
    {
      $match: {
        user: user,
        "products.name": { $regex: text, $options: "i" },
      },
    },
  ]);
  return NextResponse.json({ data: products }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();

  const current: ServerProductUser | null = await Car.findOne({ _id: id });

  if (!current) return NextResponse.json({ message: "" }, { status: 200 });
  else if (current.amount == 1) await Car.findByIdAndDelete(id);
  else {
    await Car.findOneAndUpdate(
      { _id: current._id },
      { $inc: { amount: -1 } },
      { upsert: true, new: true }
    );
  }
  return NextResponse.json({ message: "Car Product Removed" }, { status: 200 });
}
