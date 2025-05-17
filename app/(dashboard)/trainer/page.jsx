"use client";
import { useState, useEffect } from "react";
import TrainerNavbar from "@/app/Components/trainer/TrainerNavbar";
import DashboardOverview from "@/app/Components/trainer/DashboardOverview";
import StudentManagement from "@/app/Components/trainer/StudentManagement";
import AssessmentGrading from "@/app/Components/trainer/AssessmentGrading";
import ProfileSection from "@/app/Components/trainer/ProfileSection";
import CertificatesManagement from "@/app/Components/trainer/CertificatesManagement";

export default function TrainerDashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  // Optional: Persist dark mode to localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", newTheme);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <TrainerNavbar />

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 shadow-md hidden md:block border-r border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  Trainer Dashboard
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Welcome back, Instructor
                </p>
              </div>
            </div>

            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left py-3 px-4 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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
