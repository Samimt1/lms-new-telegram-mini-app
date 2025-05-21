import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// Create new enrollment => user
export async function POST(req) {
  try {
    const { userId, courseId } = await req.json();

    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
        progress: 0,
        completed: false,
      },
    });

    return NextResponse.json({ enrollment, success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create enrollment", success: false },
      { status: 500 }
    );
  }
}

// Get all enrollments => Admin
export async function GET() {
  try {
    const enrollments = await prisma.enrollment.findMany({
      include: {
        user: true,
        course: true,
      },
      orderBy: {
        enrolledAt: "desc",
      },
    });

    return NextResponse.json({ enrollments, success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch enrollments", success: false },
      { status: 500 }
    );
  }
}
