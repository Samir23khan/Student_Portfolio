import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/background.jpg';

export default function Profile() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
 
  const [profileData, setProfileData] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    profile_image: '',
    access_token: '',
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setProfileData(storedUser);
    }
  }, []);

  const handleLogout = async () => {
    
    const user = JSON.parse(localStorage.getItem("user"));
   console.log(user);
   
    
  
    try {
      const response = await fetch("http://localhost/PortfolioApi/src/auth/logout.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: user.user_id, 
          access_token: user.access_token
        })
      });
  
      const result = await response.json();
      console.log("Logout API response:", result);
  
      if (result.status === "success") {
        localStorage.removeItem("user");
        alert("Logout successful!");
        navigate("/");
      } else {
        alert("Logout failed: " + result.message);
      }
    } catch (error) {
      alert("An error occurred while logging out.");
      console.error("Logout error:", error);
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({ ...profileData, profile_image: file });
    }
  };

  const getProfileImage = () => {
    if (profileData.profile_image instanceof File) {
      return URL.createObjectURL(profileData.profile_image);
    }
    return profileData.profile_image || 'https://via.placeholder.com/150';
  };

  const updateProfile = async () => {
    setLoading(true);
    const formData = new FormData();
  
    Object.keys(profileData).forEach((key) => {
      if (key === "profile_image" && profileData.profile_image instanceof File) {
        formData.append("profile_image", profileData.profile_image);
      } else {
        formData.append(key, profileData[key]);
      }
    });
  
    try {
      const response = await fetch("http://localhost/PortfolioApi/src/users/update.php", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
  
      if (result.success) {
        const updatedUser = {
          ...profileData,
          ...result.updated_user, 
        };
  
        if (result.profile_pic) {
          updatedUser.profile_image = "http://localhost/PortfolioApi/" + result.profile_pic;
        }
  
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setProfileData(updatedUser);
        setSuccessMsg("Profile updated successfully!");
        setEditMode(false);
      } else {
        alert(result.message || "Failed to update.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };
  

 
  
  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 sm:p-6 bg-cover bg-center relative transition-all duration-300 ${
        darkMode ? 'bg-black/40' : ''
      }`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {darkMode && <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0 transition duration-300"></div>}

      <div
        className={`w-full max-w-3xl rounded-xl border shadow-xl p-4 sm:p-6 space-y-6 z-10 relative transition-all duration-300
        ${darkMode ? 'bg-white/10 border-white/10 text-gray-200 backdrop-blur-md' : 'bg-white/80 border-gray-200 text-gray-900'}`}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold">👤 Profile Settings</h2>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 text-sm rounded-md bg-gray-300 hover:bg-gray-400 text-gray-900 transition"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <div className="flex border-b border-gray-300 space-x-4">
          {['profile', 'password'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium ${
                activeTab === tab
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-indigo-500'
              }`}
            >
              {tab === 'profile' ? 'Profile Info' : ''}
            </button>
          ))}
        </div>

        {successMsg && (
          <div className="p-2 bg-green-100 text-green-700 rounded-md text-sm text-center animate-bounce">
            {successMsg}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex flex-col items-center">
                <img
                  src={getProfileImage()}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 shadow-md"
                />
                <label htmlFor="profile-upload" className="mt-2 text-indigo-500 hover:underline cursor-pointer text-sm">
                  Upload New
                </label>
                <input type="file" id="profile-upload" onChange={handleFileChange} className="hidden" />
              </div>

              <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...['first_name', 'last_name', 'email'], ...(editMode ? ['phone', 'address', 'bio'] : [])].map(
                  (field) => (
                    <div key={field} className="flex flex-col animate-slideUp">
                      <label
                        className={`text-xs mb-1 capitalize ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}
                      >
                        {field.replace('_', ' ')}
                      </label>
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        value={profileData[field]}
                        readOnly={!editMode && !['first_name', 'last_name', 'email'].includes(field)}
                        onChange={(e) => setProfileData({ ...profileData, [field]: e.target.value })}
                        className={`px-3 py-2 rounded-md border focus:outline-none focus:ring-2 transition-all duration-200
                          ${
                            darkMode
                              ? `bg-gray-800 text-white border-gray-600 ${editMode ? 'focus:ring-indigo-400' : ''}`
                              : `bg-white text-gray-900 border-gray-300 ${editMode ? 'focus:ring-indigo-400' : ''}`
                          }`}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
            <button
              onClick={editMode ? updateProfile : () => setEditMode(true)}
              disabled={loading}
              className={`w-full text-white font-semibold py-3 rounded-md transition transform duration-300 ease-in-out
                ${
                  editMode
                    ? 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
                    : 'bg-green-600 hover:bg-green-700 active:scale-95'
                }`}
            >
              {editMode ? (loading ? 'Saving...' : '💾 Save Changes') : '✏️ Edit Profile'}
            </button>
          </div>
        )}


        <div className="text-center pt-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
          >
            🔐 Logout
          </button>
        </div>
      </div>
    </div>
  );
}
