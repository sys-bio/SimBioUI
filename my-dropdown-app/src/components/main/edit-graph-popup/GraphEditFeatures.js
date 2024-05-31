import React from 'react';
import NumberInput from "../NumberInput";
import { colorOptions } from '../../../constants/const';

const GraphEditFeatures = ({
    isDarkMode,
    graphTitleName,
    setGraphTitleName,
    titleVisible,
    setTitleVisible,
    selectedMainTitleColor,
    setSelectedMainTitleColor,
    setShowMainTitleColorDropdown,
    showMainTitleColorDropdown,
    autoScaleBothAxes,
    logBothAxes,
    setLogBothAxes,
    selectedGraphBackgroundColor,
    setSelectedGraphBackgroundColor,
    setShowGraphBackgroundColorDropdown,
    showGraphBackgroundColorDropdown,
    borderWidth,
    setBorderWidth,
    selectedGraphDrawingAreaColor,
    setSelectedGraphDrawingAreaColor,
    setShowGraphDrawingAreaColorDropdown,
    showGraphDrawingAreaColorDropdown,
    includeGraphBorder,
    setIncludeGraphBorder,
    selectedGraphBorderColor,
    setSelectedGraphBorderColor,
    setShowGraphBorderColorDropdown,
    showGraphBorderColorDropdown,
    isXAutoscaleChecked,
    styleForCheckboxCustomize
}) => {

    const handleAutoScaleBothAxes = () => {
        setAutoScaleBothAxes(!autoScaleBothAxes);
    }

    const handleShowMainTitleColorDropdown = () => {
        setShowGraphBorderColorDropdown(false);
        setShowGraphDrawingAreaColorDropdown(false);
        setShowGraphBackgroundColorDropdown(false);
        setShowMainTitleColorDropdown(!showMainTitleColorDropdown);
    }
    const handleShowGraphDrawingAreaColorDropdown = () => {
        setShowMainTitleColorDropdown(false);
        setShowGraphBorderColorDropdown(false);
        setShowGraphBackgroundColorDropdown(false);
        setShowGraphDrawingAreaColorDropdown(!showGraphDrawingAreaColorDropdown);
    }
    const handleShowGraphBackgroundColorDropdown = () => {
        setShowMainTitleColorDropdown(false);
        setShowGraphDrawingAreaColorDropdown(false);
        setShowGraphBorderColorDropdown(false);

        setShowGraphBackgroundColorDropdown(!showGraphBackgroundColorDropdown);
    }
    const handleShowGraphBorderColorDropdown = () => {
        setShowMainTitleColorDropdown(false);
        setShowGraphDrawingAreaColorDropdown(false);
        setShowGraphBackgroundColorDropdown(false);

        setShowGraphBorderColorDropdown(!showGraphBorderColorDropdown);
    }

    const styleForBorderWidthInEditGraph = () => {
        return {
            backgroundColor: isDarkMode ? "black" : "white",
            color: isDarkMode ? "white" : "black",
            width: "60px",
            height: "26px",
            border: isDarkMode ? "1px solid gray" : "1px solid black",
            borderRadius: "15px",
            marginLeft: "5px"
        }
    }

    return (
            <div className="popup-center-edit-graph" style={{ backgroundColor: isDarkMode ? "#2e2d2d" : "white", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
                    <span style={{ color: isDarkMode ? "white" : "black", fontSize: "12px", marginLeft: "10px"}}> Main Title: </span>
                    <input
                        type="text"
                        value={graphTitleName}
                        onChange={(e) => setGraphTitleName(e.target.value)}
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
                <div style={{ marginLeft: "1%", marginTop: "10px" }}>
                  <label style={{ display: "inline-block", position: "relative", cursor: "pointer", paddingLeft: "25px", color: isDarkMode ? "white" : "black", fontSize: "12px"}}>
                    <input
                      className="custom-checkbox"
                      type="checkbox"
                      checked={titleVisible}
                      style={{
                        display: "none", // Hide the original checkbox
                      }}
                      onChange={() => setTitleVisible(!titleVisible)}
                    />
                    <span style={styleForCheckboxCustomize()}></span>
                    Main Title Visible
                  </label>
                  <div style={{ position: 'relative', zIndex: 1, marginLeft: "350px" }}> {/* Ensure this div is relatively positioned */}
                      <label style={{ display: "inline-block", position: "relative", cursor: "pointer", paddingLeft: "25px", color: isDarkMode ? "white" : "black", fontSize: "12px"}}>
                          Main Title Color:
                          <button style={{
                                  marginLeft: "12px",
                                  width: "200px",
                                  backgroundColor: isDarkMode ? "black" : "white",
                                  color: isDarkMode ? "white" : "black",
                                  border: "1px solid grey",
                                  fontSize: "12px",
                                  position: 'relative', // Ensure this button is positioned relative for z-index context
                                  zIndex: 2 // Higher z-index than other elements
                             }}
                                  onClick={handleShowMainTitleColorDropdown}
                             >{selectedMainTitleColor}</button>
                          {showMainTitleColorDropdown && (
                              <div className={"dropdown-for-color"} style={{
                                position: 'absolute', // Absolutely position this dropdown
                                top: '100%', // Position right below the button
                                left: '0',
                                backgroundColor: isDarkMode ? "black" : "white",
                                border: "1px solid grey",
                                width: "200px",
                                height: "180px",
                                zIndex: 1000, // Highest z-index to ensure it's on top
                                borderRadius: "8px",
                                overflowY: "auto",
                                marginLeft: "129px"
                              }}>
                                  {colorOptions.map((color, index) => (
                                    <div
                                      key={index}
                                      style={{
                                        padding: "7px",
                                        cursor: "pointer",
                                        fontSize: "12px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        borderRadius: "8px",
                                        color: isDarkMode ? "white" : "black",
                                        backgroundColor: isDarkMode ? "black" : "white"
                                      }}
                                      onClick={() => {
                                        setSelectedMainTitleColor(color); // Update the selected color
                                        setShowMainTitleColorDropdown(false); // Close the dropdown
                                      }}
                                    >
                                      {color}
                                      <div style={{
                                        width: "14px",
                                        height: "14px",
                                        borderRadius: "4px",
                                        backgroundColor: color, // This sets the color of the small square
                                        border: '1px solid grey'
                                      }}></div>
                                    </div>
                                  ))}
                              </div>
                          )}
                      </label>
                  </div>

                </div>

                <div style={{position: "absolute", marginTop: "85px", marginLeft: "8px"}}>
                    <label style={{ display: "inline-block", position: "relative", cursor: "pointer", paddingLeft: "25px", color: isDarkMode ? "white" : "black", fontSize: "12px"}}>
                        <input
                          className="custom-checkbox"
                          type="checkbox"
                          checked={autoScaleBothAxes}
                          style={{
                            display: "none", // Hide the original checkbox
                          }}
                          onChange={handleAutoScaleBothAxes}
                        />
                        <span style={styleForCheckboxCustomize()}></span>
                        Auto Scale Both Axes
                      </label>

                      <label style={{marginLeft: "10px", display: "inline-block", position: "relative", cursor: "pointer", paddingLeft: "25px", color: isDarkMode ? "white" : "black", fontSize: "12px"}}>
                          <input
                            className="custom-checkbox"
                            type="checkbox"
                            checked={logBothAxes}
                            style={{
                              display: "none", // Hide the original checkbox
                            }}
                            onChange={() => setLogBothAxes(!logBothAxes)}
                          />
                          <span style={styleForCheckboxCustomize()}></span>
                          Log Both Axes
                      </label>
                </div>
                <div style={{ position: "absolute", marginTop: "230px", marginLeft: "10px" }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ marginRight: "10px" }}>
                            <label style={{ color: isDarkMode ? "white" : "black", fontSize: "12px" }}>Background Color:</label>
                                <button
                                    style={{
                                        width: "200px",
                                        backgroundColor: isDarkMode ? "black" : "white",
                                        color: isDarkMode ? "white" : "black",
                                        border: "1px solid grey",
                                        fontSize: "12px",
                                        marginLeft: "10px",
                                    }}
                                    onClick={handleShowGraphBackgroundColorDropdown}
                                >
                                    {selectedGraphBackgroundColor}
                                </button>
                                {showGraphBackgroundColorDropdown && (
                                    <div className={"dropdown-for-color"} style={{
                                        position: 'absolute', // Dropdown floats over other content, not pushing it
                                        top: '100%', // Align directly below the button
                                        left: '0',
                                        backgroundColor: isDarkMode ? "black" : "white",
                                        border: "1px solid grey",
                                        width: "200px",
                                        height: "180px",
                                        zIndex: 1000,
                                        borderRadius: "8px",
                                        overflowY: "auto",
                                        marginLeft: "114px"
                                    }}>
                                        {colorOptions.map((color, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    padding: "7px",
                                                    cursor: "pointer",
                                                    fontSize: "12px",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    borderRadius: "8px",
                                                    color: isDarkMode ? "white" : "black",
                                                    backgroundColor: isDarkMode ? "black" : "white"
                                                }}
                                                onClick={() => {
                                                    setSelectedGraphBackgroundColor(color); // Update the selected color
                                                    setShowGraphBackgroundColorDropdown(false); // Close the dropdown
                                                }}
                                            >
                                                {color}
                                                <div style={{
                                                    width: "14px",
                                                    height: "14px",
                                                    borderRadius: "4px",
                                                    backgroundColor: color, // This sets the color of the small square
                                                    border: '1px solid grey'
                                                }}></div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div> {/* Container for border width */}
                                <NumberInput
                                    label="Border Width:"
                                    style={{
                                        backgroundColor: isDarkMode ? "black" : "white",
                                        color: isDarkMode ? "white" : "black",
                                        width: "60px",
                                        height: "26px",
                                        border: isDarkMode ? "1px solid gray" : "1px solid black",
                                        borderRadius: "15px",
                                        marginLeft: "5px"
                                    }}
                                    value={borderWidth || ''}
                                    onChange={(e) =>
                                        setBorderWidth(e.target.value)
                                    }
                                    isDarkMode={isDarkMode}
                                />
                            </div>
                        </div>
                </div>
                <div style={{position: "absolute", marginTop: "180px", marginLeft: "10px"}}>
                    <label style={{ color: isDarkMode ? "white" : "black", fontSize: "12px" }}>Graph Drawing Area Color:</label>
                    <button
                    style={{
                          width: "200px",
                          backgroundColor: isDarkMode ? "black" : "white",
                          color: isDarkMode ? "white" : "black",
                          border: "1px solid grey",
                          fontSize: "12px"
                     }}
                     onClick={handleShowGraphDrawingAreaColorDropdown}
                     >{selectedGraphDrawingAreaColor}</button>

                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <div style={{ marginRight: '20px' }}> {/* Container for dropdown and its button */}

                            {showGraphDrawingAreaColorDropdown && (
                                <div className={"dropdown-for-color"} style={{
                                    backgroundColor: isDarkMode ? "black" : "white",
                                    border: "1px solid grey",
                                    width: "200px",
                                    height: "180px",
                                    zIndex: 1000,
                                    borderRadius: "8px",
                                    overflowY: "auto",
                                    position: 'absolute', // Dropdown floats over other content, not pushing it
                                    marginLeft: "152px",
                                    marginTop: "-10px"
                                }}>
                                    {colorOptions.map((color, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                padding: "7px",
                                                cursor: "pointer",
                                                fontSize: "12px",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                borderRadius: "8px",
                                                color: isDarkMode ? "white" : "black",
                                                backgroundColor: isDarkMode ? "black" : "white"
                                            }}
                                            onClick={() => {
                                                setSelectedGraphDrawingAreaColor(color);
                                                setShowGraphDrawingAreaColorDropdown(false);
                                            }}
                                        >
                                            {color}
                                            <div style={{
                                                width: "14px",
                                                height: "14px",
                                                borderRadius: "4px",
                                                backgroundColor: color,
                                                border: '1px solid grey'
                                            }}></div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <label style={{ display: "inline-block", position: "relative", cursor: "pointer", paddingLeft: "25px", color: isDarkMode ? "white" : "black", fontSize: "12px", marginLeft: "350px", marginTop: "-65px" }}>
                            <input
                                className="custom-checkbox"
                                type="checkbox"
                                checked={includeGraphBorder}
                                style={{
                                    display: "none", // Hide the original checkbox
                                }}
                                onChange={() => setIncludeGraphBorder(!includeGraphBorder)}
                            />
                            <span style={styleForCheckboxCustomize()}></span>
                            Include Graph Border
                        </label>
                    </div>
                </div>
                <div style={{position: "absolute", marginTop: "120px", marginLeft: "10px"}}>
                <label style={{color: isDarkMode ? "white" : "black", fontSize: "12px"}}>Graph Border Color:</label>
                    <button style={{
                          width: "200px",
                          backgroundColor: isDarkMode ? "black" : "white",
                          color: isDarkMode ? "white" : "black",
                          border: "1px solid grey",
                          fontSize: "12px"
                     }}
                     onClick={handleShowGraphBorderColorDropdown}
                     >{selectedGraphBorderColor}</button>
                    {showGraphBorderColorDropdown && (
                        <div className={"dropdown-for-color"} style={{
                          backgroundColor: isDarkMode ? "black" : "white",
                          border: "1px solid grey",
                          width: "200px",
                          height: "180px",
                          zIndex: 1000,
                          borderRadius: "8px",
                          overflowY: "auto",
                          marginLeft: "115px"
                        }}>
                          {colorOptions.map((color, index) => (
                            <div
                              key={index}
                              style={{
                                padding: "7px",
                                cursor: "pointer",
                                fontSize: "12px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                borderRadius: "8px",
                                color: isDarkMode ? "white" : "black",
                                backgroundColor: isDarkMode ? "black" : "white"
                              }}
                              onClick={() => {
                                setSelectedGraphBorderColor(color); // Update the selected color
                                setShowGraphBorderColorDropdown(false); // Close the dropdown
                              }}
                            >
                              {color}
                              <div style={{
                                width: "14px",
                                height: "14px",
                                borderRadius: "4px",
                                backgroundColor: color, // This sets the color of the small square
                                border: '1px solid grey'
                              }}></div>
                            </div>
                          ))}
                        </div>
                      )}
                </div>
            </div>
    );
};

export default GraphEditFeatures;
