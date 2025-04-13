import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLesson } from "../../context/FlowContext";

interface LessonViewerProps {
  selectedChapter: string;
}

const LessonViewer: React.FC<LessonViewerProps> = ({ selectedChapter }) => {
  const [lessons, setLessons] = useState<
    { lessonid: string; lessonname: string; lessoncontent: string; chaptername: string }[]
  >([]);
  const { chaptername } = useLesson(); 
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  useEffect(() => {
    if (!chaptername) return; // Prevent empty requests

    const fetchLessons = async () => {
      try {
        const response = await axios.get(
          `http://localhost/user/get-lessons-by-chapter?chapterName=${selectedChapter}`
        );
        console.log("Fetched Lessons for:", chaptername, response.data);
        if (response.data && Array.isArray(response.data.lessons)) {
          setLessons(response.data.lessons);
        } else {
          setLessons([]); // No lessons found
        }
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
  }, [chaptername]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [currentLessonIndex]);

  if (!selectedChapter) {
    return <p>Please select a chapter.</p>;
  }

  if (lessons.length === 0) {
    return <p>No lessons available for {selectedChapter}.</p>;
  }
  const currentLesson = lessons[currentLessonIndex];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", left: "100%" }}>
      <div style={{ padding: "20px", background: "#f8f9fa", borderBottom: "1px solid #ddd" }}>
        <h3>{currentLesson.chaptername}</h3>
        <h2>{currentLesson.lessonname}</h2>
      </div>
      
      <div style={{ padding: "10px", background: "#f8f9fa", borderTop: "1px solid #ddd", textAlign: "center" }}>
        <button
          onClick={() => setCurrentLessonIndex((prevIndex) => Math.max(0, prevIndex - 1))}
          disabled={currentLessonIndex === 0}
          style={{ marginRight: "10px" }}
        >
          Previous
        </button>
        {/* <button onClick={moveToNextLesson} disabled={!isNextEnabled}>
          Next Lesson
        </button> */}
      </div>
    </div>
  );
};

export default LessonViewer;