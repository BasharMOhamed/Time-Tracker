import { z } from "zod";

export const UserSchema = z.object({
  // name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
