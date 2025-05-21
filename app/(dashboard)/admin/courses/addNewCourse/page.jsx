"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CreateCoursePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "modules",
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
      setValue("thumbnail", file); // Update form value with the File object
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("status", data.status);
      formData.append("category", data.category);
      formData.append("modules", JSON.stringify(data.modules));

      const response = await fetch("/api/courses", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create course");
      }

      const result = await response.json();
      toast.success("Course created successfully!");
      reset();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addNewModule = () => {
    append({
      title: "",
      description: "",
      contentType: "",
      order: fields.length + 1,
      duration: "",
      resources: "",
    });
  };

  const removeModule = (index) => {
    if (fields.length > 1) {
      remove(index);
    } else {
      toast.error("You need at least one module");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Course</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                  // required: "Thumbnail is required",
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

              {/* Thumbnail preview */}
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium mb-4">Course Modules</h2>

          <div className="space-y-6">
            {fields.map((module, index) => (
              <div
                key={module.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Module {index + 1}</h3>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeModule(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor={`modules.${index}.title`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Module Title *
                    </label>
                    <input
                      id={`modules.${index}.title`}
                      type="text"
                      {...register(`modules.${index}.title`, {
                        required: "Module title is required",
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.modules?.[index]?.title && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.modules[index].title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`modules.${index}.order`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Order *
                    </label>
                    <input
                      id={`modules.${index}.order`}
                      type="number"
                      {...register(`modules.${index}.order`, {
                        required: "Order is required",
                        valueAsNumber: true,
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.modules?.[index]?.order && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.modules[index].order.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor={`modules.${index}.description`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id={`modules.${index}.description`}
                    rows={2}
                    {...register(`modules.${index}.description`)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor={`modules.${index}.contentType`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Content Type *
                    </label>
                    <select
                      id={`modules.${index}.contentType`}
                      {...register(`modules.${index}.contentType`, {
                        required: "Content type is required",
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Select content type</option>
                      <option value="markdown">Markdown</option>
                      <option value="html">HTML</option>
                      <option value="video">Video</option>
                      <option value="pdf">PDF</option>
                    </select>
                    {errors.modules?.[index]?.contentType && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.modules[index].contentType.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`modules.${index}.duration`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Duration (minutes)
                    </label>
                    <input
                      id={`modules.${index}.duration`}
                      type="number"
                      {...register(`modules.${index}.duration`, {
                        valueAsNumber: true,
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor={`modules.${index}.content`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {watch(`modules.${index}.contentType`) === "video"
                      ? "Video URL"
                      : "Content"}{" "}
                    *
                  </label>
                  {watch(`modules.${index}.contentType`) === "video" ? (
                    <input
                      type="url"
                      {...register(`modules.${index}.content`, {
                        required: "Video URL is required",
                        pattern: {
                          value: /^(https?:\/\/).*/,
                          message:
                            "Must be a valid URL starting with http:// or https://",
                        },
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="https://example.com/video.mp4"
                    />
                  ) : (
                    <textarea
                      rows={4}
                      {...register(`modules.${index}.content`, {
                        required: "Content is required",
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder={
                        watch(`modules.${index}.contentType`) === "markdown"
                          ? "Enter markdown content..."
                          : "Enter HTML content..."
                      }
                    />
                  )}
                  {errors.modules?.[index]?.content && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.modules[index].content.message}
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <label
                    htmlFor={`modules.${index}.resources`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Resources (comma separated URLs)
                  </label>
                  <input
                    id={`modules.${index}.resources`}
                    type="text"
                    {...register(`modules.${index}.resources`)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addNewModule}
            className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
  );
}

const handleContentTypeChange = (index, value) => {
  // Clear content when changing type
  setValue(`modules.${index}.content`, "");
};
