"use client";
import { useState, useEffect } from "react";
import TrainerNavbar from "@/app/Components/trainer/TrainerNavbar";
import DashboardOverview from "@/app/Components/trainer/DashboardOverview";
import StudentManagement from "@/app/Components/trainer/StudentManagement";
import AssessmentGrading from "@/app/Components/trainer/AssessmentGrading";
import Quizz from "@/app/Components/trainer/Quizz";
import ProfileSection from "@/app/Components/trainer/ProfileSection";
import CertificatesManagement from "@/app/Components/trainer/CertificatesManagement";
import { useRouter } from "next/navigation";

export default function TrainerDashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const sections = [
    { id: "overview", label: "Overview", component: <DashboardOverview /> },
    { id: "students", label: "Students", component: <StudentManagement /> },
    {
      id: "assessments",
      label: "Assessments",
      component: <AssessmentGrading />,
    },
    {
      id: "quiz",
      label: "Quiz",
      component: <Quizz />,
    },
    {
      id: "certificates",
      label: "Certificates",
      component: <CertificatesManagement />,
    },
    { id: "profile", label: "Profile", component: <ProfileSection /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TrainerNavbar />

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md hidden md:block border-r border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Trainer Dashboard
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Welcome back, Instructor
            </p>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? "bg-blue-100 text-blue-700 font-medium" // Changed to standard blue colors
                      : "text-gray-700 hover:bg-gray-100" // Changed to standard gray colors
                  }`}
                >
                  {section.label}
                </button>
              ))}

              {/* Logout Button - Updated with standard colors */}
              <div className="mt-auto pt-4 border-t space-y-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center p-3 rounded-lg text-red-600 hover:bg-gray-100"
                >
                  <span className="mr-3">🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className={`mb-12 ${
                  activeSection === section.id ? "block" : "hidden"
                }`}
              >
                {section.component}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
