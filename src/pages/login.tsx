import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginView from "@/views/Login";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth";
import { getCsrfToken } from "next-auth/react";
import "./../app/globals.css";

export default function Login({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <LoginView csrfToken={csrfToken} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) return { redirect: { destination: "/" } };
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
