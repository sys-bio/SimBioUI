import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import "./ExamplePopup.css";

const ExamplePopup = ({ isDarkMode, setShowExamplePopup, editorInstance, handleResetInApp, handleResetParameters }) => {
    const [files, setFiles] = useState([]);
    const nodeRef = useRef(null); // Create a ref for the draggable element

    useEffect(() => {
        fetchFileList();
    }, []);

    const fetchFileList = async () => {
        try {
            const response = await fetch('https://api.github.com/repos/sys-bio/SimBioUI/contents/examples-models');
            const data = await response.json();
            const formattedFiles = data.map(file => ({
                original: file.name,
                formatted: formatFileName(file.name)
            }));
            setFiles(formattedFiles);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    const handleFileClick = async (fileName) => {
        try {
            const response = await fetch(`https://raw.githubusercontent.com/sys-bio/SimBioUI/main/examples-models/${fileName}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const content = await response.text();
            if (editorInstance) {
                editorInstance.setValue(content);
            }
            handleResetInApp();
            handleResetParameters();
        } catch (error) {
            console.error('Error fetching file content:', error);
        }
    };

    const formatFileName = (fileName) => {
        return fileName.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase()).replace(/\//g, ' / ');
    };

    return (
        <div className="example-popup-overlay">
            <Draggable nodeRef={nodeRef} handle=".example-popup-top-container">
                <div
                    ref={nodeRef} // Attach the ref to the draggable element
                    style={{
                        backgroundColor: isDarkMode ? "#2e2d2d" : "#fff",
                        border: "1px solid grey",
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center" // Center align content horizontally
                    }}
                >
                    <div
                        className={"example-popup-top-container"}
                        style={{
                            backgroundColor: isDarkMode ? "#2e2d2d" : "#fff",
                            cursor: "move" // Change cursor to indicate draggable
                        }}
                    >
                        <span style={{ color: isDarkMode ? "white" : "black", fontSize: "12px" }}>Examples</span>
                    </div>
                    <div
                        className={"example-popup-options-container"}
                        style={{
                            backgroundColor: isDarkMode ? "black" : "white"
                        }}
                    >
                        {files.map(file => (
                            <div
                                className={"example-popup-options"}
                                key={file.original}
                                onClick={() => handleFileClick(file.original)}
                                style={{
                                    color: isDarkMode ? "white" : "black",
                                    backgroundColor: isDarkMode ? "black" : "white"
                                }}
                            >
                                {file.formatted.slice(0, -4)}
                            </div>
                        ))}
                    </div>
                    <button className="example-popup-buttons"
                        style={{
                            backgroundColor: isDarkMode ? "black" : "white",
                            color: isDarkMode ? "white" : "black"
                        }}
                        onClick={() => setShowExamplePopup(false)}>Close</button>
                </div>
            </Draggable>
        </div>
    );
};

export default ExamplePopup;
