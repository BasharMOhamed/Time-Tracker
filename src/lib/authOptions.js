import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./dbConnect";
import User from "@/models/user.model.js";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });
        console.log("User found:", user);
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (isPasswordValid) {
          return { id: user._id.toString(), email: user.email };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "/dashboard",
  },
  session: {
    strategy: "jwt",
  },
};
