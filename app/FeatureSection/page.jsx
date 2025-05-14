"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import bgim from "@/public/f.jpg"; // move f.jpg to /public folder

const features = [
  {
    title: "Interactive Courses",
    icon: "📚",
    desc: "Engaging learning modules with hands-on activities.",
  },
  {
    title: "Live Sessions",
    icon: "🎥",
    desc: "Real-time classes with industry experts.",
  },
  {
    title: "Track Progress",
    icon: "📊",
    desc: "Easily monitor and improve your learning journey.",
  },
];

const FeaturesSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative py-16"
    >
      {/* Parallax Background */}
      <div className="absolute inset-0 z-[-1]">
        <Image
          src={bgim}
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          className="bg-fixed"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="relative z-10 bg-transparent bg-opacity-50 py-16 px-4 sm:px-6 md:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold text-center mb-10">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 bg-white rounded-lg shadow-lg text-center transition-transform duration-300"
            >
              <div className="text-4xl sm:text-5xl">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mt-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base md:text-lg">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturesSection;
