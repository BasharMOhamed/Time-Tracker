import dbConnect from "@/lib/dbConnect";
import { NextRequest } from "next/server";
import Project from "@/models/project.model";
import Work from "@/models/work.model";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  //   const projectId = searchParams.get("projectId");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  try {
    await dbConnect();
    if (!from || !to) {
      const projects = await Project.find();
      return new Response(JSON.stringify(projects), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      const projects = await Work.find({
        date: {
          $gte: new Date(from),
          $lte: new Date(to),
        },
      }).populate("projectId");
      return new Response(JSON.stringify(projects), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
