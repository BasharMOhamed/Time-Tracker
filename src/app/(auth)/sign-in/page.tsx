"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const LoginPage = () => {
  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (res?.ok) {
      router.push("/dashboard"); // redirect to home or dashboard
    }
  }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
          <Clock size={30} /> TimeTracker
        </h1>
      </header>
      <form
        className="w-[400px] border border-gray-200 rounded-lg shadow-sm p-6"
        // action={formAction}
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-5">Login</h2>
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
            Login
          </Button>
          <Separator />
          <p className="text-sm text-gray-600 text-center">
            Not a user Yet?{" "}
            {/* <a href="/auth/sign-in" className="text-blue-600 hover:underline">
                  Sign In
                </a> */}
            <Link href={"/sign-up"} className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
