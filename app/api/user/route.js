let user = {
  id: 1,
  name: "Abraham Shiferaw",
  email: "abraham@example.com",
  role: "Admin",
  avatar: "/Admin_image/abrsh.jpg",
};

export async function GET() {
  return Response.json(user);
}

export async function PUT(request) {
  const updated = await request.json();
  user = { ...user, ...updated };
  return Response.json(user);
}