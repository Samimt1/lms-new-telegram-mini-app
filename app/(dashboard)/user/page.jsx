"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Star, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function user() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [showFavorites, setShowFavorites] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollmentData, setEnrollmentData] = useState({
    fullName: "",
    email: "",
    phone: "",
    goals: "",
  });
  const router = useRouter();

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        const data = await response.json();
        console.log(data);
        setCourses(data.courses);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

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

  // Handle enrollment form input changes
  const handleEnrollmentChange = (e) => {
    const { name, value } = e.target;
    setEnrollmentData((prev) => ({ ...prev, [name]: value }));
  };

  // Get unique categories for filter dropdown
  const categories = [
    "all",
    ...new Set(courses?.map((course) => course.category)),
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

  const handleEnrollment = async () => {
    const data = {
      userId: "59df89ac-e798-4f12-8f59-c92172794f6d", //Comes form redux store
      courseId: selectedCourse?.id,
    };

    try {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to enroll");

      const result = await response.json();
      toast.success(`Successfully enrolled in ${selectedCourse.title}!`);
      setShowEnrollModal(false);
      router.push(`/user/assessment?courseId=${data.courseId}`);
      // Refresh courses or update UI as needed
    } catch (error) {
      console.error("Error enrolling:", error);
      toast.error("Failed to enroll. Please try again.");
    }
  };

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
          {showFavorites ? "My Favorite Courses" : "Available Courses"}
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
          {/* <div className="relative">
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
          </div> */}
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
            Showing {filteredCourses.length} courses
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Course Image */}
                <div className="relative h-48 w-full bg-gray-100">
                  {course.image ? (
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      No image available
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-grow">
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
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {course.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-4">
                    <button
                      onClick={() => {
                        setSelectedCourse(course);
                        setShowEnrollModal(true);
                      }}
                      className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Enroll Now
                    </button>
                  </div>
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

      {/* Enrollment Modal */}
      {showEnrollModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/75 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-2  ">
                <h3 className="text-xl font-semibold">
                  Enroll in {selectedCourse.title}
                </h3>
                <button
                  onClick={() => setShowEnrollModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
              <div className="w-full h-fit px-2 ">
                <p className="">Are you sure to enroll into this course?</p>

                <div className="flex items-center justify-end gap-3 mt-7">
                  <button
                    onClick={() => setShowEnrollModal(false)}
                    className="w-40 py-1 px-7 cursor-pointer bg-red-500 text-white border border-red-400"
                  >
                    No
                  </button>
                  <button
                    onClick={handleEnrollment}
                    className="w-40 py-1 px-7 cursor-pointer border rounded-md border-gray-300"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
