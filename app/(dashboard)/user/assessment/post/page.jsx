"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Loader2,
  ChevronRight,
  Check,
  X,
  BookOpen,
  ArrowLeft,
} from "lucide-react"
import toast from "react-hot-toast"
import { useSearchParams } from "next/navigation"
import axios from "axios"

const PreAssessmentPage = () => {
  const router = useRouter()
  const [assessment, setAssessment] = useState(null)
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const searchParams = useSearchParams()
  const courseId = searchParams.get("courseId")

  // Fetch assessment and course data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const assessmentRes = await axios.get(
          `/api/courses/${courseId}/assessment?type=POST`
        )

        console.log("Assessment Data:", assessmentRes.data)
        setAssessment(assessmentRes.data.assessment)
      } catch (error) {
        toast.error("Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [courseId])

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex)
  }

  const handleNextQuestion = () => {
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = {
      questionId: assessment.questions[currentQuestionIndex].id,
      selectedOption,
      isCorrect:
        selectedOption ===
        parseInt(assessment.questions[currentQuestionIndex].correct),
    }
    setAnswers(newAnswers)

    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
    } else {
      calculateScore(newAnswers)
      setShowResult(true)
    }
  }

  const calculateScore = async (answerList) => {
    const correctAnswers = answerList.filter(
      (answer) => answer.isCorrect
    ).length

    const totalQuestions = answerList.length
    const calculatedScore = Math.round((correctAnswers / totalQuestions) * 100)

    setScore(calculatedScore)

    try {
      const res = await fetch(`/api/assessments/${assessment.id}/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: calculatedScore }),
      })

      if (!res.ok) {
        console.error("Failed to submit score:", res)
        throw new Error("Failed to submit score")
      }

      toast.success("Score submitted successfully")
    } catch (err) {
      console.error("Error submitting score:", err)
    }
  }

  const handleCompleteAssessment = () => {
    router.push(`/user`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 className="h-12 w-12 text-blue-500" />
        </motion.div>
      </div>
    )
  }

  if (!assessment) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <p className="text-gray-600">No assessment found</p>
      </div>
    )
  }

  if (showResult) {
    return (
      <div className="min-h-screen  p-4">
        <div className="max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6  "
          >
            <h1 className="text-3xl font-bold text-gray-800">
              Post Assessment Results
            </h1>
          </motion.div>

          {/* Results Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white overflow-hidden "
          >
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className={`inline-flex items-center justify-center w-32 h-32 rounded-full text-3xl font-bold mb-6 ${
                  score >= 70
                    ? "bg-green-100 text-green-600"
                    : score >= 50
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {score}%
              </motion.div>

              <h2 className="text-2xl font-bold mb-2">
                {score >= 70
                  ? "Excellent Work!"
                  : score >= 50
                  ? "Good Effort!"
                  : "Keep Practicing!"}
              </h2>
              <p className="text-gray-600 mb-6">
                You scored {score}% on your post-assessment
              </p>

              <div className="space-y-4 mb-8">
                {assessment.questions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="text-left p-4 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-xs"
                  >
                    <p className="font-medium mb-2">
                      {index + 1}. {question.text}
                    </p>
                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`flex items-center p-2 rounded ${
                            answers[index]?.selectedOption === optIndex
                              ? answers[index]?.isCorrect
                                ? "bg-green-50 border border-green-200"
                                : "bg-red-50 border border-red-200"
                              : optIndex === question.correct
                              ? "bg-green-50 border border-green-200"
                              : "bg-gray-50"
                          }`}
                        >
                          {answers[index]?.selectedOption === optIndex ? (
                            answers[index]?.isCorrect ? (
                              <Check className="h-5 w-5 text-green-500 mr-2" />
                            ) : (
                              <X className="h-5 w-5 text-red-500 mr-2" />
                            )
                          ) : optIndex === question.correct ? (
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                          ) : null}
                          <span>{option}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleCompleteAssessment}
                className="px-6 py-3 bg-gradient-to-r cursor-pointer from-blue-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-md transition-all"
              >
                Finish Assessment
                <ArrowLeft className="ml-2 h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  const currentQuestion = assessment?.questions?.at(currentQuestionIndex)

  return (
    <div className="min-h-screen   p-4">
      <div className="max-w-4xl ">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 bg-white border-white/20"
        >
          <h1 className="text-3xl font-bold text-gray-800">Post Assessment</h1>
          <p className="text-sm text-gray-500 mt-1">
            This assessment will help us understand your current knowledge level
          </p>
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-white overflow-hidden "
        >
          <div className="p-8">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-blue-600">
                  Question {currentQuestionIndex + 1} of{" "}
                  {assessment.questions.length}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(
                    ((currentQuestionIndex + 1) / assessment.questions.length) *
                      100
                  )}
                  % Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <motion.div
                  className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      ((currentQuestionIndex + 1) /
                        assessment.questions.length) *
                      100
                    }%`,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            <h2 className="text-xl font-bold mb-6">{currentQuestion.text}</h2>

            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <button
                    onClick={() => handleOptionSelect(index)}
                    className={`w-full text-left p-4 border rounded-lg transition-all ${
                      selectedOption === index
                        ? "border-blue-500 bg-blue-50 shadow-inner"
                        : "border-gray-200 hover:border-blue-300 bg-white/70"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 transition-colors ${
                          selectedOption === index
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNextQuestion}
                disabled={selectedOption === null}
                className={`px-6 py-2.5 rounded-lg font-medium flex items-center ${
                  selectedOption !== null
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-md"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                {currentQuestionIndex < assessment.questions.length - 1
                  ? "Next Question"
                  : "Submit Assessment"}
                <ChevronRight className="ml-1 h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PreAssessmentPage
