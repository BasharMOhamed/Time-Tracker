import Reports from "@/components/Reports";
import { authOptions } from "@/lib/authOptions";
import { getServerSession, NextAuthOptions } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Reports | Time Tracker",
  description:
    "Analyze your tracked hours, project activity, and generate reports.",
};

const ReportsPage = async () => {
  const session = await getServerSession(authOptions as NextAuthOptions);

  if (!session) {
    redirect("/sign-in");
  }
  return <Reports />;
};

export default ReportsPage;
