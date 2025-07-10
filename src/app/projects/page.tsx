import React from "react";
import { redirect } from "next/navigation";
import Projects from "@/components/Projects";
import { getServerSession, NextAuthOptions } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const metadata = {
  title: "ProjectsPage | Time Tracker",
  description: "Manage your projects and view time logs for each project.",
};

const ProjectsPage = async () => {
  const session = await getServerSession(authOptions as NextAuthOptions);

  if (!session) {
    redirect("/sign-in");
  }
  return <Projects />;
};

export default ProjectsPage;
