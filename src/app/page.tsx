import { User } from "@/interfaces";
import ProductManager from "@/views/ProductManager";
import { ProductShopping } from "@/views/ProductShopping";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function App({}) {
  const session = await getServerSession(authOptions);
  const user = session?.user as User | undefined;
  if (session === null) redirect("./login");
  return user?.admin ? <ProductManager /> : <ProductShopping id={user?.sub!} />;
}
