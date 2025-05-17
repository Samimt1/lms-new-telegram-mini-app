// components/trainer/CertificatesManagement.js
"use client";
export default function CertificatesManagement() {
  const certificates = [
    {
      id: 1,
      student: "John Doe",
      course: "Advanced JavaScript",
      date: "2023-05-15",
      status: "Issued",
    },
    {
      id: 2,
      student: "Jane Smith",
      course: "React Fundamentals",
      date: "2023-05-18",
      status: "Issued",
    },
    {
      id: 3,
      student: "Bob Johnson",
      course: "Advanced JavaScript",
      date: "",
      status: "Pending",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Certificates Management</h2>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-medium">Completion Certificates</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Issue New Certificate
          </button>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date Issued
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {certificates.map((cert) => (
              <tr key={cert.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {cert.student}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {cert.course}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {cert.date || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      cert.status === "Issued"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {cert.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {cert.status === "Issued" ? (
                    <button className="text-blue-600 hover:text-blue-900">
                      Download
                    </button>
                  ) : (
                    <button className="text-green-600 hover:text-green-900">
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
