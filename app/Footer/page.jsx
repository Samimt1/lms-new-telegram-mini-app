"use client";

import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="bg-cover bg-center text-white py-12"
      style={{ backgroundImage: `url('/footer.jpg')` }}
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">About Us</h3>
          <p className="text-gray-300 text-sm sm:text-base">
            We provide high-quality online courses to help you master new skills
            and advance your career.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {["Home", "Courses", "Blog", "Contact"].map((link, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4 justify-center md:justify-start">
            {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map(
              (Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="text-gray-400 hover:text-white text-2xl transition duration-300"
                >
                  <Icon />
                </a>
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="text-center text-white mt-8 border-t border-gray-700 pt-4">
        <p className="text-sm sm:text-base">
          © {new Date().getFullYear()} LMS Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
