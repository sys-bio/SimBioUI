import React, { forwardRef, useRef, useState, useEffect } from "react";
import ResizingHandle from "./ResizingHandle";
import PlotGraph from "./PlotGraph";
import NumberInput from "../NumberInput";
import DataTablePopup from "./data-table-popup/DataTablePopup";
import GraphEditFeatures from "../edit-graph-popup/GraphEditFeatures";
import AxesEditFeatures from "../edit-graph-popup/AxesEditFeatures";
import GridEditFeatures from "../edit-graph-popup/GridEditFeatures";
import SeriesEditFeatures from "../edit-graph-popup/series-edit-features/SeriesEditFeatures";
import LegendEditFeatures from "../edit-graph-popup/LegendEditFeatures";
import { INITIAL_GRAPH_STATE } from "../../../constants/const";
import "../../../styles/rightSubPanel/right-subpanel-edit-graph.css";
import VerticalResizer from "./VerticalResizer";
import SteadyStateMorePopup from "../left-panel/steady-state/SteadyStateMorePopup"

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
    setSelectedOptions,
    xAxis_selected_option,
    leftPanelWidth,
    isNewTabCreated,
    handleDownloadPDF,
    simulationParam,
    isShowLegendChecked,
    setIsShowLegendChecked,
    paletteColor,
    setLineColorMap,
    lineColorMap,
    setLineWidthMap,
    lineWidthMap,
    setLineStyleMap,
    lineStyleMap,
    showSteadyStatePopup,
    jacobian,
    fluxControl,
    isOutOfSync,
    reactionRates,
    concentration,
    elasticities,
    handleSteadyStateDock,
    handleCloseSteadyStatePopup,
    setShowSteadyStatePopup,
    isSteadyStateDocked,
    showMoreDataPopup,
    setShowMoreDataPopup,
    isSteadyState,
    linesStyle
  } = props;

  const [graphState, setGraphState] = useState(INITIAL_GRAPH_STATE);

  // Checkboxes for graph
  const [isXAutoscaleChecked, setIsXAutoscaleChecked] = useState(true);
  const [isYAutoscaleChecked, setIsYAutoscaleChecked] = useState(true);

  // When click on Edit Graph, there is a popup shown up
  const [showEditGraphPopup, setShowEditGraphPopup] = useState(false);

  // Make the popup draggable
  const [popupPosition, setPopupPosition] = useState({ x: 750, y: 450 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // ALL ELEMENTS IN GRAPH BUTTON

  // Choose which button on for different feature
  const [showGraphButtonFeatures, setShowGraphButtonFeatures] = useState(true);
  const [showAxesButtonFeatures, setShowAxesButtonFeatures] = useState(false);
  const [showGridButtonFeatures, setShowGridButtonFeatures] = useState(false);
  const [showSeriesButtonFeatures, setShowSeriesButtonFeatures] = useState(false);
  const [showLegendButtonFeatures, setShowLegendButtonFeatures] = useState(false);
  const [graphTitleName, setGraphTitleName] = useState(
    "Transition of substances in chemical reaction"
  );

  // Want to show title of graph or not
  const [titleVisible, setTitleVisible] = useState(true);
  const [includeGraphBorder, setIncludeGraphBorder] = useState(true);

  // Auto scale both axes checkbox
  const [autoScaleBothAxes, setAutoScaleBothAxes] = useState(true);

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

  // Change name of y axis
  const [nameOfYAxisUserInput, setNameOfYAxisUserInput] = useState("");

  // X Axis title checkbox state
  const [xAxisTitleIsShown, setXAxisTitleIsShown] = useState(true);
  const [yAxisTitleIsShown, setYAxisTitleIsShown] = useState(true);

  // Show major and minor ticks
  const [showXMajorTicks, setShowXMajorTicks] = useState(true);
  const [showXMinorTicks, setShowXMinorTicks] = useState(false);
  const [showYMajorTicks, setShowYMajorTicks] = useState(true);
  const [showYMinorTicks, setShowYMinorTicks] = useState(false);

  // Color for x axis
  const [colorForXAxis, setColorForXAxis] = useState("black");

  // Color for y axis
  const [colorForYAxis, setColorForYAxis] = useState("black");

  // ALL ELEMENTS IN GRID BUTTON
  // Major Grids
  const [xMajorGridColor, setXMajorGridColor] = useState("#000000");
  const [yMajorGridColor, setYMajorGridColor] = useState("#000000");
  const [xMajorGridWidth, setXMajorGridWidth] = useState(1);
  const [yMajorGridWidth, setYMajorGridWidth] = useState(1);
  const [xMajorGridCount, setXMajorGridCount] = useState(5);
  const [yMajorGridCount, setYMajorGridCount] = useState(5);
  // Minor Grids
  const [xMinorGridColor, setXMinorGridColor] = useState("gray");
  const [yMinorGridColor, setYMinorGridColor] = useState("gray");
  const [xMinorGridWidth, setXMinorGridWidth] = useState(1);
  const [yMinorGridWidth, setYMinorGridWidth] = useState(1);
  const [xMinorGridCount, setXMinorGridCount] = useState(5);
  const [yMinorGridCount, setYMinorGridCount] = useState(5);
  // Set x,y major/minor grids on/off
  const [isXMajorGridOn, setIsXMajorGridOn] = useState(false);
  const [isYMajorGridOn, setIsYMajorGridOn] = useState(false);
  const [isXMinorGridOn, setIsXMinorGridOn] = useState(false);
  const [isYMinorGridOn, setIsYMinorGridOn] = useState(false);

  // ALL ELEMENTS IN LEGEND BUTTON
  const [isLegendFrameBorderOn, setIsLegendFrameBorderOn] = useState(true);
  const [legendFrameColor, setLegendFrameColor] = useState("black");
  const [legendFrameWidth, setLegendFrameWidth] = useState(1);
  const [legendFrameGap, setLegendFrameGap] = useState(10);
  const [legendFrameLineLength, setLegendFrameLineLength] = useState(30);
  const [legendFrameInteriorColor, setLegendFrameInteriorColor] = useState("white");

  // ALL ELEMENTS FOR RIGHT SUBPANEL
  const rightPanelRef = useRef(null);
  const rightResizingRef = useRef(false);


  // Heights for graph and data table when data table is docked
  const initialHeight = window.innerHeight * 0.5;
  const [graphHeight, setGraphHeight] = useState(initialHeight);
  const [dataTableHeight, setDataTableHeight] = useState(initialHeight);
  // Adjust plotHeight based on docking state
  const plotHeight = (isSteadyStateDocked) ? graphHeight - 150 : window.innerHeight * 0.55;
  const isResizing = useRef(false);

  //decimal place for data table
  const [decimalPlaces, setDecimalPlaces] = useState(2);

//	const plotHeight = isDataTableDocked
//	  ? window.innerHeight * 0.35 // Adjust this value as needed
//	  : window.innerHeight * 0.55; // Adjust this value as needed

  // Add new state for active tab
  const [activeTab, setActiveTab] = useState('graph');

  useEffect(() => {
    if (isNewTabCreated) {
      setIsXAutoscaleChecked(true);
      setIsYAutoscaleChecked(true);
      setIsShowLegendChecked(true);
      setGraphState({
        xMin: "0.00",
        yMin: "0.00",
        xMax: "10.00",
        yMax: "10.00",
      });
    }
  }, [isNewTabCreated]);

  useEffect(() => {
    setIsXAutoscaleChecked(autoScaleBothAxes);
    setIsYAutoscaleChecked(autoScaleBothAxes);
  }, [autoScaleBothAxes]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Implement functions for Edit Graph popup draggable
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - popupPosition.x,
      y: e.clientY - popupPosition.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPopupPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

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

    const handleResizeStart = (e) => {
      isResizing.current = true;
      window.addEventListener("mousemove", handleResizing);
      window.addEventListener("mouseup", handleResizeEnd);
    };

    const handleResizing = (e) => {
      if (!isResizing.current) return;
      const rightPanelTop = rightPanelRef.current.getBoundingClientRect().top;
      const totalHeight = rightPanelRef.current.clientHeight;

      let newGraphHeight = e.clientY - rightPanelTop;
      newGraphHeight = Math.max(100, Math.min(newGraphHeight, totalHeight - 100)); // Minimum heights

      setGraphHeight(newGraphHeight);
      setDataTableHeight(totalHeight - newGraphHeight - 5); // Subtract resizer height
    };

    const handleResizeEnd = () => {
      isResizing.current = false;
      window.removeEventListener("mousemove", handleResizing);
      window.removeEventListener("mouseup", handleResizeEnd);
    };

  const handleAutoscaleX = () => {
    if (!isXAutoscaleChecked && isYAutoscaleChecked) {
      setAutoScaleBothAxes(true);
    } else if (isXAutoscaleChecked && !isYAutoscaleChecked) {
      setAutoScaleBothAxes(false);
    }
    setIsXAutoscaleChecked(!isXAutoscaleChecked);
  };

  const handleAutoscaleY = () => {
    if (!isYAutoscaleChecked && isXAutoscaleChecked) {
      setAutoScaleBothAxes(true);
    } else if (isYAutoscaleChecked && !isXAutoscaleChecked) {
      setAutoScaleBothAxes(false);
    }
    setIsYAutoscaleChecked(!isYAutoscaleChecked);
  };

  const handleButtonClose = () => {
    setShowEditGraphPopup(false);
    setShowMainTitleColorDropdown(false);
    setShowGraphBorderColorDropdown(false);
  };

  const handleShowMoreData = () => {
    if (!data || !data.columns || data.columns.length === 0) {
      window.alert("Run simulate to show more data");
    } else {
      setShowMoreDataPopup(true);
    }
  };

  // There are 5 buttons in Edit Graph: Graph, Axes, Grid, Series, Legend
  // first func is true, rest is false to show which panel should be displayed
  const handleShowButtonFeaturesInEditGraph = (
    setTrueFunc,
    setFalseFunc1,
    setFalseFunc2,
    setFalseFunc3,
    setFalseFunc4
  ) => {
    setTrueFunc(true);
    setFalseFunc1(false);
    setFalseFunc2(false);
    setFalseFunc3(false);
    setFalseFunc4(false);
  };

  const styleForNumberInputInXYMinimum = () => {
    return {
      backgroundColor: isDarkMode ? "black" : "white",
      color: isDarkMode ? "white" : "black",
      border: isDarkMode ? "1px solid gray" : "1px solid black",
      borderRadius: "4px",
      width: "60px",
      fontSize: 12,
    };
  };

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
      marginTop: "-2px",
    };
  };

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
      <div
        className="graphs-container"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Add tab navigation */}
        <div style={{
          display: "flex",
          borderBottom: `1px solid ${isDarkMode ? "#4a4a4a" : "#d6d6d6"}`,
          marginBottom: "10px"
        }}>
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: activeTab === 'graph' ? (isDarkMode ? "#4a4a4a" : "#d6d6d6") : "transparent",
              border: "none",
              color: isDarkMode ? "white" : "black",
              cursor: "pointer",
              borderBottom: activeTab === 'graph' ? `2px solid ${isDarkMode ? "white" : "black"}` : "none"
            }}
            onClick={() => setActiveTab('graph')}
          >
            Graph
          </button>
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: activeTab === 'data' ? (isDarkMode ? "#4a4a4a" : "#d6d6d6") : "transparent",
              border: "none",
              color: isDarkMode ? "white" : "black",
              cursor: "pointer",
              borderBottom: activeTab === 'data' ? `2px solid ${isDarkMode ? "white" : "black"}` : "none"
            }}
            onClick={() => {
              handleShowMoreData();
              setActiveTab('data');
            }}
          >
            Data
          </button>
        </div>

        {/* Content area */}
        <div style={{ flex: 1, overflow: "auto" }}>
          {activeTab === 'graph' && (
            <div style={{ height: "100%" }}>
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
                nameOfYAxisUserInput={nameOfYAxisUserInput}
                xAxisTitleIsShown={xAxisTitleIsShown}
                yAxisTitleIsShown={yAxisTitleIsShown}
                showXMajorTicks={showXMajorTicks}
                showYMajorTicks={showYMajorTicks}
                showXMinorTicks={showXMinorTicks}
                showYMinorTicks={showYMinorTicks}
                colorForXAxis={colorForXAxis}
                colorForYAxis={colorForYAxis}
                xMajorGridColor={xMajorGridColor}
                yMajorGridColor={yMajorGridColor}
                xMajorGridCount={xMajorGridCount}
                yMajorGridCount={yMajorGridCount}
                xMajorGridWidth={xMajorGridWidth}
                yMajorGridWidth={yMajorGridWidth}
                xMinorGridColor={xMinorGridColor}
                yMinorGridColor={yMinorGridColor}
                xMinorGridWidth={xMinorGridWidth}
                yMinorGridWidth={yMinorGridWidth}
                xMinorGridCount={xMinorGridCount}
                yMinorGridCount={yMinorGridCount}
                isXMajorGridOn={isXMajorGridOn}
                isYMajorGridOn={isYMajorGridOn}
                isXMinorGridOn={isXMinorGridOn}
                isYMinorGridOn={isYMinorGridOn}
                paletteColor={paletteColor}
                setLineColorMap={setLineColorMap}
                lineColorMap={lineColorMap}
                setLineWidthMap={setLineWidthMap}
                lineWidthMap={lineWidthMap}
                setLineStyleMap={setLineStyleMap}
                lineStyleMap={lineStyleMap}
                isLegendFrameBorderOn={isLegendFrameBorderOn}
                legendFrameColor={legendFrameColor}
                legendFrameWidth={legendFrameWidth}
                legendFrameGap={legendFrameGap}
                legendFrameLineLength={legendFrameLineLength}
                legendFrameInteriorColor={legendFrameInteriorColor}
                plotHeight={plotHeight}
                isSteadyState={isSteadyState}
                linesStyle={linesStyle}
              />
              <div>
                {isOutOfSync && (
                  <div style={{
                    display: "flex",
                    backgroundColor: isDarkMode ? "#4a4a4a" : "#d6d6d6",
                    borderRadius: 4,
                    border: isDarkMode ? "1px solid #828181" : "1px solid #bfbfbf",
                    marginTop: 4,
                    padding: 4,
                    width: "90.5%"
                  }}>
                    <span style={{ color: isDarkMode ? "white" : "black", fontSize: 12 }}>
                      Graph out of sync
                    </span>
                  </div>
                )}
                {/* Controls Grid Layout */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 100px) 1fr 160px",
                  gap: "20px 30px",
                  alignItems: "start",
                  marginTop: "16px",
                }}>
                  {/* X Min/Max */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <NumberInput
                      label="X Minimum:"
                      style={{ 
                        ...styleForNumberInputInXYMinimum(),
                        marginTop: "2px",
                        display: "block", 
                        width: "60%" 
                      }}
                      value={graphState.xMin || ""}
                      onChange={(e) =>
                        setGraphState((prevState) => ({ ...prevState, xMin: e.target.value }))
                      }
                      isDarkMode={isDarkMode}
                      disabled={isXAutoscaleChecked}
                    />
                    <NumberInput
                      label="X Maximum:"
                      style={{
                        ...styleForNumberInputInXYMinimum(),
                        marginTop: "2px",
                        display: "block",
                        width: "60%" 
                      }}
                      value={graphState.xMax || ""}
                      onChange={(e) =>
                        setGraphState((prevState) => ({ ...prevState, xMax: e.target.value }))
                      }
                      isDarkMode={isDarkMode}
                      disabled={isXAutoscaleChecked}
                    />
                  </div>
                  {/* Y Min/Max */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <NumberInput
                      label="Y Minimum:"
                      style={{
                        ...styleForNumberInputInXYMinimum(),
                        marginTop: "2px",
                        display: "block",
                        width: "60%" 
                      }}
                      value={graphState.yMin || ""}
                      onChange={(e) =>
                        setGraphState((prevState) => ({ ...prevState, yMin: e.target.value }))
                      }
                      isDarkMode={isDarkMode}
                      disabled={isYAutoscaleChecked}
                    />
                    <NumberInput
                      label="Y Maximum:"
                      style={{
                        ...styleForNumberInputInXYMinimum(),
                        marginTop: "2px",
                        display: "block",
                        width: "60%" 
                      }}
                      value={graphState.yMax || ""}
                      onChange={(e) =>
                        setGraphState((prevState) => ({ ...prevState, yMax: e.target.value }))
                      }
                      isDarkMode={isDarkMode}
                      disabled={isYAutoscaleChecked}
                    />
                  </div>
                  {/* Checkboxes */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "6px" }}>
                    <label style={{ color: isDarkMode ? "white" : "black", fontSize: "12px", display: "flex", alignItems: "center", gap: "3px" }}>
                      <input
                        type="checkbox"
                        checked={isXAutoscaleChecked}
                        onChange={handleAutoscaleX}
                        style={{ width: 18, height: 18 }}
                      />
                      Autoscale X
                    </label>
                    <label style={{ color: isDarkMode ? "white" : "black", fontSize: "12px", display: "flex", alignItems: "center", gap: "3px" }}>
                      <input
                        type="checkbox"
                        checked={isYAutoscaleChecked}
                        onChange={handleAutoscaleY}
                        style={{ width: 18, height: 18 }}
                      />
                      Autoscale Y
                    </label>
                    <label style={{ color: isDarkMode ? "white" : "black", fontSize: "12px", display: "flex", alignItems: "center", gap: "3px" }}>
                      <input
                        type="checkbox"
                        checked={isShowLegendChecked}
                        onChange={(e) => setIsShowLegendChecked(e.target.checked)}
                        style={{ width: 18, height: 18 }}
                      />
                      Show Legends
                    </label>
                  </div>
                  {/* Action Buttons */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <button
                      className={"edit-export-style"}
                      style={{
                        fontSize: "11px", padding: "14px 0", background: "#4a6cf7",
                        color: "white", borderRadius: "5px", border: "none",
                        fontWeight: 500, cursor: "pointer", display: "flex",
                        alignItems: "center", justifyContent: "center"
                      }}
                      onClick={() => setShowEditGraphPopup(true)}
                    >
                      Edit Graph
                    </button>
                    <button
                      className={"edit-export-style"}
                      style={{
                        fontSize: "11px", padding: "14px 0", background: "#4a6cf7",
                        color: "white", borderRadius: "5px", border: "none",
                        fontWeight: 500, cursor: "pointer", display: "flex",
                        alignItems: "center", justifyContent: "center"
                      }}
                      onClick={handleDownloadPDF}
                    >
                      Export To PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'data' && (
            <div style={{ height: "100%" }}>
              {data && data.columns && data.columns.length > 0 ? (
                <DataTablePopup
                  data={data}
                  isDarkMode={isDarkMode}
                  isDocked={true}
                  decimalPlaces={decimalPlaces}
                  setDecimalPlaces={setDecimalPlaces}
                />
              ) : (
                <div style={{ 
                  padding: "20px", 
                  color: isDarkMode ? "white" : "black",
                  textAlign: "center",
                  fontSize: "1.1em"
                }}>
                  Run simulate to show data
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {showEditGraphPopup && (
        <div className="modal-overlay">
          <div className="popup-edit-graph"
            style={{
              backgroundColor: isDarkMode ? "#2e2d2d" : "white",
              border: "1px solid grey",
              borderRadius: "8px",
              top: `${popupPosition.y}px`,
              left: `${popupPosition.x}px`,
              cursor: isDragging ? "grabbing" : "grab",
            }}
            onMouseDown={handleMouseDown}>
            <div className="popup-top-edit-graph" style={{backgroundColor: isDarkMode ? "#737170" : "white", border: "1px solid grey", borderRadius: "8px"}}>
              <button
                className="edit-graph-popup-buttons" style={{backgroundColor: isDarkMode ? (showGraphButtonFeatures ? "black" : "#2e2d2d") : "white", color: isDarkMode ? "white" : "black", border: "1px solid gray"}}
                onClick={() =>
                  handleShowButtonFeaturesInEditGraph(setShowGraphButtonFeatures, setShowAxesButtonFeatures, setShowGridButtonFeatures, setShowSeriesButtonFeatures, setShowLegendButtonFeatures)
                }
              >Graph</button>
              <button
                className="edit-graph-popup-buttons" style={{backgroundColor: isDarkMode ? (showAxesButtonFeatures ? "black" : "#2e2d2d") : "white", color: isDarkMode ? "white" : "black", border: "1px solid gray"}}
                onClick={() =>
                  handleShowButtonFeaturesInEditGraph(setShowAxesButtonFeatures, setShowGraphButtonFeatures, setShowGridButtonFeatures, setShowSeriesButtonFeatures, setShowLegendButtonFeatures)
                }
              >Axes</button>
              <button className="edit-graph-popup-buttons" style={{backgroundColor: isDarkMode ? (showGridButtonFeatures ? "black" : "#2e2d2d") : "white", color: isDarkMode ? "white" : "black", border: "1px solid gray"}}
                onClick={() =>
                  handleShowButtonFeaturesInEditGraph(setShowGridButtonFeatures, setShowAxesButtonFeatures, setShowGraphButtonFeatures, setShowSeriesButtonFeatures, setShowLegendButtonFeatures)
                }
              >Grid</button>
              <button className="edit-graph-popup-buttons" style={{backgroundColor: isDarkMode ? (showSeriesButtonFeatures ? "black" : "#2e2d2d") : "white", color: isDarkMode ? "white" : "black", border: "1px solid gray"}}
                onClick={() =>
                  handleShowButtonFeaturesInEditGraph(setShowSeriesButtonFeatures, setShowAxesButtonFeatures, setShowGridButtonFeatures, setShowGraphButtonFeatures, setShowLegendButtonFeatures)
                }
              >Series</button>
              <button className="edit-graph-popup-buttons" style={{backgroundColor: isDarkMode ? (showLegendButtonFeatures ? "black" : "#2e2d2d") : "white", color: isDarkMode ? "white" : "black", border: "1px solid gray"}}
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
                setAutoScaleBothAxes={setAutoScaleBothAxes}
              />
            )}
            {showAxesButtonFeatures && (
              <AxesEditFeatures
                isDarkMode={isDarkMode}
                xAxis_selected_option={xAxis_selected_option}
                nameOfXAxisUserInput={nameOfXAxisUserInput}
                setNameOfXAxisUserInput={setNameOfXAxisUserInput}
                nameOfYAxisUserInput={nameOfYAxisUserInput}
                setNameOfYAxisUserInput={setNameOfYAxisUserInput}
                xAxisTitleIsShown={xAxisTitleIsShown}
                setXAxisTitleIsShown={setXAxisTitleIsShown}
                yAxisTitleIsShown={yAxisTitleIsShown}
                setYAxisTitleIsShown={setYAxisTitleIsShown}
                styleForNumberInputInXYMinimum={styleForNumberInputInXYMinimum}
                graphState={graphState}
                setGraphState={setGraphState}
                styleForCheckboxCustomize={styleForCheckboxCustomize}
                showXMajorTicks={showXMajorTicks}
                setShowXMajorTicks={setShowXMajorTicks}
                showYMajorTicks={showYMajorTicks}
                setShowYMajorTicks={setShowYMajorTicks}
                showXMinorTicks={showXMinorTicks}
                setShowXMinorTicks={setShowXMinorTicks}
                showYMinorTicks={showYMinorTicks}
                setShowYMinorTicks={setShowYMinorTicks}
                colorForXAxis={colorForXAxis}
                setColorForXAxis={setColorForXAxis}
                colorForYAxis={colorForYAxis}
                setColorForYAxis={setColorForYAxis}
                setIsXAutoscaleChecked={setIsXAutoscaleChecked}
                isXAutoscaleChecked={isXAutoscaleChecked}
                setIsYAutoscaleChecked={setIsYAutoscaleChecked}
                isYAutoscaleChecked={isYAutoscaleChecked}
              />
            )}
            {showGridButtonFeatures && (
              <GridEditFeatures
                isDarkMode={isDarkMode}
                // Major
                xMajorGridColor={xMajorGridColor}
                setXMajorGridColor={setXMajorGridColor}
                yMajorGridColor={yMajorGridColor}
                setYMajorGridColor={setYMajorGridColor}
                xMajorGridWidth={xMajorGridWidth}
                setXMajorGridWidth={setXMajorGridWidth}
                yMajorGridWidth={yMajorGridWidth}
                setYMajorGridWidth={setYMajorGridWidth}
                xMajorGridCount={xMajorGridCount}
                setXMajorGridCount={setXMajorGridCount}
                yMajorGridCount={yMajorGridCount}
                setYMajorGridCount={setYMajorGridCount}
                setIsXMajorGridOn={setIsXMajorGridOn}
                setIsYMajorGridOn={setIsYMajorGridOn}
                //Minor
                xMinorGridColor={xMinorGridColor}
                setXMinorGridColor={setXMinorGridColor}
                yMinorGridColor={yMinorGridColor}
                setYMinorGridColor={setYMinorGridColor}
                xMinorGridWidth={xMinorGridWidth}
                setXMinorGridWidth={setXMinorGridWidth}
                yMinorGridWidth={yMinorGridWidth}
                setYMinorGridWidth={setYMinorGridWidth}
                xMinorGridCount={xMinorGridCount}
                setXMinorGridCount={setXMinorGridCount}
                yMinorGridCount={yMinorGridCount}
                setYMinorGridCount={setYMinorGridCount}
                setIsXMinorGridOn={setIsXMinorGridOn}
                setIsYMinorGridOn={setIsYMinorGridOn}
              />
            )}
            {showSeriesButtonFeatures && (
              <SeriesEditFeatures
                isDarkMode={isDarkMode}
                selectedOptions={selectedOptions}
                styleForCheckboxCustomize={styleForCheckboxCustomize}
                setSelectedOptions={setSelectedOptions}
                lineColorMap={lineColorMap}
                setLineColorMap={setLineColorMap}
                setLineWidthMap={setLineWidthMap}
                lineWidthMap={lineWidthMap}
                setLineStyleMap={setLineStyleMap}
                lineStyleMap={lineStyleMap}
              />
            )}
            {showLegendButtonFeatures && (
              <LegendEditFeatures
                isDarkMode={isDarkMode}
                styleForCheckboxCustomize={styleForCheckboxCustomize}
                isShowLegendChecked={isShowLegendChecked}
                setIsShowLegendChecked={setIsShowLegendChecked}
                isLegendFrameBorderOn={isLegendFrameBorderOn}
                setIsLegendFrameBorderOn={setIsLegendFrameBorderOn}
                legendFrameColor={legendFrameColor}
                setLegendFrameColor={setLegendFrameColor}
                legendFrameWidth={legendFrameWidth}
                setLegendFrameWidth={setLegendFrameWidth}
                legendFrameGap={legendFrameGap}
                setLegendFrameGap={setLegendFrameGap}
                legendFrameLineLength={legendFrameLineLength}
                setLegendFrameLineLength={setLegendFrameLineLength}
                legendFrameInteriorColor={legendFrameInteriorColor}
                setLegendFrameInteriorColor={setLegendFrameInteriorColor}
              />
            )}
            <div className="popup-bottom-edit-graph" style={{backgroundColor: isDarkMode ? "#737170" : "white", border: "1px solid grey", borderRadius: "8px"}}>
              <button
                className="edit-graph-popup-buttons" style={{backgroundColor: isDarkMode ? "#2e2d2d" : "white", color: isDarkMode ? "white" : "black"}}
                onClick={handleButtonClose}
              >Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default forwardRef(RightPanel);
