import React, { forwardRef, useRef, useState, useEffect } from "react";
import ResizingHandle from "./ResizingHandle";
import PlotGraph from "./PlotGraph";
import NumberInput from "./NumberInput";
import { INITIAL_GRAPH_STATE, colorOptions } from "../../constants/const";
import "../../styles/rightSubPanel/right-subpanel-edit-graph.css";

const RightPanel = (props, ref) => {
    const {
        rightSubpanelStyle,
        layoutVertical,
        setRightPanelWidth,
        setCenterPanelWidth,
        isDarkMode,
        rightPanelWidth,
        data,
        selectedOptions,
        xAxis_selected_option,
        leftPanelWidth,
        isNewTabCreated,
        handleDownloadPDF,
        simulationParam
    } = props;

    const [graphState, setGraphState] = useState(INITIAL_GRAPH_STATE);

    // Checkboxes for graph
    const [isXAutoscaleChecked, setIsXAutoscaleChecked] = useState(false);
    const [isYAutoscaleChecked, setIsYAutoscaleChecked] = useState(false);
    const [isShowLegendChecked, setIsShowLegendChecked] = useState(true);

    // When click on Edit Graph, there is a popup shown up
    const [showEditGraphPopup, setShowEditGraphPopup] = useState(false);

    // Choose which button on for different feature
    const [showGraphButtonFeatures, setShowGraphButtonFeatures] = useState(true);
    const [graphTitleName, setGraphTitleName] = useState("Transition of substances in chemical reaction");

    // Want to show title of graph or not
    const [titleVisible, setTitleVisible] = useState(true);
    const [includeGraphBorder, setIncludeGraphBorder] = useState(true);

    // Auto scale both axes checkbox
    const [autoScaleBothAxes, setAutoScaleBothAxes] = useState(false);
    // Log both axes
    const [logBothAxes, setLogBothAxes] = useState(false);

    const [showMainTitleColorDropdown, setShowMainTitleColorDropdown] = useState(false);
    const [showGraphBorderColorDropdown, setShowGraphBorderColorDropdown] = useState(false);
    const [showGraphDrawingAreaColorDropdown, setShowGraphDrawingAreaColorDropdown] = useState(false);
    const [showGraphBackgroundColorDropdown, setShowGraphBackgroundColorDropdown] = useState(false);

    const rightPanelRef = useRef(null);
    const rightResizingRef = useRef(false);

    const [selectedMainTitleColor, setSelectedMainTitleColor] = useState("Black");
    const [selectedGraphBorderColor, setSelectedGraphBorderColor] = useState("Black");
    const [selectedGraphDrawingAreaColor, setSelectedGraphDrawingAreaColor] = useState("#f3e6f5");
    const [selectedGraphBackgroundColor, setSelectedGraphBackgroundColor] = useState("white");

    const [borderWidth, setBorderWidth] = useState("0.5");
    useEffect(() => {
        if (isNewTabCreated) {
            setIsXAutoscaleChecked(false);
            setIsYAutoscaleChecked(false);
            setIsShowLegendChecked(true);
            setGraphState({xMin: "0.00",
                           yMin: "0.00",
                           xMax: "10.00",
                           yMax: "10.00",})
        }
    }, [isNewTabCreated]);

    useEffect(() => {
        setIsXAutoscaleChecked(autoScaleBothAxes);
        setIsYAutoscaleChecked(autoScaleBothAxes);
    }, [autoScaleBothAxes]);

    const handleRightResize = (e) => {
        if (rightResizingRef.current && rightPanelRef.current) {
            let newRightPanelWidth = window.innerWidth - e.clientX;
            const maxRightPanelWidth = window.innerWidth - leftPanelWidth;
            newRightPanelWidth = Math.max(Math.min(newRightPanelWidth, maxRightPanelWidth), 0);

            // Set the new width for the right panel.
            setRightPanelWidth(newRightPanelWidth);
            const newCenterPanelWidth = window.innerWidth - leftPanelWidth - newRightPanelWidth;
            // Ensure center panel width does not go below the minimum width.
            const adjustedCenterPanelWidth = Math.max(newCenterPanelWidth, 0);
            setCenterPanelWidth(adjustedCenterPanelWidth);
        }
    };

    const handleButtonClose = () => {
        setShowEditGraphPopup(false);
        setShowMainTitleColorDropdown(false);
        setShowGraphBorderColorDropdown(false);
    }

    const handleAutoScaleBothAxes = () => {
        setAutoScaleBothAxes(!autoScaleBothAxes);
    }

    const handleAutoscaleX = () => {
        if (!isXAutoscaleChecked && isYAutoscaleChecked) {
            setAutoScaleBothAxes(true);
        } else if (isXAutoscaleChecked && !isYAutoscaleChecked) {
            setAutoScaleBothAxes(false);
        }
        setIsXAutoscaleChecked(!isXAutoscaleChecked);
    }

    const handleAutoscaleY = () => {
        if (!isYAutoscaleChecked && isXAutoscaleChecked) {
            setAutoScaleBothAxes(true);
        } else if (isYAutoscaleChecked && !isXAutoscaleChecked) {
            setAutoScaleBothAxes(false);
        }
        setIsYAutoscaleChecked(!isYAutoscaleChecked);
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

    const styleForNumberInputInXYMinimum = () => {
        return {
                backgroundColor: isDarkMode ? "black" : "white",
                color: isDarkMode ? "white" : "black",
                border: isDarkMode ? "1px solid gray" : "1px solid black",
                borderRadius: "4px",
                width: "60px",
                fontSize: 12,
        }
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
        <div ref={rightPanelRef} className="right-subpanel" style={rightSubpanelStyle}>
            {!layoutVertical && (
                <ResizingHandle
                    panelRef={rightPanelRef}
                    resizingRef={rightResizingRef}
                    handleResize={handleRightResize}
                    resizeStyle={"resize-right-handle"}
                    isRightPanel={true}
                />
            )}
            <div className="graphs-container">
                <PlotGraph
                    ref={ref}
                    selectedOptions={selectedOptions}
                    xAxis_selected_option={xAxis_selected_option}
                    data={data}
                    rightPanelWidth={rightPanelWidth}
                    rightPanelHeight={window.innerHeight}
                    isDarkMode={isDarkMode}
                    graphState={graphState}
                    isXAutoscaleChecked={isXAutoscaleChecked}
                    isYAutoscaleChecked={isYAutoscaleChecked}
                    isShowLegendChecked={isShowLegendChecked}
                    graphTitleName={graphTitleName}
                    titleVisible={titleVisible}
                    selectedMainTitleColor={selectedMainTitleColor}
                    selectedGraphBorderColor={selectedGraphBorderColor}
                    selectedGraphDrawingAreaColor={selectedGraphDrawingAreaColor}
                    selectedGraphBackgroundColor={selectedGraphBackgroundColor}
                    simulationParam={simulationParam}
                    includeGraphBorder={includeGraphBorder}
                    borderWidth={borderWidth}
                />
                <div>
                    <div
                        style={{
                            display: "flex",
                            marginTop: "10px",
                        }}
                    >
                        <div style={{ marginRight: "10px" }}>
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
                            <NumberInput
                                label="X Maximum:"
                                style={styleForNumberInputInXYMinimum()}
                                value={graphState.xMax || ''}
                                onChange={(e) =>
                                    setGraphState((prevState) => ({
                                        ...prevState,
                                        xMax: e.target.value,
                                    }))
                                }
                                isDarkMode={isDarkMode}
                                disabled={isXAutoscaleChecked}
                            />
                        </div>
                        <div>
                            <NumberInput
                                label="Y Minimum:"
                                style={styleForNumberInputInXYMinimum()}
                                value={graphState.yMin || ''}
                                onChange={(e) =>
                                    setGraphState((prevState) => ({
                                        ...prevState,
                                        yMin: e.target.value,
                                    }))
                                }
                                isDarkMode={isDarkMode}
                                disabled={isYAutoscaleChecked}
                            />
                            <NumberInput
                                label="Y Maximum:"
                                style={styleForNumberInputInXYMinimum()}
                                value={graphState.yMax || ''}
                                onChange={(e) =>
                                    setGraphState((prevState) => ({
                                        ...prevState,
                                        yMax: e.target.value,
                                    }))
                                }
                                isDarkMode={isDarkMode}
                                disabled={isYAutoscaleChecked}
                            />
                        </div>
                        <div
                            className="text-checkbox-input-autoscale"
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                marginBottom: "10px",
                            }}
                        >
                            <div className="autoscale-container">
                                <div className="checkbox-container">
                                    <label
                                        className="label-space"
                                        style={{
                                            color: isDarkMode ? "white" : "black",
                                        }}
                                    >
                                        <input
                                            className={"checkbox-input"}
                                            type="checkbox"
                                            checked={isXAutoscaleChecked}
                                            onChange={handleAutoscaleX}
                                        />
                                        Autoscale X
                                    </label>
                                </div>
                                <div className="checkbox-container">
                                    <label
                                        style={{
                                            color: isDarkMode ? "white" : "black",
                                        }}
                                    >
                                        <input
                                            className="checkbox-input"
                                            type="checkbox"
                                            checked={isYAutoscaleChecked}
                                            onChange={handleAutoscaleY}
                                        />
                                        Autoscale Y
                                    </label>
                                </div>
                                <div className="checkbox-container">
                                    <label
                                        style={{
                                            color: isDarkMode ? "white" : "black",
                                        }}
                                    >
                                        <input
                                            className="checkbox-input"
                                            type="checkbox"
                                            checked={isShowLegendChecked}
                                            onChange={(e) => {
                                                setIsShowLegendChecked(e.target.checked);
                                            }}
                                        />
                                        Show Legends
                                    </label>
                                </div>
                            </div>
                            <div
                                className="edit-export-buttons"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginTop: "-10px",
                                    marginLeft: "10px",
                                }}
                            >
                                <button
                                    className={"edit-export-style"}
                                    style={{
                                        marginBottom: "10px",
                                        color: isDarkMode ? "white" : "black",
                                    }}
                                    onClick={() => setShowEditGraphPopup(true)}
                                >
                                    Edit Graph
                                </button>
                                <button
                                    className={"edit-export-style"}
                                    style={{
                                        color: isDarkMode ? "white" : "black",
                                    }}
                                    onClick={handleDownloadPDF}
                                >
                                    {" "}
                                    Export To PDF
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showEditGraphPopup && (
                <div className="popup-edit-graph" style={{backgroundColor: isDarkMode ? "#2e2d2d" : "white", border: "1px solid grey", borderRadius: "8px"}}>
                    <div className="popup-top-edit-graph" style={{backgroundColor: isDarkMode ? "#737170" : "white", border: "1px solid grey", borderRadius: "8px"}}>
                        <button className="edit-graph-popup-buttons" style={{backgroundColor: isDarkMode ? "#2e2d2d" : "white", color: isDarkMode ? "white" : "black"}}>Graph</button>
                        <button className="edit-graph-popup-buttons" style={{backgroundColor: isDarkMode ? "#2e2d2d" : "white", color: isDarkMode ? "white" : "black"}}>Axes</button>
                        <button className="edit-graph-popup-buttons" style={{backgroundColor: isDarkMode ? "#2e2d2d" : "white", color: isDarkMode ? "white" : "black"}}>Grid</button>
                        <button className="edit-graph-popup-buttons" style={{backgroundColor: isDarkMode ? "#2e2d2d" : "white", color: isDarkMode ? "white" : "black"}}>Series</button>
                        <button className="edit-graph-popup-buttons" style={{backgroundColor: isDarkMode ? "#2e2d2d" : "white", color: isDarkMode ? "white" : "black"}}>Legend</button>
                    </div>
                    {showGraphButtonFeatures && (
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
                                  onClick={() => setTitleVisible(!titleVisible)}
                                />
                                <span style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  height: "20px",
                                  width: "20px",
                                  backgroundColor: isDarkMode ? "black" : "white", // Use condition for dark mode
                                  border: "1px solid gray",
                                  borderRadius: "4px",
                                  marginTop: "-2px"
                                }}></span>
                                Main Title Visible
                              </label>
                              <label style={{marginLeft: "35%", color: isDarkMode ? "white" : "black", fontSize: "12px"}}>Main Title Color:</label>
                              <button style={{
                                    marginLeft: "12px",
                                    width: "200px",
                                    backgroundColor: isDarkMode ? "black" : "white",
                                    color: isDarkMode ? "white" : "black",
                                    border: "1px solid grey",
                                    fontSize: "12px"
                               }}
                                    onClick={handleShowMainTitleColorDropdown}
                               >{selectedMainTitleColor}</button>
                              {showMainTitleColorDropdown && (
                                  <div className={"dropdown-for-color"} style={{
                                    backgroundColor: isDarkMode ? "black" : "white",
                                    border: "1px solid grey",
                                    width: "200px",
                                    height: "180px",
                                    zIndex: 1000,
                                    borderRadius: "8px",
                                    marginLeft: "479px",
                                    overflowY: "auto"
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
                                      onClick={handleAutoScaleBothAxes}
                                    />
                                    <span style={{
                                      position: "absolute",
                                      top: 0,
                                      left: 0,
                                      height: "20px",
                                      width: "20px",
                                      backgroundColor: isDarkMode ? "black" : "white", // Use condition for dark mode
                                      border: "1px solid gray",
                                      borderRadius: "4px",
                                      marginTop: "-2px"
                                    }}></span>
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
                                        onClick={() => setLogBothAxes(!logBothAxes)}
                                      />
                                      <span style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        height: "20px",
                                        width: "20px",
                                        backgroundColor: isDarkMode ? "black" : "white", // Use condition for dark mode
                                        border: "1px solid gray",
                                        borderRadius: "4px",
                                        marginTop: "-2px"
                                      }}></span>
                                      Log Both Axes
                                  </label>
                            </div>
                            <div style={{ position: "absolute", marginTop: "230px", marginLeft: "10px" }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <div style={{ marginRight: "10px" }}>
                                        <label style={{ color: isDarkMode ? "white" : "black", fontSize: "12px" }}>Background Color:</label>
                                        <button
                                            style={{
                                                width: "200px",
                                                backgroundColor: isDarkMode ? "black" : "white",
                                                color: isDarkMode ? "white" : "black",
                                                border: "1px solid grey",
                                                fontSize: "12px"
                                            }}
                                            onClick={handleShowGraphBackgroundColorDropdown}
                                        >
                                            {selectedGraphBackgroundColor}
                                        </button>
                                        {showGraphBackgroundColorDropdown && (
                                            <div className={"dropdown-for-color"} style={{
                                                backgroundColor: isDarkMode ? "black" : "white",
                                                border: "1px solid grey",
                                                width: "200px",
                                                height: "180px",
                                                zIndex: 1000,
                                                borderRadius: "8px",
                                                overflowY: "auto",
                                                marginLeft: "106px"
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
                                    <div>
                                        <NumberInput
                                            label="Border Width:"
                                            style={styleForBorderWidthInEditGraph()}
                                            value={borderWidth || ''}
                                            onChange={(e) =>
                                                setBorderWidth(e.target.value)
                                            }
                                            isDarkMode={isDarkMode}
                                            disabled={isXAutoscaleChecked}
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
                                {showGraphDrawingAreaColorDropdown && (
                                    <div className={"dropdown-for-color"} style={{
                                      backgroundColor: isDarkMode ? "black" : "white",
                                      border: "1px solid grey",
                                      width: "200px",
                                      height: "180px",
                                      zIndex: 1000,
                                      borderRadius: "8px",
                                      overflowY: "auto",
                                      marginLeft: "152px"
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
                                            setSelectedGraphDrawingAreaColor(color); // Update the selected color
                                            setShowGraphDrawingAreaColorDropdown(false); // Close the dropdown
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
                                  <label style={{ display: "inline-block", position: "relative", marginLeft: "30px", cursor: "pointer", paddingLeft: "25px", color: isDarkMode ? "white" : "black", fontSize: "12px"}}>
                                      <input
                                        className="custom-checkbox"
                                        type="checkbox"
                                        checked={includeGraphBorder}
                                        style={{
                                          display: "none", // Hide the original checkbox
                                        }}
                                        onClick={() => setIncludeGraphBorder(!includeGraphBorder)}
                                      />
                                      <span style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        height: "20px",
                                        width: "20px",
                                        backgroundColor: isDarkMode ? "black" : "white", // Use condition for dark mode
                                        border: "1px solid gray",
                                        borderRadius: "4px",
                                        marginTop: "-2px"
                                      }}></span>
                                      Include Graph Border
                                  </label>
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
                    )}
                    <div className="popup-bottom-edit-graph" style={{backgroundColor: isDarkMode ? "#737170" : "white", border: "1px solid grey", borderRadius: "8px"}}>
                           <button
                                className="edit-graph-popup-buttons" style={{backgroundColor: isDarkMode ? "#2e2d2d" : "white", color: isDarkMode ? "white" : "black"}}
                                onClick={handleButtonClose}
                           >Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default forwardRef(RightPanel);
