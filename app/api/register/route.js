import prisma from "@/app/lib/prisma.js";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password) {
      return Response.json({ message: "Missing field" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return Response.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role.toUpperCase(),
      },
    });

    return Response.json({ message: "User registered", userId: user.id });
  } catch (error) {
    console.error("Registration Error:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
