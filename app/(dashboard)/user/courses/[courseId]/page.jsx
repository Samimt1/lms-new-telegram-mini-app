"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  CheckCircle,
  Play,
  FileText,
  Clock,
  ChevronRight,
  ArrowLeft,
  Loader2,
} from "lucide-react"
import toast from "react-hot-toast"
import axios from "axios"

export default function CoursePage() {
  const router = useRouter()
  const { courseId } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [completedModules, setCompletedModules] = useState([])
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(null)
  const [learningStarted, setLearningStarted] = useState(false)
  const [currentView, setCurrentView] = useState("module") // 'module' or 'quiz'

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/courses/${courseId}`)
        const data = await response.json()

        if (!response.ok) throw new Error(data.error || "Failed to load course")

        setCourse(data.course)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [courseId])

  const startLearning = () => {
    setLearningStarted(true)
    setCurrentModuleIndex(0)
    setCurrentView("module")
    toast.success("Let's start learning!")
  }

  const currentModule = course?.modules?.[currentModuleIndex]
  const currentQuiz = currentModule?.quizzes?.[currentQuizIndex]

  const completeModule = () => {
    if (!completedModules.includes(currentModule.id)) {
      setCompletedModules([...completedModules, currentModule.id])
      toast.success("Module completed!")
    }

    // If module has quizzes, show the first one
    if (currentModule.quizzes?.length > 0) {
      setCurrentQuizIndex(0)
      setCurrentView("quiz")
      setQuizAnswers({})
      setQuizSubmitted(false)
      setQuizScore(null)
    } else {
      // No quizzes, move to next module
      moveToNextModule()
    }
  }

  const moveToNextModule = async () => {
    if (currentModuleIndex < course.modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1)
      setCurrentView("module")
    } else {
      // Course completed
      try {
        const res = await axios.put(`/api/courses/${courseId}`, {
          isCompleted: true,
        })

        if (res.status === 200) {
          toast.success("Course completed! Congratulations!")
          router.push(`/user/assessment/post?courseId=${courseId}`)
        } else {
          toast.error("Something went wrong. Please try again.")
        }
      } catch (error) {
        console.error("Error completing course:", error)
        toast.error(error.response?.data?.error || error.message)
      }
    }
  }

  const handleQuizAnswer = (questionId, answer) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const submitQuiz = () => {
    let score = 0
    currentQuiz.questions.forEach((question) => {
      if (quizAnswers[question.id] === question.correct) {
        score++
      }
    })
    const percentage = Math.round((score / currentQuiz.questions.length) * 100)
    setQuizScore(percentage)
    setQuizSubmitted(true)
    toast.success(`Quiz submitted! Score: ${percentage}%`)
  }

  const completeQuiz = () => {
    // Move to next quiz if exists, otherwise next module
    if (currentQuizIndex < currentModule.quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1)
      setQuizAnswers({})
      setQuizSubmitted(false)
      setQuizScore(null)
    } else {
      moveToNextModule()
    }
  }

  const renderModuleContent = () => {
    return (
      <div className="space-y-6">
        {currentModule.contentType === "video" ? (
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              src={currentModule.content}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="prose max-w-none whitespace-pre-wrap">
            {currentModule.content}
          </div>
        )}

        <div>
          <h3 className="text-xl font-bold mb-2">{currentModule.title}</h3>
          {currentModule.description && (
            <p className="text-gray-600">{currentModule.description}</p>
          )}
        </div>

        <div className="mt-6">
          <button
            onClick={completeModule}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Complete Module
          </button>
        </div>
      </div>
    )
  }

  const renderQuizContent = () => {
    if (quizSubmitted) {
      return (
        <div className="text-center py-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-2xl font-bold mb-6 ${
              quizScore >= 70
                ? "bg-green-100 text-green-600"
                : quizScore >= 50
                ? "bg-yellow-100 text-yellow-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {quizScore}%
          </motion.div>
          <h3 className="text-xl font-bold mb-2">
            {quizScore >= 70
              ? "Great Job!"
              : quizScore >= 50
              ? "Good Effort!"
              : "Keep Practicing!"}
          </h3>
          <button
            onClick={completeQuiz}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {currentQuizIndex < currentModule.quizzes.length - 1
              ? "Next Quiz"
              : currentModuleIndex < course?.modules?.length - 1
              ? "Continue to Next Module"
              : "Finish Course"}
          </button>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <p className="text-gray-600">Test your knowledge from this module</p>

        {currentQuiz.questions.map((question, index) => (
          <motion.div
            key={question.id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="border border-gray-200 rounded-lg p-4"
          >
            <h4 className="font-medium mb-3">
              {index + 1}. {question.text} ?
            </h4>
            <div className="space-y-2">
              {question.options.map((option, i) => (
                <div key={i} className="flex items-center">
                  <input
                    type="radio"
                    id={`${question.id}-${i}`}
                    name={question.id}
                    checked={quizAnswers[question.id] === option}
                    onChange={() => handleQuizAnswer(question.id, option)}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`${question.id}-${i}`}
                    className="cursor-pointer"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        <button
          onClick={submitQuiz}
          disabled={
            Object.keys(quizAnswers).length !== currentQuiz.questions.length
          }
          className={`px-6 py-2 rounded-lg cursor-pointer ${
            Object.keys(quizAnswers).length === currentQuiz.questions.length
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Submit Quiz
        </button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Course not found</p>
      </div>
    )
  }

  if (!learningStarted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="flex items-center mb-6">
            <button
              onClick={() => router.back()}
              className="mr-4 text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-3xl font-bold">{course.title}</h1>
          </div>

          <p className="text-gray-600 mb-8">{course.description}</p>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Course Content</h2>
            <div className="space-y-2">
              {course.modules.map((module, index) => (
                <div
                  key={module.id}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="flex items-center p-3 bg-gray-50">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{module.title}</h3>
                      {module.duration && (
                        <p className="text-sm text-gray-500">
                          <Clock className="inline mr-1 h-3 w-3" />
                          {module.duration} min
                        </p>
                      )}
                    </div>
                  </div>

                  {module.quizzes?.length > 0 && (
                    <div className="px-4 py-2 bg-gray-100 border-t border-gray-200 text-sm text-gray-600">
                      Includes {module.quizzes.length} quiz
                      {module.quizzes.length > 1 ? "zes" : ""}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={startLearning}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center"
          >
            Start Learning
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 mx-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: `${
                      ((currentModuleIndex + (currentView === "quiz" ? 1 : 0)) /
                        course.modules.length) *
                      100
                    }%`,
                  }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1 text-center">
                {currentView === "quiz"
                  ? "Module Quiz"
                  : `Module ${currentModuleIndex + 1}`}
                (Module {currentModuleIndex + 1} of {course.modules.length})
              </p>
            </div>

            {currentView === "module" && currentModule?.duration && (
              <div className="text-sm text-gray-500 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {currentModule.duration} min
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 py-8">
        <motion.div
          key={currentView === "module" ? currentModule.id : currentQuiz.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">
              {currentView === "module"
                ? currentModule.title
                : currentQuiz.title}
              {currentView === "quiz" && (
                <span className="ml-2 text-sm font-normal text-purple-600">
                  (Module Quiz)
                </span>
              )}
            </h2>

            {currentView === "module"
              ? renderModuleContent()
              : renderQuizContent()}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
