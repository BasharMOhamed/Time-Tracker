import React from "react";
import { DataTableDemo } from "./data-table";

const Projects = () => {
  return (
    <>
      <header>
        <h1 className="text-3xl mb-6 text-black">Time Tracker</h1>
      </header>
      <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-lg row-span-2">
        <h2 className="text-3xl mb-4">Projects</h2>
        <DataTableDemo />
      </div>
    </>
  );
};

export default Projects;
