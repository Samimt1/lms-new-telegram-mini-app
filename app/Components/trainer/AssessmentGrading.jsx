"use client";

import { useState } from "react";
import {
  FiPlus,
  FiCheckCircle,
  FiBarChart2,
  FiCalendar,
  FiTrash2,
} from "react-icons/fi";
import CreateAssesment from "./CreateAssesment";

export default function AssessmentGrading() {
  const [activeTab, setActiveTab] = useState("create");
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "JavaScript Basics Quiz",
      course: "Advanced JavaScript",
      dueDate: "2023-06-15",
      submissions: 18,
      graded: 12,
      status: "active",
    },
    {
      id: 2,
      title: "React Component Project",
      course: "React Fundamentals",
      dueDate: "2023-06-20",
      submissions: 15,
      graded: 8,
      status: "active",
    },
  ]);

  const [newAssignment, setNewAssignment] = useState({
    title: "",
    course: "",
    dueDate: "",
    description: "",
    questions: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId =
      assignments.length > 0
        ? Math.max(...assignments.map((a) => a.id)) + 1
        : 1;
    setAssignments([
      ...assignments,
      {
        id: newId,
        title: newAssignment.title,
        course: newAssignment.course,
        dueDate: newAssignment.dueDate,
        submissions: 0,
        graded: 0,
        status: "draft",
      },
    ]);
    setNewAssignment({
      title: "",
      course: "",
      dueDate: "",
      description: "",
      questions: [],
    });
  };

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== id));
  };

  return (
    <div className="space-y-6 dark:bg-gray-900 dark:text-gray-100 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Assessments & Grading
        </h2>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {[
            {
              key: "create",
              label: "Create Assessment",
              icon: <FiPlus className="inline mr-2" />,
            },
            {
              key: "grade",
              label: "Grade Submissions",
              icon: <FiCheckCircle className="inline mr-2" />,
            },
            {
              key: "results",
              label: "View Results",
              icon: <FiBarChart2 className="inline mr-2" />,
            },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.key
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        {activeTab === "create" && <CreateAssesment />}

        {activeTab === "grade" && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {[
                    "Assessment",
                    "Course",
                    "Due Date",
                    "Submissions",
                    "Graded",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {assignments.map((assignment) => (
                  <tr
                    key={assignment.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {assignment.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {assignment.course}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <FiCalendar className="inline mr-1" />
                      {assignment.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {assignment.submissions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          assignment.graded === assignment.submissions
                            ? "bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-100"
                            : "bg-yellow-100 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-100"
                        }`}
                      >
                        {assignment.graded}/{assignment.submissions}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => deleteAssignment(assignment.id)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
                      >
                        <FiTrash2 />
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
