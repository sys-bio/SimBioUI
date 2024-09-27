import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import chroma from "chroma-js";
import "./DataTablePopup.css";

const DataTablePopup = ({ data, onClose, isDarkMode, isDocked, onDock, onUndock }) => {
  const [hoveredData, setHoveredData] = useState({
    title: "",
    index: -1,
    visible: false,
    position: { x: 0, y: 0 },
  });
  const [size, setSize] = useState({ width: 700, height: 500 });
  const nodeRef = useRef(null);

  const [decimalPlaces, setDecimalPlaces] = useState(2); // Added state for decimal places

  const allNumericValues = data.columns
    .flat()
    .map(Number)
    .filter((v) => !isNaN(v));

  // Calculate the maximum absolute value
  const maxAbsValue = Math.max(...allNumericValues.map(Math.abs)) || 1;

  // Function to compute the background color based on the cell's value
  // Function to compute the background color based on the cell's value
  const getCellBackgroundColor = (value) => {
      if (typeof value !== "number" || isNaN(value)) {
          // Return default background color for non-numeric values
          return isDarkMode ? "#242323" : "white";
      }

//      if (value === 0) {
//          // Set background color to blue when value is zero
//          return "#72aed4"; // Adjusted blue color
//      }

      let color;

      if (value >= 0) {
          // Positive values: Light Pink to Dark Red
          const scalePositive = chroma
              .scale(["#f5e4e4", "#b81c1c"])
              .domain([0, maxAbsValue]);
          color = scalePositive(value).hex();
      } else if (value < 0) {
          // Negative values: Light Green to Dark Green
          const scaleNegative = chroma
              .scale(["#ebfae6", "#4da12f"])
              .domain([-maxAbsValue, 0]);
          color = scaleNegative(value).hex();
      }

      return color;
  };

  const handleMouseEnter = (event, title, rowIndex) => {
    const { clientX, clientY } = event;
    const offsetX = window.innerWidth - clientX < 150 ? -150 : 10;
    const offsetY = window.innerHeight - clientY < 50 ? -50 : 10;

    setHoveredData({
      title,
      index: rowIndex + 1,
      visible: true,
      position: { x: clientX + offsetX, y: clientY + offsetY },
    });
  };

  const handleMouseLeave = () => {
    setHoveredData({
      title: "",
      index: -1,
      visible: false,
      position: { x: 0, y: 0 },
    });
  };

  const handleResize = (corner, e) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;
    const startLeft = nodeRef.current.offsetLeft;
    const startTop = nodeRef.current.offsetTop;

    const handleMouseMove = (e) => {
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newLeft = startLeft;
      let newTop = startTop;

      if (corner.includes("right")) {
        newWidth = startWidth + (e.clientX - startX);
      } else if (corner.includes("left")) {
        newWidth = startWidth - (e.clientX - startX);
        newLeft = startLeft + (e.clientX - startX);
      }

      if (corner.includes("bottom")) {
        newHeight = startHeight + (e.clientY - startY);
      } else if (corner.includes("top")) {
        newHeight = startHeight - (e.clientY - startY);
        newTop = startTop + (e.clientY - startY);
      }

      if (newWidth >= 650) {
        setSize((prevSize) => ({
          ...prevSize,
          width: newWidth,
        }));
        nodeRef.current.style.left = `${newLeft}px`;
      }

      if (newHeight >= 400) {
        setSize((prevSize) => ({
          ...prevSize,
          height: newHeight,
        }));
        nodeRef.current.style.top = `${newTop}px`;
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const promptForFileNameAndDownload = () => {
    const fileName = window.prompt(
      "Please enter the name of the file to save:",
      "MyTable"
    );
    if (fileName) {
      downloadCSV(fileName);
    }
  };

  const downloadCSV = (fileName) => {
    const titles = ["Index", ...data.titles];
    const rows = data.columns[0].map((_, rowIndex) => [
      rowIndex + 1,
      ...data.columns.map((column) => {
        const cellValue = column[rowIndex];
        const numericValue = Number(cellValue);
        if (!isNaN(numericValue)) {
          return numericValue.toFixed(decimalPlaces);
        }
        return cellValue;
      }),
    ]);

    const csvContent = [titles.join(","), ...rows.map((row) => row.join(","))].join(
      "\n"
    );

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {isDocked ? (
        <div
          className="data-table-docked"
          style={{
            backgroundColor: isDarkMode ? "#242323" : "white",
            border: isDarkMode ? "1px solid grey" : "1px solid black",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* Scrollable container for table */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
            <table
              style={{
                width: "100%",
                margin: "auto",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  {data.titles.map((title, index) => (
                    <th
                      key={index}
                      style={{
                        backgroundColor: isDarkMode ? "#242323" : "white",
                        border: isDarkMode ? "1px solid grey" : "1px solid black",
                        color: "black",
                        padding: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.columns[0].map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {data.columns.map((column, colIndex) => {
                      const cellValue = column[rowIndex];
                      const numericValue = Number(cellValue);
                      const backgroundColor = getCellBackgroundColor(numericValue);

                      let displayValue = cellValue;
                      if (!isNaN(numericValue)) {
                        displayValue = numericValue.toFixed(decimalPlaces);
                      }

                      return (
                        <td
                          key={colIndex}
                          style={{
                            backgroundColor: backgroundColor,
                            border: isDarkMode
                              ? "1px solid grey"
                              : "1px solid black",
                            color: "black",
                            padding: "5px",
                            position: "relative",
                            fontSize: "12px",
                          }}
                          onMouseEnter={(e) =>
                            handleMouseEnter(e, data.titles[colIndex], rowIndex)
                          }
                          onMouseLeave={handleMouseLeave}
                        >
                          {displayValue}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Fixed container for decimal places input and buttons */}
          <div
            style={{
              padding: "10px",
              borderTop: isDarkMode ? "1px solid #2d2d2d" : "1px solid white",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label
              style={{
                marginLeft: "10px",
                color: "black",
                display: "flex",
                alignItems: "center",
                fontSize: "12px",
              }}
            >
              Decimal Places:
              <input
                type="number"
                value={decimalPlaces}
                min="0"
                onChange={(e) => setDecimalPlaces(parseInt(e.target.value) || "")}
                style={{
                  width: "50px",
                  marginLeft: "5px",
                  backgroundColor: isDarkMode ? "black" : "white",
                  color: isDarkMode ? "white" : "black",
                  border: isDarkMode ? "1px solid gray" : "1px solid black",
                  borderRadius: "5px",
                }}
              />
            </label>

            <div style={{ marginLeft: "auto" }}>
              <button
                onClick={promptForFileNameAndDownload}
                style={{
                  padding: "5px 10px",
                  backgroundColor: isDarkMode ? "black" : "white",
                  border: isDarkMode ? "1px solid grey" : "1px solid black",
                  color: isDarkMode ? "white" : "black",
                  marginRight: "10px",
                }}
              >
                Save as CSV
              </button>
              <button
                onClick={onUndock}
                style={{
                  backgroundColor: isDarkMode ? "black" : "white",
                  border: isDarkMode ? "1px solid grey" : "1px solid black",
                  color: isDarkMode ? "white" : "black",
                }}
              >
                Undock
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Draggable nodeRef={nodeRef} defaultPosition={{ x: 0, y: 0 }}>
          <div
            ref={nodeRef}
            className="data-table-popup"
            style={{
              backgroundColor: isDarkMode ? "#242323" : "white",
              border: isDarkMode ? "1px solid grey" : "1px solid black",
              width: `${size.width}px`,
              height: `${size.height}px`,
            }}
          >
            {/* Scrollable container for table */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
              <table
                style={{
                  width: "100%",
                  margin: "auto",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr>
                    {data.titles.map((title, index) => (
                      <th
                        key={index}
                        style={{
                          backgroundColor: isDarkMode ? "#242323" : "white",
                          border: isDarkMode ? "1px solid grey" : "1px solid black",
                          color: isDarkMode ? "white" : "black",
                          padding: "5px",
                          fontSize: "12px",
                        }}
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.columns[0].map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      {data.columns.map((column, colIndex) => {
                        const cellValue = column[rowIndex];
                        const numericValue = Number(cellValue);
                        const backgroundColor = getCellBackgroundColor(numericValue);

                        let displayValue = cellValue;
                        if (!isNaN(numericValue)) {
                          displayValue = numericValue.toFixed(decimalPlaces);
                        }

                        return (
                          <td
                            key={colIndex}
                            style={{
                              backgroundColor: backgroundColor,
                              border: isDarkMode
                                ? "1px solid grey"
                                : "1px solid black",
                              color: "black",
                              padding: "5px",
                              position: "relative",
                              fontSize: "12px",
                            }}
                            onMouseEnter={(e) =>
                              handleMouseEnter(e, data.titles[colIndex], rowIndex)
                            }
                            onMouseLeave={handleMouseLeave}
                          >
                            {displayValue}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Fixed container for decimal places input and buttons */}
            <div
              style={{
                padding: "10px",
                borderTop: isDarkMode ? "1px solid #2d2d2d" : "1px solid white",
                display: "flex",
                alignItems: "center",
              }}
            >
              <label
                style={{
                  marginLeft: "10px",
                  color: isDarkMode ? "white" : "black",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "12px",
                }}
              >
                Decimal Places:
                <input
                  type="number"
                  value={decimalPlaces}
                  min="0"
                  onChange={(e) => setDecimalPlaces(parseInt(e.target.value) || "")}
                  style={{
                    width: "50px",
                    marginLeft: "5px",
                    backgroundColor: isDarkMode ? "black" : "white",
                    color: isDarkMode ? "white" : "black",
                    border: isDarkMode ? "1px solid gray" : "1px solid black",
                    borderRadius: "5px",
                  }}
                />
              </label>

              <div style={{ marginLeft: "auto" }}>
                <button
                  onClick={promptForFileNameAndDownload}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: isDarkMode ? "black" : "white",
                    border: isDarkMode ? "1px solid grey" : "1px solid black",
                    color: isDarkMode ? "white" : "black",
                    marginRight: "10px",
                  }}
                >
                  Save as CSV
                </button>
                <button
                  onClick={onDock}
                  style={{
                    backgroundColor: isDarkMode ? "black" : "white",
                    border: isDarkMode ? "1px solid grey" : "1px solid black",
                    color: isDarkMode ? "white" : "black",
                    marginRight: "10px",
                  }}
                >
                  Dock
                </button>
                <button
                  onClick={onClose}
                  style={{
                    backgroundColor: isDarkMode ? "black" : "white",
                    border: isDarkMode ? "1px solid grey" : "1px solid black",
                    color: isDarkMode ? "white" : "black",
                  }}
                >
                  Close
                </button>
              </div>
            </div>

            {/* Resize handles */}
            <div
              className="resize-handle resize-handle-top-left"
              onMouseDown={(e) => handleResize("top-left", e)}
            />
            <div
              className="resize-handle resize-handle-top-right"
              onMouseDown={(e) => handleResize("top-right", e)}
            />
            <div
              className="resize-handle resize-handle-bottom-left"
              style={{ top: size.height - 11 }}
              onMouseDown={(e) => handleResize("bottom-left", e)}
            />
            <div
              className="resize-handle resize-handle-bottom-right"
              style={{ top: size.height - 11 }}
              onMouseDown={(e) => handleResize("bottom-right", e)}
            />
          </div>
        </Draggable>
      )}

      {/* Hover Popup */}
      {hoveredData.visible && (
        <div
          style={{
            position: "fixed",
            top: `${hoveredData.position.y}px`,
            left: `${hoveredData.position.x}px`,
            backgroundColor: isDarkMode ? "#242323" : "white",
            border: isDarkMode ? "1px solid grey" : "1px solid black",
            color: isDarkMode ? "white" : "black",
            borderRadius: "4px",
            padding: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 2000,
            fontSize: "12px",
            pointerEvents: "none",
          }}
        >
          <div>
            <strong>Title:</strong> {hoveredData.title}
          </div>
          <div>
            <strong>Index:</strong> {hoveredData.index}
          </div>
        </div>
      )}
    </>
  );
};

export default DataTablePopup;
