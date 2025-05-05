import React, { useState, useEffect, useRef} from "react";
import axios from "axios";
import { Form, Button, Spinner, Alert, Card } from "react-bootstrap";
import SpinnerModal from "../../components/SpinnerModal";

const Dictionary: React.FC = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalHtml, setOriginalHtml] = useState<string | null>(null);
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  //const [highlightedWord, setHighlightedWord] = useState<string | null>(null);
 //const [buttonPosition, setButtonPosition] = useState<{ top: number; left: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);


 /* useEffect(() => {
    document.addEventListener("mouseup", handleTextSelection);
    return () => {
      document.removeEventListener("mouseup", handleTextSelection);
    };
  }, []);*/

  /*const handleTextSelection = () => {
    const selection = window.getSelection();

    if (selection && selection.toString().trim() !== "" && contentRef.current) {
      const selectedText = selection.toString().trim();
      setHighlightedWord(selectedText);

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const containerRect = contentRef.current.getBoundingClientRect();

      // Calculate position relative to the card-body container
      const buttonTop = rect.top - containerRect.top + 200; // Add margin for better positioning
      const buttonLeft = rect.right - containerRect.left + contentRef.current.scrollLeft - 5; // Adjust for overflow

      setButtonPosition({
        top: buttonTop,
        left: buttonLeft,
      });
    } else {
      setHighlightedWord(null);
      setButtonPosition(null);
    }
  };*/

  /*const speakText = (html: string) => {
    if (!html) return; // Ensure non-empty string
    const synth = window.speechSynthesis;
    const plainText = new DOMParser().parseFromString(html, "text/html").body.textContent || "";
    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.lang = "es-ES"; // or fallback to "en-US"
    synth.speak(utterance);
  };*/


  /*const speakText = (text: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    const availableLanguages = ["es-MX", "es-ES"];
    utterance.lang = availableLanguages.find((lang) => synth.getVoices().some((voice) => voice.lang === lang)) || "es-ES";
    synth.speak(utterance);
  };*/

  // Fetch latest dictionary content on load
  const fetchLatestHtml = async () => {
    try {
      const htmlRes = await axios.get("https://chabcav-api-development.up.railway.app/api/dictionary/html/latest");
      const textRes = await axios.get("https://chabcav-api-development.up.railway.app/api/dictionary/text/latest");

      const html = htmlRes.data.html;
      const extractedText = textRes.data.text;

      const htmlWithAnchors = injectAnchorsIntoHtml(html, extractedText);

      setOriginalHtml(htmlWithAnchors);
      //setHighlightedHtml(htmlWithAnchors); // Display with anchor support
      //setHighlightedHtml(addAnchorsToHtml(htmlWithAnchors));
      setHighlightedHtml(injectAudioButtons(addAnchorsToHtml(htmlWithAnchors)));


    } catch (err) {
      console.error("Failed to fetch dictionary content:", err);
    }
  };


  function loadingAnimation() {
    let timer: NodeJS.Timeout;
    if (isLoading) {
      timer = setTimeout(() => {
        setIsLoading(false);
        fetchLatestHtml();
      }, 1000);
    }
    return () => clearTimeout(timer); // Cleanup the timer on unmount or when loading changes
  };

  function injectAnchorsIntoHtml(html: string, text: string): string {
    const lines = text.split('\n');

    lines.forEach((line) => {
      const match = line.trim().match(/^──────\s([A-Z])\s──────$/);
      if (match) {
        const letter = match[1];
        const anchorId = `letter-${letter}`;

        // Escape the line to be used in regex
        const escapedLine = line.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedLine);

        // Inject anchor before that line in the HTML
        html = html.replace(
          regex,
          `<a id="${anchorId}" style="display:block;height:0px;"></a>${line}`
        );
      }
    });

    return html;
  }

  useEffect(() => {
    loadingAnimation();
    fetchLatestHtml();
  }, []);

  const handleSearch = async () => {
    if (!query.trim() || !originalHtml) return;

    setLoading(true);
    setError(null);

    try {
      const highlighted = highlightSearchTerm(originalHtml, query);
      setHighlightedHtml(highlighted);

      // Auto-scroll to first match
      setTimeout(() => {
        const el = document.getElementById("firstMatch");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 200);
    } catch (err) {
      setError("❌ Search failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const highlightSearchTerm = (html: string, term: string): string => {
    if (!term.trim()) return html;
    const escapedTerm = term.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
    const regex = new RegExp(`(${escapedTerm})`, "i"); // first match only
    return html.replace(regex, `<a id="firstMatch"></a><mark>$1</mark>`);
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
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);


  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

 /* const addAnchorsToHtml = (html: string): string => {
    return html.replace(
      /<span[^>]*>[\s─-]*([A-Z])[\s─-]*<\/span>/g,
      (match, letter) => {
        // Wrap the letter in a div and apply centering styles
        return `
          <div id="letter-${letter}" style="text-align: center; display: inline-block; width: 100%;">
            ${match}
          </div>`;
      }
    );
  };*/


  const addAnchorsToHtml = (html: string): string => {
    return `
      <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
        ${html.replace(
          /<span[^>]*>[\s─-]*([A-Z])[\s─-]*<\/span>/g,
          (match, letter) => {
            return `<div id="letter-${letter}" >${match}</div>`;
          }
        )}
      </div>
    `;
  };
  
  
  

//Injecting audio buttons into the HTML
/*function injectAudioButtons(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const rows = doc.querySelectorAll("tr");

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");

    if (cells.length >= 5) {
      const pronunciationCell = cells[1];
      const audioCell = cells[2];

      const pronunciationText = (pronunciationCell.textContent || "").trim();

      if (/^\/[^\/]+\/$/.test(pronunciationText)) {
        const button = document.createElement("button");
        button.textContent = "🔊";
        button.setAttribute("data-pronunciation", pronunciationText);
        button.setAttribute("class", "audio-btn");
        button.style.cssText = `
          background: none;
          border: none;
          font-size: 1.3em;
          padding: 0;
          margin: 0;
          margin-right: 100px;
          margin-left: 0px;
          cursor: pointer;
          line-height: 1;
          display: inline-block;
          vertical-align: middle;
          transform: translateY(-1px);
        `;

        // Add click event listener to speak the text
        button.addEventListener("click", () => {
          const utterance = new SpeechSynthesisUtterance(pronunciationText);
          utterance.lang = "es-ES"; // Spanish (Spain)
          speechSynthesis.speak(utterance);
        });
        

        // Clear and append button to the audio cell
        audioCell.innerHTML = "";
        audioCell.appendChild(button);
      }
    }
  });

  return doc.body.innerHTML;
}*/

function injectAudioButtons(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const rows = doc.querySelectorAll("tr");

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");

    if (cells.length >= 5) {
      const pronunciationCell = cells[1];
      const audioCell = cells[2];

      const span = pronunciationCell.querySelector("span");
      const pronunciationText = span && span.textContent ? span.textContent.trim() : "";
      
      if (/^\/[^\/]+\/$/.test(pronunciationText)) {
        const cleanedText = pronunciationText.replace(/\//g, "");
        const button = document.createElement("button");
        button.textContent = "🔊";
        button.setAttribute("data-pronunciation", cleanedText);
        button.setAttribute("class", "audio-btn");
      
        button.style.cssText = `
          background: none;
          border: none;
          font-size: 1.1em;
          padding: 2px 4px;
          margin: 0 auto;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        `;
      
        /*button.addEventListener("click", () => {
          const synth = window.speechSynthesis;
          const utterance = new SpeechSynthesisUtterance(cleanedText);
          const availableLanguages = ["es-MX", "es-ES"];
          utterance.lang = availableLanguages.find((lang) => synth.getVoices().some((voice) => voice.lang === lang)) || "es-ES";
          synth.speak(utterance);
        });*/
      
      
        audioCell.innerHTML = "";
        audioCell.appendChild(button);
      }
      
    }
  });
  return doc.body.innerHTML;
}

const speakText = (text: string) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  const availableLanguages = ["es-MX", "es-ES"];
  utterance.lang = availableLanguages.find((lang) => synth.getVoices().some((voice) => voice.lang === lang)) || "es-ES";
  synth.speak(utterance);
};

useEffect(() => {
  const handleAudioClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("audio-btn")) {
      const text = target.getAttribute("data-pronunciation");
      if (text) {
        speakText(text);
      }
    }
  };

  const container = contentRef.current;
  container?.addEventListener("click", handleAudioClick);

  return () => {
    container?.removeEventListener("click", handleAudioClick);
  };
}, []);


