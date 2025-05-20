import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

//Create a quiz
export async function POST(req) {
  const body = await req.json()
  const { title, courseId, trainerId } = body

  try {
    const quiz = await prisma.quiz.create({
      data: {
        title,
        courseId,
        trainerId,
      },
    })
    return NextResponse.json({ quiz, success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create quiz", success: false },
      { status: 500 }
    )
  }
}

//Get all quizzes
export async function GET() {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        course: true,
        trainer: true,
        questions: true,
      },
    })
    return NextResponse.json({ quizzes, success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch quizzes", success: false },
      { status: 500 }
    )
  }
}
