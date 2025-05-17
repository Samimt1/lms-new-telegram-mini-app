"use client";

import { useState } from "react";
import { FiEdit, FiSave, FiX, FiUser, FiPhone, FiAward } from "react-icons/fi";

export default function ProfileSection() {
  const [profile, setProfile] = useState({
    name: "Trainer Name",
    email: "trainer@example.com",
    bio: "Experienced instructor with 5+ years of teaching web development courses.",
    phone: "+1 (555) 123-4567",
    expertise: "JavaScript, React, Node.js",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...profile });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(tempProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            My Profile
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isEditing
              ? "Update your profile information"
              : "View and manage your profile"}
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiEdit className="mr-2" />
            Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {!isEditing ? (
          <div className="p-6">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <img
                  className="h-20 w-20 rounded-full border-2 border-white shadow"
                  src={profile.avatar}
                  alt="Profile"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {profile.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {profile.email}
                </p>

                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                      <FiUser className="mr-2" /> About
                    </h4>
                    <p className="mt-1 text-gray-700 dark:text-gray-300 pl-6">
                      {profile.bio}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                      <FiPhone className="mr-2" /> Contact
                    </h4>
                    <p className="mt-1 text-gray-700 dark:text-gray-300 pl-6">
                      {profile.phone}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                      <FiAward className="mr-2" /> Expertise
                    </h4>
                    <div className="mt-1 pl-6">
                      {profile.expertise.split(",").map((skill, index) => (
                        <span
                          key={index}
                          className="inline-block bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-400 text-sm px-3 py-1 rounded-full mr-2 mb-2"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="flex items-start space-x-6 mb-6">
              <div className="flex-shrink-0">
                <img
                  className="h-20 w-20 rounded-full border-2 border-white shadow"
                  src={tempProfile.avatar}
                  alt="Profile"
                />
                <button
                  type="button"
                  className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600"
                >
                  Change photo
                </button>
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={tempProfile.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={tempProfile.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                    disabled
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={tempProfile.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={tempProfile.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Areas of Expertise
                  </label>
                  <input
                    type="text"
                    name="expertise"
                    value={tempProfile.expertise}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Separate skills with commas"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 border-t border-gray-200 dark:border-gray-700 pt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                <FiX className="mr-2" />
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiSave className="mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
