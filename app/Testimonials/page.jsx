"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "John Doe",
    review: "This platform transformed my career!",
    img: "/Wit1.jpg",
  },
  {
    name: "Jane Smith",
    review: "Highly recommend for skill improvement!",
    img: "/Wit2.jpg",
  },
  {
    name: "Michael Brown",
    review: "Engaging courses and great instructors!",
    img: "/Wit3.jpg",
  },
  {
    name: "Jane Smith",
    review: "Highly recommend for skill improvement!",
    img: "/Wit4.jpg",
  },
];

const TestimonialSection = () => {
  return (
    <div className="py-16 bg-gray-100 dark:bg-gray-900 ">
      <motion.h2
        className="text-3xl sm:text-4xl text-gray-800 dark:text-gray-200 font-bold text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        What Our Students Say
      </motion.h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="max-w-6xl mx-auto px-4"
      >
        {testimonials.map((test, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 text-center rounded-lg shadow-lg max-w-md"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={test.img}
                  alt={test.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic text-sm sm:text-base">
                {test.review}
              </p>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                - {test.name}
              </h3>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSection;
