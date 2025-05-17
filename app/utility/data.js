export let role = "admin";
export const dummyUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Student",
    status: "Active",
    avatar: "/Admin_image/abrsh.jpg",
    joined: "2023-01-10",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Student",
    status: "Banned",
    avatar: "/Admin_image/abrsh.jpg",
    joined: "2023-02-20",
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael@example.com",
    role: "Student",
    status: "Active",
    avatar: "/Admin_image/abrsh.jpg",
    joined: "2023-03-15",
  },
  {
    id: "4",
    name: "Sarah Connor",
    email: "sarah@example.com",
    role: "Student",
    status: "Pending",
    avatar: "/Admin_image/abrsh.jpg",
    joined: "2023-04-01",
  },
  {
    id: "5",
    name: "Abraham Shiferaw",
    email: "abraham@example.com",
    role: "Student",
    status: "Active",
    avatar: "/Admin_image/abrsh.jpg",
    joined: "2023-01-10",
  },
];

export const enrollmentData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "August",
    "September",
    "October",
    "November",
    "Decebmber",
  ],
  datasets: [
    {
      label: "Enrollments",
      data: [12, 19, 3, 5, 2, 3, 8, 7, 2, 9, 18, 10],
      backgroundColor: "cyan",
    },
  ],
};

export const completionData = {
  labels: [
    "Sales Training",
    "HR Compliance",
    "Technical Skills",
    "Soft Skills",
  ],
  datasets: [
    {
      label: "Completion Rate (%)",
      data: [75, 68, 82, 90],
      backgroundColor: ["cyan", "yellow", "blue", "purple"],
    },
  ],
};

export const performanceData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Average Quiz Scores",
      data: [65, 59, 81, 72],
      borderColor: "cyan",
      backgroundColor: "cyan",
      fill: true,
    },
  ],
};
