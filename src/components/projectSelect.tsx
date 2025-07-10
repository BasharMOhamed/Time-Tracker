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
  onChange,
}: {
  list: string[];
  label: string;
  placeHolder: string;
  onChange?: (value: string) => void;
}) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          <SelectItem value="all">All Projects</SelectItem>
          {list.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
