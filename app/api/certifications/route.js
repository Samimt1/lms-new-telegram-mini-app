import prisma from "@/app/lib/prisma"

//List all certifications
export async function GET(req) {
  try {
    const certifications = await prisma.certification.findMany({
      include: {
        user: { select: { name: true, email: true } },
        course: { select: { title: true } },
      },
    })
    return Response.json({ data: certifications, success: true })
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch certifications", success: false },
      { status: 500 }
    )
  }
}

//Create a new certification
export async function POST(req) {
  try {
    const { title, userId, courseId, certLink } = await req.json()

    const certification = await prisma.certification.create({
      data: { title, userId, courseId, certLink },
    })

    return Response.json(
      { data: certification, success: true },
      { status: 201 }
    )
  } catch (error) {
    return Response.json(
      { error: "Failed to create certification", success: false },
      { status: 500 }
    )
  }
}
