import React, { useEffect, useRef } from "react";
import Example, { data } from "./weeklyHoursChart";
import StatsCard from "./statsCard";
import { SelectDemo } from "./projectSelect";
import DateRangePicker from "./ui/date-range-picker";
import { Button } from "@/components/ui/button";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Project } from "@/types";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

const Reports = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [fetching, setFetching] = React.useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = React.useState<string>("all");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });
  const [chartData, setChartData] = React.useState<any[]>([]);

  const handleExportPDF = async () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("ReportsPage", 14, 18);

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

  useEffect(() => {
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

  useEffect(() => {
    const getChartData = async () => {
      setFetching(true);
      try {
        const response = await fetch(
          `/api/reports?project=${selectedProject}&from=${date?.from?.toISOString()}&to=${date?.to?.toISOString()}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch chart data");
        }
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setFetching(false);
      }
    };
    getChartData();
  });
  return (
    <>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl mb-6 text-black">ReportsPage</h1>
        <Button onClick={handleExportPDF}>Export as PDF</Button>
      </header>
      <div className="p-6 rounded-lg">
        <div className="flex w-full gap-x-10 mb-4">
          <div className="flex-1">
            <DateRangePicker setDate={setDate} date={date} />
          </div>
          <div className="flex-1">
            <SelectDemo
              label="Projects"
              list={projects.map((project) => project.projectName)}
              placeHolder="Select a Project"
              onChange={(value) => setSelectedProject(value)}
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
