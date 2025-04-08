import React, { useState } from "react";
import axios from "axios";
import { Form, Button, ListGroup, Spinner, Alert } from "react-bootstrap";

const Dictionary: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const res = await axios.get("http://localhost/api/dictionary/search", {
        params: { query },
      });
      setResults(res.data);
    } catch (err) {
      setError("❌ Search failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
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
  );
};

export default Dictionary;
