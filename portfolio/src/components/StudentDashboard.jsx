import React, { useEffect, useState } from "react";

const StudentDashboard = () => {
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost/PortfolioApi/src/users/getStudentDashboard.php", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                if (data.error) {
                    throw new Error(data.error);
                }

                setStudentData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
    if (error) return <div className="text-red-500 font-semibold">Error: {error}</div>;

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
                Welcome, {studentData.first_name} {studentData.last_name}
            </h1>
            <div className="flex items-center space-x-4">
                <img src={studentData.profile_picture} alt="Profile" className="w-24 h-24 rounded-full border-2 border-gray-300" />
                <p className="text-gray-700">Email: {studentData.email}</p>
            </div>
            <div className="mt-5">
                <h2 className="text-xl font-semibold text-gray-700">Performance Summary</h2>
                <p>Completed Courses: <span className="font-semibold">{studentData.completed_courses}</span></p>
                <p>Awarded Certificates: <span className="font-semibold">{studentData.awarded_certificates}</span></p>
                <p>Overall Progress: <span className="font-semibold">{studentData.overall_progress_percentage}%</span></p>
                <p>Performance Score: <span className="font-semibold">{studentData.performanceScore}</span></p>
            </div>
            <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-700">Course & Certificate Info</h2>
                <p>Number of Courses: <span className="font-semibold">{studentData.courseCount}</span></p>
                <p>Number of Certificates: <span className="font-semibold">{studentData.certificateCount}</span></p>
            </div>
        </div>
    );
};

export default StudentDashboard;
