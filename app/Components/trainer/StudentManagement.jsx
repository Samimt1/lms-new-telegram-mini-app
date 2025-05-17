"use client";
import { useState } from "react";
import {
  FiBook,
  FiUsers,
  FiCalendar,
  FiEye,
  FiEdit,
  FiUser,
} from "react-icons/fi";

export default function StudentManagement() {
  const [activeTab, setActiveTab] = useState("courses");
  const [searchTerm, setSearchTerm] = useState("");

  const students = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      course: "Advanced JavaScript",
      progress: 75,
      lastActive: "2 hours ago",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      course: "React Fundamentals",
      progress: 90,
      lastActive: "30 minutes ago",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      course: "Advanced JavaScript",
      progress: 60,
      lastActive: "1 day ago",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];

  const courses = [
    {
      id: 1,
      title: "Advanced JavaScript",
      students: 24,
      status: "Active",
      startDate: "2023-06-01",
      endDate: "2023-08-30",
    },
    {
      id: 2,
      title: "React Fundamentals",
      students: 18,
      status: "Active",
      startDate: "2023-07-15",
      endDate: "2023-09-30",
    },
    {
      id: 3,
      title: "Node.js Backend",
      students: 12,
      status: "Completed",
      startDate: "2023-05-01",
      endDate: "2023-07-15",
    },
  ];

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Student Management
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search students..."
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-300">
            <FiUser className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "courses", label: "My Courses", icon: FiBook },
            { id: "students", label: "Students", icon: FiUsers },
            { id: "attendance", label: "Attendance", icon: FiCalendar },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === id
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
            >
              <Icon className="inline mr-2" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {activeTab === "courses" && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {[
                    "Course Title",
                    "Students",
                    "Duration",
                    "Status",
                    "Actions",
                  ].map((head, idx) => (
                    <th
                      key={idx}
                      className={`${
                        head === "Actions" ? "text-right" : "text-left"
                      } px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {courses.map((course) => (
                  <tr
                    key={course.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {course.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      {course.students}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      {course.startDate} to {course.endDate}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          course.status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100"
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <button className="text-blue-600 dark:text-blue-400 hover:underline mr-4">
                        <FiEye className="inline mr-1" /> View
                      </button>
                      <button className="text-gray-600 dark:text-gray-300 hover:underline">
                        <FiEdit className="inline mr-1" /> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "students" && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {[
                    "Student",
                    "Contact",
                    "Course",
                    "Progress",
                    "Last Active",
                    "Actions",
                  ].map((head, idx) => (
                    <th
                      key={idx}
                      className={`${
                        head === "Actions" ? "text-right" : "text-left"
                      } px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={student.avatar}
                          alt={student.name}
                        />
                        <div className="ml-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                          {student.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      {student.course}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-300">
                          {student.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      {student.lastActive}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <button className="text-blue-600 dark:text-blue-400 hover:underline mr-4">
                        <FiEye className="inline mr-1" /> View
                      </button>
                      <button className="text-gray-600 dark:text-gray-300 hover:underline">
                        <FiEdit className="inline mr-1" /> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
