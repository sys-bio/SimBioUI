const SimulationParameters = ({ className, isDarkMode, onParametersChange, simulationParam }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === "numPoints" && newValue > 50000) {
            newValue = 50000;
            alert("Number of points cannot exceed 50,000. Please enter a valid value.");
        }
        onParametersChange(name, newValue);
    };

    return (
        <div
            className={className}
            style={{
                border: isDarkMode ? "1px solid white" : "1px solid black",
                marginTop: "15px"
            }}
        >
            <span
                className="text-on-border-simulation"
                style={{
                    backgroundColor: isDarkMode ? "#2e2d2d" : "white",
                    color: isDarkMode ? "white" : "black"
                }}
            >
                Simulation Parameters
            </span>
            <div className="small-text" style={{ color: isDarkMode ? "white" : "black" }}>
                Time Start:
                <input
                    className="parameter-input-box"
                    style={{
                        backgroundColor: isDarkMode ? "black" : "white",
                        border: isDarkMode ? "1px solid gray" : "1px solid black",
                        color: isDarkMode ? "lightgray" : "black",
                    }}
                    type="number"
                    name="timeStart"
                    value={simulationParam.timeStart}
                    onChange={handleInputChange}
                />
            </div>
            <div className="small-text" style={{ color: isDarkMode ? "white" : "black" }}>
                Time End:
                <input
                    className="parameter-input-box"
                    style={{
                        backgroundColor: isDarkMode ? "black" : "white",
                        border: isDarkMode ? "1px solid gray" : "1px solid black",
                        color: isDarkMode ? "lightgray" : "black",
                    }}
                    type="number"
                    name="timeEnd"
                    value={simulationParam.timeEnd || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div className="small-text" style={{ color: isDarkMode ? "white" : "black" }}>
                Number of points:
                <input
                    className="parameter-input-box"
                    style={{
                        backgroundColor: isDarkMode ? "black" : "white",
                        border: isDarkMode ? "1px solid gray" : "1px solid black",
                        color: isDarkMode ? "lightgray" : "black",
                    }}
                    type="number"
                    name="numPoints"
                    value={simulationParam.numPoints || ''}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};

export default SimulationParameters;
