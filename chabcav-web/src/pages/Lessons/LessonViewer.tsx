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
  const [isNextEnabled, setIsNextEnabled] = useState(false);
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
      setIsNextEnabled(false);
    }
  }, [currentLessonIndex]);

  if (!selectedChapter) {
    return <p>Please select a chapter.</p>;
  }

  if (lessons.length === 0) {
    return <p>No lessons available for {selectedChapter}.</p>;
  }

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setIsNextEnabled(true);
      }
    }
  };

  const moveToNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex((prevIndex) => prevIndex + 1);
      setIsNextEnabled(false);
    } else {
      alert("You have completed all lessons!");
    }
  };

  const currentLesson = lessons[currentLessonIndex];

  /**  Format lesson content dynamically and add speech synthesis */
  const formatLessonContent = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span key={index} style={{ marginRight: "8px", cursor: "pointer" }}>
        {word}{" "}
        <span
          onClick={() => speakText(word)}
          style={{ marginLeft: "5px", color: "blue" }}
        >
          🗣️
        </span>
      </span>
    ));
  };

  const speakText = (text: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-spanish"; // Set the language to Spanish
    synth.speak(utterance);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", left: "100%" }}>
      <div style={{ padding: "20px", background: "#f8f9fa", borderBottom: "1px solid #ddd" }}>
        <h3>{currentLesson.chaptername}</h3>
        <h2>{currentLesson.lessonname}</h2>
      </div>
      <div
        ref={contentRef}
        onScroll={handleScroll}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          background: "#ffffff",
          border: "1px solid #ddd",
          margin: "10px",
        }}
      >
        {formatLessonContent(currentLesson.lessoncontent)}
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