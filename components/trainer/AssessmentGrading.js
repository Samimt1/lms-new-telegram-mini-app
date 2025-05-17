// components/trainer/AssessmentGrading.js
"use client"; // Add this directive for Next.js client components
import { useState } from "react";

export default function AssessmentGrading() {
  const [activeTab, setActiveTab] = useState("create");
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "JavaScript Basics Quiz",
      course: "Advanced JavaScript",
      dueDate: "2023-06-15",
      submissions: 18,
      graded: 12,
    },
    {
      id: 2,
      title: "React Component Project",
      course: "React Fundamentals",
      dueDate: "2023-06-20",
      submissions: 15,
      graded: 8,
    },
  ]);

  const [newAssignment, setNewAssignment] = useState({
    title: "",
    course: "",
    dueDate: "",
    description: "",
    questions: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new assignment to the list
    const newId =
      assignments.length > 0
        ? Math.max(...assignments.map((a) => a.id)) + 1
        : 1;
    setAssignments([
      ...assignments,
      {
        id: newId,
        title: newAssignment.title,
        course: newAssignment.course,
        dueDate: newAssignment.dueDate,
        submissions: 0,
        graded: 0,
      },
    ]);

    // Reset form
    setNewAssignment({
      title: "",
      course: "",
      dueDate: "",
      description: "",
      questions: [],
    });

    alert("Assignment created successfully!");
  };

  // Rest of your component remains the same...
  return <div>{/* Existing JSX */}</div>;
}
