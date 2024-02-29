import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import "./../app/globals.css";

export default function Register(
  _: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <div className="float-content">
      <div className="message error center">
        The User or Password is Invalid
      </div>

      <Link href="/login">
        <button type="button">Login</button>
      </Link>
      <Link href="/register">
        <button type="button">Register</button>
      </Link>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) return { redirect: { destination: "/" } };
  return { props: {} };
}
