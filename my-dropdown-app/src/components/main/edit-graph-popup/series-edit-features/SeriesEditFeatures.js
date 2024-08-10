import React, { useState } from 'react';
import './SeriesEditFeatures.css';
import ColorPickerComponent from '.././ColorPickerComponent';

const MIN_LINE_THICKNESS = 1;
const MAX_LINE_THICKNESS = 10;
const STEP_LINE_THICKNESS = 1;

const SeriesEditFeatures = ({
    isDarkMode,
    selectedOptions,
    styleForCheckboxCustomize,
    setSelectedOptions,
    lineColorMap,
    setLineColorMap,
    lineWidthMap,
    setLineWidthMap,
    lineStyleMap,
    setLineStyleMap
}) => {
    // Initialize state to track the selected option
    const [selectedKey, setSelectedKey] = useState(Object.keys(selectedOptions)[0]);

    const generalStyle = (darkBackground, lightBackground, darkColor, lightColor, darkBorder, lightBorder) => ({
        backgroundColor: isDarkMode ? darkBackground : lightBackground,
        color: isDarkMode ? darkColor : lightColor,
        border: isDarkMode ? `1px solid ${darkBorder}` : `1px solid ${lightBorder}`
    });

    const handleOptionClick = (key) => {
        setSelectedKey(key);
    };

    const handleShowLinesCheck = (key) => {
        // Toggle the value of the selected key
        const updatedOptions = {
            ...selectedOptions,
            [key]: !selectedOptions[key] // Toggle the boolean value
        };
        setSelectedOptions(updatedOptions); // Update the state with the new options
    };

    const handleColorChange = (color) => {
        setLineColorMap(prevMap => ({
            ...prevMap,
            [selectedKey]: color
        }));
    };

    const handleLineWidthChange = (width) => {
        setLineWidthMap(prevMap => ({
            ...prevMap,
            [selectedKey]: width
        }));
    };

    const handleLineStyleChange = (style) => {
        setLineStyleMap(prevMap => ({
            ...prevMap,
            [selectedKey]: style
        }));
    };

    const renderDropdown = (key) => {
        const allOptions = ["solid", "dot", "dash", "dashdot", "longdash", "longdashdot"];
        return (
            <select
                className={"dropdown-line-style-container"}
                value={lineStyleMap[key] || 'solid'} // Default to 'solid' if not defined
                onChange={(e) => handleLineStyleChange(e.target.value)}
                style={generalStyle("black", "white", "white", "black", "gray", "black", 5)}
            >
                {allOptions.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        );
    };

    const renderOptionInfo = (key) => {
        const value = selectedOptions[key];
        return (
            <div className="border-with-text-simulation line-adjustment-container" style={{ border: isDarkMode ? "1px solid gray" : "1px solid black"}}>
                <span className="text-on-border-simulation" style={generalStyle("#2e2d2d", "white", "white", "black", "#2e2d2d", "white", 0)}>
                    Lines
                </span>
                <label className="label-for-checkbox" style={generalStyle("", "", "white", "black", "#2e2d2d" , "white", 0)}>
                    <input
                      className="custom-checkbox"
                      type="checkbox"
                      style={{
                         display: "none", // Hide the original checkbox
                      }}
                      checked={value}
                      onChange={() => handleShowLinesCheck(key)}
                    />
                    <span style={styleForCheckboxCustomize()}></span>
                     Visible
                </label>
                <div className={"line-color-container"}>
                    <span style={{color: isDarkMode ? "white" : "black", fontSize: "12px"}}>
                        Line Color:
                    </span>
                    <ColorPickerComponent
                        color={lineColorMap[key] || '#000000'} // Provide a default color if not defined
                        setColor={handleColorChange}
                        isDarkMode={isDarkMode}
                    />
                </div>
                <div className={"line-thickness-container"}
                >
                    <span style={{color: isDarkMode ? "white" : "black", fontSize: "12px", marginLeft: '3px'}}>
                        Line Thickness({lineWidthMap[key]}px):
                    </span>
                    <div
                        style={{
                            flex: 1,
                            position: "relative",
                            marginLeft: '3px'
                        }}
                    >
                        <input
                            type="range"
                            min={MIN_LINE_THICKNESS}
                            max={MAX_LINE_THICKNESS}
                            value={lineWidthMap[key]}
                            step={STEP_LINE_THICKNESS}
                            onMouseDown={(e) => e.stopPropagation()}
                            onChange={(e) => handleLineWidthChange(e.target.value)}
                            className="slider-for-frame"
                        />
                    </div>
                </div>
                <div style={{display: "flex", alignItems: "center", padding: "1px", marginTop: "8px"}}>
                    <span
                        className={"text"}
                        style={generalStyle("#2e2d2d", "white", "white", "black", "#2e2d2d", "white", 0)}
                    >
                        Plot Style:
                    </span>
                    {renderDropdown(key)}
                </div>
            </div>
        );
    };

    return (
        <div className="popup-center-edit-graph" style={generalStyle("#2e2d2d", "white", "", "", "#2e2d2d", "white")}>
            <div className="row">
                <div className="keyContainer" style={generalStyle("black", "white", "", "", "gray", "black")}>
                    <ul className="keyItem">
                        {Object.keys(selectedOptions).map(key => (
                            <li key={key}>
                                <button
                                    onClick={() => handleOptionClick(key)}
                                    style={{
                                        ...generalStyle("", "", "white", "black", "gray", "black"),
                                        borderRadius: "0px",
                                        backgroundColor: key === selectedKey ? "#a37d36" : (isDarkMode ? "black" : "white"),
                                    }}
                                    className="keyButton">
                                    {key}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="optionInfoContainer">
                    {renderOptionInfo(selectedKey)}
                </div>
            </div>
        </div>
    );
};

export default SeriesEditFeatures;
