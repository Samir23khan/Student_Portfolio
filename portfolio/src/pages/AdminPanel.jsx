import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users from API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost/PortfolioApi/src/users/list.php");
      setUsers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      localStorage.removeItem("user");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Handle user deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await axios.post("http://localhost/PortfolioApi/src/users/delete.php", 
        JSON.stringify({ user_id: id }), 
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data.message);
      fetchUsers(); // Refresh users list
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-24 px-6 pb-6">
      <input
        type="text"
        placeholder="Search by name or email..."
        className="mt-4 mb-6 p-3 rounded-lg w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-transform duration-300"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* User List Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg bg-gray-800">
        <table className="min-w-full table-auto text-white">
          <thead className="bg-blue-600">
            <tr>
              <th className="px-6 py-4 text-left">User ID</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="transition-all duration-500 ease-in-out">
            {filteredUsers.map((user) => (
              <tr key={user.user_id} className="border-t border-gray-700 hover:bg-gray-700">
                <td className="px-6 py-4">{user.user_id}</td>
                <td className="px-6 py-4">{user.first_name} {user.last_name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role || "User"}</td>
                <td className="px-6 py-4 space-x-4">
                  <button
                    onClick={() => handleDelete(user.user_id)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm transition-all duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Logout Button at the bottom */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
