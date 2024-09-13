import React, { useState } from 'react';
import Draggable from 'react-draggable';

const DataTablePopup = ({ data, onClose, isDarkMode }) => {
    const [hoveredData, setHoveredData] = useState({ title: '', index: -1, visible: false, position: { x: 0, y: 0 } });

    const handleMouseEnter = (event, title, rowIndex) => {
        const { clientX, clientY } = event;
        // Adjust positioning to prevent the hover box from going outside the viewport
        const offsetX = window.innerWidth - clientX < 150 ? -150 : 10;
        const offsetY = window.innerHeight - clientY < 50 ? -50 : 10;

        setHoveredData({
            title,
            index: rowIndex + 1, // To start index from 1
            visible: true,
            position: { x: clientX + offsetX, y: clientY + offsetY } // Adjusted offset from the cursor
        });
    };


    const handleMouseLeave = () => {
        setHoveredData({ title: '', index: -1, visible: false, position: { x: 0, y: 0 } });
    };

    const promptForFileNameAndDownload = () => {
        const fileName = window.prompt("Please enter the name of the file to save:", "MyTable");
        if (fileName) {
            downloadCSV(fileName);
        }
    };

    const downloadCSV = (fileName) => {
        const titles = ['Index', ...data.titles]; // Add 'Index' to titles
        const rows = data.columns[0].map((_, rowIndex) => [
            rowIndex + 1, // Add index as the first column in each row
            ...data.columns.map(column => column[rowIndex]) // Add the rest of the data
        ]);

        const csvContent = [
            titles.join(','), // Add titles as the first row
            ...rows.map(row => row.join(',')) // Convert each row to a CSV string
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileName}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up
    };

    return (
        <>
            <Draggable>
                <div className="popup-edit-graph"
                    style={{
                        position: 'fixed',
                        top: "25%",
                        left: "25%",
                        backgroundColor: isDarkMode ? "#242323" : "white",
                        border: isDarkMode ? "1px solid grey" : "1px solid black",
                        borderRadius: "8px",
                        width: "40%",
                        height: "50%",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        pointerEvents: 'auto', // Allow interaction with the popup
                        zIndex: 1001 // Ensure it is visible but not blocking
                    }}>
                    {/* Scrollable container for table */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={{
                                        backgroundColor: isDarkMode ? "#242323" : "white",
                                        border: isDarkMode ? "1px solid grey" : "1px solid black",
                                        padding: '5px',
                                        color: isDarkMode ? "white" : "black"
                                    }}></th>
                                    {data.titles.map((title, index) => (
                                        <th key={index} style={{
                                            backgroundColor: isDarkMode ? "#242323" : "white",
                                            border: isDarkMode ? "1px solid grey" : "1px solid black",
                                            color: isDarkMode ? "white" : "black",
                                            padding: '5px',
                                            fontSize: '12px'
                                        }}>{title}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.columns[0].map((_, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td style={{
                                            backgroundColor: isDarkMode ? "#242323" : "white",
                                            border: isDarkMode ? "1px solid grey" : "1px solid black",
                                            color: isDarkMode ? "white" : "black",
                                            padding: '5px',
                                            fontSize: '12px'
                                        }}>{rowIndex + 1}</td>
                                        {data.columns.map((column, colIndex) => (
                                            <td key={colIndex}
                                                style={{
                                                    backgroundColor: isDarkMode ? "#242323" : "white",
                                                    border: isDarkMode ? "1px solid grey" : "1px solid black",
                                                    color: isDarkMode ? "white" : "black",
                                                    padding: '5px',
                                                    position: 'relative',
                                                    fontSize: '12px'
                                                }}
                                                onMouseEnter={(e) => handleMouseEnter(e, data.titles[colIndex], rowIndex)}
                                                onMouseLeave={handleMouseLeave}>
                                                {column[rowIndex]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Fixed container for buttons */}
                    <div style={{ padding: '10px', borderTop: isDarkMode ? '1px solid #242323' : '1px solid white', textAlign: 'right' }}>
                        <button onClick={onClose}
                            style={{
                                padding: '5px 10px',
                                marginRight: '10px',
                                backgroundColor: isDarkMode ? 'black' : 'white',
                                border: isDarkMode ? '1px solid grey' : '1px solid black',
                                color: isDarkMode ? 'white' : 'black'
                            }}>Close</button>
                        <button onClick={promptForFileNameAndDownload}
                            style={{
                                padding: '5px 10px',
                                backgroundColor: isDarkMode ? 'black' : 'white',
                                border: isDarkMode ? '1px solid grey' : '1px solid black',
                                color: isDarkMode ? 'white' : 'black'
                            }}>Save as CSV</button>
                    </div>
                </div>
            </Draggable>

            {/* Hover Popup */}
            {hoveredData.visible && (
                <div style={{
                    position: 'fixed',
                    top: `${hoveredData.position.y}px`,
                    left: `${hoveredData.position.x}px`,
                    backgroundColor: isDarkMode ? "#242323" : "white",
                    border: isDarkMode ? '1px solid grey' : '1px solid black',
                    color: isDarkMode ? 'white' : 'black',
                    borderRadius: '4px',
                    padding: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    zIndex: 2000, // Increase z-index to ensure visibility
                    fontSize: '12px',
                    pointerEvents: 'none' // Ensure this does not block interaction
                }}>
                    <div><strong>Title:</strong> {hoveredData.title}</div>
                    <div><strong>Index:</strong> {hoveredData.index}</div>
                </div>
            )}
        </>
    );
};

export default DataTablePopup;
