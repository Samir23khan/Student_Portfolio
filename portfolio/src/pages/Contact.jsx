import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import ContactForm from "../components/ContactForm"; 

export default function Contact() {
  const [clicked, setClicked] = useState(false);

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
          Contact Us
        </h1>
        <p className="text-xl font-medium max-w-2xl mx-auto text-gray-300 mt-4">
          Have questions or feedback? Drop us a message, and we’ll get back to you soon.
        </p>
      </motion.div>

     
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-white/20 relative z-10"
      >
        <ContactForm />
      </motion.div>

   
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="mt-10 text-center relative z-10"
      >
        <h2 className="text-3xl font-bold text-blue-400">Get in Touch</h2>
        <p className="text-lg text-gray-300 mt-2">Feel free to reach out through the following:</p>
        
    
        <div className="mt-6 flex justify-center">
          <a
            href="https://www.instagram.com/piet_jaipur/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setClicked(true)}
            className={`flex items-center justify-center w-16 h-16 rounded-full transition transform ${
              clicked
                ? "animate-pulse bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 shadow-xl shadow-indigo-500/50"
                : "bg-indigo-500 hover:bg-indigo-600 hover:scale-110"
            }`}
          >
            <FaInstagram size={32} className="text-white" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
