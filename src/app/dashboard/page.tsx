"use client";
import Timer from "@/components/Timer";
import React, { useState } from "react";
// import type { Metadata } from "next";
import { DataTableDemo } from "../projects/data-table";
// import StatsCard from "@/components/statsCard";
import RemainingCard from "@/components/RemainingCard";
import { DialogDemo } from "@/components/AddProjectbtn";

// const metadata: Metadata = {
//   title: "Dashboard - Time Tracker",
//   description: "Time logging dashboard for tracking project hours",
// };

const Dashboard = () => {
  const [isRunning, setIsRunning] = useState(false);
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
          <DataTableDemo />
        </div>
        {/* <StatsCard title="25 h 12 m" description="Remaining Time" /> */}
        <RemainingCard isRunning={isRunning} />
      </div>
    </>
  );
};

export default Dashboard;
