"use server";

import dbConnect from "@/lib/dbConnect";
import { UserSchema } from "@/schema/User";
import User from "@/models/user.model";
import bcrypt from "bcrypt";

export async function Register(prevState, formData) {
  const parsed = UserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    console.error("Validation error:", parsed.error.flatten());
    return { error: parsed.error.flatten().fieldErrors };
  }

  const { email, password } = parsed.data;

  try {
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { error: { email: ["Email already exists"] } };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });
    console.log(user);

    return { message: "User registered successfully" };
  } catch (error) {
    console.error("MongoDB Error:", error);
    return { error: { general: "Database error" } };
  }
}
