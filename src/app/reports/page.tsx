import { SelectDemo } from "@/components/projectSelect";
import StatsCard from "@/components/statsCard";
import DateRangePicker from "@/components/ui/date-range-picker";
import Example from "@/components/weeklyHoursChart";
import React from "react";

export const metadata = {
  title: "Reports | Time Tracker",
  description:
    "Analyze your tracked hours, project activity, and generate reports.",
};

const Reports = () => {
  return (
    <>
      <header>
        <h1 className="text-3xl mb-6 text-black">Reports</h1>
      </header>
      <div className="p-6 rounded-lg">
        <div className="flex w-full gap-x-10 mb-4">
          <div className="flex-1">
            <DateRangePicker />
          </div>
          <div className="flex-1">
            <SelectDemo
              label="Projects"
              list={["All Projects", "Project 1", "Project 2", "Project 3"]}
              placeHolder="Select a Project"
            />
          </div>
        </div>
        <div
          className="w-full rounded-lg shadow-sm border border-gray-200 bg-white p-6"
          style={{ fontFamily: "Inter, system-ui, sans-serif" }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Hours Tracked
          </h2>
          <Example />
        </div>
        <div className="w-full grid grid-cols-2 gap-x-10 my-4">
          <StatsCard
            title="34 h 15 m"
            description="Total time during the week"
          />
          <StatsCard
            title="Most active project"
            description="Marketing Campaign"
          />
        </div>
      </div>
    </>
  );
};

export default Reports;
