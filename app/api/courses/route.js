// Create a course
import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    const formData = await request.formData();

    // Extract text fields
    const title = formData.get("title");
    const description = formData.get("description");
    const status = formData.get("status");
    const category = formData.get("category");
    const modules = JSON.parse(formData.get("modules"));

    // Handle file upload
    const thumbnailFile = formData.get("thumbnail");
    let thumbnailPath = null;

    if (thumbnailFile) {
      // Create a unique filename
      const fileName = `thumbnail-${Date.now()}${path.extname(
        thumbnailFile.name
      )}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");

      // Ensure upload directory exists
      await fs.promises.mkdir(uploadDir, { recursive: true });

      // Read file buffer
      const buffer = Buffer.from(await thumbnailFile.arrayBuffer());

      // Write file to disk
      await writeFile(path.join(uploadDir, fileName), buffer);

      // Store relative path in database
      thumbnailPath = `/uploads/${fileName}`;
    }

    // Create course with modules
    const course = await prisma.course.create({
      data: {
        title,
        description,
        thumbnail: thumbnailPath,
        status,
        category,
        trainerId: "e7f26fce-52f1-4923-a53f-3cd86f54be42", // You'll need to get this from session or token
        modules: {
          create: modules.map((module) => ({
            title: module.title,
            description: module.description,
            contentType: module.contentType,
            content: module.content, // Now storing actual content/URL
            order: module.order,
            duration: module.duration,
            resources: module.resources
              ? module.resources.split(",").map((r) => r.trim())
              : [],
          })),
        },
      },
      include: {
        modules: true,
      },
    });

    return NextResponse.json({ course, success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create course", success: false },
      { status: 500 }
    );
  }
}

// Get all courses
export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ courses, success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch courses", success: false },
      { status: 500 }
    );
  }
}
