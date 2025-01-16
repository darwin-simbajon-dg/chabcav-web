import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const LessonPane : React.FC = () => {

  const [selectedLesson, setSelectedLesson] = useState("");
  const [content, setContent] = useState("");

  const lessons = [
    { id: "1", title: "Lesson 1: Introduction to React" },
    { id: "2", title: "Lesson 2: Understanding Components" },
    { id: "3", title: "Lesson 3: State and Props" },
  ];

  const handleLessonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLesson(e.target.value);
    // Load content for the selected lesson (if available)
    const lessonContent = localStorage.getItem(e.target.value) || "";
    setContent(lessonContent);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const saveContent = () => {
    if (selectedLesson) {
      localStorage.setItem(selectedLesson, content);
      alert("Content saved!");
    } else {
      alert("Please select a lesson to save the content.");
    }
  };

  return (
    <div className="container-fluid py-4" >
    <div className="col-12 col-lg-8 m-auto">
      <div className="row">
        <div className="row mb-4">
          <div className="col-lg-5 ms-3 col-sm-8">
            <h3 className="mb-0 h4 font-weight-bolder">Lessons</h3>
            <p className="mb-4">Add or Create Lessons</p>
          </div>
          </div>
      <div className="card">
        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
          <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
            <h5 className="text-white text-center">Lesson Editor</h5>
          </div>
        </div>
        <div className="card-body">
          <form className="multisteps-form__form">
            {/* Lesson Selection */}
            <div className="mb-4">
              <label htmlFor="lessonSelect" className="form-label mt-4 ms-0">
                Select Lesson
              </label>
              <select
                id="lessonSelect"
                className="form-control"
                value={selectedLesson}
                onChange={handleLessonChange}
              >
                <option value="">-- Select a Lesson --</option>
                {lessons.map((lesson) => (
                  <option key={lesson.id} value={lesson.id}>
                    {lesson.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Rich Text Editor */}
            <div className="mb-4">
              <label htmlFor="richTextEditor" className="form-label">
                Lesson Content
              </label>
              <ReactQuill
                id="richTextEditor"
                theme="snow"
                value={content}
                onChange={handleContentChange}
                placeholder="Write your lesson content here..."
              />
            </div>

            {/* Buttons */}
            <div className="button-row d-flex mt-4">
              <button
                className="btn bg-gradient-dark ms-auto"
                type="button"
                onClick={saveContent}
              >
                Save Content
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
    </div>
  );

}

export default LessonPane;