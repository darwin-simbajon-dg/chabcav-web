import React, { useEffect, useState } from "react";

const AboutUs: React.FC = () => {
  const [aboutUs, setAboutUs] = useState<string>("");

  useEffect(() => {
    fetchCMS();
  }, []);

  async function fetchCMS() {
    try {
      const response = await fetch("https://chabcav-api-development.up.railway.app/api/cms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }

      const data = await response.json();
      setAboutUs(data.aboutus);
    } catch (error) {
      console.error(error);
    }
  }

  const lines = aboutUs
    .split("\n")
    .map(line => line.trim())
    .filter(line => line); // Remove empty lines

  const paragraph = lines[0]; // First line is the paragraph
  const bulletItems = lines.slice(1); // Remaining lines are list items

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      <section>
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="mb-3">{paragraph}</p>

        <ul className="list-disc list-inside space-y-2 text-lg">
          {bulletItems.map((line, index) => {
            const [name, ...descParts] = line.split("–");
            return (
              <li key={index}>
                <strong>{name.trim()}</strong> – {descParts.join("–").trim()}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default AboutUs;
