import { SelectDemo } from "@/components/projectSelect";
import DateRangePicker from "@/components/ui/date-range-picker";
import Example from "@/components/weeklyHoursChart";
// import WeeklyHoursChart from "@/components/weeklyHoursChart";
// import { DateRangePicker } from "@/components/ui/date-range-picker";
import React from "react";

const Reports = () => {
  return (
    <>
      <header>
        <h1 className="text-3xl mb-6 text-black">Reports</h1>
      </header>
      <div className="bg-white p-6 rounded-lg">
        <div className="flex w-full gap-x-10 mb-4">
          <div className="flex-1">
            <DateRangePicker />
          </div>
          <div className="flex-1">
            <SelectDemo />
          </div>
        </div>
        {/* Add your reports content here */}
        {/* <WeeklyHoursChart /> */}
        <div className="w-full rounded-lg shadow-lg p-6">
          <h2 className="text-2xl mb-4">Weekly Report</h2>
          <Example />
        </div>
        <div className="flex w-full gap-x-10 mb-4"></div>
      </div>
    </>
  );
};

export default Reports;
