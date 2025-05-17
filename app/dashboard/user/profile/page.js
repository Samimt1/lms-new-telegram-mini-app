"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Edit, Save, X, Upload, User } from "lucide-react";
import { useTheme } from "next-themes";

export default function Profile() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Student",
    email: "john.student@example.com",
    bio: "Computer Science student passionate about web development and AI technologies.",
    image: "/ai.jpg",
    joinedDate: "2023-05-15",
    coursesCompleted: 8,
    currentCourses: 3,
  });
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would typically send the updated profile to your backend
    console.log("Profile updated:", profile);
  };

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold dark:text-white flex items-center gap-2">
          <User className="h-8 w-8 text-primary" />
          My Profile
        </h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isEditing
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-primary hover:bg-primary/90 text-primary-foreground"
          }`}
        >
          {isEditing ? (
            <>
              <X className="h-5 w-5" />
              Cancel
            </>
          ) : (
            <>
              <Edit className="h-5 w-5" />
              Edit Profile
            </>
          )}
        </button>
      </div>

      <div
        className={`bg-background p-6 rounded-xl shadow-lg ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        } border`}
      >
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                {profile.image ? (
                  <Image
                    src={profile.image}
                    alt="Profile"
                    fill
                    className="rounded-full object-cover border-4 border-primary/20"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-4xl font-bold text-gray-600 dark:text-gray-300">
                    {profile.name.charAt(0)}
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={triggerFileInput}
                className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg"
              >
                <Upload className="h-5 w-5" />
                Change Photo
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              ></textarea>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium"
            >
              <Save className="h-5 w-5" />
              Save Changes
            </button>
          </form>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative w-32 h-32 shrink-0">
                {profile.image ? (
                  <Image
                    src={profile.image}
                    alt="Profile"
                    fill
                    className="rounded-full object-cover border-4 border-primary/20"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-4xl font-bold text-gray-600 dark:text-gray-300">
                    {profile.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold dark:text-white">
                  {profile.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {profile.email}
                </p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {profile.bio}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-secondary/30 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Member Since
                </h4>
                <p className="text-lg font-semibold dark:text-white">
                  {new Date(profile.joinedDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
              <div className="bg-secondary/30 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Courses Completed
                </h4>
                <p className="text-lg font-semibold dark:text-white">
                  {profile.coursesCompleted}
                </p>
              </div>
              <div className="bg-secondary/30 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Current Courses
                </h4>
                <p className="text-lg font-semibold dark:text-white">
                  {profile.currentCourses}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
