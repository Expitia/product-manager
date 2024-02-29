import Favorite from "@/app/libs/mongoDB/models/favorite";
import { ServerProductUser } from "@/interfaces";
import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../libs/mongoDB";

export async function POST(request: NextRequest) {
  const { product, user } = await request.json();
  await connectMongoDB();

  const current: ServerProductUser | null = await Favorite.findOne({
    product,
    user,
  });

  if (current)
    return NextResponse.json(
      { message: "The Product is Already Favorite" },
      { status: 500 }
    );

  await Favorite.create({
    user,
    product,
  });
  return NextResponse.json({ message: "Favorite Added" }, { status: 201 });
}

export async function GET(request: NextRequest) {
  const user = request.nextUrl.searchParams.get("id");
  const text = request.nextUrl.searchParams.get("text");
  await connectMongoDB();
  const products = await Favorite.aggregate([
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
  await Favorite.findByIdAndDelete(id);
  return NextResponse.json({ message: "Favorite Removed" }, { status: 200 });
}
