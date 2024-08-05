// AboutIridiumPopup.js
import React, { useEffect, useState } from "react";

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
    <div className="modal-overlay">
      <div
        style={{
          backgroundColor: isDarkMode ? "#2e2d2d" : "#fff",
          border: "1px solid grey",
          borderRadius: "8px",
          width: "400px",
          height: "150px",
          overflowY: "auto",
          color: isDarkMode ? "white" : "black",
          position: "relative", // Ensure relative positioning for the container
        }}
      >
        <h2 style={{ fontWeight: "bold", fontSize: "18px", marginLeft: "10px" }}>
          About Web Iridium
        </h2>
        <pre style={{fontSize: "12px", marginLeft: "10px" }}>{content}</pre>
        <button
          className="example-popup-buttons"
          style={{
            backgroundColor: isDarkMode ? "black" : "white",
            color: isDarkMode ? "white" : "black",
            border: "1px solid gray",
            padding: "5px 10px",
            position: "absolute", // Positioning the button absolutely within the container
            right: "20px", // Align to the right with padding from the right edge
            bottom: "10px", // Align to the bottom with padding from the bottom edge
          }}
          onClick={() => setShowAboutIridiumPopup(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AboutIridiumPopup;
