import React from 'react';
import { MdClose } from "react-icons/md";

const SliderPopup = ({
    kOptions,
    kOptionsForSliders,
    minMaxValues,
    sliderValues,
    isDarkMode,
    selectedParameter,
    handleCheckboxChange,
    handleSliderChange,
    handleMinValueChange,
    handleMaxValueChange,
    handleLabelClick,
    setShowSplitView
}) => {
    return (
        <div
            style={{
                display: "flex", // Use flexbox to layout children side by side
                flexDirection: "row", // Align children horizontally
                alignItems: "flex-start", // Align items at the start of the flex container
                height: "100%", // Make the container take up full height
                border: "1px solid white"
            }}
        >
            {/* Options List with Checkboxes */}
            <div
                style={{
                    height: "90%", // Set to 100% of the parent div's height
                    width: "20%", // Adjusted width to make space for sliders
                    marginTop: "15px",
                    marginLeft: "5px",
                    backgroundColor: isDarkMode ? "#2e2d2d" : "white",
                    display: "flex", // Nest flexbox for internal layout
                    flexDirection: "column", // Stack children vertically
                    overflowY: "auto", // Add vertical scrolling when the content overflows
                }}
            >
                <p
                    style={{
                        fontSize: "12px",
                        marginLeft: "25px",
                        color: isDarkMode ? "white" : "black", // Ensure text is white for visibility on dark backgrounds
                        marginTop: "20px",
                    }}
                >
                    Add sliders
                </p>
                <div
                    className={isDarkMode ? "custom-scrollbar-dark-mode" : "custom-scrollbar-light-mode"}
                    style={{
                        height: "calc(100% - 40px)", // Adjust height to take up the full space below the heading
                        width: "100%", // Full width
                        backgroundColor: isDarkMode ? "black" : "white",
                        borderRadius: "5px",
                        overflowY: "auto", // Enable vertical scrolling
                    }}
                >
                    {kOptions.map((option) => (
                        <div
                            key={option}
                            style={{
                                color: isDarkMode ? "white" : "black",
                                padding: "5px",
                                fontSize: "12px",
                            }}
                        >
                            <label>
                                <input
                                    type="checkbox"
                                    checked={kOptionsForSliders[option]}
                                    onChange={() => handleCheckboxChange(option)}
                                />
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sliders Section */}
            <div
                style={{
                    height: "100%", // Full height for this section too
                    width: "80%", // Set to 50% to fit next to checkboxes
                    backgroundColor: isDarkMode ? "#2e2d2d" : "white",
                    display: "flex", // Use flexbox to layout sliders
                    flexDirection: "column", // Stack sliders vertically
                    justifyContent: "center", // Center sliders vertically within the container
                    padding: "40px", // Padding around sliders
                    boxSizing: "border-box", // Include border width in the total width calculation
                }}
            >
                <MdClose
                    onClick={() => setShowSplitView(false)}
                    style={{
                        cursor: "pointer",
                        marginLeft: "100%",
                        marginTop: "-40px",
                        fontSize: "20px",
                        color: isDarkMode ? "white" : "black",
                    }}
                />
                <div
                    style={{
                        height: "15%", // Set to 20% of the parent div's height
                        width: "100%",
                        display: "flex", // Use flexbox to layout controls horizontally
                        flexDirection: "row", // Align controls horizontally
                        justifyContent: "space-between", // Space controls evenly within the subpanel
                        alignItems: "center", // Align controls vertically at the center
                        marginTop: "-10px",
                    }}
                >
                    {selectedParameter && (
                        <div>
                            <span
                                style={{
                                    fontSize: "12px",
                                    marginRight: "10px",
                                    color: isDarkMode ? 'white' : 'black'
                                }}
                            >
                                {selectedParameter}
                            </span>
                            <div className="minMaxInputContainer">
                                <label style={{color: isDarkMode ? 'white' : 'black'}}>Min Value:</label>
                                <input
                                    style={{backgroundColor: isDarkMode ? 'black' : 'white', color: isDarkMode ? 'white' : 'black'}}
                                    type="number"
                                    value={minMaxValues[selectedParameter]?.min || 0}
                                    onChange={handleMinValueChange}
                                />
                            </div>
                            <div className="minMaxInputContainer">
                                <label style={{color: isDarkMode ? 'white' : 'black'}}>Max Value:</label>
                                <input
                                    style={{backgroundColor: isDarkMode ? 'black' : 'white', color: isDarkMode ? 'white' : 'black'}}
                                    type="number"
                                    value={minMaxValues[selectedParameter]?.max || 100}
                                    onChange={handleMaxValueChange}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className={isDarkMode ? "custom-scrollbar-sliders-dark-mode" : "custom-scrollbar-light-mode"}
                    style={{
                        height: "85%", // Set to 85% of the parent div's height
                        width: "100%",
                        display: "flex", // Use flexbox to layout sliders
                        flexDirection: "column", // Stack sliders vertically
                        justifyContent: "flex-start", // Align items at the start of the container
                        marginTop: "2%",
                        boxSizing: "border-box",
                        overflowY: "auto", // Add scrollbar when content overflows vertically
                    }}
                >
                    {kOptions.map((option) => {
                        if (kOptionsForSliders[option]) {
                            const range = minMaxValues[option].max - minMaxValues[option].min;
                            const stepSize = range / 100;
                            const currentVal =
                                sliderValues[option] === minMaxValues[option].min
                                    ? 0
                                    : sliderValues[option];

                            return (
                                <div
                                    key={option + "-slider"}
                                    style={{
                                        width: "100%",
                                        marginTop: "5%",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            flex: 1,
                                            position: "relative",
                                        }}
                                    >
                                        <input
                                            type="range"
                                            min={minMaxValues[option].min}
                                            max={minMaxValues[option].max}
                                            value={sliderValues[option]}
                                            step={stepSize} // Use the computed stepSize here
                                            onChange={(e) => handleSliderChange(option, e.target.value, false)}
                                            style={{
                                                width: "100%",
                                                background: `linear-gradient(to right, #2273f5 0%, blue ${
                                                    ((sliderValues[option] - minMaxValues[option].min) /
                                                        (minMaxValues[option].max - minMaxValues[option].min)) *
                                                    100
                                                }%, ${"#9b9a9c"} ${
                                                    ((sliderValues[option] - minMaxValues[option].min) /
                                                        (minMaxValues[option].max - minMaxValues[option].min)) *
                                                    100
                                                }%, ${"#9b9a9c"} 100%, transparent 100%)`,
                                            }}
                                            className="slider"
                                        />
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "-10px",
                                                left: "20px",
                                                transform: "translateX(-50%)",
                                                fontSize: "12px",
                                                color: isDarkMode ? 'white' : 'black'
                                            }}
                                        >
                                            {currentVal}
                                        </div>
                                    </div>
                                    <div className="labelContainer">
                                        <label
                                            className="sliderLabel"
                                            style={{
                                                marginLeft: "15px",
                                                fontSize: "12px",
                                                marginTop: "7px",
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => handleLabelClick(option)}
                                        >
                                            <span style={{color: isDarkMode ? 'white' : 'black'}}>
                                                {option} [{minMaxValues[option]?.min || 0},{" "}
                                                {minMaxValues[option]?.max || 0}]
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default SliderPopup;
