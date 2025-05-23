import { NextResponse } from "next/server";
import { notifications } from "@/utility/data";

export async function GET() {
  return NextResponse.json(notifications);
}
