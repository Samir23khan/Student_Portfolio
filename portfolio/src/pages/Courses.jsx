import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost/PortfolioApi/src/courses";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    course_name: "",
    description: "",
    instructor: "",
    duration: "",
    price: "",
    start_date: "",
    end_date: "",
    course_link: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.user_id;

  useEffect(() => {
    if (user_id) {
      fetchCourses(user_id);
    } else {
      alert("You need to log in first.");
    }
  }, [user_id]);

  const fetchCourses = async (user_id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/read.php?user_id=${user_id}`);
      setCourses(response.data.data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async () => {
    const {
      course_name,
      description,
      instructor,
      duration,
      price,
      start_date,
      end_date,
      course_link,
    } = formData;

    if (!course_name.trim() || !instructor.trim()) {
      alert("Please fill in required fields like Course Name and Instructor.");
      return;
    }

    if (isNaN(parseFloat(price))) {
      alert("Please enter a valid price.");
      return;
    }

    try {
      const uploadData = {
        user_id,
        course_name: course_name.trim(),
        description: description.trim(),
        instructor: instructor.trim(),
        duration: duration.trim(),
        price: parseFloat(price),
        start_date,
        end_date,
        course_link: course_link.trim(),
      };

      const response = await axios.post(
        `${API_BASE_URL}/create.php`,
        JSON.stringify(uploadData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Upload Response:", response.data);

      if (response.data.status) {
        alert("✅ Course added successfully!");
        setFormData({
          course_name: "",
          description: "",
          instructor: "",
          duration: "",
          price: "",
          start_date: "",
          end_date: "",
          course_link: "",
        });
        fetchCourses(user_id); 
      } else {
        alert("❌ Failed to add course: " + (response.data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("❌ Server error occurred while adding course.");
    }
  };

  const handleDelete = async (course_name) => {
    if (!window.confirm(`Are you sure you want to delete "${course_name}"?`)) return;

    try {
      const response = await axios.post(
        `${API_BASE_URL}/delete.php`,
        { course_name },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.status) {
        alert(response.data.message || "Course deleted successfully!");
        setCourses((prev) => prev.filter((course) => course.course_name !== course_name));
      } else {
        alert(`Failed to delete course: ${response.data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("An error occurred while deleting the course.");
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Please enter a search term.");
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/search.php`, {
        params: { query: searchTerm },
      });

      if (response.data.status && response.data.data) {
        setCourses(response.data.data);
      } else {
        setCourses([]);
        alert("No courses found.");
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Error while searching.");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-extrabold text-center text-white mt-16 leading-tight">
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
          Courses
        </span>
      </h1>
      <p className="text-lg text-gray-300 max-w-xl mx-auto text-center mt-4">
  <span className="font-semibold text-blue-300">Enhance your skills</span> by enrolling in courses.
  Learn from industry experts, grow your knowledge, and shape a brighter future for yourself — the journey begins here.
</p>


     
<div className="flex justify-center mt-6">
  <div className="flex items-center bg-gray-700 rounded-md overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl focus-within:ring-2 focus-within:ring-blue-400">
    <input
      type="text"
      placeholder="Search Courses..."
      className="p-3 w-80 bg-gray-700 text-white outline-none transition-all duration-300 transform focus:scale-105 focus:bg-gray-800 placeholder-gray-400"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
    />
    <button
      onClick={handleSearch}
      className="px-4 py-3 bg-blue-500 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-blue-400"
    >
      🔍
    </button>
  </div>
</div>


   
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10">
  {courses.length > 0 ? (
    courses.map((course) => (
      <div
        key={course.course_id}
        className="p-4 bg-gray-800 rounded-xl shadow-md border border-gray-700 hover:shadow-blue-500/40 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300"
      >
        <h3 className="text-lg font-semibold text-white text-center truncate">
          {course.course_name}
        </h3>
        <p className="text-sm text-gray-300 italic mt-2 text-center">
          {course.description?.slice(0, 60)}
          {course.description?.length > 60 && '...'}
        </p>
        <div className="mt-3 space-y-1 text-sm text-gray-400">
          <p>👨‍🏫 Instructor: {course.instructor}</p>
          <p>⏳ Duration: {course.duration}</p>
          <p>💰 Price: ₹{course.price}</p>
          <p>📅 Start: {course.start_date}</p>
          <p>📅 End: {course.end_date}</p>
        </div>
        <a
          href={course.course_link}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-blue-400 text-sm mt-3 hover:underline transition duration-200"
        >
          🔗 View Course
        </a>
        <button
          onClick={() => handleDelete(course.course_name)}
          className="mt-4 w-full py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition duration-300"
        >
          🗑 Delete
        </button>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-400 col-span-full">No courses found.</p>
  )}
</div>

    
      <div className="fixed bottom-6 right-6 bg-gray-800 p-4 rounded-lg shadow-lg w-80 text-white space-y-3">
        <input
          type="text"
          name="course_name"
          placeholder="Course Name"
          className="p-2 w-full bg-gray-700 rounded"
          value={formData.course_name}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Course Description"
          className="p-2 w-full bg-gray-700 rounded"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <input
          type="text"
          name="instructor"
          placeholder="Instructor"
          className="p-2 w-full bg-gray-700 rounded"
          value={formData.instructor}
          onChange={handleChange}
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g., 4 weeks)"
          className="p-2 w-full bg-gray-700 rounded"
          value={formData.duration}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          className="p-2 w-full bg-gray-700 rounded"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          type="date"
          name="start_date"
          className="p-2 w-full bg-gray-700 rounded"
          value={formData.start_date}
          onChange={handleChange}
        />

        <input
          type="date"
          name="end_date"
          className="p-2 w-full bg-gray-700 rounded"
          value={formData.end_date}
          onChange={handleChange}
        />

        <input
          type="url"
          name="course_link"
          placeholder="Course Link"
          className="p-2 w-full bg-gray-700 rounded"
          value={formData.course_link}
          onChange={handleChange}
        />

        <button
          onClick={handleUpload}
          className="w-full px-5 py-3 bg-green-600 hover:bg-green-700 transition rounded font-semibold"
        >
          📤 Add Course
        </button>
      </div>
    </div>
  );
}
