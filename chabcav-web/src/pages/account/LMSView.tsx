import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLesson } from "../../context/FlowContext"; // Import the context hook
import SpinnerModal from "../../components/SpinnerModal";
import { toast } from 'react-toastify';

interface Lesson {
    lessonid: number;
    lessonname: string;
}

interface Chapter {
    chaptername: string;
    lessons: Lesson[];
}

const LMSView: React.FC = () => {
    const { chaptername, setChaptername } = useLesson(); // Use chaptername directly from the context
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [selectedChapterIndex, setSelectedChapterIndex] = useState<number | null>(null);
    const [lessons, setLessons] = useState<{ lessonid: string; lessonname: string; lessoncontent: string }[]>([]);
    const [isCardVisible, setIsCardVisible] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState(true);
    const [highlightedWord, setHighlightedWord] = useState<string | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [buttonPosition, setButtonPosition] = useState<{ top: number; left: number } | null>(null);
    const [completedChapters, setCompletedChapters] = useState<string[]>([]);
    const lessonRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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

    useEffect(() => {
        const fetchCompletedChapters = async () => {
            try {
                const userId = getUserIdFromToken();
                const response = await axios.get(
                    `https://chabcav-api-development.up.railway.app/users/users-completed-chapters?userId=${userId}`
                );
                setCompletedChapters(response.data); // Should be an array of chapter names
            } catch (error) {
                console.error("Error fetching completed chapters:", error);
            }
        };

        fetchCompletedChapters();
    }, []);

    // Fetch all chapters initially
    useEffect(() => {
        const fetchAllChapters = async () => {
            try {
                const response = await axios.get("https://chabcav-api-development.up.railway.app/user/get-all-lessons");
                let lessonsArray = [];

                if (Array.isArray(response.data)) {
                    lessonsArray = response.data;
                } else if (typeof response.data === "object" && response.data.lessons) {
                    lessonsArray = response.data.lessons;
                } else {
                    console.error("Unexpected API response format:", response.data);
                    return;
                }

                const groupedChapters: Record<string, Lesson[]> = {};
                lessonsArray.forEach((lesson: any) => {
                    if (!groupedChapters[lesson.chaptername]) {
                        groupedChapters[lesson.chaptername] = [];
                    }
                    groupedChapters[lesson.chaptername].push({
                        lessonid: lesson.lessonid,
                        lessonname: lesson.lessonname,
                    });
                });

                const formattedChapters: Chapter[] = Object.entries(groupedChapters).map(([chaptername, lessons]) => ({
                    chaptername,
                    lessons,
                }));

                setChapters(formattedChapters);
            } catch (error) {
                console.error("Error fetching lessons:", error);
            }
        };

        function loadingAnimation() {
            let timer: NodeJS.Timeout;
            if (isLoading) {
                timer = setTimeout(() => {
                    setIsLoading(false);
                    fetchAllChapters();
                }, 1000);
            }
            return () => clearTimeout(timer); // Cleanup the timer on unmount or when loading changes
        };
        loadingAnimation();

        fetchAllChapters();
    }, []);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (event.clientX <= 10) {
                setIsSidebarCollapsed(false);
            } else if (event.clientX > 260) {
                setIsSidebarCollapsed(true);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);



    // Fetch lessons when the chaptername changes
    useEffect(() => {
        if (!chaptername) return;

        // Reset visibility when a new chapter is selected
        setIsCardVisible(true);

        const fetchLessons = async () => {
            try {
                const response = await axios.get(
                    `https://chabcav-api-development.up.railway.app/user/get-lessons-by-chapter?chapterName=${encodeURIComponent(chaptername)}`
                );
                console.log("Fetched Lessons:", response.data);
                if (response.data && Array.isArray(response.data.lessons)) {
                    setLessons(response.data.lessons);
                } else {
                    setLessons([]);
                }
            } catch (error: any) {
                console.error("Error fetching lessons:", error.response ? error.response.data : error.message);
            }
        };
        fetchLessons();
    }, [chaptername]); // Dependency on chaptername



    // Handle chapter click
    const handleChapterClick = (index: number) => {
        setChaptername(chapters[index].chaptername);
        setSelectedChapterIndex(index);
    };

    //speak text

    useEffect(() => {
        document.addEventListener("mouseup", handleTextSelection);
        return () => {
            document.removeEventListener("mouseup", handleTextSelection);
        };
    }, []);

    const handleTextSelection = () => {
        const selection = window.getSelection();

        if (!selection || selection.toString().trim() === "") {
            setHighlightedWord(null);
            setButtonPosition(null);
            return;
        }

        const range = selection.getRangeAt(0);
        const selectedText = selection.toString().trim();

        // Check if the selection is within contentRef
        if (contentRef.current && contentRef.current.contains(range.commonAncestorContainer)) {
            setHighlightedWord(selectedText);

            const rect = range.getBoundingClientRect(); // Relative to viewport

            setButtonPosition({
                top: rect.bottom - 60,
                left: rect.left,
            });
        } else {
            // Selection is outside lesson content
            setHighlightedWord(null);
            setButtonPosition(null);
        }
    };

    const speakText = (text: string) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        const availableLanguages = ["es-MX", "es-ES"];
        utterance.lang = availableLanguages.find((lang) => synth.getVoices().some((voice) => voice.lang === lang)) || "es-ES";
        synth.speak(utterance);
    };

    const handleMarkChapterComplete = async () => {
        const userId = getUserIdFromToken();
        if (!userId || selectedChapterIndex === null) return;

        const chapterToMark = chapters[selectedChapterIndex].chaptername;

        try {
            const response = await axios.post("https://chabcav-api-development.up.railway.app/users/users-progress", {
                userId,
                chapterName: chapterToMark
            });

            if (response.status === 200 || response.status === 201) {
                toast.success("🎉 Congratulations for completing this chapter!");
            } else {
                toast.error("Failed to mark chapter as complete.");
            }

            setCompletedChapters((prev) => [...prev, chapterToMark]); // update UI
        } catch (error) {
            console.error("Error marking chapter complete:", error);
        }
    };

    return (
        <div style={{
            left: "100%",
            alignItems: "center",
            transition: "margin 0.3s ease-in-out",
            marginLeft: isSidebarCollapsed ? "0" : "230px",
            width: isSidebarCollapsed ? "100%" : "calc(100% - 50px)",
        }}>

            <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif", }}>

                {/* Sidebar */}
                <div
                    style={{
                        width: "260px",
                        backgroundColor: "#2e3a59",
                        color: "#ffffff",
                        padding: "20px",
                        overflowY: "auto",
                        borderRight: "1px solid #1f2937",
                    }}
                >
                    <h2 style={{ fontSize: "20px", marginBottom: "20px", color: "#93c5fd" }}>All Chapters</h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>

                        {chapters.map((chapter, index) => {
                            const isCompleted = completedChapters.includes(chapter.chaptername);
                            return (
                                <li
                                    key={index}
                                    style={{
                                        padding: "10px",
                                        backgroundColor: selectedChapterIndex === index ? "#3b4d71" : "transparent",
                                        borderRadius: "8px",
                                        marginBottom: "10px",
                                        cursor: "pointer",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                    onClick={() => handleChapterClick(index)}
                                >
                                    <span>{`CHAPTER ${index + 1}: ${chapter.lessons[0]?.lessonname || "No lessons"}`}</span>
                                    {isCompleted && (
                                        <span style={{
                                            backgroundColor: "#10b981",
                                            color: "#fff",
                                            padding: "2px 6px",
                                            fontSize: "12px",
                                            borderRadius: "6px",
                                            marginLeft: "10px"
                                        }}>
                                            Completed
                                        </span>
                                    )}
                                </li>
                            );
                        })}

                    </ul>
                </div>

                {/* Main Content */}
                <div style={{ flex: 1, padding: "40px", backgroundColor: "#f9fafb", overflowY: "auto" }} >
                    <SpinnerModal show={isLoading} />
                    {selectedChapterIndex !== null ? (
                        <div>
                            <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
                                {chapters[selectedChapterIndex].chaptername}
                            </h1>
                            {isCardVisible && (
                                <div >
                                    <h2>Lesson Content</h2>

                                    <ul style={{ paddingLeft: "20px" }}>

                                        {lessons.length > 0 ? (
                                            lessons.map((lesson, _i) => (
                                                <li
                                                    key={lesson.lessonid}
                                                    style={{
                                                        marginBottom: "12px",
                                                        padding: "12px",
                                                        backgroundColor: "#ffffff",
                                                        border: "1px solid #e5e7eb",
                                                        borderRadius: "8px",
                                                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                                                    }}
                                                >

                                                    <div ref={(el) => {
                                                        contentRef.current = el;
                                                        lessonRefs.current[lesson.lessonid] = el;
                                                    }}

                                                        dangerouslySetInnerHTML={{ __html: lesson.lessoncontent }}
                                                    />

                                                </li>
                                            ))
                                        ) : (
                                            <p>No lessons available for this chapter.</p>
                                        )}

                                    </ul>
                                </div>
                            )}
                        </div>

                    ) : (
                        <div style={{ textAlign: "center", marginTop: "20%" }}>
                            <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>Select a chapter</h2>
                            <p style={{ color: "#6b7280" }}>Lessons will appear here once you choose a chapter.</p>
                        </div>
                    )}
                    {selectedChapterIndex !== null && (
                        <div style={{ marginTop: "30px" }}>
                            {completedChapters.includes(chapters[selectedChapterIndex].chaptername) ? (
                                <button
                                    disabled
                                    style={{
                                        backgroundColor: "#10b981",
                                        color: "white",
                                        padding: "10px 20px",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "not-allowed"
                                    }}
                                >
                                    ✅ Chapter Completed
                                </button>
                            ) : (
                                <button
                                    onClick={handleMarkChapterComplete}
                                    style={{
                                        backgroundColor: "#3b82f6",
                                        color: "white",
                                        padding: "10px 20px",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer"
                                    }}
                                >
                                    ✅ Complete this Chapter
                                </button>
                            )}
                        </div>
                    )}


                    {highlightedWord && buttonPosition && (
                        <button
                            onClick={() => speakText(highlightedWord)}
                            style={{
                                position: "fixed",
                                top: `${buttonPosition.top}px`,
                                left: `${buttonPosition.left}px`,
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "14px",
                                boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                                transition: "transform 0.1s ease-in-out",
                                width: "auto", // Fixes too wide button
                                minWidth: "30px", // Prevents shrinking too much
                                display: "inline-flex", // Keeps content compact
                                alignItems: "center", // Centers content
                                justifyContent: "center", // Centers icon

                            }}
                        >
                            🗣️
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LMSView;
