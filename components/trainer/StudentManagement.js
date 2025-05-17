// components/trainer/StudentManagement.js
"use client";
import { useState } from "react";

export default function StudentManagement() {
  const [activeTab, setActiveTab] = useState("courses");
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      course: "Advanced JavaScript",
      progress: 75,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      course: "React Fundamentals",
      progress: 90,
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      course: "Advanced JavaScript",
      progress: 60,
    },
  ]);

  const courses = [
    { id: 1, title: "Advanced JavaScript", students: 24, status: "Active" },
    { id: 2, title: "React Fundamentals", students: 18, status: "Active" },
    { id: 3, title: "Node.js Backend", students: 12, status: "Completed" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Student Management</h2>

      <div className="mb-6">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 ${
              activeTab === "courses"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("courses")}
          >
            My Courses
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "students"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("students")}
          >
            Students
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "attendance"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("attendance")}
          >
            Attendance
          </button>
        </div>
      </div>

      {activeTab === "courses" && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Course Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Students
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {course.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.students}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        course.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "students" && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {student.progress}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Profile
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      Message
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "attendance" && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4">Attendance Tracking</h3>
          <p className="text-gray-600">
            Attendance feature will be available soon.
          </p>
        </div>
      )}
    </div>
  );
}
