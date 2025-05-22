"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function CreateCoursePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "",
      status: "draft",
      category: "",
      modules: [
        {
          title: "",
          description: "",
          contentType: "",
          content: "",
          order: 1,
          duration: "",
          resources: "",
          quiz: {
            title: "",
            questions: [
              {
                text: "",
                options: ["", "", "", ""],
                correct: "",
              },
            ],
          },
        },
      ],
    },
  })

  const {
    fields: moduleFields,
    append: appendModule,
    remove: removeModule,
  } = useFieldArray({
    control,
    name: "modules",
  })

  const [thumbnailPreview, setThumbnailPreview] = useState(null)

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setThumbnailPreview(previewUrl)
      setValue("thumbnail", file)
    }
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("description", data.description)
      formData.append("status", data.status)
      formData.append("thumbnail", data.thumbnail)
      formData.append("category", data.category)
      formData.append("modules", JSON.stringify(data.modules))

      const response = await fetch("/api/courses", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to create course")
      }

      const result = await response.json()
      console.log(formData)
      toast.success("Course created successfully!")
      reset()
    } catch (error) {
      toast.error(error.message || "Something went wrong")
    } finally {
      setIsSubmitting(false)
      setThumbnailPreview(null)
    }
  }

  const addNewModule = () => {
    appendModule({
      title: "",
      description: "",
      contentType: "",
      order: moduleFields.length + 1,
      duration: "",
      resources: "",
      quiz: {
        title: "",
        questions: [
          {
            text: "",
            options: ["", "", "", ""],
            correct: "",
          },
        ],
      },
    })
  }

  const removeModuleAtIndex = (index) => {
    if (moduleFields.length > 1) {
      removeModule(index)
    } else {
      toast.error("You need at least one module")
    }
  }

  const addQuestionToQuiz = (moduleIndex) => {
    const questions = watch(`modules.${moduleIndex}.quiz.questions`)
    setValue(`modules.${moduleIndex}.quiz.questions`, [
      ...questions,
      {
        text: "",
        options: ["", "", "", ""],
        correct: "",
      },
    ])
  }

  const removeQuestionFromQuiz = (moduleIndex, questionIndex) => {
    const questions = watch(`modules.${moduleIndex}.quiz.questions`)
    if (questions.length > 1) {
      const newQuestions = [...questions]
      newQuestions.splice(questionIndex, 1)
      setValue(`modules.${moduleIndex}.quiz.questions`, newQuestions)
    } else {
      toast.error("Quiz must have at least one question")
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Course</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Course Basic Info Section */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Course Title *
              </label>
              <input
                id="title"
                type="text"
                {...register("title", { required: "Course title is required" })}
                className="mt-1 py-2 border px-3 focus:outline-none focus:border-gray-400 block w-full rounded-md border-gray-300 sm:text-sm"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description *
              </label>
              <textarea
                id="description"
                rows={3}
                {...register("description", {
                  required: "Description is required",
                })}
                className="mt-1 py-2 border px-3 focus:outline-none focus:border-gray-400 block w-full rounded-md border-gray-300 sm:text-sm"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium text-gray-700"
              >
                Thumbnail *
              </label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                {...register("thumbnail", {
                  onChange: (e) => handleThumbnailChange(e),
                })}
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100"
              />
              {errors.thumbnail && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.thumbnail.message}
                </p>
              )}

              {thumbnailPreview && (
                <div className="mt-2">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="h-32 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status *
              </label>
              <select
                id="status"
                {...register("status", { required: "Status is required" })}
                className="mt-1 py-2 border px-3 focus:outline-none focus:border-gray-400 block w-full rounded-md border-gray-300 sm:text-sm"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category *
              </label>
              <input
                id="category"
                type="text"
                {...register("category", { required: "Category is required" })}
                className="mt-1 py-2 border px-3 focus:outline-none focus:border-gray-400 block w-full rounded-md border-gray-300 sm:text-sm"
              />
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Modules Section */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium mb-4">Course Modules</h2>

          <div className="space-y-6">
            {moduleFields.map((module, moduleIndex) => (
              <div
                key={module.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Module {moduleIndex + 1}</h3>
                  {moduleFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeModuleAtIndex(moduleIndex)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove Module
                    </button>
                  )}
                </div>

                {/* Module Content */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor={`modules.${moduleIndex}.title`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Module Title *
                    </label>
                    <input
                      id={`modules.${moduleIndex}.title`}
                      type="text"
                      {...register(`modules.${moduleIndex}.title`, {
                        required: "Module title is required",
                      })}
                      className="mt-1 py-2 border px-3 focus:outline-none focus:border-gray-400 block w-full rounded-md border-gray-300 sm:text-sm"
                    />
                    {errors.modules?.[moduleIndex]?.title && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.modules[moduleIndex].title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`modules.${moduleIndex}.order`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Order *
                    </label>
                    <input
                      id={`modules.${moduleIndex}.order`}
                      type="number"
                      {...register(`modules.${moduleIndex}.order`, {
                        required: "Order is required",
                        valueAsNumber: true,
                      })}
                      className="mt-1 py-2 border px-3 focus:outline-none focus:border-gray-400 block w-full rounded-md border-gray-300 sm:text-sm"
                    />
                    {errors.modules?.[moduleIndex]?.order && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.modules[moduleIndex].order.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor={`modules.${moduleIndex}.description`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id={`modules.${moduleIndex}.description`}
                    rows={2}
                    {...register(`modules.${moduleIndex}.description`)}
                    className="mt-1 py-2 border px-3 focus:outline-none focus:border-gray-400 block w-full rounded-md border-gray-300 sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor={`modules.${moduleIndex}.contentType`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Content Type *
                    </label>
                    <select
                      id={`modules.${moduleIndex}.contentType`}
                      {...register(`modules.${moduleIndex}.contentType`, {
                        required: "Content type is required",
                      })}
                      className="mt-1 py-2 border px-3 focus:outline-none focus:border-gray-400 block w-full rounded-md border-gray-300 sm:text-sm"
                    >
                      <option value="">Select content type</option>
                      <option value="markdown">Markdown</option>
                      <option value="html">HTML</option>
                      <option value="video">Video</option>
                    </select>
                    {errors.modules?.[moduleIndex]?.contentType && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.modules[moduleIndex].contentType.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`modules.${moduleIndex}.duration`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Duration (minutes)
                    </label>
                    <input
                      id={`modules.${moduleIndex}.duration`}
                      type="number"
                      {...register(`modules.${moduleIndex}.duration`, {
                        valueAsNumber: true,
                      })}
                      className="mt-1 py-2 border px-3 focus:outline-none focus:border-gray-400 block w-full rounded-md border-gray-300 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor={`modules.${moduleIndex}.content`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {watch(`modules.${moduleIndex}.contentType`) === "video"
                      ? "Video URL"
                      : "Content"}{" "}
                    *
                  </label>
                  {watch(`modules.${moduleIndex}.contentType`) === "video" ? (
                    <input
                      type="url"
                      {...register(`modules.${moduleIndex}.content`, {
                        required: "Video URL is required",
                        pattern: {
                          value: /^(https?:\/\/).*/,
                          message:
                            "Must be a valid URL starting with http:// or https://",
                        },
                      })}
                      className="mt-1 py-2 border px-3 focus:outline-none focus:border-gray-400 block w-full rounded-md border-gray-300 sm:text-sm"
                      placeholder="https://example.com/video.mp4"
                    />
                  ) : (
                    <textarea
                      rows={4}
                      {...register(`modules.${moduleIndex}.content`, {
                        required: "Content is required",
                      })}
                      className="mt-1 py-2 border px-3 focus:outline-none focus:border-gray-400 block w-full rounded-md border-gray-300 sm:text-sm"
                      placeholder={
                        watch(`modules.${moduleIndex}.contentType`) ===
                        "markdown"
                          ? "Enter markdown content..."
                          : "Enter HTML content..."
                      }
                    />
                  )}
                  {errors.modules?.[moduleIndex]?.content && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.modules[moduleIndex].content.message}
                    </p>
                  )}
                </div>

                <div className="mt-4">
                  <label
                    htmlFor={`modules.${moduleIndex}.resources`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Resources (comma separated URLs)
                  </label>
                  <input
                    id={`modules.${moduleIndex}.resources`}
                    type="text"
                    {...register(`modules.${moduleIndex}.resources`)}
                    className="mt-1 py-2 border px-3 focus:outline-none focus:border-gray-400 block w-full rounded-md border-gray-300 sm:text-sm"
                  />
                </div>

                {/* Quiz Section for Module */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium mb-4">Module Quiz</h3>

                  <div className="mb-4">
                    <label
                      htmlFor={`modules.${moduleIndex}.quiz.title`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Quiz Title
                    </label>
                    <input
                      id={`modules.${moduleIndex}.quiz.title`}
                      type="text"
                      {...register(`modules.${moduleIndex}.quiz.title`)}
                      className="mt-1 py-2 border px-3 focus:outline-none focus:border-gray-400 block w-full rounded-md border-gray-300 sm:text-sm"
                      placeholder="Quiz title (optional)"
                    />
                  </div>

                  {watch(`modules.${moduleIndex}.quiz.questions`)?.map(
                    (question, questionIndex) => (
                      <div
                        key={questionIndex}
                        className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium">
                            Question {questionIndex + 1}
                          </h4>
                          {watch(`modules.${moduleIndex}.quiz.questions`)
                            .length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                removeQuestionFromQuiz(
                                  moduleIndex,
                                  questionIndex
                                )
                              }
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove Question
                            </button>
                          )}
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor={`modules.${moduleIndex}.quiz.questions.${questionIndex}.text`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Question Text *
                          </label>
                          <input
                            id={`modules.${moduleIndex}.quiz.questions.${questionIndex}.text`}
                            type="text"
                            {...register(
                              `modules.${moduleIndex}.quiz.questions.${questionIndex}.text`,
                              {
                                required: "Question text is required",
                              }
                            )}
                            className="mt-1 py-2 border px-3 focus:outline-none focus:border-gray-400 block w-full rounded-md border-gray-300 sm:text-sm"
                          />
                          {errors.modules?.[moduleIndex]?.quiz?.questions?.[
                            questionIndex
                          ]?.text && (
                            <p className="mt-1 text-sm text-red-600">
                              {
                                errors.modules[moduleIndex].quiz.questions[
                                  questionIndex
                                ].text.message
                              }
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Options *
                          </label>
                          {[0, 1, 2, 3].map((optionIndex) => (
                            <div
                              key={optionIndex}
                              className="flex items-center"
                            >
                              <input
                                type="radio"
                                {...register(
                                  `modules.${moduleIndex}.quiz.questions.${questionIndex}.correct`,
                                  {
                                    required:
                                      "Please select the correct answer",
                                  }
                                )}
                                value={optionIndex}
                                className="mr-2"
                              />
                              <input
                                type="text"
                                {...register(
                                  `modules.${moduleIndex}.quiz.questions.${questionIndex}.options.${optionIndex}`,
                                  {
                                    required: "Option text is required",
                                  }
                                )}
                                className="mt-1 py-2 border px-3 focus:outline-none focus:border-gray-400 block w-full rounded-md border-gray-300 sm:text-sm"
                                placeholder={`Option ${optionIndex + 1}`}
                              />
                            </div>
                          ))}
                          {errors.modules?.[moduleIndex]?.quiz?.questions?.[
                            questionIndex
                          ]?.correct && (
                            <p className="mt-1 text-sm text-red-600">
                              {
                                errors.modules[moduleIndex].quiz.questions[
                                  questionIndex
                                ].correct.message
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  )}

                  <button
                    type="button"
                    onClick={() => addQuestionToQuiz(moduleIndex)}
                    className="mt-2 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-lg text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Question
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addNewModule}
            className="mt-4 cursor-pointer inline-flex items-center px-7 py-2 border border-transparent text-sm leading-4 font-medium rounded-lg text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Another Module
          </button>
        </div>

        <div className="flex justify-end space-x-3 pt-6">
          <button
            type="button"
            onClick={() => router.push("/courses")}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Create Course"}
          </button>
        </div>
      </form>
    </div>
  )
}
