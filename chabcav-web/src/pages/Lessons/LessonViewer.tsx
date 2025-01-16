import React, { useState, useEffect, useRef } from "react";


const LessonViewer: React.FC = () => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

const lessons = [
    {
      id: 1,
      title: "Lesson 1: Introduction to React",
      content: `
        <h1>Welcome to React</h1>
        <p>React is a JavaScript library for building user interfaces.</p>
        <p>It allows you to create reusable components and manage state effectively.</p>
      `,
    },
    {
      id: 2,
      title: "Lesson 2: JSX Basics",
      content: `
        <h1>Understanding JSX</h1>
        <p>JSX is a syntax extension for JavaScript that allows you to write HTML-like code within React components.</p>
      `,
    },
    {
      id: 3,
      title: "Lesson 3: Components and Props",
      content: `
        <h1>Components in React</h1>
        <p>Components are the building blocks of any React application.</p>
      `,
    },
  ];
  

  const currentLesson = lessons[currentLessonIndex];

  // Scroll to top when lesson changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [currentLessonIndex]);

  // Handle scroll detection
  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        moveToNextLesson();
      }
    }
  };

  // Navigate to next lesson
  const moveToNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex((prevIndex) => prevIndex + 1);
    } else {
      alert("You have completed all lessons!");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Lesson Title */}
      <div style={{ padding: "20px", background: "#f8f9fa", borderBottom: "1px solid #ddd" }}>
        <h1>{currentLesson.title}</h1>
      </div>

      {/* Lesson Content */}
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
        dangerouslySetInnerHTML={{ __html: currentLesson.content }}
      />

      {/* Navigation Buttons */}
      <div style={{ padding: "20px", background: "#f8f9fa", borderTop: "1px solid #ddd", textAlign: "right" }}>
        <button
          onClick={() => setCurrentLessonIndex((prevIndex) => Math.max(0, prevIndex - 1))}
          disabled={currentLessonIndex === 0}
          style={{ marginRight: "10px" }}
        >
          Previous
        </button>
        <button
          onClick={moveToNextLesson}
          disabled={currentLessonIndex === lessons.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LessonViewer;
