import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials"; // or use GitHub/Google/etc.
import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
