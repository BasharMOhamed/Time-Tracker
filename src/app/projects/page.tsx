"use client";
import React from "react";
import { DataTableDemo } from "./data-table";
// import { Button } from "@/components/ui/button";
import { DialogDemo } from "@/components/AddProjectbtn";

// export const metadata = {
//   title: "Projects | Time Tracker",
//   description: "Manage your projects and view time logs for each project.",
// };

type Project = {
  id: string;
  clientName: string;
  projectName: string;
  hourlyRate: number;
  duration: number;
  startDate: Date;
};

const Projects = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [fetching, setFetching] = React.useState(false);
  React.useEffect(() => {
    const fetchProjects = async () => {
      setFetching(true);
      try {
        const response = await fetch(`/api/project`);
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchProjects();
  }, []);
  return (
    <>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl mb-6 text-black">Time Tracker</h1>
        <DialogDemo />
      </header>
      <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-lg row-span-2">
        <h2 className="text-3xl mb-4">Projects</h2>
        <DataTableDemo projects={projects} fetching={fetching} />
      </div>
    </>
  );
};

export default Projects;
