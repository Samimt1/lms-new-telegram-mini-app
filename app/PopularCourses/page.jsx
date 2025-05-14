"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const courses = [
  {
    title: "Full-Stack Web Development",
    image: "/gr.jpg",
    instructor: "John Doe",
    rating: 4.8,
    students: "12,000",
  },
  {
    title: "AI & Machine Learning",
    image: "/ai.jpg",
    instructor: "Jane Smith",
    rating: 4.7,
    students: "9,500",
  },
  {
    title: "Digital Marketing Mastery",
    image: "/dig.jpg",
    instructor: "Mike Johnson",
    rating: 4.6,
    students: "8,200",
  },
  {
    title: "UI/UX Design Essentials",
    image: "/UI.jpg",
    instructor: "Sarah Wilson",
    rating: 4.9,
    students: "10,300",
  },
];

export default function PopularCourses() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-[#0B1120]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12 pb-8">
          Popular Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {courses.map((c, idx) => {
            // create URL-friendly slug
            const slug = c.title.toLowerCase().replace(/\s+/g, "-");
            return (
              <motion.div
                key={slug}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="bg-white dark:bg-[#0B1120] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <div className="relative w-full h-52">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    {c.title}
                  </h3>
                  <p className="text-gray-600  dark:text-gray-200 mt-2">
                    Instructor: {c.instructor}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-yellow-500 dark:text-white font-medium text-lg">
                      ⭐ {c.rating}
                    </span>
                    <span className="text-gray-500 dark:text-gray-300 text-sm">
                      {c.students} Students
                    </span>
                  </div>
                  <Link href={`/course/${slug}`}>
                    <button className="mt-4 w-full bg-yellow-500 dark:bg-white text-white dark:text-gray-800 py-2 rounded-lg hover:bg-yellow-700 dark:hover:bg-blue-950 dark:hover:text-white  transition">
                      Enroll Now
                    </button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
