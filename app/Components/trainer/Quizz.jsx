"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Search,
  Filter,
  ChevronRight,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

export default function CreateQuizPage() {
  // Course selection state
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    category: "all",
  });
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Quiz form state
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `/api/courses/trainer?trainerId=e7f26fce-52f1-4923-a53f-3cd86f54be42`
        );
        const data = await response.json();
        setCourses(data);
        setFilteredCourses(data);
      } catch (error) {
        toast.error("Failed to load courses");
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let results = courses;

    if (searchTerm) {
      results = results.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.status !== "all") {
      results = results.filter((course) => course.status === filters.status);
    }

    if (filters.category !== "all") {
      results = results.filter(
        (course) => course.category === filters.category
      );
    }

    setFilteredCourses(results);
  }, [searchTerm, filters, courses]);

  // Quiz form functions
  const addNewQuestion = () => {
    append({
      text: "",
      options: ["", "", "", ""],
      correct: "",
    });
  };

  const removeQuestion = (index) => {
    if (fields.length > 1) {
      remove(index);
    } else {
      toast.error("You need at least one question");
    }
  };

  const onSubmit = async (data) => {
    if (!selectedCourse) {
      toast.error("Please select a course first");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          courseId: selectedCourse.id,
          trainerId: "e7f26fce-52f1-4923-a53f-3cd86f54be42",
        }),
      });

      if (!response.ok) throw new Error("Failed to create quiz");

      const result = await response.json();
      toast.success("Quiz created successfully!");
      reset();
      setSelectedCourse(null);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {!selectedCourse ? (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              Select a Course for Your Quiz
            </h1>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <div className="relative">
                  <select
                    className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={filters.status}
                    onChange={(e) =>
                      setFilters({ ...filters, status: e.target.value })
                    }
                  >
                    <option value="all">All Statuses</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <Filter className="h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="relative">
                  <select
                    className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={filters.category}
                    onChange={(e) =>
                      setFilters({ ...filters, category: e.target.value })
                    }
                  >
                    <option value="all">All Categories</option>
                    <option value="programming">Programming</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <Filter className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Courses List */}
          {loadingCourses ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin h-8 w-8 text-indigo-500" />
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedCourse(course)}
                >
                  {course.thumbnail && (
                    <div className="h-48 bg-gray-200 overflow-hidden">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {course.description}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          course.status === "published"
                            ? "bg-green-100 text-green-800"
                            : course.status === "draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {course.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        {course.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h3 className="text-lg font-medium text-gray-700">
                No courses found
              </h3>
              <p className="mt-2 text-gray-500">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Quiz Creation Form */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => setSelectedCourse(null)}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5 transform rotate-180" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Create Quiz</h1>
              <p className="text-gray-600">For: {selectedCourse.title}</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quiz Title *
              </label>
              <input
                id="title"
                type="text"
                {...register("title", { required: "Quiz title is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter quiz title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Questions</h2>

              {fields.map((question, qIndex) => (
                <div
                  key={question.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-700">
                      Question {qIndex + 1}
                    </h3>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(qIndex)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Remove
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor={`questions.${qIndex}.text`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Question Text *
                      </label>
                      <input
                        id={`questions.${qIndex}.text`}
                        type="text"
                        {...register(`questions.${qIndex}.text`, {
                          required: "Question text is required",
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your question"
                      />
                      {errors.questions?.[qIndex]?.text && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.questions[qIndex].text.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Options *
                      </label>
                      <div className="space-y-3">
                        {[0, 1, 2, 3].map((oIndex) => (
                          <div
                            key={oIndex}
                            className="flex items-center space-x-3"
                          >
                            <input
                              type="radio"
                              {...register(`questions.${qIndex}.correct`, {
                                required: "Please select correct answer",
                              })}
                              value={oIndex}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                            />
                            <input
                              type="text"
                              {...register(
                                `questions.${qIndex}.options.${oIndex}`,
                                { required: "Option text is required" }
                              )}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder={`Option ${oIndex + 1}`}
                            />
                          </div>
                        ))}
                        {errors.questions?.[qIndex]?.correct && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.questions[qIndex].correct.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addNewQuestion}
                className="inline-flex items-center px-4 py-2 bg-indigo-100 border border-transparent rounded-md font-medium text-indigo-700 hover:bg-indigo-200"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Another Question
              </button>
            </div>

            <div className="flex justify-end space-x-4 pt-8">
              <button
                type="button"
                onClick={() => {
                  reset();
                  setSelectedCourse(null);
                }}
                className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Creating...
                  </>
                ) : (
                  "Create Quiz"
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
