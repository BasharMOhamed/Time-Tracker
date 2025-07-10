"use client";
import Timer from "@/components/Timer";
import React, { useState } from "react";
import { DataTableDemo } from "@/app/projects/data-table";
import RemainingCard from "@/components/RemainingCard";
import { DialogDemo } from "@/components/AddProjectbtn";

const Dashboard = () => {
  const [isRunning, setIsRunning] = useState(false);
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
        <h1 className="text-3xl mb-6 text-black">Dashboard</h1>
        <DialogDemo />
      </header>
      <div className="grid grid-cols-[auto_1fr] gap-6">
        <Timer isRunning={isRunning} setIsRunning={setIsRunning} />
        <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-lg row-span-2">
          <h2 className="text-3xl mb-4">Project Overview</h2>
          <DataTableDemo projects={projects} fetching={fetching} />
        </div>
        {/* <StatsCard title="25 h 12 m" description="Remaining Time" /> */}
        <RemainingCard isRunning={isRunning} />
      </div>
    </>
  );
};

export default Dashboard;
