import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost/PortfolioApi/src/certificates";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    cer_name: "",
    origin_name: "",
    created_value: "",
    description: "",
    file: null,
  });


  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.user_id;

  useEffect(() => {
    if (user_id) {
      fetchCertificates(user_id);
    } else {
      alert("You need to log in first.");
    }
  }, [user_id]);


  const fetchCertificates = async (user_id) => {
    try {

      const response = await axios.get(`${API_BASE_URL}/read.php?user_id=${user_id}`);
      setCertificates(response.data.data || []);
     
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };
  useEffect(() => {
    fetchCertificates(user_id);
}, [user_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trim() })); 
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!formData.file || !formData.cer_name.trim()) {
      alert("Please enter a certificate name and select a file.");
      return;
    }

    try {
      const base64String = await convertToBase64(formData.file);

      const uploadData = {
        cer_name: formData.cer_name.trim(),
        origin_name: formData.origin_name.trim(),
        created_value: formData.created_value,
        description: formData.description.trim(),
        certificate: base64String,
        user_id: user_id,
      };

      const response = await axios.post(`${API_BASE_URL}/create.php`, uploadData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Upload Response:", response.data); 

      if (response.data.status) {
        alert("Upload Successful!");
        setFormData({ cer_name: "", origin_name: "", created_value: "", description: "", file: null });
        setPreview(null);
        fetchCertificates(user_id); 
      } else {
        alert(`Upload Failed: ${response.data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred while uploading. Please try again.");
    }
  };

  
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };


  const handleDelete = async (cer_id) => {
    try {
       
        const response = await axios.delete(`${API_BASE_URL}/delete.php`, {
            data: { cer_id: cer_id },
            headers: { "Content-Type": "application/json" }
        });

        
        if (response.data.status) {
          
            alert(response.data.message);

           
            setCertificates((prevCertificates) =>
                prevCertificates.filter(cert => cert.cer_id !== cer_id)
            );
        } else {
            alert("Failed to delete certificate.");
        }
    } catch (error) {
        console.error("Error deleting certificate:", error);
    }
};



const handleSearch = async () => {
  if (!searchTerm.trim()) {
      alert("Please enter a search term.");
      return;
  }

  try {
      const response = await axios.get(`${API_BASE_URL}/search.php`, {
          params: { query: searchTerm }
      });

      console.log("Search Response:", response.data); 

      if (response.data.status && response.data.data) {
          setCertificates(response.data.data); 
      } else {
          setCertificates([]); 
          alert("No certificates found.");
      }
  } catch (error) {
      console.error("Search error:", error);
      alert("Error while searching. Please try again.");
  }
};



  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white relative">
      <h1 className="text-6xl font-extrabold text-center text-white mt-16 leading-tight">
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
          Certificates
        </span>
      </h1>
      <p className="text-lg text-gray-300 max-w-xl mx-auto text-center mt-4">
        <span className="font-semibold text-blue-300">Showcase your achievements</span> by uploading your certificates.
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


  
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
  {certificates.length > 0 ? (
    certificates.map((certificate) => (
      <div
        key={certificate.cer_id}
        className="p-4 bg-gray-800 rounded-xl shadow-md border border-gray-700 hover:shadow-blue-500/40 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300"
      >
        <img
          src={certificate.image}
          alt={certificate.cer_name}
          className=" Samir w-full h-40 object-cover rounded-md mb-3 transition duration-300 hover:opacity-90"
        />
        <h3 className="text-lg font-semibold text-white text-center truncate">
          {certificate.cer_name}
        </h3>
        <p className="text-sm text-gray-300 italic mt-2 text-center">
          {certificate.description?.slice(0, 60)}
          {certificate.description?.length > 60 && '...'}
        </p>

         <button
          onClick={() => handleDelete(certificate.cer_id)}
          className="mt-4 w-full py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition duration-300"
        >
          🗑 Delete
        </button>
      </div>
    ))
  ) : (
    <p className="text-gray-400 text-center col-span-full">No certificates found.</p>
  )}
</div>



    
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 items-center bg-gray-800 p-4 rounded-lg shadow-lg w-80">
        <input type="text" name="cer_name" placeholder="Certificate Name" className="p-2 w-full bg-gray-700 text-white rounded-md" value={formData.cer_name} onChange={handleChange} />
        <input type="text" name="origin_name" placeholder="Origin Name" className="p-2 w-full bg-gray-700 text-white rounded-md" value={formData.origin_name} onChange={handleChange} />
        <input type="date" name="created_value" className="p-2 w-full bg-gray-700 text-white rounded-md" value={formData.created_value} onChange={handleChange} />
        <textarea name="description" placeholder="Description" className="p-2 w-full bg-gray-700 text-white rounded-md" value={formData.description} onChange={handleChange}></textarea>
        <input type="file" accept="image/*" className="hidden" id="fileUpload" onChange={handleFileChange} />
        <label htmlFor="fileUpload" className="cursor-pointer px-5 py-3 bg-gray-700 text-white font-semibold rounded-lg">📂 Select Certificate</label>
        {preview && <img src={preview} alt="Preview" className="w-28 h-28 object-cover rounded-md mt-2" />}
        <button onClick={handleUpload} className="px-5 py-3 bg-green-600 text-white font-semibold rounded-lg">📤 Upload</button>
      </div>
    </div>
  );
}
