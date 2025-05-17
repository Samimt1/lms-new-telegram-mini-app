export default function MyCourses() {
  const courses = [
    { id: 1, title: "Introduction to React", progress: 100 },
    { id: 2, title: "Advanced JavaScript", progress: 65 },
    { id: 3, title: "Node.js Fundamentals", progress: 30 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Courses</h1>

      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-background border p-6 rounded-lg shadow"
          >
            <h3 className="text-xl font-semibold">{course.title}</h3>

            <div className="mt-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">
                  Progress: {course.progress}%
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    course.progress === 100 ? "bg-green-600" : "bg-primary"
                  }`}
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
