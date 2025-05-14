"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import bgImage from "@/public/bgn.jpg"; // Moved to /public
import Header from "./Navbar/page"
import FeaturesSection from "./FeatureSection/page"
import PopularCourses from "./PopularCourses/page";
import BlogSection from "./Blogs/page"
import TestimonialSection from "./Testimonials/page"
import Footer from "./Footer/page";
import { TypeAnimation } from "react-type-animation";

const HeroSection = () => {
  return (
    <div>
      <Header />
      <div
        className=" min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('/bgn.jpg')` }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center px-6 sm:px-12"
        >
          Learn, Anywhere
        </motion.h2>

       
        <TypeAnimation
          sequence={["   Upgrade Your Skills with Our Online Courses.", 2000, "", 500,
          ]}
          wrapper="p"
          speed={50}
          style={{ fontSize: "2em", display: "inline-block" }}
          repeat={Infinity}
          className="text-white"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link
            href="/Signup"
            className="mt-6 inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-md shadow-md transition duration-300"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
      <section id="features" className="min-h-screen">
        <FeaturesSection />
      </section>
      <section id="courses" className="min-h-screen">
        <PopularCourses />
      </section>
      <section id="blogs" className="min-h-screen">
        <BlogSection />
      </section>
      <section id="testimonials" className="min-h-screen">
        <TestimonialSection />
      </section>
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
};

export default HeroSection;
