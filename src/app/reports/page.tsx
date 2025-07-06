"use client";
import { SelectDemo } from "@/components/projectSelect";
import StatsCard from "@/components/statsCard";
import { Button } from "@/components/ui/button";
import DateRangePicker from "@/components/ui/date-range-picker";
import Example, { data } from "@/components/weeklyHoursChart";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React, { useRef } from "react";
import html2canvas from "html2canvas";

// export const metadata = {
//   title: "Reports | Time Tracker",
//   description:
//     "Analyze your tracked hours, project activity, and generate reports.",
// };

const Reports = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Reports", 14, 18);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Total time during the week: 34 h 15 m", 14, 30);
    doc.text("Most active project: Marketing Campaign", 14, 38);

    // Export chart as image
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 14, 45, 180, 60); // Adjust width/height as needed
    }

    // Example: Add a table (optional)
    autoTable(doc, {
      startY: 110,
      head: [["Day", "Hours"]],
      body: data,
    });

    doc.save("report.pdf");
  };
  return (
    <>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl mb-6 text-black">Reports</h1>
        <Button onClick={handleExportPDF}>Export as PDF</Button>
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
          ref={chartRef}
          className="w-full rounded-lg shadow-sm border p-6"
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            background: "#fff", // Use hex, not Tailwind class for this export
            color: "#171717", // Use hex for text if needed
          }}
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
