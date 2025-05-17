// app/trainer-dashboard/page.js
import TrainerNavbar from "@/components/TrainerNavbar";
import DashboardOverview from "@/components/trainer/DashboardOverview";
import StudentManagement from "@/components/trainer/StudentManagement";
import AssessmentGrading from "@/components/trainer/AssessmentGrading";
import ProfileSection from "@/components/trainer/ProfileSection";
import CertificatesManagement from "@/components/trainer/CertificatesManagement";

export default function TrainerDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <TrainerNavbar />

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md hidden md:block">
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800">
              Trainer Dashboard
            </h2>
            <nav className="mt-6">
              <a
                href="#overview"
                className="block py-2 px-4 text-gray-700 hover:bg-blue-50 rounded"
              >
                Home
              </a>
              <a
                href="#students"
                className="block py-2 px-4 text-gray-700 hover:bg-blue-50 rounded"
              >
                Student Management
              </a>
              <a
                href="#assessments"
                className="block py-2 px-4 text-gray-700 hover:bg-blue-50 rounded"
              >
                Assessments & Grading
              </a>
              <a
                href="#certificates"
                className="block py-2 px-4 text-gray-700 hover:bg-blue-50 rounded"
              >
                Certificates
              </a>
              <a
                href="#profile"
                className="block py-2 px-4 text-gray-700 hover:bg-blue-50 rounded"
              >
                My Profile
              </a>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <section id="overview" className="mb-12">
            <DashboardOverview />
          </section>

          <section id="students" className="mb-12">
            <StudentManagement />
          </section>

          <section id="assessments" className="mb-12">
            <AssessmentGrading />
          </section>

          <section id="certificates" className="mb-12">
            <CertificatesManagement />
          </section>

          <section id="profile">
            <ProfileSection />
          </section>
        </div>
      </div>
    </div>
  );
}
