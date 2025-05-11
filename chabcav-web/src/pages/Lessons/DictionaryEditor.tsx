import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Alert, Card, Spinner } from "react-bootstrap";

interface DictionaryEditorProps {
  onUpdateSuccess?: () => void;
}

const DictionaryEditor: React.FC<DictionaryEditorProps> = ({ onUpdateSuccess }) => {
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHtml = async () => {
      try {
        const res = await axios.get("https://chabcav-api-development.up.railway.app/api/dictionary/html/latest");
        setHtmlContent(res.data.html || "");
      } catch (err) {
        console.error(err);
        setError("Failed to fetch latest dictionary content.");
      } finally {
        setLoading(false);
      }
    };

    fetchHtml();
  }, []);

  const handleUpdate = async () => {
    setUpdating(true);
    setError(null);
    setSuccess(false);

    try {
      const updatedHtml = editorRef.current?.innerHTML || "";

      const res = await axios.post("https://chabcav-api-development.up.railway.app/admin/update-dictionary-html", {
        updatedHtml,
      });

      if (res.status === 200) {
        setSuccess(true);
        if (onUpdateSuccess) onUpdateSuccess();
      } else {
        setError("Update failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <Card className="p-4 shadow-sm mt-3">
      <h4 className="mb-3 text-secondary">📖 Dictionary Table Editor</h4>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">✅ Dictionary updated successfully!</Alert>}

      <div>
        <h5>Editable Table Content</h5>
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning={true}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "5px",
            maxHeight: "500px",
            overflowY: "auto",
            backgroundColor: "#fdfdfd",
            whiteSpace: "normal",
          }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>

      <Button className="mt-3" onClick={handleUpdate} disabled={updating}>
        {updating ? <Spinner size="sm" animation="border" /> : "Update Dictionary"}
      </Button>
    </Card>
  );
};

export default DictionaryEditor;
