import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

import LandingPage from "./pages/LandingPage";
import Courses from "./pages/Courses";
import Certificates from "./pages/Certificates";
import Contact from "./pages/Contact";
import About from "./pages/About";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import AdminPanel from "./pages/AdminPanel";
import Guidance from "./pages/Guidance"; 

const Homepage = lazy(() => import("./pages/Homepage"));

function AppContent() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow flex">
        <main className="w-full flex-grow relative">
          <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
            <Routes key={location.pathname}>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* Private Routes */}
              <Route path="/courses" element={<PrivateRoute element={Courses} />} />
              <Route path="/certificates" element={<PrivateRoute element={Certificates} />} />
              <Route path="/profile" element={<PrivateRoute element={Profile} />} />
              <Route path="/guidance" element={<Guidance />} /> 


              {/* Dashboard with nested routes */}
              <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />}>
                <Route path="profile" element={<PrivateRoute element={Profile} />} />
                <Route path="courses" element={<PrivateRoute element={Courses} />} />
                <Route path="certificates" element={<PrivateRoute element={Certificates} />} />
              </Route>

              {/* Admin Panel */}
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/admin/user/:id/courses" element={<PrivateRoute element={Courses} />} />
              <Route path="/admin/user/:id/certificates" element={<PrivateRoute element={Certificates} />} />
            </Routes>
          </Suspense>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
