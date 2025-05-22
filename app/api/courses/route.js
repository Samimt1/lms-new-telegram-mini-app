// Create a course with modules and quizzes
import { NextResponse } from "next/server"
import prisma from "../../lib/prisma"
import { writeFile } from "fs/promises"
import fs from "fs"
import path from "path"

export async function POST(request) {
  try {
    const formData = await request.formData()

    const title = formData.get("title")
    const description = formData.get("description")
    const status = formData.get("status")
    const category = formData.get("category")
    const modules = JSON.parse(formData.get("modules"))

    // Handle thumbnail upload
    const thumbnailFile = formData.get("thumbnail")
    let thumbnailPath = null

    if (thumbnailFile && typeof thumbnailFile.name === "string") {
      const extension = path.extname(thumbnailFile.name) || ".png"
      const fileName = `thumbnail-${Date.now()}${extension}`
      const uploadDir = path.join(process.cwd(), "public/uploads")

      await fs.promises.mkdir(uploadDir, { recursive: true })
      const buffer = Buffer.from(await thumbnailFile.arrayBuffer())
      await writeFile(path.join(uploadDir, fileName), buffer)

      thumbnailPath = `/uploads/${fileName}`
    }

    // Create course with modules, quizzes, and questions
    const course = await prisma.course.create({
      data: {
        title,
        description,
        thumbnail: thumbnailPath,
        status,
        category,
        trainerId: "afeab98c-f820-492e-9d90-d7433393bf64", // Replace in prod
        modules: {
          create: modules.map((module) => {
            const { quiz, ...moduleData } = module
            return {
              ...moduleData,
              resources: module.resources
                ? module.resources.split(",").map((r) => r.trim())
                : [],
              quizzes: quiz?.title
                ? {
                    create: {
                      title: quiz.title,
                      trainerId: "afeab98c-f820-492e-9d90-d7433393bf64", // Replace in prod
                      questions: {
                        create: quiz.questions.map((question) => ({
                          text: question.text,
                          options: question.options,
                          correct: question.correct,
                        })),
                      },
                    },
                  }
                : undefined,
            }
          }),
        },
      },
      include: {
        modules: {
          include: {
            quizzes: {
              include: {
                questions: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json({ course, success: true }, { status: 201 })
  } catch (error) {
    console.error("Error creating course:", error)
    return NextResponse.json(
      { error: error.message || "Failed to create course", success: false },
      { status: 500 }
    )
  }
}

// Get all courses
export async function GET() {
  try {
    const courses = await prisma.course.findMany({
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
