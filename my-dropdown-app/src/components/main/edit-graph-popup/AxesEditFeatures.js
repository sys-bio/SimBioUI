import React, { useState } from 'react';
import NumberInput from "../NumberInput";

const GraphEditFeatures = ({
    isDarkMode,
    nameOfXAxisUserInput,
    setNameOfXAxisUserInput,
    xAxis_selected_option,
    xAxisTitleIsShown,
    setXAxisTitleIsShown,
    styleForNumberInputInXYMinimum,
    graphState,
    isXAutoscaleChecked,
    styleForCheckboxCustomize
}) => {
    // States of x, y buttons
    const [isXButtonOpen, setIsXButtonOpen] = useState(true);
    const [isYButtonOpen, setIsYButtonOpen] = useState(false);

    // Functions to change x, y buttons state
    const handleXButtonChange = () => {
        setIsXButtonOpen(true);
        setIsYButtonOpen(false);
    }
    const handleYButtonChange = () => {
        setIsYButtonOpen(true);
        setIsXButtonOpen(false);
    }

    // Style for buttons
    const xyAxesButtonsStyle = (isButtonOpen) => {
        return {
            backgroundColor: isDarkMode ? (isButtonOpen ? "black" : "#2e2d2d") : "white",
            color: isDarkMode ? "white" : "black",
            border: isDarkMode ? "1px solid gray" : "1px solid black",
            width: "90px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "12px",
            marginTop: "-5px"
        }
    }

    return (
        <div className="popup-center-edit-graph" style={{ backgroundColor: isDarkMode ? "#2e2d2d" : "white", display: "flex", flexDirection: "column"}}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '10px' }}>
                <button
                    style={xyAxesButtonsStyle(isXButtonOpen)}
                    onClick={handleXButtonChange}
                >
                X Axis
                </button>
                <button
                    style={xyAxesButtonsStyle(isYButtonOpen)}
                    onClick={handleYButtonChange}
                >
                Y Axis
                </button>
            </div>
            {isXButtonOpen && (
                <>
                    <div style={{ marginLeft: "1%"}}>
                        <label style={{ display: "inline-block", position: "relative", cursor: "pointer", paddingLeft: "25px", color: isDarkMode ? "white" : "black", fontSize: "12px"}}>
                            <input
                                className="custom-checkbox"
                                type="checkbox"
                                checked={xAxisTitleIsShown}
                                style={{
                                    display: "none", // Hide the original checkbox
                                }}
                                onChange={() => setXAxisTitleIsShown(!xAxisTitleIsShown)}
                            />
                            <span style={styleForCheckboxCustomize()}> </span>
                            X Axis Title Visit
                        </label>
                    </div>
                    <div className={"border-with-text-simulation"} style={{ border: isDarkMode ? "1px solid gray" : "1px solid black", width: "500px", height: "400px", marginLeft: "5px", marginTop: "30px"}}>
                        <span className="text-on-border-simulation" style={{ backgroundColor: isDarkMode ? "#2e2d2d" : "white", color: isDarkMode ? "white" : "black"}}>
                            Axes Properties
                        </span>
                        <label style={{ display: "inline-block", position: "relative", cursor: "pointer", paddingLeft: "25px", color: isDarkMode ? "white" : "black", fontSize: "12px", marginTop: "20px"}}>
                            <input
                                className="custom-checkbox"
                                type="checkbox"
                                checked={xAxisTitleIsShown}
                                style={{
                                    display: "none", // Hide the original checkbox
                                }}
                                onChange={() => setXAxisTitleIsShown(!xAxisTitleIsShown)}
                            />
                            <span style={styleForCheckboxCustomize()}> </span>
                            Show Major Tick
                        </label>
                        <NumberInput
                            label="X Minimum:"
                            style={styleForNumberInputInXYMinimum()}
                            value={graphState.xMin || ''}
                            onChange={(e) =>
                                setGraphState((prevState) => ({
                                    ...prevState,
                                    xMin: e.target.value,
                                }))
                            }
                            isDarkMode={isDarkMode}
                            disabled={isXAutoscaleChecked}
                        />
                    </div>
                </>
            )}
        </div>
    )
};

export default GraphEditFeatures;
