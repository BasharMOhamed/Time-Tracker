import { z } from "zod";
export const ProjectSchema = z.object({
  clientName: z.string().min(3, "Client name is required"),
  projectName: z.string().min(3, "Project name is required"),
  hourlyRate: z.number().positive().multipleOf(0.5),
  interval: z.enum(["Weekly", "Daily"]),
});
