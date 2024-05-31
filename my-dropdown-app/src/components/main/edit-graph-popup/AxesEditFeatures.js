import React, { useState } from 'react';
import NumberInput from "../NumberInput";
import ColorPickerComponent from './ColorPickerComponent';

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
    styleForCheckboxCustomize,
    showMajorTicks,
    setShowMajorTicks,
    showMinorTicks,
    setShowMinorTicks,
    colorForXAxis,
    setColorForXAxis
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

    // Handle show major and minor ticks changes
    const handleShowMajorTicksChange = () => {
        setShowMajorTicks(!showMajorTicks);
    }
    const handleShowMinorTicksChange = () => {
        setShowMinorTicks(!showMinorTicks);
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

    // Function for show ticks and input box for x, y minimum
    const AxisPropertyInput = ({ label, checked, onChange, style, isDarkMode, value, onValueChange, disabled, labelForNumInput }) => (
        <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ display: "inline-block", position: "relative", cursor: "pointer",
            paddingLeft: "25px", color: isDarkMode ? "white" : "black", fontSize: "12px", marginRight: "80px"}}>
                <input
                    className="custom-checkbox"
                    type="checkbox"
                    checked={checked}
                    style={{
                        display: "none", // Hide the original checkbox
                    }}
                    onChange={onChange}
                />
                <span style={styleForCheckboxCustomize()}></span>
                {label}
            </label>
            <NumberInput
                label={labelForNumInput}
                style={{...style, marginTop: "10px"}}
                value={value || ''}
                onChange={onValueChange}
                isDarkMode={isDarkMode}
                disabled={disabled}
            />
        </div>
    );

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
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <span style={{ color: isDarkMode ? "white" : "black", fontSize: "12px", marginLeft: "10px"}}> X Axis Title: </span>
                            <input
                                type="text"
                                value={nameOfXAxisUserInput}
                                placeholder={xAxis_selected_option === null ? "Time" : xAxis_selected_option}
                                onChange={(e) => setNameOfXAxisUserInput(e.target.value)}
                                style={{
                                    width: '80%',
                                    height: '30px', // Adjust height to your preference
                                    marginLeft: "1%",
                                    backgroundColor: isDarkMode ? "black" : "white",
                                    border: "1px solid #a37d36",
                                    borderRadius: "8px",
                                    fontSize: "12px",
                                    color: "white"
                                }}
                            />
                    </div>
                    <div style={{ marginLeft: "1%", marginTop: "10px"}}>
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
                        <AxisPropertyInput
                            label="Show Major Tick"
                            checked={showMajorTicks}
                            onChange={handleShowMajorTicksChange}
                            style={styleForNumberInputInXYMinimum()}
                            isDarkMode={isDarkMode}
                            value={graphState.xMin}
                            onValueChange={(e) =>
                                setGraphState((prevState) => ({
                                    ...prevState,
                                    xMin: e.target.value,
                                }))
                            }
                            disabled={isXAutoscaleChecked}
                            labelForNumInput="X Minimum: "
                        />
                        <AxisPropertyInput
                            label="Show Minor Tick"
                            checked={showMinorTicks}
                            onChange={handleShowMinorTicksChange}
                            style={styleForNumberInputInXYMinimum()}
                            isDarkMode={isDarkMode}
                            value={graphState.xMax}
                            onValueChange={(e) =>
                                setGraphState((prevState) => ({
                                    ...prevState,
                                    xMax: e.target.value,
                                }))
                            }
                            disabled={isXAutoscaleChecked}
                            labelForNumInput="X Maximum: "
                        />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginLeft: '2px', color: isDarkMode ? "white" : "black", fontSize: "12px" }}>X Axis Color:  </span>
                            <ColorPickerComponent
                                color={colorForXAxis}
                                setColor={setColorForXAxis}
                                isDarkMode={isDarkMode}
                            />
                        </div>

                    </div>
                </>
            )}
        </div>
    )
};

export default GraphEditFeatures;
