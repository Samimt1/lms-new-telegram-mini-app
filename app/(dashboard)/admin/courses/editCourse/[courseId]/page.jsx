'use client';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCourse, selectCourseById } from "@/stateManager/features/courses/courseSlices";
import { Plus, Trash2, Video, FileText, Link as LinkIcon, Upload, Image } from 'lucide-react';

const formLabelStyle = "block text-sm font-medium text-gray-700 mb-1";
const formInputStyle = "block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent";

const EditCourse = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Get the course from Redux store
  const existingCourse = useSelector(state => selectCourseById(state, id));

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    trainer: '',
    duration: '4 weeks',
    status: 'active',
    thumbnailFile: null,
    thumbnailPreview: '',
    chapters: [{
      title: '',
      lessons: [{
        title: '',
        content: '',
        contentType: 'text',
        duration: '',
        contentFile: null
      }]
    }]
  });

  // Load existing course data
  useEffect(() => {
    if (existingCourse) {
      setFormData({
        title: existingCourse.title,
        description: existingCourse.description,
        category: existingCourse.category,
        trainer: existingCourse.trainer,
        duration: existingCourse.duration,
        status: existingCourse.status,
        thumbnailFile: null,
        thumbnailPreview: existingCourse.thumbnail || '',
        chapters: existingCourse.chapters.map(chapter => ({
          ...chapter,
          lessons: chapter.lessons.map(lesson => ({
            ...lesson,
            contentFile: null // We'll handle file uploads separately
          }))
        })) || [{
          title: '',
          lessons: [{
            title: '',
            content: '',
            contentType: 'text',
            duration: '',
            contentFile: null
          }]
        }]
      });
      setIsLoading(false);
    }
  }, [existingCourse]);

  // Handle file upload for thumbnail
  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          thumbnailFile: file,
          thumbnailPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle file upload for lesson content
  const handleFileUpload = (chapterIndex, lessonIndex, file) => {
    const updatedChapters = [...formData.chapters];
    const lesson = updatedChapters[chapterIndex].lessons[lessonIndex];

    if (lesson.contentType === 'pdf') {
      lesson.contentFile = file;
      lesson.content = file.name;
    } else if (lesson.contentType === 'video') {
      lesson.contentFile = file;
      lesson.content = URL.createObjectURL(file);
    }

    setFormData(prev => ({
      ...prev,
      chapters: updatedChapters
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChapterChange = (index, field, value) => {
    const updatedChapters = [...formData.chapters];
    updatedChapters[index][field] = value;
    setFormData(prev => ({
      ...prev,
      chapters: updatedChapters
    }));
  };

  const handleLessonChange = (chapterIndex, lessonIndex, field, value) => {
    const updatedChapters = [...formData.chapters];
    updatedChapters[chapterIndex].lessons[lessonIndex][field] = value;
    setFormData(prev => ({
      ...prev,
      chapters: updatedChapters
    }));
  };

  const addChapter = () => {
    setFormData(prev => ({
      ...prev,
      chapters: [
        ...prev.chapters,
        {
          title: '',
          lessons: [{
            title: '',
            content: '',
            contentType: 'text',
            duration: '',
            contentFile: null
          }]
        }
      ]
    }));
    setActiveChapterIndex(formData.chapters.length);
    setActiveLessonIndex(0);
  };

  const addLesson = (chapterIndex) => {
    const updatedChapters = [...formData.chapters];
    updatedChapters[chapterIndex].lessons.push({
      title: '',
      content: '',
      contentType: 'text',
      duration: '',
      contentFile: null
    });

    setFormData(prev => ({
      ...prev,
      chapters: updatedChapters
    }));
    setActiveLessonIndex(updatedChapters[chapterIndex].lessons.length - 1);
  };

  const removeChapter = (index) => {
    const updatedChapters = formData.chapters.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      chapters: updatedChapters
    }));
    setActiveChapterIndex(Math.min(activeChapterIndex, updatedChapters.length - 1));
  };

  const removeLesson = (chapterIndex, lessonIndex) => {
    const updatedChapters = [...formData.chapters];
    updatedChapters[chapterIndex].lessons = updatedChapters[chapterIndex].lessons.filter((_, i) => i !== lessonIndex);
    setFormData(prev => ({
      ...prev,
      chapters: updatedChapters
    }));
    setActiveLessonIndex(Math.min(activeLessonIndex, updatedChapters[chapterIndex].lessons.length - 1));
  };

  const renderContentInput = (chapterIndex, lessonIndex) => {
    const lesson = formData.chapters[chapterIndex].lessons[lessonIndex];

    switch (lesson.contentType) {
      case 'text':
        return (
          <textarea
            value={lesson.content}
            onChange={(e) => handleLessonChange(chapterIndex, lessonIndex, 'content', e.target.value)}
            className={`${formInputStyle} h-32`}
            placeholder="Enter lesson text content"
          />
        );
      case 'video':
        return (
          <div>
            <label className={`${formLabelStyle} flex items-center justify-center px-4 py-6 border-2 border-dashed rounded-md cursor-pointer hover:border-blue-500`}>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) handleFileUpload(chapterIndex, lessonIndex, file);
                }}
                className="hidden"
              />
              {lesson.content ? (
                <div className="text-center">
                  <Video size={24} className="mx-auto mb-2" />
                  <p className="text-sm font-medium">{lesson.contentFile?.name || 'Video selected'}</p>
                  {lesson.content.startsWith('blob:') ? (
                    <video src={lesson.content} controls className="mt-2 max-h-40 mx-auto" />
                  ) : (
                    <p className="text-sm text-gray-500">Existing video: {lesson.content}</p>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <Upload size={24} className="mx-auto mb-2" />
                  <p className="text-sm font-medium">Upload Video File</p>
                  <p className="text-xs text-gray-500">MP4, WebM, etc.</p>
                </div>
              )}
            </label>
            <div className="mt-2">
              <label className={formLabelStyle}>Video Duration (minutes)</label>
              <input
                type="number"
                value={lesson.duration}
                onChange={(e) => handleLessonChange(chapterIndex, lessonIndex, 'duration', e.target.value)}
                className={formInputStyle}
                placeholder="Duration in minutes"
              />
            </div>
          </div>
        );
      case 'pdf':
        return (
          <div>
            <label className={`${formLabelStyle} flex items-center justify-center px-4 py-6 border-2 border-dashed rounded-md cursor-pointer hover:border-blue-500`}>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) handleFileUpload(chapterIndex, lessonIndex, file);
                }}
                className="hidden"
              />
              {lesson.content ? (
                <div className="text-center">
                  <FileText size={24} className="mx-auto mb-2" />
                  <p className="text-sm font-medium">{lesson.contentFile?.name || lesson.content}</p>
                </div>
              ) : (
                <div className="text-center">
                  <Upload size={24} className="mx-auto mb-2" />
                  <p className="text-sm font-medium">Upload PDF File</p>
                  <p className="text-xs text-gray-500">PDF documents only</p>
                </div>
              )}
            </label>
          </div>
        );
      case 'link':
        return (
          <input
            type="text"
            value={lesson.content}
            onChange={(e) => handleLessonChange(chapterIndex, lessonIndex, 'content', e.target.value)}
            className={formInputStyle}
            placeholder="Enter external link URL"
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for upload
    const uploadData = new FormData();

    // Add thumbnail if exists
    if (formData.thumbnailFile) {
      uploadData.append('thumbnail', formData.thumbnailFile);
    }

    // Add all content files
    formData.chapters.forEach((chapter, cIndex) => {
      chapter.lessons.forEach((lesson, lIndex) => {
        if (lesson.contentFile) {
          uploadData.append(`chapter-${cIndex}-lesson-${lIndex}-file`, lesson.contentFile);
        }
      });
    });

    // Add course data as JSON
    const courseData = {
      ...formData,
      id: existingCourse.id, // Keep the same ID
      thumbnail: formData.thumbnailFile ? formData.thumbnailPreview : existingCourse.thumbnail,
      chapters: formData.chapters.map(chapter => ({
        ...chapter,
        lessons: chapter.lessons.map(lesson => ({
          ...lesson,
          content: lesson.contentFile ? lesson.contentFile.name : lesson.content,
          contentFile: undefined // Remove file object before sending
        }))
      }))
    };
    uploadData.append('course', JSON.stringify(courseData));

    try {
      dispatch(updateCourse(courseData));
      router.push('/admin/courses');
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

 

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-gray-500 mb-6">Edit Course</h1>

      <form onSubmit={handleSubmit}>
        {/* Basic Course Information */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
            Course Details
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className={formLabelStyle}>
                Course Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={formInputStyle}
                placeholder="e.g., Advanced React Development"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className={formLabelStyle}>
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={formInputStyle}
                placeholder="Course category"
                required
              />
            </div>

            {/* Trainer */}
            <div>
              <label htmlFor="trainer" className={formLabelStyle}>
                Trainer
              </label>
              <input
                type="text"
                id="trainer"
                name="trainer"
                value={formData.trainer}
                onChange={handleChange}
                className={formInputStyle}
                placeholder="Instructor name"
                required
              />
            </div>

            {/* Duration */}
            <div>
              <label htmlFor="duration" className={formLabelStyle}>
                Duration
              </label>
              <select
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className={formInputStyle}
                required
              >
                <option value="2 weeks">2 weeks</option>
                <option value="3 weeks">3 weeks</option>
                <option value="4 weeks">1 month</option>
                <option value="6 weeks">6 weeks</option>
                <option value="8 weeks">2 month</option>
                <option value="12 weeks">3 month</option>
                <option value="24 weeks">6 month</option>
                <option value="52 weeks">1 year</option>
                <option value="not limited">not limited</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className={formLabelStyle}>
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={formInputStyle}
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className={formLabelStyle}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`${formInputStyle} h-32`}
              placeholder="Course description and objectives"
              required
            />
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className={formLabelStyle}>
              Course Thumbnail
            </label>
            <label className={`flex items-center justify-center px-4 py-6 border-2 border-dashed rounded-md cursor-pointer hover:border-blue-500 ${formData.thumbnailPreview ? 'border-blue-300' : 'border-gray-300'}`}>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="hidden"
              />
              {formData.thumbnailPreview ? (
                <div className="text-center">
                  <Image size={24} className="mx-auto mb-2" />
                  <img 
                    src={formData.thumbnailPreview} 
                    alt="Thumbnail preview" 
                    className="max-h-40 mx-auto mb-2"
                  />
                  <p className="text-sm text-blue-600">Change thumbnail</p>
                </div>
              ) : (
                <div className="text-center">
                  <Upload size={24} className="mx-auto mb-2" />
                  <p className="text-sm font-medium">Upload Thumbnail Image</p>
                  <p className="text-xs text-gray-500">JPG, PNG, etc.</p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Course Content */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-lg font-medium text-gray-800">Course Content</h3>
            <button
              type="button"
              onClick={addChapter}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <Plus size={16} className="mr-1" /> Add Chapter
            </button>
          </div>

          {formData.chapters.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No chapters added yet</p>
          ) : (
            <div className="space-y-6">
              {/* Chapters List */}
              <div className="flex overflow-x-auto pb-2 space-x-2">
                {formData.chapters.map((chapter, cIndex) => (
                  <button
                    key={cIndex}
                    type="button"
                    onClick={() => setActiveChapterIndex(cIndex)}
                    className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                      activeChapterIndex === cIndex
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {chapter.title || `Chapter ${cIndex + 1}`}
                  </button>
                ))}
              </div>

              {/* Active Chapter Content */}
              {formData.chapters.map((chapter, cIndex) => (
                <div
                  key={cIndex}
                  className={`space-y-4 ${activeChapterIndex === cIndex ? "block" : "hidden"}`}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-md font-medium text-gray-700">
                      {chapter.title || `Chapter ${cIndex + 1}`}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeChapter(cIndex)}
                      className="text-red-600 hover:text-red-800 text-sm flex items-center"
                    >
                      <Trash2 size={16} className="mr-1" /> Remove
                    </button>
                  </div>

                  {/* Chapter Title */}
                  <div>
                    <label className={formLabelStyle}>
                      Chapter Title
                    </label>
                    <input
                      type="text"
                      value={chapter.title}
                      onChange={(e) => handleChapterChange(cIndex, "title", e.target.value)}
                      className={formInputStyle}
                      placeholder="e.g., Introduction to React"
                      required
                    />
                  </div>

                  {/* Lessons */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h5 className="text-sm font-medium text-gray-600">Lessons</h5>
                      <button
                        type="button"
                        onClick={() => addLesson(cIndex)}
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        <Plus size={14} className="mr-1" /> Add Lesson
                      </button>
                    </div>

                    {chapter.lessons.length === 0 ? (
                      <p className="text-gray-500 text-center py-2">No lessons in this chapter</p>
                    ) : (
                      <div className="space-y-4">
                        {/* Lessons List */}
                        <div className="flex overflow-x-auto pb-2 space-x-2">
                          {chapter.lessons.map((lesson, lIndex) => (
                            <button
                              key={lIndex}
                              type="button"
                              onClick={() => setActiveLessonIndex(lIndex)}
                              className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
                                activeLessonIndex === lIndex
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                              }`}
                            >
                              {lesson.title || `Lesson ${lIndex + 1}`}
                            </button>
                          ))}
                        </div>

                        {/* Active Lesson Content */}
                        {chapter.lessons.map((lesson, lIndex) => (
                          <div
                            key={lIndex}
                            className={`space-y-4 p-4 border rounded-lg ${
                              activeLessonIndex === lIndex ? "block" : "hidden"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <h6 className="text-sm font-medium text-gray-700">
                                {lesson.title || `Lesson ${lIndex + 1}`}
                              </h6>
                              <button
                                type="button"
                                onClick={() => removeLesson(cIndex, lIndex)}
                                className="text-red-600 hover:text-red-800 text-xs flex items-center"
                              >
                                <Trash2 size={14} className="mr-1" /> Remove
                              </button>
                            </div>

                            {/* Lesson Title */}
                            <div>
                              <label className={formLabelStyle}>
                                Lesson Title
                              </label>
                              <input
                                type="text"
                                value={lesson.title}
                                onChange={(e) => handleLessonChange(cIndex, lIndex, "title", e.target.value)}
                                className={formInputStyle}
                                placeholder="e.g., What is React?"
                                required
                              />
                            </div>

                            {/* Content Type */}
                            <div>
                              <label className={formLabelStyle}>
                                Content Type
                              </label>
                              <div className="grid grid-cols-4 gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleLessonChange(cIndex, lIndex, "contentType", "text")}
                                  className={`flex items-center justify-center p-2 rounded border ${
                                    lesson.contentType === "text" ? "bg-blue-50 border-blue-300" : "border-gray-300"
                                  }`}
                                >
                                  <FileText size={16} className="mr-1" /> Text
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleLessonChange(cIndex, lIndex, "contentType", "video")}
                                  className={`flex items-center justify-center p-2 rounded border ${
                                    lesson.contentType === "video" ? "bg-blue-50 border-blue-300" : "border-gray-300"
                                  }`}
                                >
                                  <Video size={16} className="mr-1" /> Video
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleLessonChange(cIndex, lIndex, "contentType", "pdf")}
                                  className={`flex items-center justify-center p-2 rounded border ${
                                    lesson.contentType === "pdf" ? "bg-blue-50 border-blue-300" : "border-gray-300"
                                  }`}
                                >
                                  <FileText size={16} className="mr-1" /> PDF
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleLessonChange(cIndex, lIndex, "contentType", "link")}
                                  className={`flex items-center justify-center p-2 rounded border ${
                                    lesson.contentType === "link" ? "bg-blue-50 border-blue-300" : "border-gray-300"
                                  }`}
                                >
                                  <LinkIcon size={16} className="mr-1" /> Link
                                </button>
                              </div>
                            </div>

                            {/* Content Input */}
                            <div>
                              <label className={formLabelStyle}>
                                Content
                              </label>
                              {renderContentInput(cIndex, lIndex)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => router.push('/admin/courses')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Update Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;