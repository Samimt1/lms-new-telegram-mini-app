// pages/api/notifications.ts
import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/app/lib/prisma"
import { NotificationType } from "@prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const { message, type, userId } = req.body

    // Validate input
    if (!message || !type || !userId) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    if (!Object.values(NotificationType).includes(type)) {
      return res.status(400).json({ message: "Invalid notification type" })
    }

    const notification = await prisma.notification.create({
      data: {
        message,
        type,
        userId,
      },
    })

    return res.status(201).json(notification)
  } catch (error) {
    console.error("Error creating notification:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}
