// lesson editor
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
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
 // const [uploadedAudioUrl, setUploadedAudioUrl] = useState<string | null>(null);


  const fetchLessonsFromAPI = async () => {
    try {
      const response = await axios.get("http://localhost/user/get-all-lessons");
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
    [{ align: [] }], // ✅ Add text alignment (Left, Center, Right, Justify)
    [{ list: "ordered" }, { list: "bullet" }], // Lists
    ["link", "blockquote", "code-block"], // Links & block styles
    [{ color: [] }, { background: [] }], // Text & background color
    ["clean"], // Remove formatting
  ];

  
  // ✅ Insert Audio Next to Selected Word
  /*const insertAudioForWord = (word: string | null, audioUrl: string) => {
    if (!word) return;
    const audioTag = `<span>${word} 
      <audio controls style="height:20px; vertical-align: middle;">
        <source src="${audioUrl}" type="audio/mp3">
      </audio></span>`;

    setContent((prevContent) => prevContent.replace(word, audioTag));
  };*/
  
  const modules = {
    toolbar: toolbarOptions, // ✅ Enable custom toolbar
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

    // ✅ Handle Audio File Upload
   /* const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && (file.type === "audio/mp3" || file.type === "audio/wav")) {
        const audioUrl = URL.createObjectURL(file); // ✅ Create temporary audio URL
        setUploadedAudioUrl(audioUrl);
        insertAudioForWord(selectedWord, audioUrl); // ✅ Insert into Quill
      } else {
        alert("Please upload a valid .mp3 or .wav file.");
      }
    };*/

/*  const saveContent = async () => {
    if (!selectedLesson) {
      alert("Please select a lesson to save the content.");
      return;
    }
    try {
      await axios.post("http://localhost/admin/update-lesson", {
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
  };*/

  const saveContent = async () => {
    if (!selectedLesson) {
      alert("Please select a lesson to save the content.");
      return;
    }
    console.log("Final Content Before Save:", content); // ✅ Debug content before saving
  
    try {
      await axios.post("http://localhost/admin/update-lesson", {
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
      await axios.post("http://localhost/admin/create-content", lessonPayload);
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

 /* function handleSelection(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      setSelectedWord(selection.toString().trim());
      alert(`Selected word: ${selection.toString().trim()}`);
    } else {
      alert("Please select a word first.");
    }
  }*/

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file || !(file.type === "audio/mp3" || file.type === "audio/wav")) {
        alert("Please upload a valid .mp3 or .wav file.");
        return;
      }
    
      if (!selectedWord) {
        alert("Please select a word first.");
        return;
      }
    
      // Define the path where the audio will be stored
      const audioFileName = `${selectedWord}.mp3`; // Ensure consistency
      const audioPath = `/AudioRecordings/${audioFileName}`; // Relative path
    
      // Simulate saving the file (in actual implementation, send it to the backend)
      setUploadedAudioUrl(audioPath);
    
      // Insert the audio tag
      insertAudioForWord(selectedWord, audioPath);
    };

    function handleSelection(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        setSelectedWord(selection.toString().trim());
        console.log("Selected Word:", selection.toString().trim()); // ✅ Check in console
        alert(`Selected word: ${selection.toString().trim()}`);
      } else {
        alert("Please select a word first.");
      }
    }    
    

/*const handleSelection = () => {
  const selection = window.getSelection()?.toString().trim();
  if (!selection) {
    alert("Please select a word first.");
    return;
  }

  setSelectedWord(selection);

  // Check if an audio file already exists
  const existingAudioPath = `/AudioRecordings/${selection}.mp3`;
  fetch(existingAudioPath)
    .then(response => {
      if (response.ok) {
        setUploadedAudioUrl(existingAudioPath);
        insertAudioForWord(selection, existingAudioPath);
      }
    })
    .catch(() => console.log("No pre-existing audio for this word."));
};*/

const insertAudioForWord = (word: string | null, audioUrl: string) => {
  if (!word) return;
  const audioTag = `<span>${word} 
    <audio controls style="height:20px; vertical-align: middle;">
      <source src="${audioUrl}" type="audio/mp3">
    </audio></span>`;

  setContent((prevContent) => {
    const updatedContent = prevContent.replace(word, audioTag);
    console.log("Updated Content:", updatedContent); // ✅ Check if content is updated
    return updatedContent;
  });
};
  

  return (
    <div className="container-fluid py-4">
      <div className="col-12 col-lg-8 m-auto text-center">
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
                <Form.Control as="select" value={selectedLesson} onChange={handleLessonChange} className="text-center">
                  <option value="">-- Select a Lesson --</option>
                  {lessons.map((lesson) => (
                    <option key={lesson.lessonid} value={lesson.lessonid}>{lesson.lessonname}</option>
                  ))}
                </Form.Control>
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