/*useEffect(() => {
  const container = document.getElementById("dictionary-container");
  if (!container) return;

  const synth = window.speechSynthesis;
  const availableLanguages = ["es-ES", "en-US"]; // adjust this list as needed

  const handleButtonClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("audio-btn")) {
      const pronunciation = target.getAttribute("data-pronunciation");
      if (pronunciation) {
        const utterance = new SpeechSynthesisUtterance(pronunciation);

        // Dynamically set language if available, fallback to "es-ES"
        utterance.lang =
          availableLanguages.find((lang) =>
            synth.getVoices().some((voice) => voice.lang === lang)
          ) || "es-ES";

        synth.speak(utterance);
      }
    }
  };

  container.addEventListener("click", handleButtonClick);
  return () => container.removeEventListener("click", handleButtonClick);
}, []);*/



  return (


    <div
      className="container-fluid"
      style={{
        left: "100%",
        alignItems: "center",
        transition: "margin 0.3s ease-in-out",
        marginLeft: isSidebarCollapsed ? "0" : "50px",
        width: isSidebarCollapsed ? "100%" : "calc(100% - 50px)",
      }}
    >
      <SpinnerModal show={isLoading} />

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


        {/* Alphabetical Index */}
        <div className="mb-3 d-flex flex-wrap gap-2">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
            <Button
              key={letter}
              size="sm"
              variant="outline"
              onClick={() => {
                const el = document.getElementById(`letter-${letter}`);
                if (el) {
                  scrollToLetter(letter);
                }
              }}
            >
              <strong>{letter.toUpperCase()}</strong>
            </Button>
          ))}
        </div>

{/* Dictionary Content put this back if you want speak text {/*ref={contentRef}*/}

        {highlightedHtml && (
          <Card className="mt-4 p-3 shadow-sm">
            <h5 className="fw-bold mb-3 text-primary">📄 DICCIONARIO CHABACANO DEL CIUDAD DE CAVITE  </h5>
            <div
             ref={contentRef}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                maxHeight: "500px",
                overflowY: "auto",
                backgroundColor: "#fff",
                scrollBehavior: "smooth",
              }}
               id="dictionary-container"
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          </Card>
        )}
{/*Un comment this if you want to use speak text*/}
       {/*} {highlightedWord && buttonPosition && (
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
        )} */}

      </div>
    </div>


  );
};

export default Dictionary;
