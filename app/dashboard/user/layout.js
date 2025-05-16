import Sidebar from "@/components/Sidebar";

export default function UserLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <main className="max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
