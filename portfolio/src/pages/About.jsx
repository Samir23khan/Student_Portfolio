import React from "react";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center px-6 py-16">
      
  
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-blue-500 opacity-20 blur-3xl rounded-full"></div>
      </div>

    
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="text-center relative z-10 mb-12"
      >
        <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-lg">
          About Us
        </h1>
        <p className="text-xl font-medium max-w-2xl mx-auto text-gray-300 mt-4">
          Welcome to <span className="font-semibold text-blue-300">Student Portfolio</span>, where skills, achievements, and learning journeys come to life in an engaging and interactive way.
        </p>
      </motion.div>

    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl relative z-10">
        
      
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          whileHover={{ scale: 1.08 }} 
          transition={{ duration: 0.3 }}
          className="p-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20"
        >
          <h2 className="text-3xl font-bold text-blue-400 mb-4">Who We Are</h2>
          <p className="text-lg text-gray-300 font-medium">
            Led by <span className="text-blue-300 font-semibold">Samir Khan, Shreyas Rai, and Shaksham Pareek</span>, we aim to make it easier for individuals to showcase their talents and achievements in a simple and professional way.
          </p>
        </motion.div>

        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          whileHover={{ scale: 1.08 }} 
          transition={{ duration: 0.3 }}
          className="p-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20"
        >
          <h2 className="text-3xl font-bold text-blue-400 mb-4">What We Offer</h2>
          <ul className="text-lg space-y-3 font-medium">
            <li>📚 <span className="text-blue-300 font-semibold">Courses & Learning Resources</span></li>
            <li>🏆 <span className="text-blue-300 font-semibold">Certificates Showcase</span></li>
            <li>🖥️ <span className="text-blue-300 font-semibold">User-Friendly Interface</span></li>
            <li>🔐 <span className="text-blue-300 font-semibold">Secure Authentication</span></li>
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          whileHover={{ scale: 1.08 }} 
          transition={{ duration: 0.3 }}
          className="p-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20"
        >
          <h2 className="text-3xl font-bold text-blue-400 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-300 font-medium">
            Our mission is to help individuals create a professional portfolio that highlights their skills, achievements, and growth in a structured way.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
