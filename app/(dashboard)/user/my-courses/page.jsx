"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  Clock,
  CheckCircle,
  ChevronRight,
  Loader2,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function MyCourses() {
  const [myCourses, setMyCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  const fetchUserEnrollments = async (userId) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/enrollments/user/${userId}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch enrollments")
      }

      setMyCourses(data.enrollments)
      setError(null)
    } catch (error) {
      console.error("Error fetching user enrollments:", error.message)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserEnrollments("08fa845d-ccd3-4801-8cd7-10c4ed13de25") // Comes from redux store
  }, [])

  const getProgressColor = (progress) => {
    if (progress === 100) return "bg-green-500"
    if (progress > 70) return "bg-blue-500"
    if (progress > 40) return "bg-yellow-500"
    return "bg-orange-500"
  }

  const getProgressText = (progress) => {
    if (progress === 100) return "Completed"
    if (progress > 70) return "Almost there"
    if (progress > 40) return "In progress"
    return "Just started"
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-background border border-gray-200 p-6 rounded-lg shadow space-y-4"
            >
              <div className="space-y-2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">My Courses</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          <p>Error loading courses: {error}</p>
          <button
            onClick={() =>
              fetchUserEnrollments("08fa845d-ccd3-4801-8cd7-10c4ed13de25")
            }
            className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded text-red-800"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (myCourses.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">My Courses</h1>
        <div className="bg-blue-50 border border-blue-200 text-blue-700 p-8 rounded-lg text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-blue-400" />
          <h3 className="text-xl font-medium mb-2">No courses yet</h3>
          <p className="mb-4">You haven't enrolled in any courses yet.</p>
          <button
            onClick={() => router.push("/courses")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Browse Courses
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Courses</h1>
        <span className="text-sm text-muted-foreground">
          {myCourses.length} {myCourses.length === 1 ? "course" : "courses"}
        </span>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {myCourses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-background border border-gray-200 p-6 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    {course.course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {course.course.description}
                  </p>
                </div>
                {course.progress === 100 && (
                  <div className="flex items-center bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Completed
                  </div>
                )}
              </div>

              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium flex items-center">
                    <span className="mr-2">
                      {getProgressText(course.progress)}
                    </span>
                    {course.course.duration && (
                      <span className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {course.course.duration} min
                      </span>
                    )}
                  </span>
                  <span className="text-sm font-medium">
                    {course.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${getProgressColor(
                      course.progress
                    )}`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => router.push(`/courses/${course.course.id}`)}
                  className="flex items-center text-primary hover:text-primary/80 transition-colors"
                >
                  {course.progress === 100
                    ? "Review Course"
                    : "Continue Learning"}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
