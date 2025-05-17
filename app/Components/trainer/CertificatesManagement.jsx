"use client";
import { useState } from "react";
import {
  FiDownload,
  FiCheck,
  FiPlus,
  FiSearch,
  FiFileText,
} from "react-icons/fi";

export default function CertificatesManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      student: "John Doe",
      email: "john@example.com",
      course: "Advanced JavaScript",
      date: "2023-05-15",
      status: "issued",
      certificateId: "CERT-001",
    },
    {
      id: 2,
      student: "Jane Smith",
      email: "jane@example.com",
      course: "React Fundamentals",
      date: "2023-05-18",
      status: "issued",
      certificateId: "CERT-002",
    },
    {
      id: 3,
      student: "Bob Johnson",
      email: "bob@example.com",
      course: "Advanced JavaScript",
      date: "",
      status: "pending",
      certificateId: "CERT-003",
    },
  ]);

  const approveCertificate = (id) => {
    setCertificates(
      certificates.map((cert) =>
        cert.id === id
          ? {
              ...cert,
              status: "issued",
              date: new Date().toISOString().split("T")[0],
            }
          : cert
      )
    );
  };

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Certificates Management
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage and issue course completion certificates
          </p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FiPlus className="mr-2" />
          Issue New Certificate
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header with search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400 dark:text-gray-300" />
            </div>
            <input
              type="text"
              placeholder="Search certificates..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {filteredCertificates.length} certificates
          </div>
        </div>

        {/* Certificates Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {[
                  "Student",
                  "Course",
                  "Certificate ID",
                  "Date Issued",
                  "Status",
                  "Actions",
                ].map((title) => (
                  <th
                    key={title}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCertificates.map((cert) => (
                <tr
                  key={cert.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {cert.student}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {cert.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {cert.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500 dark:text-gray-400">
                    {cert.certificateId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {cert.date || (
                      <span className="text-gray-400 dark:text-gray-500">
                        Not issued
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        cert.status === "issued"
                          ? "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900"
                      }`}
                    >
                      {cert.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {cert.status === "issued" ? (
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 flex items-center">
                        <FiDownload className="mr-1" /> Download
                      </button>
                    ) : (
                      <button
                        onClick={() => approveCertificate(cert.id)}
                        className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 flex items-center"
                      >
                        <FiCheck className="mr-1" /> Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredCertificates.length === 0 && (
          <div className="p-12 text-center">
            <FiFileText className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
              No certificates found
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {searchTerm
                ? "Try a different search term"
                : "No certificates have been issued yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
