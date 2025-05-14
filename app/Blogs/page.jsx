"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const blogs = [
  {
    id: 1,
    title: "Top 10 Skills for 2025",
    description:
      "Discover the most in-demand skills that will help you stay ahead in the job market.",
    image: "/blog1.jpg",
    link: "/blog/top-10-skills",
  },
  {
    id: 2,
    title: "How to Learn Faster and Retain More",
    description:
      "Practical tips and strategies to boost your learning speed and memory retention.",
    image: "/blog2.jpg",
    link: "/blog/learn-faster",
  },
  {
    id: 3,
    title: "Why Online Learning is the Future",
    description:
      "Explore the benefits of e-learning and how it is revolutionizing education.",
    image: "/blog3.jpg",
    link: "/blog/online-learning",
  },
];

export default function BlogSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative py-16"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-fixed bg-center"
        style={{
          backgroundImage: `url(/blog.jpg)`,
          zIndex: -1,
        }}
      />

      <section className="relative z-10 bg-transparent bg-opacity-50 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Latest Blog Posts
          </h2>
          <TypeAnimation
            sequence={[
              " Stay updated with our latest insights and learning strategies. ",
              2000,
              "",
              500,
            ]}
            wrapper="p"
            speed={50}
            style={{ fontSize: "2em", display: "inline-block" }}
            repeat={Infinity}
            className="text-white mb-12 text-1xl"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white dark:bg-[#0B1120] rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
              >
                <div className="relative w-full h-56">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-200 mt-3 text-sm md:text-base">
                    {blog.description}
                  </p>
                  <Link
                    href={blog.link}
                    className="mt-4 inline-block bg-yellow-500 dark:bg-white text-white dark:text-gray-800 px-4 py-2 rounded-md hover:bg-yellow-600 dark:hover:bg-gray-300 dark:hover:text-blue-950 transition"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
