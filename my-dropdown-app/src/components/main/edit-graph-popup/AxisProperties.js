import React from 'react';
import NumberInput from "../NumberInput";
import ColorPickerComponent from './ColorPickerComponent';

const AxisProperties = ({
    isDarkMode,
    axisType,
    nameOfAxisUserInput,
    setNameOfAxisUserInput,
    axis_selected_option,
    axisTitleIsShown,
    setAxisTitleIsShown,
    styleForNumberInputInXYMinimum,
    graphState,
    setGraphState,
    styleForCheckboxCustomize,
    showMajorTicks,
    handleShowMajorTicksChange,
    showMinorTicks,
    handleShowMinorTicksChange,
    colorForAxis,
    setColorForAxis,
    isAutoscaleChecked,
    handleAutoscaleChange
}) => {

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <span style={{ color: isDarkMode ? "white" : "black", fontSize: "12px", marginLeft: "10px"}}> {axisType} Axis Title: </span>
                <input
                    type="text"
                    value={nameOfAxisUserInput}
                    placeholder={axisType === 'Y' ? 'Entities' : (axis_selected_option === null ? "Time" : axis_selected_option)}
                    onChange={(e) => setNameOfAxisUserInput(e.target.value)}
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
                        checked={axisTitleIsShown}
                        style={{
                            display: "none", // Hide the original checkbox
                        }}
                        onChange={() => setAxisTitleIsShown(!axisTitleIsShown)}
                    />
                    <span style={styleForCheckboxCustomize()}> </span>
                    {axisType} Axis Title Visible
                </label>
            </div>
            <div className={"border-with-text-simulation"} style={{ border: isDarkMode ? "1px solid gray" : "1px solid black", width: "500px", height: "400px", marginLeft: "5px", marginTop: "30px"}}>
                <span className="text-on-border-simulation" style={{ backgroundColor: isDarkMode ? "#2e2d2d" : "white", color: isDarkMode ? "white" : "black"}}>
                    Axes Properties
                </span>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                    <label style={{ display: "inline-block", position: "relative", cursor: "pointer", paddingLeft: "25px", color: isDarkMode ? "white" : "black", fontSize: "12px", marginRight: "80px"}}>
                        <input
                            className="custom-checkbox"
                            type="checkbox"
                            checked={showMajorTicks}
                            style={{
                                display: "none", // Hide the original checkbox
                            }}
                            onChange={handleShowMajorTicksChange}
                        />
                        <span style={styleForCheckboxCustomize()}></span>
                        Show Major Tick
                    </label>
                    <NumberInput
                        label={`${axisType} Minimum:`}
                        style={{...styleForNumberInputInXYMinimum(), marginTop: "10px"}}
                        value={graphState[`${axisType.toLowerCase()}Min`] || ''}
                        onChange={(e) =>
                            setGraphState((prevState) => ({
                                ...prevState,
                                [`${axisType.toLowerCase()}Min`]: e.target.value,
                            }))
                        }
                        isDarkMode={isDarkMode}
                        disabled={isAutoscaleChecked}
                    />
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                    <label style={{ display: "inline-block", position: "relative", cursor: "pointer", paddingLeft: "25px", color: isDarkMode ? "white" : "black", fontSize: "12px", marginRight: "80px"}}>
                        <input
                            className="custom-checkbox"
                            type="checkbox"
                            checked={showMinorTicks}
                            style={{
                                display: "none", // Hide the original checkbox
                            }}
                            onChange={handleShowMinorTicksChange}
                        />
                        <span style={styleForCheckboxCustomize()}></span>
                        Show Minor Tick
                    </label>
                    <NumberInput
                        label={`${axisType} Maximum:`}
                        style={{...styleForNumberInputInXYMinimum(), marginTop: "10px"}}
                        value={graphState[`${axisType.toLowerCase()}Max`] || ''}
                        onChange={(e) =>
                            setGraphState((prevState) => ({
                                ...prevState,
                                [`${axisType.toLowerCase()}Max`]: e.target.value,
                            }))
                        }
                        isDarkMode={isDarkMode}
                        disabled={isAutoscaleChecked}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginLeft: '2px', color: isDarkMode ? "white" : "black", fontSize: "12px" }}>{axisType} Axis Color:  </span>
                    <ColorPickerComponent
                        color={colorForAxis}
                        setColor={setColorForAxis}
                        isDarkMode={isDarkMode}
                    />
                    <div style={{ marginLeft: "2%", marginTop: '-9px'}}>
                        <label style={{ display: "inline-block", position: "relative", cursor: "pointer", paddingLeft: "25px", color: isDarkMode ? "white" : "black", fontSize: "12px"}}>
                            <input
                                className="custom-checkbox"
                                type="checkbox"
                                checked={isAutoscaleChecked}
                                style={{
                                    display: "none", // Hide the original checkbox
                                }}
                                onChange={handleAutoscaleChange}
                            />
                            <span style={styleForCheckboxCustomize()}> </span>
                            Auto {axisType} Scaling
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AxisProperties;
