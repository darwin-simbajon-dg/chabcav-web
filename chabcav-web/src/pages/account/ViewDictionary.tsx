import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, ListGroup, Spinner, Alert } from "react-bootstrap";

const Dictionary: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
  
    setLoading(true);
    setError(null);
    setResults([]);
  
    try {
      const res = await axios.get("http://localhost/api/dictionary/search", {
        params: { query },
      });
      if (res.data.length === 0) {
        setError("❌ No results found. Please try another word.");
      } else {
        setResults(res.data.map(item => item.extracted_text)); // Extract only the extracted_text
      }
    } catch (err) {
      setError("❌ Search failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
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
    <div className="container-fluid" style={{
      left: "100%",
      alignItems: "center",
      transition: "margin 0.3s ease-in-out",
      marginLeft: isSidebarCollapsed ? "0" : "50px",
      width: isSidebarCollapsed ? "100%" : "calc(100% - 50px)",
    }}>
    <div className="card p-4 shadow-sm mb-4"> 
      <h3 className="fw-bold text-secondary mb-3">📚 Search Dictionary</h3>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter word or phrase..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </Form.Group>

      <Button variant="primary" onClick={handleSearch} disabled={loading}>
        {loading ? <Spinner size="sm" animation="border" /> : "Search"}
      </Button>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {results.length > 0 && (
         <ListGroup className="mt-4">
         {results.map((item, idx) => (
           <ListGroup.Item key={idx}>
             <strong>{item.fileName}</strong> <br />
             <small className="text-muted">Uploaded: {new Date(item.uploadedAt).toLocaleString()}</small>
             <div dangerouslySetInnerHTML={{ __html: item.matchSnippet }} className="mt-2" />
           </ListGroup.Item>
         ))}
       </ListGroup>
       
      )}
    </div>
  </div>  
  );
};

export default Dictionary;
