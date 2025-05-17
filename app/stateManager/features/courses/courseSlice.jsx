import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  courses: [
    {
      id: 1,
      title: "Sales Training Fundamentals",
      description: "Learn the basics of effective sales techniques",
      category: "Sales Training",
      trainer: "Trainer John",
      duration: "4 weeks",
      modules: 5,
      status: "active",
      content: ["intro.pdf", "video1.mp4"],
      createdAt: "2023-01-10",
      quiz: null,
      certificates: [],
      completedBy: [],
      passedBy: [],
    },
    {
      id: 2,
      title: "Advanced Digital Marketing",
      description: "Master SEO, social media, and PPC advertising strategies",
      category: "Digital Marketing",
      trainer: "Marketing Mary",
      duration: "6 weeks",
      modules: 8,
      status: "active",
      content: ["seo-guide.pdf", "facebook-ads.mp4", "case-study.pdf"],
      createdAt: "2023-02-15",
      quiz: null,
      certificates: [],
      completedBy: [],
      passedBy: [],
    },
    {
      id: 3,
      title: "Leadership Development Program",
      description: "Develop essential leadership skills for modern managers",
      category: "Leadership",
      trainer: "Executive Emma",
      duration: "8 weeks",
      modules: 6,
      status: "active",
      content: [
        "leadership-handbook.pdf",
        "motivation.mp4",
        "team-building.pdf",
      ],
      createdAt: "2023-03-05",
      quiz: null,
      certificates: [],
      completedBy: [],
      passedBy: [],
    },
  ],

  // categories: [
  //   "Sales Training",
  //   "HR Compliance",
  //   "Technical Skills",
  //   "Soft Skills",
  // ],
  // stats: {
  //   total: 4,
  //   active: 4,
  //   archived: 0,
  //   withQuizzes: 0,
  //   certified: 0,

  //   byCategory: {
  //     "Sales Training": 1,
  //     "HR Compliance": 1,
  //     "Technical Skills": 1,
  //     "Soft Skills": 1,

  //   },
  // },

  status: "idle",
  error: null,
  loading: false,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      const newCourse = {
        ...action.payload,
        id:
          state.courses.length > 0
            ? Math.max(...state.courses.map((course) => course.id)) + 1
            : 1,
        modules: action.payload.modules || 0,
        content: action.payload.content || [],
        quiz: null,
        certificates: [],
        completedBy: [],
        passedBy: [],
        createdAt: new Date().toISOString(),
        thumbnail: action.payload.thumbnail || "default-thumbnail.jpg",
      };

      state.courses.push(newCourse);

      // Update stats
      // state.stats.total += 1;
      // state.stats[newCourse.status] = (state.stats[newCourse.status] || 0) + 1;

      // if (state.stats.byCategory[newCourse.category]) {
      //   state.stats.byCategory[newCourse.category] += 1;
      // } else {
      //   state.stats.byCategory[newCourse.category] = 1;
      // }
    },

    updateCourse: (state, action) => {
      const index = state.courses.findIndex(
        (course) => course.id === action.payload.id
      );
      if (index !== -1) {
        const originalCourse = state.courses[index];

        // Preserve fields that shouldn't be overwritten
        const updatedCourse = {
          ...originalCourse,
          ...action.payload,

          // Preserve these arrays unless explicitly provided
          content: action.payload.content || originalCourse.content,
          certificates: originalCourse.certificates,
          completedBy: originalCourse.completedBy,
          passedBy: originalCourse.passedBy,
          quiz: originalCourse.quiz,
          createdAt: originalCourse.createdAt,
        };

        // Update stats if status changed

        if (
          action.payload.status &&
          action.payload.status !== originalCourse.status
        ) {
          state.stats[originalCourse.status] -= 1;
          state.stats[action.payload.status] =
            (state.stats[action.payload.status] || 0) + 1;
        }

        // // Update stats if category changed
        // if (action.payload.category && action.payload.category !== originalCourse.category) {
        //   state.stats.byCategory[originalCourse.category] -= 1;

        //   if (state.stats.byCategory[action.payload.category]) {
        //     state.stats.byCategory[action.payload.category] += 1;
        //   } else {
        //     state.stats.byCategory[action.payload.category] = 1;
        //   }
        // }

        state.courses[index] = updatedCourse;
      }
    },
    deleteCourse: (state, action) => {
      const courseToDelete = state.courses.find(
        (course) => course.id === action.payload
      );
      if (courseToDelete) {
        // Update stats
        // state.stats.total -= 1;
        // state.stats[courseToDelete.status] -= 1;
        // state.stats.byCategory[courseToDelete.category] -= 1;

        // if (courseToDelete.quiz) {
        //   state.stats.withQuizzes -= 1;
        // }
        // if (courseToDelete.certificates.length > 0) {
        //   state.stats.certified -= courseToDelete.certificates.length;
        // }

        state.courses = state.courses.filter(
          (course) => course.id !== action.payload
        );
      }
    },
    addCategory: (state, action) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
    addAssignment: (state, action) => {
      const { courseId, assignment } = action.payload;
      const course = state.courses.find((c) => c.id === courseId);
      if (course) {
        course.assignments.push(assignment);
      }
    },
    updateAssignment: (state, action) => {
      const { courseId, assignment } = action.payload;
      const course = state.courses.find((c) => c.id === courseId);
      if (course) {
        const index = course.assignments.findIndex(
          (a) => a.id === assignment.id
        );
        if (index !== -1) {
          course.assignments[index] = assignment;
        }
      }
    },

    recordCompletion: (state, action) => {
      const { courseId, userId, score } = action.payload;
      const course = state.courses.find((c) => c.id === courseId);
      if (course) {
        if (!course.completedBy.includes(userId)) {
          course.completedBy.push(userId);
        }

        // Record quiz score if passed
        if (course.quiz && score >= course.quiz.passingScore) {
          if (!course.passedBy.includes(userId)) {
            course.passedBy.push(userId);
          }

          // Auto-issue certificate if enabled
          if (course.quiz.certificate?.autoIssue) {
            const certificateId = `cert-${Date.now()}`;
            course.certificates.push({
              id: certificateId,
              userId,
              issuedAt: new Date().toISOString(),
              revoked: false,
            });
            state.stats.certified += 1;
          }
        }
      }
    },
    issueCertificate: (state, action) => {
      const { courseId, userId } = action.payload;
      const course = state.courses.find((c) => c.id === courseId);
      if (course) {
        const certificateId = `cert-${Date.now()}`;
        course.certificates.push({
          id: certificateId,
          userId,
          issuedAt: new Date().toISOString(),
          revoked: false,
        });
        state.stats.certified += 1;
      }
    },
    revokeCertificate: (state, action) => {
      const { courseId, certificateId } = action.payload;
      const course = state.courses.find((c) => c.id === courseId);
      if (course) {
        const certIndex = course.certificates.findIndex(
          (c) => c.id === certificateId
        );
        if (certIndex !== -1 && !course.certificates[certIndex].revoked) {
          course.certificates[certIndex].revoked = true;
          state.stats.certified -= 1;
        }
      }
    },
    reinstateCertificate: (state, action) => {
      const { courseId, certificateId } = action.payload;
      const course = state.courses.find((c) => c.id === courseId);
      if (course) {
        const certIndex = course.certificates.findIndex(
          (c) => c.id === certificateId
        );
        if (certIndex !== -1 && course.certificates[certIndex].revoked) {
          course.certificates[certIndex].revoked = false;
          state.stats.certified += 1;
        }
      }
    },
  },
});

export const {
  addCourse,
  updateCourse,
  deleteCourse,
  addCategory,
  addAssignment,
  updateAssignment,
  recordCompletion,
  issueCertificate,
  revokeCertificate,
  reinstateCertificate,
} = coursesSlice.actions;

export default coursesSlice.reducer;

// Selectors
export const selectAllCourses = (state) => state.courses.courses;
export const selectCourseById = (state, courseId) =>
  state.courses.courses.find((course) => course.id === courseId);
export const selectCategories = (state) => state.courses.categories;
export const selectCourseStats = (state) => state.courses.stats;
export const selectCourseQuiz = (state, courseId) => {
  const course = state.courses.courses.find((c) => c.id === courseId);
  return course?.quiz || null;
};
export const selectCourseCertificates = (state, courseId) => {
  const course = state.courses.courses.find((c) => c.id === courseId);
  return course?.certificates || [];
};

export const selectCourseCompletions = (state, courseId) => {
  const course = state.courses.courses.find((c) => c.id === courseId);
  return course?.completedBy || [];
};
export const selectCoursePasses = (state, courseId) => {
  const course = state.courses.courses.find((c) => c.id === courseId);
  return course?.passedBy || [];
};
