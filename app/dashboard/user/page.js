"use client";

import { useState } from "react";
import { Search, Filter, Star } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [showFavorites, setShowFavorites] = useState(false);

  // Sample course data with categories
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Introduction to React",
      progress: 100,
      isFavorite: false,
      isCompleted: true,
      category: "Computer Science",
      instructor: "Dr. Smith",
      enrolledDate: "2023-05-01",
    },
    {
      id: 2,
      title: "Network Security Fundamentals",
      progress: 65,
      isFavorite: true,
      isCompleted: false,
      category: "IT",
      instructor: "Prof. Johnson",
      enrolledDate: "2023-05-10",
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      progress: 30,
      isFavorite: false,
      isCompleted: false,
      category: "Design",
      instructor: "Ms. Williams",
      enrolledDate: "2023-05-15",
    },
    {
      id: 4,
      title: "Advanced Algorithms",
      progress: 45,
      isFavorite: true,
      isCompleted: false,
      category: "Computer Science",
      instructor: "Dr. Brown",
      enrolledDate: "2023-05-05",
    },
  ]);

  // Toggle favorite status
  const toggleFavorite = (courseId) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? { ...course, isFavorite: !course.isFavorite }
          : course
      )
    );
  };

  // Get unique categories for filter dropdown
  const categories = [
    "all",
    ...new Set(courses.map((course) => course.category)),
  ];

  // Filter courses by search query, category, and favorites
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || course.category === activeCategory;
    const matchesFavorites = !showFavorites || course.isFavorite;
    return matchesSearch && matchesCategory && matchesFavorites;
  });

  return (
    <div className="space-y-6">
      {/* Navigation Bar */}
      <nav className="flex space-x-4 border-b pb-2">
        <button
          className={`px-4 py-2 rounded-t-lg ${
            !showFavorites
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent"
          }`}
          onClick={() => setShowFavorites(false)}
        >
          All Courses
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg flex items-center gap-2 ${
            showFavorites
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent"
          }`}
          onClick={() => setShowFavorites(true)}
        >
          <Star className="h-4 w-4" />
          Favorites
        </button>
      </nav>

      {/* Header with search and filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">
          {showFavorites ? "My Favorite Courses" : "My Courses"}
        </h1>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses or instructors..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter Dropdown */}
          <div className="relative">
            <select
              className="pl-10 pr-4 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
            >
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="bg-background border p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            {activeCategory === "all"
              ? showFavorites
                ? "All Favorite Courses"
                : "All Courses"
              : `${activeCategory} ${showFavorites ? "Favorites" : "Courses"}`}
          </h3>
          <span className="text-sm text-muted-foreground">
            Showing {filteredCourses.length} of {courses.length} courses
          </span>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{course.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {course.instructor}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                      {course.category}
                    </span>
                    <button
                      onClick={() => toggleFavorite(course.id)}
                      className="text-muted-foreground hover:text-yellow-500 transition-colors"
                    >
                      <Star
                        className={`h-4 w-4 ${
                          course.isFavorite
                            ? "fill-yellow-500 text-yellow-500"
                            : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress: {course.progress}%</span>
                    <span>
                      {course.isCompleted ? "Completed" : "In Progress"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        course.isCompleted ? "bg-green-500" : "bg-primary"
                      }`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                  <span>
                    Enrolled:{" "}
                    {new Date(course.enrolledDate).toLocaleDateString()}
                  </span>
                  {course.isFavorite && (
                    <span className="text-yellow-500 flex items-center gap-1">
                      <Star className="h-3 w-3" /> Favorite
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-4">
            {showFavorites
              ? "You don't have any favorite courses yet. Click the star icon to add favorites."
              : "No courses match your search and filter criteria"}
          </p>
        )}
      </div>
    </div>
  );
}
