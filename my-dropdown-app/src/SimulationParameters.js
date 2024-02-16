// SimulationParameters.js
const SimulationParameters = ({ className, isDarkMode }) => {
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
                        border: isDarkMode ? "1px solid gray" : "1px solid black"
                    }}
                    type="text"
                    placeholder="0.0"
                    onChange={(e) => {
                        // Handle input change here
                    }}
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
                        border: isDarkMode ? "1px solid gray" : "1px solid black"
                    }}
                    type="text"
                    placeholder="40.0"
                    onChange={(e) => {
                        // Handle input change here
                    }}
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
                        border: isDarkMode ? "1px solid gray" : "1px solid black"
                    }}
                    type="text"
                    placeholder="100"
                    onChange={(e) => {
                        // Handle input change here
                    }}
                />
            </div>
        </div>
    );
};

export default SimulationParameters;