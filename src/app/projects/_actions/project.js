// "use server";

// import { redirect } from "next/navigation";
// import dbConnect from "@/lib/dbConnect";
// import Project from "@/models/project.model";
// import { ProjectSchema } from "@/schema/Project";
// import { authOptions } from "@/lib/authOptions";
// import { getServerSession } from "next-auth";

// export async function CreateProject(form) {
//   console.log("Creating Project");
//   const session = await getServerSession(authOptions);
//   console.log(session);
//   if (!session || !session.user) {
//     redirect("/login");
//   }
//   const parsedData = ProjectSchema.safeParse({
//     clientName: form.get("clientName"),
//     projectName: form.get("projectName"),
//     interval: form.get("interval"),
//     hourlyRate: form.get("hourlyRate"),
//   });

//   if (!parsedData.success) {
//     console.error("Validation error:", parsedData.error.flatten());
//     return { error: parsedData.error.flatten() };
//   }

//   const { clientName, projectName, interval, hourlyRate } = parsedData.data;

//   try {
//     await dbConnect();

//     const project = await Project.create({
//       userId: session.user.id,
//       clientName,
//       projectName,
//       interval,
//       hourlyRate,
//     });

//     return { success: true, project };
//   } catch (err) {
//     console.error("MongoDB Error:", err);
//     return { error: "Database error" };
//   }
// }

"use server";

import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import Project from "@/models/project.model";
import { ProjectSchema } from "@/schema/Project";
import { authOptions } from "@/lib/authOptions";
// import { getServerSession } from "next-auth";

export async function CreateProject(prevState, form) {
  console.log("Creating Project");

  // const session = await getServerSession(authOptions);
  // console.log("Session:", session);

  // if (!session || !session.user) {
  //   redirect("/login");
  // }

  const parsedData = ProjectSchema.safeParse({
    clientName: form.get("clientName"),
    projectName: form.get("projectName"),
    interval: form.get("interval"),
    hourlyRate: +form.get("hourlyRate"),
  });

  if (!parsedData.success) {
    console.error("Validation error:", parsedData.error.flatten());
    return { error: parsedData.error.flatten().fieldErrors };
  }

  const { clientName, projectName, interval, hourlyRate } = parsedData.data;

  try {
    console.log("Start connecting to db");
    await dbConnect();

    const project = await Project.create({
      userId: session.user.id,
      clientName,
      projectName,
      interval,
      hourlyRate,
    });

    console.log("✅ Project created:", project);

    return { success: true, project };
  } catch (err) {
    console.error("❌ MongoDB Error:", err);
    return { error: { general: "Database error" } };
  }
}
