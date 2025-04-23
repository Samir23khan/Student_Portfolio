import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/background.jpg"; 

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost/PortfolioApi/src/users";

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/auth"); 
    }

    if (message.text) {
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  }, [message, navigate]);

  const toggleAuth = () => {
    setAnimate(true);
    setTimeout(() => {
      setIsSignUp((prev) => !prev);
      setAnimate(false);
    }, 600);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
 
    if (!isSignUp && formData.email === "admin@gmail.com" && formData.password === "admin123") {
      const adminUser = {
        email: "admin@gmail.com",
        role: "admin",
        access_token: "adminToken123"
      };
      localStorage.setItem("user", JSON.stringify(adminUser));
      setMessage({ text: "✅ Admin Login successful! Redirecting...", type: "success" });
      setTimeout(() => navigate("/admin"), 1500);
      return;
    }
  
    const url = isSignUp ? `${API_BASE_URL}/create.php` : `${API_BASE_URL}/list.php`;
    const body = isSignUp
      ? { ...formData, access_token: "random123token", created_by: 1 }
      : { email: formData.email, password: formData.password };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
  
      if (data.success) {
        let userObject = {
          ...data.user,
          access_token: data.token
        };
        localStorage.setItem("user", JSON.stringify(userObject));
        setMessage({ text: `✅ Login successful! Redirecting...`, type: "success" });
        setTimeout(() => navigate("/homePage"), 1500);
      } else {
        setMessage({ text: data.message || "❌ Invalid credentials!", type: "error" });
      }
  
    } catch (error) {
      console.error("Error:", error);
      setMessage({ text: "❌ Error connecting to the server! Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };
  

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }} 
    >
      
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-0"></div>

    
      <div
        className={`relative z-10 w-[450px] p-10 rounded-3xl shadow-2xl border bg-gradient-to-t ${
          isSignUp ? "from-blue-800 via-teal-700 to-gray-800" : "from-teal-700 via-blue-800 to-gray-900"
        } border-teal-400 transform transition-transform duration-500 ${
          animate ? "scale-95 rotate-3 opacity-90" : "scale-100 rotate-0 opacity-100"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white">{isSignUp ? "Join Our Community" : "Welcome Back!"}</h2>

        {message.text && (
          <p className={`text-center p-2 rounded-lg ${message.type === "success" ? "bg-green-500" : "bg-red-500"} text-white`}>
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignUp && (
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="w-full p-3 bg-teal-900/40 text-white border rounded-lg"
              />
              <input
                type="text"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="w-full p-3 bg-teal-900/40 text-white border rounded-lg"
              />
            </div>
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full p-3 bg-blue-900/40 text-white border rounded-lg"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-3 bg-blue-900/40 text-white border rounded-lg"
          />

          {!isSignUp && (
            <button type="button" onClick={handleForgotPassword} className="text-teal-300 hover:underline w-full text-center">
              Forgot Password?
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-lg flex justify-center"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Processing...
              </span>
            ) : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          {isSignUp ? "Already have an account?" : "Don't have an account yet?"}{" "}
          <span className="text-teal-300 font-bold cursor-pointer hover:underline" onClick={toggleAuth}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}
