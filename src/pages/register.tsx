import StoreProvider from "@/components/StoreProvider";
import RegisterView from "@/views/Register";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import "./../app/globals.css";

export default function Register(
  _: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <StoreProvider>
      <RegisterView />
    </StoreProvider>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) return { redirect: { destination: "/" } };
  return { props: {} };
}
