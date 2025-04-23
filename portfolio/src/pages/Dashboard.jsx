import { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { FaBook, FaCertificate, FaExternalLinkAlt, FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";


const API_BASE_URL = "http://localhost/PortfolioApi/src";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.user_id;

  useEffect(() => {
    if (user_id) {
      fetchCourses(user_id);
      fetchCertificates(user_id);
    } else {
      alert("You need to log in first.");
    }
  }, [user_id]);

  const fetchCourses = async (user_id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/courses/read.php?user_id=${user_id}`);
      setCourses(response.data.data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchCertificates = async (user_id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/certificates/read.php?user_id=${user_id}`);
      setCertificates(response.data.data || []);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  const downloadCertificate = (certificate) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Certificate of Completion", 50, 30);
    doc.setFontSize(16);
    doc.text(`Awarded to: ${user.first_name} ${user.last_name}`, 40, 50);
    doc.text(`Course: ${certificate.certificate_name}`, 40, 65);
    doc.text(`Issued on: ${new Date(certificate.created_at).toLocaleDateString()}`, 40, 80);
    doc.save(`${certificate.certificate_name}_certificate.pdf`);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-900 text-white">

      <h1 className="text-5xl font-extrabold text-center mt-16 animate-fadeIn">
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
          Student Dashboard
        </span>
      </h1>
      <p className="text-xl text-gray-200 max-w-xl mx-auto text-center mt-6 animate-fadeIn">
  👋 Welcome back,&nbsp;
  <span className="font-bold text-blue-400  decoration-blue-500 decoration-2">
    {user.first_name} {user.last_name}
  </span>
  ! Let’s make today productive.
</p>

<div className="text-center mt-10">
  <Link
    to="/profile"
    className="inline-flex items-center gap-3 px-7 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-blue-500/40 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
  >
    <FaUserCircle className="text-2xl text-blue-400 group-hover:animate-pulse" />
    <span className="tracking-wide">Profile Overview</span>
  </Link>
</div>




      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 animate-slideIn">
        
<div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
  <h2 className="text-3xl font-semibold text-white flex items-center gap-2">
    <FaBook className="text-yellow-400" /> Your Courses
  </h2>
  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
    {courses.length > 0 ? (
      courses.map((course) => (
        <div
          key={course.course_id}
          className="p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
        >
          <h3 className="text-lg font-semibold text-white">{course.course_name}</h3>
          <p className="text-sm text-gray-300 italic mt-2">{course.description}</p>
          <p className="text-sm text-gray-400 mb-1">Instructor: {course.instructor}</p>
          <p className="text-sm text-gray-400 mb-1">Duration: {course.duration}</p>
          <p className="text-sm text-gray-400 mb-1">Price: {course.price}</p>
          <p className="text-sm text-gray-400 mb-1">Start Date: {course.start_date}</p>
          <p className="text-sm text-gray-400 mb-1">End Date: {course.end_date}</p>
        
          <a
            href={course.course_link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
          >
            <FaExternalLinkAlt /> View Course
          </a>
        </div>
      ))
    ) : (
      <p className="text-gray-400">No courses found.</p>
    )}
  </div>
</div>


        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-3xl font-semibold text-white flex items-center gap-2">
            <FaCertificate className="text-green-400" /> Your Certificates
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {certificates.length > 0 ? (
              certificates.map((certificate) => (
                <div key={certificate.certificate_id} className="p-4 bg-gray-700 rounded-lg shadow-md flex flex-col items-center hover:shadow-xl transition transform hover:-translate-y-2">
                  <h3 className="text-lg font-semibold text-center">{certificate.certificate_name}</h3>
                  <button
                    onClick={() => downloadCertificate(certificate)}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
                  >
                    <FaDownload /> Download {certificate.certificate_name}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No certificates found.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
