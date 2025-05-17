"use client";
import { BarChart, PieChart, LineChart } from "@/app/Components/Admin/Charts";
import CountChart from "@/app/Components/Admin/CountChart";
import UserCard from "@/app/Components/Admin/UserCard";
import "react-calendar/dist/Calendar.css";
import EventCalendar from "@/app/Components/Admin/EventCalendar";
import AdminEvents from "@/app/Components/Admin/AdminEvents";
import { enrollmentData } from "@/app/utility/data";
import { performanceData } from "@/app/utility/data";
import { completionData } from "@/app/utility/data";

const Analytics = () => {
  return (
    <div className="flex flex-col md:flex-row ">
      <div className="w-full sm:w-2/3 ">
        <div className="flex justify-between items-center gap-5 mx-5 py-5 flex-wrap">
          <UserCard type="Student" date="2025" Number={100} />
          <UserCard type="Trainer" date="2025" Number="600" />
          <UserCard type="Courses" date="2025" Number="80" />
          <UserCard type="Admin" date="2025" Number="5" />
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {/* count by sex */}
            <div className="w-full h-[400px] p-3 mb-16">
              <CountChart />
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="h-64">
                <PieChart data={completionData} />
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Course Completion Rates
              </h2>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 m-3">
            <div className="h-64">
              <BarChart data={enrollmentData} />
              <h2 className="text-lg font-semibold text-gray-800 mt-4">
                Monthly Enrollments
              </h2>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 lg:col-span-2 py-12 mt-16">
            <div className="h-64 mt-12">
              <LineChart data={performanceData} />
            </div>
            <h2 className="text-lg font-semibold text-gray-700 ">
              Learner Performance Over Time
            </h2>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Top Performers
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {[
                {
                  id: 1,
                  name: "Employee Alice",
                  course: "Sales Training",
                  score: "98%",
                  rank: 1,
                },
                {
                  id: 2,
                  name: "Employee Bob",
                  course: "Technical Skills",
                  score: "95%",
                  rank: 2,
                },
                {
                  id: 3,
                  name: "Employee Charlie",
                  course: "HR Compliance",
                  score: "93%",
                  rank: 3,
                },
                {
                  id: 4,
                  name: "Employee Dana",
                  course: "Soft Skills",
                  score: "91%",
                  rank: 4,
                },
              ].map((performer) => (
                <div key={performer.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div
                      className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                        performer.rank === 1
                          ? "bg-yellow-100 text-yellow-600"
                          : performer.rank === 2
                          ? "bg-gray-100 text-gray-600"
                          : performer.rank === 3
                          ? "bg-amber-100 text-amber-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      <span className="font-bold">{performer.rank}</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        <span className="font-semibold">{performer.name}</span>{" "}
                        - {performer.course}
                      </p>
                      <p className="text-sm text-gray-500">
                        Score:{" "}
                        <span className="font-semibold">{performer.score}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full sm:w-1/3 overflow-y-auto ">
        <EventCalendar />
        <AdminEvents />
      </div>
    </div>
  );
};

export default Analytics;
