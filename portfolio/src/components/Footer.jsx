import { Link } from "react-router-dom";
import { 
  FaInstagram, FaMapMarkerAlt, FaEnvelope, FaProjectDiagram, FaTrophy, 
  FaLightbulb, FaHome, FaBook, FaCertificate, FaPhone, FaInfoCircle, FaExternalLinkAlt
} from "react-icons/fa";
import { useState, useEffect } from "react";

const Footer = () => {
  const [clicked, setClicked] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const user = localStorage.getItem("user");
    return !!user;
  });

  useEffect(() => {
    const checkUser = () => {
      const user = localStorage.getItem("user");
      setIsLoggedIn(!!user);
    };

    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  return (
    <footer className="relative bg-[#0a192f] text-white py-8 px-6 shadow-lg w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f] via-[#0d1b2a] to-[#12263a] opacity-90"></div>
      <div className="absolute inset-0 bg-radial-gradient from-blue-900 via-transparent to-transparent opacity-40 blur-3xl"></div>

      <div className="relative z-10 container mx-auto grid md:grid-cols-3 gap-6 text-center md:text-left">
        
        <div>
          <h2 className="text-lg font-semibold text-cyan-300 mb-3">Portfolio</h2>
          <p className="text-gray-400 text-sm flex items-center gap-2">
            <FaProjectDiagram className="text-blue-400" /> Showcasing innovative projects
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-2">
            <FaTrophy className="text-blue-400" /> Achievements and skills
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-2">
            <FaLightbulb className="text-blue-400" /> Seamless experience
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-cyan-300 mb-3">Quick Links</h2>
          <ul className="space-y-1">
            <li className="flex items-center gap-2 text-sm">
              <FaHome className="text-blue-400" />
              <Link to="/" className="hover:text-cyan-200 transition">Home</Link>
            </li>
            {isLoggedIn && (
              <>
                <li className="flex items-center gap-2 text-sm">
                  <FaBook className="text-blue-400" />
                  <Link to="/courses" className="hover:text-cyan-200 transition">Courses</Link>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <FaCertificate className="text-blue-400" />
                  <Link to="/certificates" className="hover:text-cyan-200 transition">Certificates</Link>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <FaBook className="text-blue-400" />
                  <Link to="/dashboard" className="hover:text-cyan-200 transition">Dashboard</Link>
                </li>
              </>
            )}
            <li className="flex items-center gap-2 text-sm">
              <FaPhone className="text-blue-400" />
              <Link to="/contact" className="hover:text-cyan-200 transition">Contact</Link>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <FaInfoCircle className="text-blue-400" />
              <Link to="/about" className="hover:text-cyan-200 transition">About Us</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-cyan-300 mb-3">Get in Touch</h2>
          <div className="flex items-center justify-center md:justify-start gap-2 text-sm mb-1">
            <FaMapMarkerAlt className="text-blue-400" />
            <span>Jaipur, Rajasthan</span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2 text-sm mb-1">
            <FaEnvelope className="text-blue-400" />
            <a href="mailto:info@poornima.org" className="hover:text-cyan-200 transition">
              info@poornima.org
            </a>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2 text-sm mt-2">
            <FaExternalLinkAlt className="text-green-400" />
            <a 
              href="https://www.poornima.org/online/?utm_source=Adsgrip&utm_medium=SM&utm_campaign=SMBio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-500 transition font-semibold"
            >
              Poornima Online →
            </a>
          </div>

          <div className="mt-3 flex justify-center md:justify-start">
            <a
              href="https://www.instagram.com/piet_jaipur/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setClicked(true)}
              className={`inline-block p-2 rounded-full transition transform ${
                clicked
                  ? "animate-pulse bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 shadow-xl shadow-indigo-500/50"
                  : "bg-indigo-500 hover:bg-indigo-600 hover:scale-110"
              }`}
            >
              <FaInstagram size={20} className="text-white" />
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-4 text-center text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
