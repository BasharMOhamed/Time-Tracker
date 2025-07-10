import type { Metadata } from "next";
// import StatsCard from "@/components/statsCard";
import { getServerSession, NextAuthOptions } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import Dashboard from "@/components/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard - Time Tracker",
  description: "Time logging dashboard for tracking project hours",
};

const DashboardPage = async () => {
  const session = await getServerSession(authOptions as NextAuthOptions);

  if (!session) {
    redirect("/sign-in");
  }
  return <Dashboard />;
};

export default DashboardPage;
