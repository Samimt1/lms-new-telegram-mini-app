import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// Get a single course
export async function GET(req, context) {
  const { id } = context.params

  try {
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        quizzes: {
          include: {
            questions: true, // include all questions inside each quiz
          },
        },
        modules: true,
        certifications: true,
        createdBy: true,
      },
    })

    if (!course) {
      return NextResponse.json(
        { error: "Course not found", success: false },
        { status: 404 }
      )
    }

    return NextResponse.json({ course, success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Error fetching course", success: false },
      { status: 500 }
    )
  }
}

// Update a single course
export async function PUT(req, context) {
  const { id } = context.params
  const updateData = await req.json()

  try {
    const updated = await prisma.course.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({
      updated,
      success: true,
      message: "Course updated successfully",
    })
  } catch (err) {
    return NextResponse.json(
      { error: "Update failed", success: false },
      { status: 500 }
    )
  }
}

// Delete a single course
export async function DELETE(req, context) {
  const { id } = context.params

  try {
    await prisma.course.delete({
      where: { id },
    })

    return NextResponse.json({
      message: "Course deleted successfully",
      success: true,
    })
  } catch (err) {
    return NextResponse.json(
      { error: "Delete failed", success: false },
      { status: 500 }
    )
  }
}
