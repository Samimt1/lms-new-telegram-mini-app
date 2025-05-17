// components/trainer/DashboardOverview.js
export default function DashboardOverview() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Courses Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">Total Courses</h3>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>

        {/* Active Students Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">Active Students</h3>
          <p className="text-3xl font-bold mt-2">84</p>
        </div>

        {/* Pending Assignments Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">
            Pending Assignments
          </h3>
          <p className="text-3xl font-bold mt-2">23</p>
        </div>

        {/* Notifications Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">Notifications</h3>
          <p className="text-3xl font-bold mt-2">5</p>
        </div>
      </div>

      {/* Announcements Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Announcements</h3>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <p className="font-medium">System Maintenance - June 15</p>
            <p className="text-gray-600 text-sm">
              The system will be down for maintenance from 2AM to 4AM.
            </p>
          </div>
          <div className="border-b pb-4">
            <p className="font-medium">New Course Materials Uploaded</p>
            <p className="text-gray-600 text-sm">
              New materials for Advanced JavaScript course are now available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
