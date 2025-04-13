import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLesson } from "../../context/FlowContext";
import SpinnerModal from "../../components/SpinnerModal";

const MultiStepForm: React.FC<{ selectedChapter: string; onChapterChange: (newChapter: string) => void }> = ({}) => {
  const [lessons, setLessons] = useState<{ lessonid: string; lessonname: string; lessoncontent: string }[]>([]);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isBottomReached, setIsBottomReached] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { chaptername } = useLesson();
  const [highlightedWord, setHighlightedWord] = useState<string | null>(null);
  const [buttonPosition, setButtonPosition] = useState<{ top: number; left: number } | null>(null);
  const [isCardVisible, setIsCardVisible] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Current chaptername in MultiStepForm:", chaptername);
    if (!chaptername) return;
    // Reset visibility when a new chapter is selected
    setIsCardVisible(true);
    const fetchLessons = async () => {
      try {
        const response = await axios.get(
          `http://localhost/user/get-lessons-by-chapter?chapterName=${encodeURIComponent(chaptername)}`
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

    function loadingAnimation() {
      let timer: NodeJS.Timeout;
      if (isLoading) {
        timer = setTimeout(() => {
          setIsLoading(false);
          fetchLessons();
        }, 500); 
      }
      return () => clearTimeout(timer); // Cleanup the timer on unmount or when loading changes
     }

    loadingAnimation();
    setCurrentLesson(0);
    setIsBottomReached(false);
  }, [chaptername]);  // Runs when the chapter changes

  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelection);
    return () => {
      document.removeEventListener("mouseup", handleTextSelection);
    };
  }, []);

  const handleTextSelection = () => {
    const selection = window.getSelection();
  
    if (selection && selection.toString().trim() !== "" && contentRef.current) {
      const selectedText = selection.toString().trim();
      setHighlightedWord(selectedText);
  
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const containerRect = contentRef.current.getBoundingClientRect();
  
      // Calculate position relative to the card-body container
      const buttonTop = rect.top - containerRect.top  + 10;
      const buttonLeft = rect.right - containerRect.left + contentRef.current.scrollLeft + 200;
  
      setButtonPosition({
        top: buttonTop,
        left: buttonLeft,
      });
    } else {
      setHighlightedWord(null);
      setButtonPosition(null);
    }
  };

  const speakText = (text: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    const availableLanguages = ["es-MX", "es-ES"];
    utterance.lang = availableLanguages.find((lang) => synth.getVoices().some((voice) => voice.lang === lang)) || "en-US";
    synth.speak(utterance);
  };

  useEffect(() => {
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll);
      checkScrollBar();
      return () => contentElement.removeEventListener("scroll", handleScroll);
    }
  }, [lessons]);

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      setIsBottomReached(scrollTop + clientHeight >= scrollHeight - 5);
    }
  };

  const checkScrollBar = () => {
    if (contentRef.current) {
      const { scrollHeight, clientHeight } = contentRef.current;
      setIsBottomReached(scrollHeight <= clientHeight);
    }
  };

  const resetScrollPosition = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      //setCurrentLesson((prev) => prev + 1);
      setIsBottomReached(false);
      resetScrollPosition();
    } else {
      alert("Chapter Completed...");
      handleCloseCard();
      //moveToNextChapter();
    }
  };

  const handleCloseCard = () => {
    setIsCardVisible(false);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (event.clientX <= 10) {
        setIsSidebarCollapsed(false); // Expand if mouse is at the leftmost 10px
      } else if (event.clientX > 260) {
        setIsSidebarCollapsed(true); // Collapse if mouse moves far from the sidebar
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (

    <div
      className="container-fluid py-2"
      style={{
        left: "100%",
        alignItems: "center",
        transition: "margin 0.3s ease-in-out",
        marginLeft: isSidebarCollapsed ? "0" : "50px",
        width: isSidebarCollapsed ? "100%" : "calc(100% - 50px)",
      }}

    >
      <SpinnerModal show={isLoading} />
      <div className="row">
        <div className="col-12">
          <div className="multisteps-form mb-9">
            <div className="row">
              <div className="col-12 col-lg-8 mx-auto my-5">
                {/* <div className="multisteps-form__progress">
                  {lessons.map((lesson, index) => (
                  <button
                    key={lesson.lessonid}
                    className={`multisteps-form__progress-btn ${
                    index === currentLesson ? "js-active" : ""
                    } ${index < currentLesson ? "completed" : ""}`}
                    onClick={() => setCurrentLesson(index)}
                    disabled={index > currentLesson}
                  >
                    {lesson.lessonname}
                  </button>
                  ))}
                </div> */}
              </div>
            </div>
            <div className="row"> {isCardVisible && lessons.length > 0 && (
              <div className="col-12 col-lg-12 m-auto lesson-pane">
                <div className="card"
                >
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3 lesson-title">
                      <h5 className="font-weight-bolder text-white mb-0">{lessons[currentLesson]?.lessonname}</h5>
                    </div>
                    {/* X Button to Close */}
                    <button
                      className="btn-close text-white me-3"
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "transparent",
                        border: "none",
                        fontSize: "22px",
                        cursor: "pointer",
                        color: "black",
                        zIndex: 10,
                      }}
                      onClick={handleCloseCard}
                    >
                      ❌
                    </button>
                  </div>
                  <div
                    className="card-body"
                    ref={contentRef}
                    style={{
                      //height: `calc(${screenHeight}px - 200px)`, // Adjust dynamically
                      width: "100%",
                      height: "600px", // 🔹 Increase the height (adjust as needed)
                      overflowY: "auto",
                      border: "1px solid #ddd",
                      padding: "20px", // 🔹 Add more padding for better spacing
                      fontSize: "18px", // 🔹 Increase text size for readability
                      lineHeight: "1.6", // 🔹 Improve line 
                      position: "relative",
                    }}
                  >
                    
                    <div
                      className="multisteps-form__content"
                      dangerouslySetInnerHTML={{ __html: lessons[currentLesson]?.lessoncontent }}
                    />
                  </div>
                  
                  <div className="button-row d-flex mt-4">

                    {/* {currentLesson > 0 && (
                      // <button className="btn bg-gradient-light mb-0" type="button" onClick={handlePreviousLesson}>
                      //   Previous Lesson
                      // </button>
                    )} */}
                  
                    <button
                      className="btn bg-gradient-success ms-auto mb-0"
                      type="button"
                      onClick={handleNextLesson}
                      disabled={!isBottomReached}
                    >
                      Complete Chapter
                   
                    </button>
                    {/* <CompletedChapterButton selectedChapter={chaptername} /> */}

                    {/* {currentLesson < lessons.length - 1 ? (
                      <button
                        className="btn bg-gradient-dark ms-auto mb-0"
                        type="button"
                        onClick={handleNextLesson}
                        disabled={!isBottomReached}
                      >
                        Next Lesson
                      </button>
                    ) : (
                      <button
                        className="btn bg-gradient-success ms-auto mb-0"
                        type="button"
                        onClick={handleNextLesson}
                        disabled={!isBottomReached}
                      >
                        Complete Chapter
                      </button>
                    )} */}
                  </div>
                </div>
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

      </div>
    </div>

  );
};
export default MultiStepForm;