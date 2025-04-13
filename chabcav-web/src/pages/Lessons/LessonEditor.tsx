import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import "react-quill/dist/quill.snow.css"; // Styles for the Quill editor

const LessonPane: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState("");
  const [content, setContent] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [lessons, setLessons] = useState<{ lessonid: string; lessonname: string; lessoncontent: string }[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const fetchLessonsFromAPI = async () => {
    try {
      const response = await axios.get("https://chabcav-api-development.up.railway.app/user/get-all-lessons");
      if (response.data && Array.isArray(response.data.lessons)) {
        setLessons(response.data.lessons);
      }
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }], // Headers
    ["bold", "italic", "underline", "strike"], // Text styles
    [{ align: [] }], // Text alignment (Left, Center, Right, Justify)
    [{ list: "ordered" }, { list: "bullet" }], // Lists
    ["link", "blockquote", "code-block"], // Links & block styles
    [{ color: [] }, { background: [] }], // Text & background color
    [{ font: [] }], // Font style
    [{ size: ["small", "medium", "large", "huge"] }], // Font size
    ["clean"], // Remove formatting
    ["table"], 
  ];
  
  const modules = {
    toolbar: toolbarOptions, //Enable custom toolbar
  };

  useEffect(() => {
    fetchLessonsFromAPI();
  }, []);

  const handleLessonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lessonId = e.target.value;
    setSelectedLesson(lessonId);
    const selectedLessonData = lessons.find((lesson) => lesson.lessonid === lessonId);
    setContent(selectedLessonData ? selectedLessonData.lessoncontent : "");
  };

  const saveContent = async () => {
    if (!selectedLesson) {
      alert("Please select a lesson to save the content.");
      return;
    }
    console.log("Final Content Before Save:", content); // ✅ Debug content before saving
  
    try {
      await axios.post("https://chabcav-api-development.up.railway.app/admin/update-lesson", {
        lessonId: selectedLesson,
        lessonName: lessons.find((lesson) => lesson.lessonid === selectedLesson)?.lessonname || "",
        lessonContent: content,
      });
      alert("Content updated successfully!");
      setLessons((prevLessons) =>
        prevLessons.map((lesson) =>
          lesson.lessonid === selectedLesson ? { ...lesson, lessoncontent: content } : lesson
        )
      );
    } catch (error) {
      console.error("Error updating content:", error);
      alert("Failed to update content.");
    }
  };
  

  const saveLessonAndChapter = async () => {
    try {
      if (!newLessonTitle.trim()) {
        alert("Please enter a lesson title.");
        return;
      }
      const lessonPayload = {
        chapter: { chaptername: newChapterTitle.trim() || "Default Chapter" },
        lesson: { lessonname: newLessonTitle.trim(), lessoncontent: newContent.trim() },
      };
      await axios.post("https://chabcav-api-development.up.railway.app/admin/create-content", lessonPayload);
      await fetchLessonsFromAPI();
      setNewContent("");
      setNewLessonTitle("");
      setNewChapterTitle("");
      alert("Lesson and Chapter saved!");
      setShowAddForm(false);
    } catch (error) {
      console.error("Error saving lesson and chapter:", error);
      alert("Failed to save lesson and chapter.");
    }
  };
  return (
    <div className="container-fluid py-4">
      <div className="card p-4 shadow-sm mb-4 col-12 col-lg-8 m-auto">
        <div className="d-flex justify-content-center mb-4 gap-3">
          <Button 
            variant="primary" 
            onClick={() => setShowAddForm(!showAddForm)} 
            className="px-4 py-2 fs-5 fw-bold shadow-lg rounded"
          >
            {showAddForm ? "Cancel" : "Add Lesson"}
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => setShowUpdateForm(!showUpdateForm)}
            className="px-4 py-2 fs-5 fw-bold shadow-lg rounded"
          >
            {showUpdateForm ? "Cancel" : "Update Lesson"}
          </Button>
        </div>

        {showAddForm && (
          <div className="card p-4 mb-3 shadow-sm border-0 rounded text-center">
            <h2 className="fw-bold text-primary">📘 Add New Lesson</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Chapter Name</Form.Label>
                <Form.Control type="text" value={newChapterTitle} onChange={(e) => setNewChapterTitle(e.target.value)} className="text-center" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Lesson Name</Form.Label>
                <Form.Control type="text" value={newLessonTitle} onChange={(e) => setNewLessonTitle(e.target.value)} className="text-center" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Lesson Content</Form.Label>
                <ReactQuill value={newContent} onChange={setNewContent} placeholder="Enter lesson content..." modules={modules}/>
              </Form.Group>
              <Button variant="success" className="w-100 py-2" onClick={saveLessonAndChapter}>Save</Button>
            </Form>
          </div>
        )}

        {showUpdateForm && (
          <div className="card p-4 mb-3 shadow-sm border-0 rounded text-center">
            <h2 className="fw-bold text-secondary">✏️ Update Lesson</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Select Lesson</Form.Label>
                <select value={selectedLesson} onChange={handleLessonChange} className="form-control text-center">
                  <option value="">-- Select a Lesson --</option>
                  {lessons.map((lesson) => (
                    <option key={lesson.lessonid} value={lesson.lessonid}>{lesson.lessonname}</option>
                  ))}
                </select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Lesson Content</Form.Label>
                <ReactQuill value={content} onChange={setContent} modules={modules}/>
              </Form.Group>
              <Button variant="success" className="w-100 py-2" onClick={saveContent}>Save</Button>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonPane;