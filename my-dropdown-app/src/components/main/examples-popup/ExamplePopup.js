import React, { useState, useEffect } from 'react';
import "../../../styles/leftTopCorner/example-popup.css";

const ExamplePopup = ({ isDarkMode, setShowExamplePopup, updateActiveTabContent }) => {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState('');
    const [fileContent, setFileContent] = useState('');

    useEffect(() => {
        fetch('/files')
            .then(response => response.json())
            .then(data => setFiles(data))
            .catch(error => console.error('Error fetching files:', error));
    }, []);

    const handleFileClick = (fileName) => {
        setSelectedFile(fileName);
        fetch(`/file-content?name=${encodeURIComponent(fileName)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setFileContent(data.content);
                updateActiveTabContent(data.content); // Call update immediately after setting file content
            })
            .catch(error => console.error('Error fetching file content:', error));
    };

    return (
        <div className="modal-overlay">
            <div
                style={{
                    backgroundColor: isDarkMode ? "#2e2d2d" : "#fff",
                    border: "1px solid grey",
                    borderRadius: "8px"
                }}
            >
                <div
                    style={{
                        backgroundColor: isDarkMode ? "#2e2d2d" : "#fff",
                        width: "375px",
                        height: "15px",
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "10px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        borderRadius: "8px"
                    }}
                >
                    <span style={{ color: isDarkMode ? "white" : "black", fontSize: "12px", marginTop: "10px" }}>Examples</span>
                </div>
                <div
                    style={{
                        backgroundColor: isDarkMode ? "black" : "white",
                        width: "375px",
                        height: "380px",
                        marginTop: "15px",
                        border: "1px solid grey",
                        borderRadius: "8px",
                        overflowY: 'auto'
                    }}
                >
                    {files.map(file => (
                        <div
                            key={file.original}
                            onClick={() => handleFileClick(file.original)}
                            style={{
                                cursor: 'pointer',
                                padding: '8px',
                                borderBottom: '1px solid grey',
                                color: isDarkMode ? "white" : "black",
                                backgroundColor: isDarkMode ? "black" : "white",
                                fontSize: "12px"
                            }}
                        >
                            {file.formatted.slice(0, -4)}
                        </div>
                    ))}
                </div>
                <button className="example-popup-buttons"
                    style={{
                        backgroundColor: isDarkMode ? "black" : "white",
                        color: isDarkMode ? "white" : "black",
                        border: "1px solid gray"
                    }}
                    onClick={() => setShowExamplePopup(false)}>Close</button>
            </div>
        </div>
    );
};

export default ExamplePopup;
