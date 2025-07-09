import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import Project from "@/models/project.model";
import Work from "@/models/work.model";
import { getServerSession, NextAuthOptions } from "next-auth";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions as NextAuthOptions);
  console.log("Session: ", session);
  if (!session) {
    redirect("/sign-in");
  }
  const projectId = await params.id;
  const searchParams = request.nextUrl.searchParams;
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  if (!projectId) {
    return new Response("Project ID is required", { status: 400 });
  }
  try {
    await dbConnect();
    let project;
    if (!from || !to) {
      project = await Project.findById(projectId);
      if (!project) {
        return new Response("Project not found", { status: 404 });
      }
    } else {
      project = await Work.find({
        projectId,
        date: { $gte: new Date(from), $lte: new Date(to) },
      });
      if (!project) {
        return new Response("Project not found", { status: 404 });
      }
    }
    return new Response(JSON.stringify(project), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions as NextAuthOptions);
  if (!session) {
    redirect("/sign-in");
  }
  const searchParams = request.nextUrl.searchParams;
  const projectId = searchParams.get("projectId");
  if (!projectId) {
    return new Response("Project ID is required", { status: 400 });
  }
  try {
    await dbConnect();
    const deletedProject = await Project.findByIdAndDelete(projectId);
    if (!deletedProject) {
      return new Response("Project not found", { status: 404 });
    }
    return new Response(JSON.stringify(deletedProject), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions as NextAuthOptions);
  if (!session) {
    redirect("/sign-in");
  }
  const searchParams = request.nextUrl.searchParams;
  const projectId = searchParams.get("projectId");
  if (!projectId) {
    return new Response("Project ID is required", { status: 400 });
  }
  try {
    await dbConnect();
    const body = await request.json();
    const updatedProject = await Project.findByIdAndUpdate(projectId, body, {
      new: true,
    });
    if (!updatedProject) {
      return new Response("Project not found", { status: 404 });
    }
    return new Response(JSON.stringify(updatedProject), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
