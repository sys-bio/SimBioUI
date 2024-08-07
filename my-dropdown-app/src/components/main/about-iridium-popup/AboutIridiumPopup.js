import React, { useEffect, useState } from "react";
import "./AboutIridiumPopup.css";

const AboutIridiumPopup = ({ isDarkMode, setShowAboutIridiumPopup }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    // Fetch content from the URL
    fetch(
      "https://raw.githubusercontent.com/sys-bio/SimBioUI/main/copyright.txt"
    )
      .then((response) => response.text())
      .then((data) => setContent(data))
      .catch((error) => console.error("Error fetching content:", error));
  }, []);

  return (
    <div className="about-iridium-overlay" data-theme={isDarkMode ? 'dark' : 'light'}>
      <div className="about-iridium-content">
        <h2 className="about-iridium-title">About Web Iridium</h2>
        <pre className="about-iridium-text">{content}</pre>
        <button
          className="about-iridium-popup-buttons"
          onClick={() => setShowAboutIridiumPopup(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AboutIridiumPopup;
