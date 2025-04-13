import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, ProgressBar, Alert } from "react-bootstrap";
import DictionaryEditor from "./DictionaryEditor";

const UploadDictionary: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [refreshEditor, setRefreshEditor] = useState(false); // to reload editor after upload

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setMessage(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a .docx file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setProgress(0);
      setMessage(null);
      setError(null);

      await axios.post("https://chabcav-api-development.up.railway.app/admin/upload-file-dictionary", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percent);
          }
        },
      });

      setMessage("✅ Dictionary uploaded successfully!");
      setFile(null);
      setRefreshEditor(prev => !prev); // trigger refresh in DictionaryEditor
    } catch (error: any) {
      console.error("Upload failed:", error);
      setError("❌ Failed to upload dictionary.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (event.clientX <= 10) {
        setIsSidebarCollapsed(false);
      } else if (event.clientX > 260) {
        setIsSidebarCollapsed(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="card p-4 shadow-sm mb-4"
      style={{
        paddingLeft: "250px",
        transition: "margin 0.3s ease-in-out",
        marginLeft: isSidebarCollapsed ? "0" : "250px",
        width: isSidebarCollapsed ? "100%" : "calc(100% - 250px)",
      }}
    >
      <div className="card p-4 mb-3 shadow-sm border-0 rounded text-center">
        <h2 className="fw-bold text-secondary">📤 Upload Dictionary File</h2>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Select .docx File</Form.Label>
          <Form.Control type="file" accept=".docx" onChange={handleFileChange} />
        </Form.Group>

        {uploading && <ProgressBar now={progress} label={`${progress}%`} className="mb-3" animated />}
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Button variant="info" className="w-100 py-2" onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Dictionary"}
        </Button>
      </div>

      <div className="card p-4 mt-4 shadow-sm border-0 rounded">
        <h4 className="text-secondary text-center mb-3">✏️ Edit Latest Uploaded Dictionary</h4>

        <div className="mt-4">
          {/* Key is used to force re-mount when refreshEditor changes */}
          <DictionaryEditor key={refreshEditor.toString()} />
        </div>
      </div>
    </div>
  );
};

export default UploadDictionary;
