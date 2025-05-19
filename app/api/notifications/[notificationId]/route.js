import prisma from "@/app/lib/prisma.js"

//Delete notification
export async function DELETE(req, { params }) {
  try {
    const { notificationId: id } = params

    await prisma.notification.delete({
      where: { id },
    })

    return Response.json(
      {
        message: "Notification deleted",
        success: true,
      },
      { status: 204 }
    )
  } catch (error) {
    console.error("Delete Notification Error:", error)
    return Response.json(
      { message: "Server error", success: false },
      { status: 500 }
    )
  }
}
