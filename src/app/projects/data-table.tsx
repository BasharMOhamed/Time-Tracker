"use client";
import * as React from "react";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns } from "@/app/projects/columns";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: Record<string, unknown>) => jsPDF;
  }
}

type Project = {
  id: string;
  clientName: string;
  projectName: string;
  hourlyRate: number;
  duration: number;
  startDate: Date;
};

export const projects: Project[] = [
  {
    id: "p1",
    clientName: "Acme Corp",
    projectName: "Project Alpha",
    hourlyRate: 50,
    duration: 50000,
    startDate: new Date("2025-01-15"),
  },
  {
    id: "p2",
    clientName: "Globex Inc",
    projectName: "Project Beta",
    hourlyRate: 60,
    duration: 6156,
    startDate: new Date("2025-02-01"),
  },
  {
    id: "p3",
    clientName: "Wayne Enterprises",
    projectName: "Project Gamma",
    hourlyRate: 75,
    duration: 189145,
    startDate: new Date("2025-03-10"),
  },
  {
    id: "p4",
    clientName: "Stark Industries",
    projectName: "Project Delta",
    hourlyRate: 90,
    duration: 1615161,
    startDate: new Date("2025-04-05"),
  },
  {
    id: "p5",
    clientName: "Umbrella Corp",
    projectName: "Project Epsilon",
    hourlyRate: 40,
    duration: 654849,
    startDate: new Date("2025-05-20"),
  },
  {
    id: "p6",
    clientName: "Initech",
    projectName: "Project Zeta",
    hourlyRate: 55,
    duration: 56198198,
    startDate: new Date("2025-06-18"),
  },
];
export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data: projects,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  //////////////////////////////////////////////////////
  // const rows = table.getRowModel().rows.map((row) => row.original);
  const rows = projects;

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Projects Report", 14, 16);

    // Define columns for PDF
    const columns = [
      { header: "Client Name", dataKey: "clientName" },
      { header: "Project Name", dataKey: "projectName" },
      { header: "Hourly Rate", dataKey: "hourlyRate" },
      { header: "Duration", dataKey: "duration" },
      { header: "Start Date", dataKey: "startDate" },
      { header: "Earned Money", dataKey: "earnedMoney" },
    ];

    // Format data for PDF
    const data = rows.map((row) => ({
      ...row,
      startDate: new Date(row.startDate).toLocaleDateString(),
      duration: (() => {
        const seconds = Number(row.duration);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;
      })(),
      earnedMoney: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format((row.hourlyRate / 60) * (row.duration / 60)),
    }));

    // Add table to PDF
    autoTable(doc, {
      columns,
      body: data,
      startY: 24,
      headStyles: { fillColor: [30, 64, 175] }, // blue header
      styles: { fontSize: 10 },
    });
    console.log("PDF generated with data:", data);
    doc.save("projects-report.pdf");
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-2">
        {/* <button
          onClick={handleExportPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Export as PDF
        </button> */}
        <Button onClick={handleExportPDF}>Export as PDF</Button>
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Projects..."
          value={
            (table.getColumn("clientName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("clientName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
