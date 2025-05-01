import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    PieChart,
    Pie,
    Cell,
    Legend,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const UserProgress: React.FC = () => {
    // const totalChapters = 15; // change deopending on the total number of chapters in the book
    // const completedChapters = 5;
    const [totalChapters, setTotalChapters] = useState<number>(0); //getting total chapters from the server
    const [completedChapters, setCompletedChapters] = useState<string[]>([]); // getting chapter nme from the server
    const [totalCompleted, setTotalCompleted] = useState<number>(0); //getting total completed chapters bu the users
    const remainingChapters = totalChapters - totalCompleted;

    const data = [
        { name: 'Completed', value: totalCompleted },
        { name: 'Remaining', value: remainingChapters },
    ];

    const COLORS = ['#00C49F', '#FF8042'];
    const completedChapterList = [completedChapters];

    //Returns UserID
    const getUserIdFromToken = () => {
        const token = localStorage.getItem("authToken");
        if (!token) return null;

        try {
            const claims = JSON.parse(atob(token.split('.')[1]));
            return claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"];
        } catch (error) {
            console.error("Invalid token format", error);
            return null;
        }
    };

    //Fetching completed chapters from the server base on userid
    useEffect(() => {
        const fetchCompletedChapters = async () => {
            try {
                const userId = getUserIdFromToken();
                const response = await axios.get(
                    `https://chabcav-api-development.up.railway.app/users/users-completed-chapters?userId=${userId}`
                );

                const completedChaptersArray = response.data;
                setCompletedChapters(completedChaptersArray);
                setTotalCompleted(completedChaptersArray.length); // Set int

            } catch (error) {
                console.error("Error fetching completed chapters:", error);
            }
        };

        fetchCompletedChapters();
    }, []);

    //fetch all Chapters


    useEffect(() => {
        const fetchAllLessons = async () => {
            try {
                const response = await axios.get("https://chabcav-api-development.up.railway.app/user/get-all-lessons");
                const lessons = response.data.lessons;

                if (Array.isArray(lessons)) {
                    // Use a Set to store unique lessonids
                    const uniqueLessonIds = new Set(
                        lessons
                            .filter((lesson: any) => lesson.lessonid) // ensure lessonid exists
                            .map((lesson: any) => lesson.lessonid)
                    );
                    setTotalChapters(uniqueLessonIds.size);
                    console.log("Unique lesson count:", uniqueLessonIds.size);
                } else {
                    console.error("Unexpected lessons format:", lessons);
                }

            } catch (error) {
                console.error("Error fetching all lessons:", error);
            }
        };

        fetchAllLessons();
    }, []);


    return (
        <div className="w-full max-w-md mx-auto p-4 bg-white rounded-2xl shadow-md">
           
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={100} // Removed innerRadius
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                    >
                        {data.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>

            <div className="mt-4 text-center">
                <h3 className="font-semibold text-sm text-gray-700">Completed Chapters</h3>
                <p className="text-sm text-gray-600">
                    {completedChapterList.join(', ')}
                </p>
            </div>
        </div>
    );
};

export default UserProgress;
