import { prisma } from "@/lib/prisma"
import { m } from "framer-motion"
import { NextResponse } from "next/server"

// Create a course
export async function POST(req) {
  const courseData = await req.json()
  //  Course data format = {
  //   "title": "Intro to Fullstack Development",
  //   "description": "Learn fullstack development using the MERN stack with real-world projects.",
  //   "thumbnail": "https://example.com/course-thumbnail.jpg",
  //   "trainerId": "user-uuid-here"
  // }

  try {
    const course = await prisma.course.create({
      data: courseData,
    })

    return NextResponse.json({
      course,
      success: true,
      message: "Course created successfully",
    })
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create course", success: false },
      { status: 500 }
    )
  }
}

// Get all courses
export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        quizzes: {
          include: {
            questions: true, //this line includes questions inside each quiz
          },
        },
        modules: true,
        certifications: true,
        createdBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ courses, success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch courses", success: false },
      { status: 500 }
    )
  }
}
