// SimulationParameters.js
const SimulationParameters = ({ className }) => {
    return (
        <div className={className}>
            <span className="text-on-border-simulation">Simulation Parameters</span>
            <div className={"small-text"}>Time Start:
                <input
                    className={"parameter-input-box"}
                    type="text"
                    placeholder="0.0"
                    onChange={(e) => {
                        // Handle input change here
                    }}
                /></div>
            <div className={"small-text"}>Time End:
                <input
                    className={"parameter-input-box"}
                    type="text"
                    placeholder="40.0"
                    onChange={(e) => {
                        // Handle input change here
                    }}
                /></div>
            <div className={"small-text"}>Number of points:
                <input
                    className={"parameter-input-box"}
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