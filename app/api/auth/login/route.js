import prisma from "@/app/lib/prisma.js";
import bcrypt from "bcryptjs";


export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return Response.json({ message: "Missing Credentials" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return Response.json({ message: "Invalid email or Password" }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return Response.json({ message: "Invalid email or Password" }, { status: 401 });
        }

        return Response.json({
            message: "Login Successful",
            role: user.role.toLowerCase(),
            userId: user.id,
        });
    } catch (error) {
        console.error("Login error:", error);
        return Response.json({ message: "Server error" }, { status: 500 });
    }
}