import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectDemo({
  list,
  label,
  placeHolder,
}: {
  list: string[];
  label: string;
  placeHolder: string;
}) {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {list.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
          {/* Uncomment the following lines if you want to add more static options */}
          {/* <SelectItem value="all">All Projects</SelectItem>
          <SelectItem value="Project 1">Project 1</SelectItem>
          <SelectItem value="Project 2">Project 2</SelectItem>
          <SelectItem value="Project 3">Project 3</SelectItem>
          <SelectItem value="Project 4">Project 4</SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
