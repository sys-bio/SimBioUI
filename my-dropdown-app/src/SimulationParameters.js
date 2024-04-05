// SimulationParameters.js
const SimulationParameters = ({ className, isDarkMode, onParametersChange, simulationParam }) => {

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newValue = value === '' ? '0' : value;
        onParametersChange(name, newValue);
    };
    return (
        <div className={className}
             style={{
                 border: isDarkMode ? "1px solid white" : "1px solid black"
             }}>
            <span className="text-on-border-simulation"
                  style={{
                      backgroundColor: isDarkMode ? "#2e2d2d" : "white",
                      color: isDarkMode ? "white" : "black"
                  }}
            >Simulation Parameters</span>
            <div className={"small-text"}
                style={{
                    color: isDarkMode ? "white" : "black"
                }}
                >Time Start:
                <input
                    className={"parameter-input-box"}
                    style={{
                        backgroundColor: isDarkMode ? "black" : "#c4c2c2",
                        border: isDarkMode ? "1px solid gray" : "1px solid black",
                        color: isDarkMode ? "lightgray" : "black"
                    }}
                    type="text"
                    name="timeStart"
                    placeholder="0.0"
                    value={simulationParam.simulationParameters.timeStart}
                    onChange={handleInputChange}
            /></div>
            <div className={"small-text"}
                 style={{
                     color: isDarkMode ? "white" : "black"
                 }}
            >Time End:
                <input
                    className={"parameter-input-box"}
                    style={{
                        backgroundColor: isDarkMode ? "black" : "#c4c2c2",
                        border: isDarkMode ? "1px solid gray" : "1px solid black",
                        color: isDarkMode ? "lightgray" : "black"
                    }}
                    type="text"
                    placeholder="40.0"
                    name="timeEnd"
                    value={simulationParam.simulationParameters.timeEnd}
                    onChange={handleInputChange}
            /></div>
            <div className={"small-text"}
                 style={{
                     color: isDarkMode ? "white" : "black"
                 }}
                >Number of points:
                <input
                    className={"parameter-input-box"}
                    style={{
                        backgroundColor: isDarkMode ? "black" : "#c4c2c2",
                        border: isDarkMode ? "1px solid gray" : "1px solid black",
                        color: isDarkMode ? "lightgray" : "black"
                    }}
                    type="text"
                    placeholder="100"
                    name="numPoints"
                    value={simulationParam.simulationParameters.numPoints}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};

export default SimulationParameters;