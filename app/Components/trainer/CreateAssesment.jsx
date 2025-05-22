"use client"
import { useState, useEffect } from "react"
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import toast from "react-hot-toast"

export default function AssessmentForm() {
  // State for form data
  const [newAssessment, setNewAssessment] = useState({
    title: "",
    courseId: "",
    description: "",
    type: "PRE",
    dueDate: "",
    questions: [],
    trainerId: "afeab98c-f820-492e-9d90-d7433393bf64", //This comes from redux store
  })

  // State for courses
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "/api/courses/trainer?trainerId=afeab98c-f820-492e-9d90-d7433393bf64"
        )
        const data = await response.json()
        setCourses(data)
      } catch (error) {
        console.error("Failed to fetch courses", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewAssessment((prev) => ({ ...prev, [name]: value }))
  }

  // Handle question changes
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...newAssessment.questions]
    updatedQuestions[index][field] = value
    setNewAssessment((prev) => ({ ...prev, questions: updatedQuestions }))
  }

  // Handle option changes
  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...newAssessment.questions]
    updatedQuestions[qIndex].options[oIndex] = value
    setNewAssessment((prev) => ({ ...prev, questions: updatedQuestions }))
  }

  // Add new question
  const addQuestion = () => {
    setNewAssessment((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          text: "",
          options: ["", "", "", ""],
          correct: "0", // Default to first option
        },
      ],
    }))
  }

  // Remove question
  const removeQuestion = (index) => {
    const updatedQuestions = [...newAssessment.questions]
    updatedQuestions.splice(index, 1)
    setNewAssessment((prev) => ({ ...prev, questions: updatedQuestions }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(newAssessment)
    try {
      const response = await fetch("/api/assessments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAssessment),
      })

      if (!response.ok) throw new Error("Failed to create assessment")

      const result = await response.json()
      toast.success("Assessment created successfully!")
      setNewAssessment({
        title: "",
        courseId: "",
        description: "",
        type: "PRE",
        dueDate: "",
        questions: [],
        trainerId: "e7f26fce-52f1-4923-a53f-3cd86f54be42", //This comes from redux store
      })
      // Reset form or redirect
    } catch (error) {
      console.error("Error:", error)
      toast.error("Failed to create assessment")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Assessment Title *
          </label>
          <input
            type="text"
            name="title"
            value={newAssessment.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            placeholder="Midterm Exam"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Course *
          </label>
          <select
            name="courseId"
            value={newAssessment.courseId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={loading}
          >
            <option value="">
              {loading ? "Loading courses..." : "Select a course"}
            </option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Assessment Type *
          </label>
          <select
            name="type"
            value={newAssessment.type}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="PRE">Pre-Assessment</option>
            <option value="POST">Post-Assessment</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Due Date *
          </label>
          <input
            type="date"
            name="dueDate"
            value={newAssessment.dueDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={newAssessment.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Provide instructions for this assessment..."
          />
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Questions
          </h3>
          <button
            type="button"
            onClick={addQuestion}
            className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Question
          </button>
        </div>

        {newAssessment.questions.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              No questions added yet. Click "Add Question" to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {newAssessment.questions.map((question, qIndex) => (
              <div
                key={qIndex}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-700 dark:text-gray-200">
                    Question {qIndex + 1}
                  </h4>
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600 text-sm flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Question Text *
                    </label>
                    <input
                      type="text"
                      value={question.text}
                      onChange={(e) =>
                        handleQuestionChange(qIndex, "text", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      placeholder="Enter your question"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Options *
                    </label>
                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <div
                          key={oIndex}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="radio"
                            name={`question-${qIndex}-correct`}
                            checked={question.correct === String(oIndex)}
                            onChange={() =>
                              handleQuestionChange(
                                qIndex,
                                "correct",
                                String(oIndex)
                              )
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(qIndex, oIndex, e.target.value)
                            }
                            className="flex-1 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                            placeholder={`Option ${oIndex + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-100 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          Save Draft
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={newAssessment.questions.length === 0}
        >
          Publish Assessment
        </button>
      </div>
    </form>
  )
}
