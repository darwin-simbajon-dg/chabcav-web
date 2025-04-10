import React, { useState, useEffect } from "react";
import axios from "axios";
import MultiStepForm from "./MultiStepForm";
import { useLesson } from "../../context/FlowContext";

interface Lesson {
    lessonid: string;
    lessonname: string;
  }
  
  interface Chapter {
    chaptername: string;
    lessons: Lesson[];
  }

const BookView: React.FC = () => {
const [chapters, setChapters] = useState<Chapter[]>([]);
const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
const { setChaptername } = useLesson();
const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get("http://localhost/user/get-all-lessons");
        console.log("API Response:", response.data); 

        let lessonsArray = [];

        if (Array.isArray(response.data)) {
          lessonsArray = response.data;
        } else if (typeof response.data === "object" && response.data.lessons) {
          lessonsArray = response.data.lessons; // Extract lessons from object
        } else {
          console.error("Unexpected API response format:", response.data);
          return;
        }
        console.log("Lessons Extracted:", lessonsArray); 
        const groupedChapters: Record<string, Lesson[]> = {};
        // Group lessons by chaptername
        lessonsArray.forEach((lesson: any) => {
          if (!groupedChapters[lesson.chaptername]) {
            groupedChapters[lesson.chaptername] = [];
          }
          groupedChapters[lesson.chaptername].push({
            lessonid: lesson.lessonid,
            lessonname: lesson.lessonname,
          });
        });
        console.log("Grouped Chapters:", groupedChapters);
        // Convert grouped object to array
        const formattedChapters: Chapter[] = Object.entries(groupedChapters).map(([chaptername, lessons]) => ({
          chaptername,
          lessons,
        }));

        console.log("Formatted Chapters:", formattedChapters); // 🔹 Debugging log

        setChapters(formattedChapters);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
  }, []);

  const handleChapterClick = (chaptername: string) => {
    console.log("Clicked Chapter:", chaptername); // 🔹 Debugging log
    setSelectedChapter(chaptername);
    setChaptername(chaptername);
  };

//   const renderContent = () => {
//     if (selectedChapter) {
//       return <p>Condition is true</p>;
//     } else {
//       return <p>Condition is false</p>;
//     }
//   };

  // Function to handle mouse movement
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


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const closeButton = document.querySelector(".btn-close.text-white.me-3");
      const xpath = "//*[contains(@class,'btn bg-gradient-success ms-auto mb-0')]";
      const complteChpaterBtn = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (closeButton && event.target === closeButton ||
        complteChpaterBtn && event.target === complteChpaterBtn) {
        setSelectedChapter(null);
      }
    };
    if (selectedChapter) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedChapter]);
  
  return (
    <> <div className="card"        
     style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        //backgroundColor: "white", 
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent background
        zIndex: selectedChapter? "9999" : "none", // Ensure it overlays everything
        display: selectedChapter ? "flex" : "none", // Show only when selectedChapter is set
        //display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }}
            >
         {selectedChapter && (
            <>
                <MultiStepForm 
                    selectedChapter={selectedChapter} 
                    onChapterChange={setChaptername} 
                />
            </>
        )}
    </div>    

 <div className="container-fluid"  >

    <div className="row mt-5" style={{ color: "white", fontSize: "20px", 
    fontWeight: "800" , transition: "margin 0.3s ease-in-out",
        marginLeft: isSidebarCollapsed ? "0" : "250px",
        width: isSidebarCollapsed ? "100%" : "calc(100% - 250px)",}} >
        
        {chapters.map((chapter, index) => (
            <div 
                key={chapter.chaptername}
                className={`${
                    index % 3 === 0
                        ? "col-lg-4"
                        : "col-lg-4 mb-lg-0 mb-4"
                }`}
                onClick={() => handleChapterClick(chapter.chaptername)}
            >
                
                <div 
                    style={{
                       backgroundImage: `url('/ChapterBg.jpg')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "350px",
                        height: "400px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        borderRadius: "12px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        padding: "20px",
                        margin: "10px",
                        transition: "transform 0.3s ease-in-out", //smooth transition   
                    }}
                    className="card"
                >
                   {/* Logo */}
                        <img
                          src="/ChabCavLogo.png"
                          alt="ChabCav Logo"
                          style={{
                            width: "100px",
                            marginBottom: "10px",
                          }}
                        />
                    <div className="card-header p-0 position-relative mt-2 mx-2 z-index-2">
                        <a className="d-block blur-shadow-image"> 
                            {/* Uncomment and provide a valid image URL if needed */}
                            {/* <img
                                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
                                alt="Chapter Background"
                                className="img-fluid shadow border-radius-lg"
                                loading="lazy"
                            /> */}
                        </a>
                        
                    </div>
                    <div style={{ color: "white", fontSize: "20px", fontWeight: "bold" , transition: "margin 0.3s ease-in-out",
                }} className="card-body hover:scale-105">
                        <h5 className="font-weight-normal">{chapter.chaptername}</h5>
                        <ul style={{ listStyle: "none", padding: 0, color: "white", fontSize: "14px" }}>
                            {chapter.lessons.map((lesson, index) => (
                                <li key={index} className="py-1">{lesson.lessonname}</li>
                            ))}
                        </ul>
                        
                        <button className="btn btn-outline-dark btn-sm mb-0" type="button">
                            Open this Chapter
                        </button>
                        
                    </div>
                </div>
                
            </div>
        ))}
    </div>

    </div>
       
   </>
  );
};
export default BookView;

