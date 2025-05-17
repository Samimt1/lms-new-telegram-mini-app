// components/trainer/ProfileSection.js
"use client"; // Add this directive at the top
import { useState } from "react";

export default function ProfileSection() {
  const [profile, setProfile] = useState({
    name: "Trainer Name",
    email: "trainer@example.com",
    bio: "Experienced instructor with 5+ years of teaching web development courses.",
    phone: "+1 (555) 123-4567",
    expertise: "JavaScript, React, Node.js",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {!isEditing ? (
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-semibold">{profile.name}</h3>
                <p className="text-gray-600">{profile.email}</p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Edit Profile
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Bio</h4>
                <p className="mt-1 text-gray-800">{profile.bio}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                <p className="mt-1 text-gray-800">{profile.phone}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Areas of Expertise
                </h4>
                <p className="mt-1 text-gray-800">{profile.expertise}</p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 cursor-not-allowed"
                  disabled
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Areas of Expertise
                </label>
                <input
                  type="text"
                  name="expertise"
                  value={profile.expertise}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
