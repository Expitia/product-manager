"use client";
import InputRule from "@/components/InputRules";
import Link from "next/link";
import { useState } from "react";

export interface LogicProps {
  csrfToken?: string;
}

const Login = (props: LogicProps) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmail = (value: string, error: string) => {
    errors[0] = error;
    setErrors([...errors]);
    setEmail(value);
  };

  const handlePassword = (value: string, error: string) => {
    errors[1] = error;
    setErrors([...errors]);
    setPassword(value);
  };

  return (
    <div>
      <form method="post" action="/api/auth/callback/credentials">
        <h2>Login</h2>
        <input name="csrfToken" type="hidden" defaultValue={props.csrfToken} />
        <InputRule
          trim
          required
          id="email"
          name="email"
          type="text"
          title="Email"
          value={email}
          rules={{
            "The email format is invalid":
              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          }}
          onChange={handleEmail}
        />
        <InputRule
          trim
          required
          id="password"
          name="password"
          type="password"
          title="Password"
          value={password}
          rules={{
            "The password can't be empty": /^.{1,}$/,
          }}
          onChange={handlePassword}
        />
        <button
          type="submit"
          disabled={errors.some((item) => item) || !email || !password}
        >
          Sign In
        </button>
        <Link href="/register">
          <button type="button">Register</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
