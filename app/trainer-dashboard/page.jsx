// app/trainer-dashboard/page.js
"use client";
import TrainerNavbar from "@/components/TrainerNavbar";
import DashboardOverview from "@/components/trainer/DashboardOverview";
import StudentManagement from "@/components/trainer/StudentManagement";
import AssessmentGrading from "@/components/trainer/AssessmentGrading";
import ProfileSection from "@/components/trainer/ProfileSection";
import CertificatesManagement from "@/components/trainer/CertificatesManagement";
import { useState } from "react";

export default function TrainerDashboard() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", label: "Overview", component: <DashboardOverview /> },
    { id: "students", label: "Students", component: <StudentManagement /> },
    {
      id: "assessments",
      label: "Assessments",
      component: <AssessmentGrading />,
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
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left py-3 px-4 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {section.label}
                </button>
              ))}
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
