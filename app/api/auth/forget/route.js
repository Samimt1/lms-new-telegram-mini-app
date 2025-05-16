import prisma from "@/app/lib/prisma.js"
import bcrypt from "bcrypt"

export const resetPasswordSimple = async (req, res) => {
  const { email, name, newPassword } = req.body

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
        name,
      },
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with provided email and name.",
      })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })

    return res
      .status(200)
      .json({ success: true, message: "Password reset successfully." })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong." })
  }
}
