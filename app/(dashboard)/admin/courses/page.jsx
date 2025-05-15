'use client'
import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { Search } from "lucide-react";
import { deleteCourse } from "../../../../stateManager/features/courses/courseSlices";
import Modal from "@/components/Admin/Modal";

const Courses = () => {
  
  const courses = useSelector((state) => state.courses.courses);
  console.log(courses);
  const dispatch = useDispatch();

  // Component state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  // Memoized filtered courses for better performance

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [courses, searchTerm, selectedCategory]);
  console.log("Filtering courses...",filteredCourses);


  // Get unique categories for dropdown

  const categories = useMemo(() => {
    return [...new Set(courses.map((course) => course.category))];
  }, [courses]);

  // Delete handlers
  const handleDeleteClick = (courseId) => {
    setCourseToDelete(courseId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (courseToDelete) {
      dispatch(deleteCourse(courseToDelete));
      setIsDeleteModalOpen(false);
      setCourseToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setCourseToDelete(null);
  };

  // Table column styles
  const thStyle =
    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  const tdStyle = "px-6 py-4 whitespace-nowrap text-sm";

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-600 mt-6">
          Course Management
        </h1>
      </div>

      {/* Filters and Add Course Button */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}

            <select
              className="block w-full sm:w-48 pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Add Course Button */}
          <Link
            href="/admin/courses/addNewCourse"
            className="w-full sm:w-auto px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors text-sm font-medium text-center"
          >
            Add New Course
          </Link>
        </div>

        {/* Courses Table */}
        <div className="overflow-x-auto">
          {filteredCourses.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No courses found matching your criteria
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 text-xl">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className={thStyle}>
                    Title
                  </th>
                  <th scope="col" className={thStyle}>
                    Category
                  </th>
                  <th scope="col" className={thStyle}>
                    Trainer
                  </th>
                  <th scope="col" className={thStyle}>
                    Duration
                  </th>
                  <th scope="col" className={thStyle}>
                    Status
                  </th>
                  <th scope="col" className={thStyle}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/50 backdrop-blur-sm divide-y divide-gray-200/30">
                {filteredCourses.map((course) => {
                  return (
                    <tr key={course.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className={tdStyle}>
                        <Link
                          href={`/admin/courses/${course.id}`}
                          className="flex flex-col"
                        >
                         
                          <div className="font-medium text-gray-900 group-hover:text-cyan-600 transition-colors">
                            {course.title}
                          </div>
                        </Link>
                      </td>
                      <td className={tdStyle + " text-gray-500"}>
                        {course.category}
                      </td>
                      <td className={tdStyle + " text-gray-500"}>
                        {course.trainer}
                      </td>
                      <td className={tdStyle + " text-gray-500 "}>
                        {course.duration}
                      </td>
                      <td className={tdStyle}>
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            course.status === "active"
                              ? "bg-green-100 text-green-800"
                              : course.status === "draft"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {course.status}
                        </span>
                      </td>
                      <td className={tdStyle + " text-right font-medium"}>
                        <Link
                          href={`/admin/courses/editCourse/${course.id}`}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                          aria-label={`Edit ${course.title}`}
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(course.id)}
                          className="text-red-600 hover:text-red-900"
                          aria-label={`Delete ${course.title}`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this course? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="red"
      />
    </div>
  );
};

export default Courses;
