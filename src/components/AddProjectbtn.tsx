"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { SelectDemo } from "./projectSelect";
import { CreateProject } from "@/app/projects/_actions/project.js"; // Adjust the import path as needed
// import { useFormState } from "react-dom";
import { useActionState } from "react";
export function DialogDemo() {
  const [states, actionState] = useActionState(CreateProject, {});
  // const [state, formAction] = useFormState(CreateProject, {});
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={actionState}>
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>
              Add a new project to your projects. Click Add when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                name="clientName"
                placeholder="Pedro Duarte"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                name="projectName"
                placeholder="Marketing campaign"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Label htmlFor="hourlyRate">Hourly Rate</Label>
              <Label htmlFor="interval">Interval</Label>
              <Input
                id="hourlyRate"
                name="hourlyRate"
                type="number"
                placeholder="15"
              />
              <select
                id="interval"
                name="interval"
                className="border rounded-md px-2 py-1 text-sm"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select an interval
                </option>
                <option value="Weekly">Weekly</option>
                <option value="Daily">Daily</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={() => console.log("Clicked")}
              className="cursor-pointer"
            >
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
