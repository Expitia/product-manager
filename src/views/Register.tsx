"use client";
import { useRegisterMutation } from "@/app/libs/redux/services/users";
import { isLoading } from "@/app/libs/redux/slices/logger";
import InputRule from "@/components/InputRules";
import { RequestManager } from "@/components/RequestManager";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Register = () => {
  const [done, setDone] = useState<boolean>(false);
  const [admin, setAdmin] = useState<boolean>();
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const loading = useSelector(isLoading);
  const [submit] = useRegisterMutation();

  const handleEmail = (value: string, error: string) => {
    errors[0] = error;
    setErrors([...errors]);
    setEmail(value);
    setDone(false);
  };

  const handlePassword = (value: string, error: string) => {
    errors[1] = error;
    setErrors([...errors]);
    setPassword(value);
    setDone(false);
  };

  const handleConfirmPassword = (value: string, error: string) => {
    errors[2] = error;
    setErrors([...errors]);
    setConfirmPassword(value);
    setDone(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await submit({ email, password, admin });
    if (!("error" in response)) {
      setDone(true);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAdmin(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
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
          type="password"
          name="password"
          title="Password"
          value={password}
          rules={{
            "The password must have at least one number.": /\d/,
            "The password must have at least one letter.": /[a-zA-Z]/,
            "The password must have at least one special character (!@#$%^&*(),.?).":
              /[!@#$%^&*(),.?":{}|<>]/,
            "The password must have at least 8 characters": /^.{8,}$/,
          }}
          onChange={handlePassword}
        />
        <InputRule
          trim
          required
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          title="Confirm Password"
          value={confirmPassword}
          rules={{
            "The password must have at least one number.": /\d/,
            "The password must have at least one letter.": /[a-zA-Z]/,
            "The password must have at least one special character (!@#$%^&*(),.?).":
              /[!@#$%^&*(),.?":{}|<>]/,
            "The password must have at least 8 characters": /^.{8,}$/,
          }}
          onChange={handleConfirmPassword}
        />
        <InputRule
          id="admin"
          type="checkbox"
          name="admin"
          title="Is Admin?"
          checked={admin}
          onChange={() => setAdmin(!admin)}
        />
        <RequestManager />
        {done && <div className="message success">User Created</div>}
        {password !== confirmPassword && (
          <div className="message error">The passwords don't match</div>
        )}
        <button
          type="submit"
          disabled={
            !email ||
            !password ||
            password != confirmPassword ||
            errors.some((item) => item) ||
            loading
          }
        >
          Submit
        </button>
        <Link href="/login">
          <button type="button">Login</button>
        </Link>
      </form>
    </div>
  );
};

export default Register;
