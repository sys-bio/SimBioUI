import React from 'react';
import ColorPickerComponent from './ColorPickerComponent';
var MIN_FRAME_THICKNESS = 1;
var MAX_FRAME_THICKNESS = 10;
var STEP_FRAME_THICKNESS = 1;

var MIN_FRAME_GAP = 0;
var MAX_FRAME_GAP = 30;
var STEP_FRAME_GAP = 1;

var MIN_FRAME_LINE_LENGTH = 10;
var MAX_FRAME_LINE_LENGTH = 70;
var STEP_FRAME_LINE_LENGTH = 1;

const LegendEditFeatures = ({
    isDarkMode,
    styleForCheckboxCustomize,
    isShowLegendChecked,
    setIsShowLegendChecked,
    isLegendFrameBorderOn,
    setIsLegendFrameBorderOn,
    legendFrameColor,
    setLegendFrameColor,
    legendFrameWidth,
    setLegendFrameWidth,
    legendFrameGap,
    setLegendFrameGap,
    legendFrameLineLength,
    setLegendFrameLineLength,
    legendFrameInteriorColor,
    setLegendFrameInteriorColor
}) => {
    const handleShowLegendCheck = () => {
        setIsShowLegendChecked(prev => !prev);
    }
    const handleShowLegendFrameBorder = () => {
        setIsLegendFrameBorderOn(prev => !prev);
    }
    const handleLegendFrameWidthChange = (value) => {
        setLegendFrameWidth(value);
    }
    const handleLegendFrameGapChange = (value) => {
        setLegendFrameGap(value);
    }
    const handleLegendFrameLineLengthChange = (value) => {
        setLegendFrameLineLength(value);
    }

    return (
        <div className="popup-center-edit-graph" style={{ backgroundColor: isDarkMode ? "#2e2d2d" : "white", display: "flex", flexDirection: "column"}}>
            <div style={{ display: "flex", flexDirection: "row", width: "750px", marginTop: "12px"}}>
                <div style={{ marginLeft: "1%"}}>
                  <label style={{ display: "inline-block", position: "relative", cursor: "pointer", paddingLeft: "25px", color: isDarkMode ? "white" : "black", fontSize: "12px"}}>
                    <input
                      className="custom-checkbox"
                      type="checkbox"
                      checked={isShowLegendChecked}
                      style={{
                        display: "none", // Hide the original checkbox
                      }}
                      onChange={handleShowLegendCheck}
                    />
                    <span style={styleForCheckboxCustomize()}></span>
                    Visible
                  </label>
                </div>
                <div className={"border-with-text-simulation"} style={{ border: isDarkMode ? "1px solid gray" : "1px solid black", width: "300px", height: "115px", marginTop: "10px", marginLeft: "30px"}}>
                    <span className="text-on-border-simulation" style={{ backgroundColor: isDarkMode ? "#2e2d2d" : "white", color: isDarkMode ? "white" : "black"}}>
                        Frame Exterior
                    </span>
                    <div style={{ marginLeft: "1%"}}>
                      <label style={{ display: "inline-block", position: "relative", cursor: "pointer", paddingLeft: "25px", color: isDarkMode ? "white" : "black", fontSize: "12px"}}>
                        <input
                          className="custom-checkbox"
                          type="checkbox"
                          checked={isLegendFrameBorderOn}
                          style={{
                            display: "none", // Hide the original checkbox
                          }}
                          onChange={handleShowLegendFrameBorder}
                        />
                        <span style={styleForCheckboxCustomize()}></span>
                        Visible
                      </label>
                    </div>
                    <div style={{marginTop: '10px', marginLeft: '3px'}}>
                        <span style={{color: isDarkMode ? "white" : "black", fontSize: "12px"}}>
                            Frame Color:
                        </span>
                        <ColorPickerComponent color={legendFrameColor} setColor={setLegendFrameColor} isDarkMode={isDarkMode} />
                    </div>
                    <div
                        style={{
                            width: "100%",
                            marginTop: "5%",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <span style={{color: isDarkMode ? "white" : "black", fontSize: "12px", marginLeft: '3px'}}>
                            Frame Thickness({legendFrameWidth}px):
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
                                min={MIN_FRAME_THICKNESS}
                                max={MAX_FRAME_THICKNESS}
                                value={legendFrameWidth}
                                step={STEP_FRAME_THICKNESS}
                                onMouseDown={(e) => e.stopPropagation()}
                                onChange={(e) => handleLegendFrameWidthChange(e.target.value)}
                                className="slider-for-frame"
                                style={{
                                    background: `linear-gradient(to right, #2273f5 0%, blue ${
                                        ((legendFrameWidth - MIN_FRAME_THICKNESS) / (MAX_FRAME_THICKNESS - MIN_FRAME_THICKNESS)) * 100}%, ${"#9b9a9c"}
                                        ${((legendFrameWidth - MIN_FRAME_THICKNESS) / (MAX_FRAME_THICKNESS - MIN_FRAME_THICKNESS)) * 100}%, ${"#9b9a9c"} 100%, transparent 100%)`,
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className={"border-with-text-simulation"} style={{ border: isDarkMode ? "1px solid gray" : "1px solid black", width: "300px", height: "115px", marginTop: "10px", marginLeft: "20px"}}>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <span style={{color: isDarkMode ? "white" : "black", fontSize: "12px", marginLeft: '3px'}}>
                            Frame Gap({legendFrameGap}px):
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
                                min={MIN_FRAME_GAP}
                                max={MAX_FRAME_GAP}
                                value={legendFrameGap}
                                step={STEP_FRAME_GAP}
                                onMouseDown={(e) => e.stopPropagation()}
                                onChange={(e) => handleLegendFrameGapChange(e.target.value)}
                                className="slider-for-frame"
                                style={{
                                    background: `linear-gradient(to right, #2273f5 0%, blue ${
                                        ((legendFrameGap - MIN_FRAME_GAP) / (MAX_FRAME_GAP - MIN_FRAME_GAP)) * 100}%, ${"#9b9a9c"}
                                        ${((legendFrameGap - MIN_FRAME_GAP) / (MAX_FRAME_GAP - MIN_FRAME_GAP)) * 100}%, ${"#9b9a9c"} 100%, transparent 100%)`,
                                }}
                            />
                        </div>
                    </div>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            marginTop: '10px'
                        }}
                    >
                        <span style={{color: isDarkMode ? "white" : "black", fontSize: "12px", marginLeft: '3px'}}>
                            Line Length({legendFrameLineLength}px):
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
                                min={MIN_FRAME_LINE_LENGTH}
                                max={MAX_FRAME_LINE_LENGTH}
                                value={legendFrameLineLength}
                                step={STEP_FRAME_LINE_LENGTH}
                                onMouseDown={(e) => e.stopPropagation()}
                                onChange={(e) => handleLegendFrameLineLengthChange(e.target.value)}
                                className="slider-for-frame"
                                style={{
                                    background: `linear-gradient(to right, #2273f5 0%, blue ${
                                        ((legendFrameLineLength - MIN_FRAME_LINE_LENGTH) / (MAX_FRAME_LINE_LENGTH - MIN_FRAME_LINE_LENGTH)) * 100}%, ${"#9b9a9c"}
                                        ${((legendFrameLineLength - MIN_FRAME_LINE_LENGTH) / (MAX_FRAME_LINE_LENGTH - MIN_FRAME_LINE_LENGTH)) * 100}%, ${"#9b9a9c"} 100%, transparent 100%)`,
                                }}
                            />
                        </div>
                    </div>
                    <div style={{marginTop: '10px', marginLeft: '3px'}}>
                        <span style={{color: isDarkMode ? "white" : "black", fontSize: "12px"}}>
                            Frame Interior:
                        </span>
                        <ColorPickerComponent color={legendFrameInteriorColor} setColor={setLegendFrameInteriorColor} isDarkMode={isDarkMode} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegendEditFeatures;
