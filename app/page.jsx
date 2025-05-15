"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "./Navbar/page";
import FeaturesSection from "./FeatureSection/page";
import PopularCourses from "./PopularCourses/page";
import BlogSection from "./Blogs/page";
import TestimonialSection from "./Testimonials/page";
import Footer from "./Footer/page";
import { TypeAnimation } from "react-type-animation";

const HeroSection = () => {
  return (
    <div className="dark:bg-gray-900 transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      <div
        className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('/bgn.jpg')` }}
      >
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-0"></div>

        <div className="relative z-10 text-center px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
          >
            Learn, Anywhere
          </motion.h2>

          <TypeAnimation
            sequence={[
              "Upgrade Your Skills with Our Online Courses.",
              2000,
              "Learn at Your Own Pace.",
              2000,
              "Expert-Led Courses.",
              2000,
            ]}
            wrapper="p"
            speed={50}
            style={{ fontSize: "2em", display: "inline-block" }}
            repeat={Infinity}
            className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-8"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/login"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-md shadow-md transition duration-300"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Sections with dark mode support */}
      <section
        id="features"
        className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
      >
        <FeaturesSection />
      </section>

      <section
        id="courses"
        className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
      >
        <PopularCourses />
      </section>

      <section
        id="blogs"
        className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
      >
        <BlogSection />
      </section>

      <section
        id="testimonials"
        className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
      >
        <TestimonialSection />
      </section>

      <section
        id="contact"
        className="bg-white dark:bg-gray-900 transition-colors duration-300"
      >
        <Footer />
      </section>
    </div>
  );
};

export default HeroSection;
