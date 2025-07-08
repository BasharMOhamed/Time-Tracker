"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Register } from "../_actions/register";
import { useFormState } from "react-dom";

const SignUpPage = () => {
  const [state, formAction] = useFormState(Register, {});
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
          <Clock size={30} /> TimeTracker
        </h1>
      </header>
      <form
        className="w-[400px] border border-gray-200 rounded-lg shadow-sm p-6"
        action={formAction}
      >
        <h2 className="text-3xl font-bold mb-5">Register</h2>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your email"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>
          <Button type="submit" className="w-full cursor-pointer">
            Register
          </Button>
          <Separator />
          <p className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            {/* <a href="/auth/sign-in" className="text-blue-600 hover:underline">
              Sign In
            </a> */}
            <Link href={"/sign-in"} className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
