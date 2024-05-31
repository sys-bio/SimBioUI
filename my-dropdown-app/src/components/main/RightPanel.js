import React, { forwardRef, useRef, useState, useEffect } from "react";
import ResizingHandle from "./ResizingHandle";
import PlotGraph from "./PlotGraph";
import NumberInput from "./NumberInput";
import GraphEditFeatures from "./edit-graph-popup/GraphEditFeatures";
import AxesEditFeatures from "./edit-graph-popup/AxesEditFeatures";
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

    // ALL ELEMENTS IN GRAPH BUTTON

    // Choose which button on for different feature
    const [showGraphButtonFeatures, setShowGraphButtonFeatures] = useState(true);
    const [showAxesButtonFeatures, setShowAxesButtonFeatures] = useState(false);
    const [showGridButtonFeatures, setShowGridButtonFeatures] = useState(false);
    const [showSeriesButtonFeatures, setShowSeriesButtonFeatures] = useState(false);
    const [showLegendButtonFeatures, setShowLegendButtonFeatures] = useState(false);
    const [graphTitleName, setGraphTitleName] = useState("Transition of substances in chemical reaction");

    // Want to show title of graph or not
    const [titleVisible, setTitleVisible] = useState(true);
    const [includeGraphBorder, setIncludeGraphBorder] = useState(true);

    // Auto scale both axes checkbox
    const [autoScaleBothAxes, setAutoScaleBothAxes] = useState(false);

    // Log both axes
    const [logBothAxes, setLogBothAxes] = useState(false);

    // Show dropdown of colors for each button in Graph
    const [showMainTitleColorDropdown, setShowMainTitleColorDropdown] = useState(false);
    const [showGraphBorderColorDropdown, setShowGraphBorderColorDropdown] = useState(false);
    const [showGraphDrawingAreaColorDropdown, setShowGraphDrawingAreaColorDropdown] = useState(false);
    const [showGraphBackgroundColorDropdown, setShowGraphBackgroundColorDropdown] = useState(false);

    // Color picked for each element
    const [selectedMainTitleColor, setSelectedMainTitleColor] = useState("Black");
    const [selectedGraphBorderColor, setSelectedGraphBorderColor] = useState("Black");
    const [selectedGraphDrawingAreaColor, setSelectedGraphDrawingAreaColor] = useState("#f3e6f5");
    const [selectedGraphBackgroundColor, setSelectedGraphBackgroundColor] = useState("white");

    const [borderWidth, setBorderWidth] = useState("0.5");

    // ALL ELEMENTS IN AXES BUTTON

    // Change name of x axis
    const [nameOfXAxisUserInput, setNameOfXAxisUserInput] = useState("");

    // X Axis title checkbox state
    const [xAxisTitleIsShown, setXAxisTitleIsShown] = useState(true);

    const rightPanelRef = useRef(null);
    const rightResizingRef = useRef(false);
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

    const handleButtonClose = () => {
        setShowEditGraphPopup(false);
        setShowMainTitleColorDropdown(false);
        setShowGraphBorderColorDropdown(false);
    }

    // There are 5 buttons in Edit Graph: Graph, Axes, Grid, Series, Legend
    // first func is true, rest is false to show which panel shoul
    const handleShowButtonFeaturesInEditGraph = (setTrueFunc, setFalseFunc1, setFalseFunc2, setFalseFunc3, setFalseFunc4) => {
        setTrueFunc(true);
        setFalseFunc1(false);
        setFalseFunc2(false);
        setFalseFunc3(false);
        setFalseFunc4(false);
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

    // Customize checkbox
    const styleForCheckboxCustomize = () => {
        return {
            position: "absolute",
            top: 0,
            left: 0,
            height: "20px",
            width: "20px",
            backgroundColor: isDarkMode ? "black" : "white", // Use condition for dark mode
            border: "1px solid gray",
            borderRadius: "4px",
            marginTop: "-2px"
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
                    nameOfXAxisUserInput={nameOfXAxisUserInput}
                    xAxisTitleIsShown={xAxisTitleIsShown}
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
                        <button
                            className="edit-graph-popup-buttons" style={{backgroundColor: isDarkMode ? "#2e2d2d" : "white", color: isDarkMode ? "white" : "black"}}
                            onClick={() =>
                                handleShowButtonFeaturesInEditGraph(setShowGraphButtonFeatures, setShowAxesButtonFeatures, setShowGridButtonFeatures, setShowSeriesButtonFeatures, setShowLegendButtonFeatures)
                            }
                        >Graph</button>
                        <button
                            className="edit-graph-popup-buttons" style={{backgroundColor: isDarkMode ? "#2e2d2d" : "white", color: isDarkMode ? "white" : "black"}}
                            onClick={() =>
                                handleShowButtonFeaturesInEditGraph(setShowAxesButtonFeatures, setShowGraphButtonFeatures, setShowGridButtonFeatures, setShowSeriesButtonFeatures, setShowLegendButtonFeatures)
                            }
                            >Axes</button>
                        <button className="edit-graph-popup-buttons" style={{backgroundColor: isDarkMode ? "#2e2d2d" : "white", color: isDarkMode ? "white" : "black"}}
                            onClick={() =>
                                handleShowButtonFeaturesInEditGraph(setShowGridButtonFeatures, setShowAxesButtonFeatures, setShowGraphButtonFeatures, setShowSeriesButtonFeatures, setShowLegendButtonFeatures)
                            }
                        >Grid</button>
                        <button className="edit-graph-popup-buttons" style={{backgroundColor: isDarkMode ? "#2e2d2d" : "white", color: isDarkMode ? "white" : "black"}}
                        onClick={() =>
                            handleShowButtonFeaturesInEditGraph(setShowSeriesButtonFeatures, setShowAxesButtonFeatures, setShowGridButtonFeatures, setShowGraphButtonFeatures, setShowLegendButtonFeatures)
                        }
                        >Series</button>
                        <button className="edit-graph-popup-buttons" style={{backgroundColor: isDarkMode ? "#2e2d2d" : "white", color: isDarkMode ? "white" : "black"}}
                        onClick={() =>
                            handleShowButtonFeaturesInEditGraph(setShowLegendButtonFeatures, setShowAxesButtonFeatures, setShowGridButtonFeatures, setShowSeriesButtonFeatures, setShowGraphButtonFeatures)
                        }
                        >Legend</button>
                    </div>
                    {showGraphButtonFeatures && (
                        <GraphEditFeatures
                            isDarkMode={isDarkMode}
                            graphTitleName={graphTitleName}
                            setGraphTitleName={setGraphTitleName}
                            titleVisible={titleVisible}
                            setTitleVisible={setTitleVisible}
                            selectedMainTitleColor={selectedMainTitleColor}
                            setSelectedMainTitleColor={setSelectedMainTitleColor}
                            setShowMainTitleColorDropdown={setShowMainTitleColorDropdown}
                            showMainTitleColorDropdown={showMainTitleColorDropdown}
                            autoScaleBothAxes={autoScaleBothAxes}
                            logBothAxes={logBothAxes}
                            setLogBothAxes={setLogBothAxes}
                            selectedGraphBackgroundColor={selectedGraphBackgroundColor}
                            setSelectedGraphBackgroundColor={setSelectedGraphBackgroundColor}
                            setShowGraphBackgroundColorDropdown={setShowGraphBackgroundColorDropdown}
                            showGraphBackgroundColorDropdown={showGraphBackgroundColorDropdown}
                            borderWidth={borderWidth}
                            setBorderWidth={setBorderWidth}
                            selectedGraphDrawingAreaColor={selectedGraphDrawingAreaColor}
                            setSelectedGraphDrawingAreaColor={setSelectedGraphDrawingAreaColor}
                            setShowGraphDrawingAreaColorDropdown={setShowGraphDrawingAreaColorDropdown}
                            showGraphDrawingAreaColorDropdown={showGraphDrawingAreaColorDropdown}
                            includeGraphBorder={includeGraphBorder}
                            setIncludeGraphBorder={setIncludeGraphBorder}
                            selectedGraphBorderColor={selectedGraphBorderColor}
                            setSelectedGraphBorderColor={setSelectedGraphBorderColor}
                            setShowGraphBorderColorDropdown={setShowGraphBorderColorDropdown}
                            showGraphBorderColorDropdown={showGraphBorderColorDropdown}
                            isXAutoscaleChecked={isXAutoscaleChecked}
                            setShowEditGraphPopup={setShowEditGraphPopup}
                            styleForCheckboxCustomize={styleForCheckboxCustomize}
                        />
                    )}
                    {showAxesButtonFeatures && (
                        <AxesEditFeatures
                            isDarkMode={isDarkMode}
                            xAxis_selected_option={xAxis_selected_option}
                            nameOfXAxisUserInput={nameOfXAxisUserInput}
                            setNameOfXAxisUserInput={setNameOfXAxisUserInput}
                            xAxisTitleIsShown={xAxisTitleIsShown}
                            setXAxisTitleIsShown={setXAxisTitleIsShown}
                            styleForNumberInputInXYMinimum={styleForNumberInputInXYMinimum}
                            graphState={graphState}
                            isXAutoscaleChecked={isXAutoscaleChecked}
                            styleForCheckboxCustomize={styleForCheckboxCustomize}
                        />
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
