import { NextResponse } from "next/server";
import { notifications } from "@/utility/data";

export async function PATCH(request, { params }) {
  const id = Number(params.id);

  const index = notifications.findIndex(n => n.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Notification not found" }, { status: 404 });
  }

  notifications[index].read = true;

  return NextResponse.json({ success: true, notification: notifications[index] });
}
