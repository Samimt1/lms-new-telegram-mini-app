"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Star, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Dashboard() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [showFavorites, setShowFavorites] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      image: "/blog1.jpg",
      rating: 4.5,
      students: "8,500",
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
      image: "/blog2.jpg",
      rating: 4.2,
      students: "6,200",
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
      image: "/blog3.jpg",
      rating: 4.7,
      students: "10,300",
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
      image: "/dig.jpg",
      rating: 4.9,
      students: "15,000",
    },
    {
      id: 5,
      title: "Full-Stack Web Development",
      progress: 20,
      isFavorite: true,
      isCompleted: false,
      category: "Web Development",
      instructor: "John Doe",
      enrolledDate: "2023-05-20",
      image: "/ai.jpg",
      rating: 4.8,
      students: "12,000",
    },
  ]);

  const toggleFavorite = (courseId) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? { ...course, isFavorite: !course.isFavorite }
          : course
      )
    );
  };

  const categories = [
    "all",
    ...new Set(courses.map((course) => course.category)),
  ];

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
    <div className="space-y-6 p-4 md:p-6">
      {/* Navigation Tabs */}
      <nav className="flex space-x-4 border-b pb-2 dark:border-gray-700">
        <button
          className={`px-4 py-2 rounded-t-lg transition-colors ${
            !showFavorites
              ? "bg-primary text-primary-foreground dark:bg-gray-700"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          onClick={() => setShowFavorites(false)}
        >
          All Courses
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg flex items-center gap-2 transition-colors ${
            showFavorites
              ? "bg-primary text-primary-foreground dark:bg-gray-700"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          onClick={() => setShowFavorites(true)}
        >
          <Star className="h-4 w-4" />
          Favorites
        </button>
      </nav>

      {/* Header with search and filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold dark:text-white">
          {showFavorites ? "My Favorite Courses" : "My Courses"}
        </h1>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses or instructors..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter Dropdown */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <select
              className="pl-10 pr-8 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="bg-background border p-6 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold dark:text-white">
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
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow dark:border-gray-700 dark:hover:shadow-gray-900"
              >
                {/* Course Image */}
                <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-700">
                  {course.image ? (
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                      No image available
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium dark:text-white">
                        {course.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {course.instructor}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground dark:bg-gray-700 dark:text-gray-300">
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

                  {/* Rating and Students */}
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <span className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-yellow-500" />
                      {course.rating}
                    </span>
                    <span className="text-muted-foreground">
                      ({course.students} students)
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="dark:text-gray-300">
                        Progress: {course.progress}%
                      </span>
                      <span
                        className={
                          course.isCompleted ? "text-green-500" : "text-primary"
                        }
                      >
                        {course.isCompleted ? "Completed" : "In Progress"}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
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
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              {showFavorites
                ? "You don't have any favorite courses yet."
                : "No courses match your search criteria"}
            </p>
            {showFavorites && (
              <button
                onClick={() => setShowFavorites(false)}
                className="text-primary hover:underline dark:text-primary-foreground"
              >
                Browse all courses
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
