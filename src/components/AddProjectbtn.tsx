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
import { SelectDemo } from "./projectSelect";

export function DialogDemo() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Add Project</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>
              Add a new project to your projects. Click Add when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Client Name</Label>
              <Input id="name-1" name="name" placeholder="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                name="project-name"
                // defaultValue="Marketing campaign"
                placeholder="Marketing campaign"
              />
            </div>
            {/* <div className="grid gap-3">
              <Label htmlFor="hourly-rate">Hourly Rate</Label>
              <Input
                id="hourly-rate"
                name="hourly-rate"
                type="number"
                placeholder="15"
              />
            </div> */}
            <div className="grid grid-cols-2 gap-3">
              <Label htmlFor="hourly-rate">Hourly Rate</Label>
              <Label htmlFor="interval">Interval</Label>
              <Input
                id="hourly-rate"
                name="hourly-rate"
                type="number"
                placeholder="15"
              />
              <SelectDemo
                label="Interval"
                placeHolder="Select an Interval"
                list={["Weekly", "Daily"]}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
