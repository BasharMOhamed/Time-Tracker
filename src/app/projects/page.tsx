import React from "react";
import { DataTableDemo } from "./data-table";
// import { Button } from "@/components/ui/button";
import { DialogDemo } from "@/components/AddProjectbtn";

export const metadata = {
  title: "Projects | Time Tracker",
  description: "Manage your projects and view time logs for each project.",
};

const Projects = () => {
  return (
    <>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl mb-6 text-black">Time Tracker</h1>
        <DialogDemo />
      </header>
      <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-lg row-span-2">
        <h2 className="text-3xl mb-4">Projects</h2>
        <DataTableDemo />
      </div>
    </>
  );
};

export default Projects;
