// components/trainer/DashboardOverview.js
export default function DashboardOverview() {
  const stats = [
    {
      title: "Total Courses",
      value: 12,
      trend: "↑ 2 from last month",
      icon: "📚",
    },
    {
      title: "Active Students",
      value: 84,
      trend: "↑ 12% from last week",
      icon: "👥",
    },
    {
      title: "Pending Assignments",
      value: 23,
      trend: "↓ 5 from yesterday",
      icon: "📝",
    },
    {
      title: "Unread Notifications",
      value: 5,
      trend: "New 2 today",
      icon: "🔔",
    },
  ];

  const announcements = [
    {
      title: "System Maintenance - June 15",
      description: "The system will be down for maintenance from 2AM to 4AM.",
      date: "June 10, 2023",
      priority: "medium",
    },
    {
      title: "New Course Materials Uploaded",
      description:
        "New materials for Advanced JavaScript course are now available.",
      date: "June 8, 2023",
      priority: "low",
    },
    {
      title: "Quarterly Training Session",
      description:
        "Register now for the upcoming trainer development workshop.",
      date: "June 5, 2023",
      priority: "high",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
        <span className="text-sm text-gray-500">
          Last updated: Today, 10:45 AM
        </span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold mt-1 text-gray-800">
                  {stat.value}
                </p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className="text-xs mt-3 text-gray-500">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Announcements Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-xl font-semibold text-gray-800">Announcements</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {announcements.map((announcement, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${
                announcement.priority === "high"
                  ? "border-red-500 bg-red-50"
                  : announcement.priority === "medium"
                  ? "border-yellow-500 bg-yellow-50"
                  : "border-blue-500 bg-blue-50"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-800">
                    {announcement.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {announcement.description}
                  </p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                  {announcement.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-5">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <span className="text-2xl mb-2">➕</span>
            <span className="text-sm font-medium">New Course</span>
          </button>
          <button className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <span className="text-2xl mb-2">📅</span>
            <span className="text-sm font-medium">Schedule</span>
          </button>
          <button className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <span className="text-2xl mb-2">📊</span>
            <span className="text-sm font-medium">Reports</span>
          </button>
          <button className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <span className="text-2xl mb-2">✉️</span>
            <span className="text-sm font-medium">Messages</span>
          </button>
        </div>
      </div>
    </div>
  );
}
