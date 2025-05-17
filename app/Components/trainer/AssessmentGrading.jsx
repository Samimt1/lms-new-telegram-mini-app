"use client";

import { useState } from "react";
import {
  FiPlus,
  FiCheckCircle,
  FiBarChart2,
  FiCalendar,
  FiTrash2,
} from "react-icons/fi";

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
        {activeTab === "create" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Assessment Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newAssignment.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Midterm Exam"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Course
                </label>
                <select
                  name="course"
                  value={newAssignment.course}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a course</option>
                  <option value="Advanced JavaScript">
                    Advanced JavaScript
                  </option>
                  <option value="React Fundamentals">React Fundamentals</option>
                  <option value="Node.js Backend">Node.js Backend</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={newAssignment.dueDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newAssignment.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Provide instructions for this assessment..."
                ></textarea>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Questions
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Question builder will be implemented here. You'll be able to
                  add multiple choice, short answer, and coding questions.
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-100 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Publish Assessment
              </button>
            </div>
          </form>
        )}

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
