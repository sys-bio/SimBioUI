import React, { useState } from "react";

const SimulationParameters = ({ className, isDarkMode, onParametersChange }) => {
    const [timeStart, setTimeStart] = useState("0");
    const [timeEnd, setTimeEnd] = useState("20");
    const [numPoints, setNumPoints] = useState("200");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Let the input be empty if the user clears it
        switch (name) {
            case "timeStart":
                setTimeStart(value);
                break;
            case "timeEnd":
                setTimeEnd(value);
                break;
            case "numPoints":
                setNumPoints(value);
                break;
        }
        onParametersChange(name, value);
    };

    return (
        <div
            className={className}
            style={{
                border: isDarkMode ? "1px solid white" : "1px solid black",
            }}
        >
            <span
                className="text-on-border-simulation"
                style={{
                    backgroundColor: isDarkMode ? "#2e2d2d" : "white",
                    color: isDarkMode ? "white" : "black",
                }}
            >
                Simulation Parameters
            </span>
            <div className="small-text" style={{ color: isDarkMode ? "white" : "black" }}>
                Time Start:
                <input
                    className="parameter-input-box"
                    style={{
                        backgroundColor: isDarkMode ? "black" : "#c4c2c2",
                        border: isDarkMode ? "1px solid gray" : "1px solid black",
                        color: isDarkMode ? "lightgray" : "black",
                    }}
                    type="text"
                    name="timeStart"
                    value={timeStart}
                    onChange={handleInputChange}
                />
            </div>
            <div className="small-text" style={{ color: isDarkMode ? "white" : "black" }}>
                Time End:
                <input
                    className="parameter-input-box"
                    style={{
                        backgroundColor: isDarkMode ? "black" : "#c4c2c2",
                        border: isDarkMode ? "1px solid gray" : "1px solid black",
                        color: isDarkMode ? "lightgray" : "black",
                    }}
                    type="text"
                    name="timeEnd"
                    value={timeEnd}
                    onChange={handleInputChange}
                />
            </div>
            <div className="small-text" style={{ color: isDarkMode ? "white" : "black" }}>
                Number of points:
                <input
                    className="parameter-input-box"
                    style={{
                        backgroundColor: isDarkMode ? "black" : "#c4c2c2",
                        border: isDarkMode ? "1px solid gray" : "1px solid black",
                        color: isDarkMode ? "lightgray" : "black",
                    }}
                    type="text"
                    name="numPoints"
                    value={numPoints}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};

export default SimulationParameters;
