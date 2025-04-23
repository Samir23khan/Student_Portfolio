import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    subject: "",
    message: "",
    attachment: null,
  });

  const [suggestions, setSuggestions] = useState([]);
  const emailDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });


    if (name === "to" || name === "from") {
      const [userPart, domainPart] = value.split("@");
      if (domainPart === undefined) {
        setSuggestions([]);
      } else {
        const filteredDomains = emailDomains
          .filter((domain) => domain.startsWith(domainPart))
          .map((domain) => `${userPart}@${domain}`);
        setSuggestions(filteredDomains);
      }
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setFormData({ ...formData, to: suggestion });
    setSuggestions([]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, attachment: file });
    }
  };

  const handleRemoveFile = () => {
    setFormData({ ...formData, attachment: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 relative max-w-lg mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold text-white text-center">Send Email</h2>

      <input
        type="email"
        name="from"
        placeholder="From"
        value={formData.from}
        onChange={handleChange}
        className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
        required
      />

 
      <div className="relative">
        <input
          type="email"
          name="to"
          placeholder="To"
          value={formData.to}
          onChange={handleChange}
          className="p-3 w-full rounded-lg bg-gray-700 text-white placeholder-gray-400"
          required
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-gray-800 border border-gray-600 rounded-lg mt-1 shadow-lg">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-700 text-white"
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

  
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
        required
      />

  
      <textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        rows="4"
        className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
        required
      />

   
      <div className="flex flex-col space-y-2">
        <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-center">
          Choose File
          <input type="file" name="attachment" onChange={handleFileChange} className="hidden" />
        </label>
        {formData.attachment && (
          <div className="flex items-center justify-between bg-gray-700 p-2 rounded-lg text-white">
            <span>{formData.attachment.name}</span>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
            >
              Remove
            </button>
          </div>
        )}
      </div>

    
      <button type="submit" className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-semibold">
        Send Email
      </button>
    </form>
  );
}
