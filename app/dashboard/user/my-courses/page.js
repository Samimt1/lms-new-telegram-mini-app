"use client";

import { BookOpen, CheckCircle, Clock } from "lucide-react";
import { useTheme } from "next-themes";

export default function MyCourses() {
  const { theme } = useTheme();
  const courses = [
    {
      id: 1,
      title: "Introduction to React",
      progress: 100,
      instructor: "Dr. Sarah Johnson",
      lastAccessed: "2 hours ago",
      lessonsCompleted: 12,
      totalLessons: 12,
      category: "Web Development",
      thumbnail: "/ai.jpg",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      progress: 65,
      instructor: "Prof. Michael Chen",
      lastAccessed: "1 day ago",
      lessonsCompleted: 8,
      totalLessons: 12,
      category: "Programming",
      thumbnail: "/bgn.jpg",
    },
    {
      id: 3,
      title: "Node.js Fundamentals",
      progress: 30,
      instructor: "Alex Rodriguez",
      lastAccessed: "3 days ago",
      lessonsCompleted: 3,
      totalLessons: 10,
      category: "Backend Development",
      thumbnail: "/blog1.jpg",
    },
  ];

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold dark:text-white">
          <BookOpen className="inline mr-2 h-6 w-6 text-primary" />
          My Courses
        </h1>
        <span className="text-sm text-muted-foreground">
          {courses.length} courses enrolled
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className={`bg-background border rounded-xl shadow-md hover:shadow-lg transition-shadow ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            {/* Course Thumbnail */}
            <div className="relative h-40 w-full bg-gray-100 dark:bg-gray-700 rounded-t-xl overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              {course.progress === 100 && (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed
                </div>
              )}
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold dark:text-white">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {course.instructor}
                  </p>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground dark:bg-gray-700 dark:text-gray-300">
                  {course.category}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="dark:text-gray-300">
                    {course.lessonsCompleted}/{course.totalLessons} lessons
                  </span>
                  <span className="font-medium">
                    {course.progress}% complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className={`h-2.5 rounded-full ${
                      course.progress === 100 ? "bg-green-500" : "bg-primary"
                    }`}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Course Metadata */}
              <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Last accessed: {course.lastAccessed}</span>
                </div>
                {course.progress === 100 ? (
                  <button className="text-primary dark:text-primary-foreground font-medium hover:underline">
                    View Certificate
                  </button>
                ) : (
                  <button className="text-primary dark:text-primary-foreground font-medium hover:underline">
                    Continue Learning
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
