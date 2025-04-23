import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import bgImage from "../assets/background1.jpg";

export default function Homepage() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserName(userData.first_name);
    }
  }, []);

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-4xl font-bold relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center p-4 bg-transparent" 
      >
        {userName && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-4 bg-transparent" 
          >
            Welcome back, <span className="text-blue-400">{userName}!</span>
          </motion.div>
        )}

        <div className="bg-transparent"> 
          Dream big 💭 <br />
          Work hard ✨ <br />
          Stay focused🔥 <br />
          Success starts with you 🚀🏆
        </div>
      </motion.div>
    </div>
  );
}
