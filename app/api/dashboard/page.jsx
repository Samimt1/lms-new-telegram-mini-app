// app/dashboard/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login"); // protect route
  }

  return (
    <div>
      <h1>Hello {session.user.name}</h1>
      <p>Secure Dashboard Page</p>
    </div>
  );
}
