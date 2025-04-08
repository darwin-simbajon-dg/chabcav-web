import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import UploadDictionary from "./UploadDictionary"; // Import UploadDictionary component
import { Quill } from "react-quill";
import { TableModule } from "quill-table-module";

// Register the Table module with Quill
Quill.register("modules/table", TableModule);

const DictionaryPane: React.FC = () => {
  const [dictionaryTitle, setDictionaryTitle] = useState("");
  const [dictionaryContent, setDictionaryContent] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  // Fetch Dictionary data
  const fetchDictionary = async () => {
    try {
      const response = await axios.get("http://localhost/user/get-dictionary");
      if (response.data && response.data.dictionary) {
        setDictionaryTitle(response.data.dictionary.dictionarytitle);
        setDictionaryContent(response.data.dictionary.dictionarycontent);
      }
    } catch (error) {
      console.error("Error fetching dictionary:", error);
    }
  };

  // Save updated dictionary
  const saveDictionary = async () => {
    try {
      if (!dictionaryTitle.trim() || !dictionaryContent.trim()) {
        alert("Please fill in both the title and content.");
        return;
      }

      await axios.put("http://localhost/admin/update-dictionary", {
        dictionaryTitle,
        dictionaryContent,
      });

      alert("Dictionary updated successfully!");
    } catch (error) {
      console.error("Error updating dictionary:", error);
      alert("Failed to update dictionary.");
    }
  };

  // Handle input change for title and content
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDictionaryTitle(e.target.value);
  };

  const handleContentChange = (content: string) => {
    setDictionaryContent(content);
  };

  useEffect(() => {
    fetchDictionary();
  }, []);

  // Define the Quill modules, including the table module
  const modules = {
    toolbar: [
      [{ 'table': [] }],  // Add table button to the toolbar
      [{ 'header': '1' }, { 'header': '2' }, 'bold', 'italic'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
      [{ 'align': [] }],
    ],
    table: true,  // Enable the table module
  };

  return (
    <div className="container-fluid py-4">
      <div className="col-12 col-lg-8 m-auto text-center">
        <Button
          variant="primary"
          onClick={() => setShowUpdateForm(!showUpdateForm)}
          className="px-4 py-2 fs-5 fw-bold shadow-lg rounded"
        >
          {showUpdateForm ? "Cancel" : "Update Dictionary"}
        </Button>

        {showUpdateForm && (
          <div className="card p-4 mb-3 shadow-sm border-0 rounded text-center">
            <h2 className="fw-bold text-secondary">✏️ Update Dictionary</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Dictionary Title</Form.Label>
                <Form.Control
                  type="text"
                  value={dictionaryTitle}
                  onChange={handleTitleChange}
                  className="text-center"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Dictionary Content</Form.Label>
                <ReactQuill
                  value={dictionaryContent}
                  onChange={handleContentChange}
                  placeholder="Enter dictionary content..."
                  modules={modules}  // Add the modules configuration
                />
              </Form.Group>
              <Button
                variant="success"
                className="w-100 py-2"
                onClick={saveDictionary}
              >
                Save
              </Button>
            </Form>
          </div>
        )}

        {/* Add the UploadDictionary component here */}
        <UploadDictionary />
      </div>
    </div>
  );
};

export default DictionaryPane;
