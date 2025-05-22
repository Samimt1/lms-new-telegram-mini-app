import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma" // Adjust path if needed

export async function GET(request, context) {
  const { id } = context.params
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type") // "PRE" or "POST"

  try {
    const assessment = await prisma.assesment.findFirst({
      where: {
        courseId: id,
        ...(type && { type }),
      },
      include: {
        questions: true,
      },
    })

    if (!assessment) {
      return NextResponse.json(
        { error: "Assessment not found", success: false },
        { status: 404 }
      )
    }

    return NextResponse.json({ assessment, success: true })
  } catch (error) {
    console.error("Error fetching assessment:", error)
    return NextResponse.json(
      { error: "Failed to fetch assessment", success: false },
      { status: 500 }
    )
  }
}
