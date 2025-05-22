"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Filter,
  Star,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Heart,
  User,
  Clock,
  Loader2,
  Loader,
} from "lucide-react"
import Image from "next/image"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { fetchCourses } from "@/app/stateManager/features/courses/courseSlice"
import { motion, AnimatePresence } from "framer-motion"

export default function UserDashboard() {
  const { courses: userCourse, loading } = useSelector((state) => state.courses)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [showFavorites, setShowFavorites] = useState(false)
  const [courses, setCourses] = useState([])
  const [showEnrollModal, setShowEnrollModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isEnrolling, setIsEnrolling] = useState(false)
  const [enrollmentData, setEnrollmentData] = useState({
    fullName: "",
    email: "",
    phone: "",
    goals: "",
  })
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCourses())
  }, [])

  useEffect(() => {
    setCourses(userCourse || [])
  }, [userCourse])

  const toggleFavorite = (courseId) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? { ...course, isFavorite: !course.isFavorite }
          : course
      )
    )
  }

  const categories = [
    "all",
    ...new Set(courses?.map((course) => course.category)),
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      activeCategory === "all" || course.category === activeCategory
    const matchesFavorites = !showFavorites || course.isFavorite
    return matchesSearch && matchesCategory && matchesFavorites
  })

  const handleEnrollment = async () => {
    const data = {
      userId: "08fa845d-ccd3-4801-8cd7-10c4ed13de25",
      courseId: selectedCourse?.id,
    }

    try {
      setIsEnrolling(true)
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Failed to enroll")

      const result = await response.json()

      if (result.success) {
        toast.success(`Successfully enrolled in ${selectedCourse.title}!`)
      } else {
        toast.error(result.message || "Failed to enroll")
      }

      router.push(`/user/assessment?courseId=${data.courseId}`)
    } catch (error) {
      console.error("Error enrolling:", error)
      toast.error("Failed to enroll. Please try again.")
    } finally {
      setIsEnrolling(false)
      setShowEnrollModal(false)
      setSelectedCourse(null)
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { y: -5, transition: { duration: 0.2 } },
  }

  return (
    <div className="p-6 space-y-6">
      {/* Glass Navigation Bar */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex space-x-2 p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-sm"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
            !showFavorites
              ? "bg-primary text-primary-foreground shadow-md"
              : "hover:bg-white/5"
          }`}
          onClick={() => setShowFavorites(false)}
        >
          <BookOpen size={16} />
          All Courses
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
            showFavorites
              ? "bg-primary text-primary-foreground shadow-md"
              : "hover:bg-white/5"
          }`}
          onClick={() => setShowFavorites(true)}
        >
          <Heart size={16} />
          Favorites
        </motion.button>
      </motion.nav>

      {/* Header with search and filter */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-purple-400 bg-clip-text text-transparent">
          {showFavorites ? "My Favorite Courses" : "Explore Courses"}
        </h1>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Glass Search Bar */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 w-full sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Course List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 shadow-lg"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">
            {activeCategory === "all"
              ? showFavorites
                ? "All Favorite Courses"
                : "Featured Courses"
              : `${activeCategory} ${showFavorites ? "Favorites" : "Courses"}`}
          </h3>
          <span className="text-sm text-muted-foreground">
            {filteredCourses.length}{" "}
            {filteredCourses.length === 1 ? "course" : "courses"} available
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64 flex-col">
            <Loader2 className="animate-spin" size={32} />
            <span className="ml-2 text-muted-foreground">Loading...</span>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  exit="hidden"
                  transition={{ duration: 0.3 }}
                  className="border border-white/10 rounded-xl overflow-hidden bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm shadow-lg"
                >
                  {/* Course Image */}
                  <div className="relative h-48 w-full bg-gradient-to-r from-purple-600/20 to-purple-600/20">
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
                        <BookOpen size={48} className="opacity-20" />
                      </div>
                    )}
                    <button
                      onClick={() => toggleFavorite(course.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
                    >
                      <Star
                        size={18}
                        className={
                          course.isFavorite
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-white"
                        }
                      />
                    </button>
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">
                          {course.title}
                        </h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <User size={14} /> {course.instructor}
                        </p>
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                        {course.category}
                      </span>
                    </div>

                    <p className="text-sm text-primary line-clamp-2 mb-4">
                      {course.description}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock size={14} />
                        <span>12h 40m</span>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedCourse(course)
                          setShowEnrollModal(true)
                        }}
                        className="px-7 py-1 bg-gradient-to-r cursor-pointer from-purple-500 to-purple-600 rounded-md text-white shadow-md hover:shadow-lg transition-all"
                      >
                        Enroll Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen
              size={48}
              className="mx-auto mb-4 text-muted-foreground opacity-50"
            />
            <p className="text-muted-foreground">
              {showFavorites
                ? "You haven't favorited any courses yet. Click the star icon to add some!"
                : "No courses match your search criteria"}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Glass Enrollment Modal */}
      <AnimatePresence>
        {showEnrollModal && selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white backdrop-blur-xl px-6 rounded-xl shadow-2xl border border-white/10 max-w-lg w-full overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-12">
                  <h3 className="text-xl font-semibold">
                    Enroll in{" "}
                    <span className="text-primary">{selectedCourse.title}</span>
                  </h3>
                  <button
                    onClick={() => setShowEnrollModal(false)}
                    className="p-1 rounded-full hover:bg-white/10 transition-colors text-3xl"
                  >
                    &times;
                  </button>
                </div>

                <div className="space-y-6">
                  <p className="text-muted-foreground">
                    Ready to start learning? Confirm your enrollment below.
                  </p>

                  <div className="flex items-center justify-end gap-3">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowEnrollModal(false)}
                      className="px-6 py-1 rounded-md cursor-pointer text-white border border-red-400/30 bg-red-500 hover:bg-red-400 transition-colors"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleEnrollment}
                      className={` ${
                        !isEnrolling
                          ? "bg-gradient-to-r from-purple-500 to-purple-600 "
                          : "bg-gradient-to-r from-purple-400 to-purple-500 cursor-not-allowed"
                      } px-12 py-2 text-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer`}
                    >
                      {isEnrolling ? (
                        <span className="flex items-center gap-4">
                          <Loader className="animate-spin" size={16} />
                          Enrolling...
                        </span>
                      ) : (
                        "Confirm Enrollment"
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
