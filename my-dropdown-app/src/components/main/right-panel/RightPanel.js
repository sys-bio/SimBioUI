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
	reactionRates,
	concentration,
	elasticities,
    handleSteadyStateUndock,
    handleSteadyStateDock,
    handleCloseSteadyStatePopup,
    setShowSteadyStatePopup,
    isSteadyStateDocked,
    setIsDataTableDocked,
	isDataTableDocked,
	showMoreDataPopup,
	setShowMoreDataPopup,
	setIsSteadyStateDocked,
	linesStyle
  } = props;

  const [graphState, setGraphState] = useState(INITIAL_GRAPH_STATE);

  // Checkboxes for graph
  const [isXAutoscaleChecked, setIsXAutoscaleChecked] = useState(false);
  const [isYAutoscaleChecked, setIsYAutoscaleChecked] = useState(false);

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
  const plotHeight = (isDataTableDocked || isSteadyStateDocked) ? graphHeight - 150 : window.innerHeight * 0.55;
  const isResizing = useRef(false);

//	const plotHeight = isDataTableDocked
//	  ? window.innerHeight * 0.35 // Adjust this value as needed
//	  : window.innerHeight * 0.55; // Adjust this value as needed

  useEffect(() => {
    if (isNewTabCreated) {
      setIsXAutoscaleChecked(false);
      setIsYAutoscaleChecked(false);
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
    if (!data || data.columns.length === 0) {
      window.alert("Run Simulate to show more data");
    } else {
      if (isDataTableDocked) {
        setIsDataTableDocked(false);
      }
      setShowMoreDataPopup(true);
    }
  };

  const handleDataTableDock = () => {
    setIsDataTableDocked(true);
    setShowMoreDataPopup(false);
    if (isSteadyStateDocked) {
    	setShowSteadyStatePopup(true);
    	setIsSteadyStateDocked(false);
    }
  };

  const handleDataTableUndock = () => {
    setIsDataTableDocked(false);
    setShowMoreDataPopup(true);
  };

  const handleCloseDataTable = () => {
    setIsDataTableDocked(false);
    setShowMoreDataPopup(false);
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
          flexDirection: "column", // Changed from 'row' to 'column'
          height: "100%",
        }}
      >
        <div
          style={{
            flex: isDataTableDocked ? 1 : 1,
            height: `${graphHeight}px`, // Adjusted height
            overflowY: "auto",
          }}
        >
          {/* PlotGraph and controls */}
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
            xMinorGridCount={xMinorGridCount}
            yMinorGridCount={yMinorGridCount}
            xMinorGridWidth={xMinorGridWidth}
            yMinorGridWidth={yMinorGridWidth}
            isXMajorGridOn={isXMajorGridOn}
            isYMajorGridOn={isYMajorGridOn}
            isXMinorGridOn={isXMinorGridOn}
            isYMinorGridOn={isYMinorGridOn}
            isLegendFrameBorderOn={isLegendFrameBorderOn}
            legendFrameColor={legendFrameColor}
            legendFrameWidth={legendFrameWidth}
            legendFrameGap={legendFrameGap}
            legendFrameLineLength={legendFrameLineLength}
            legendFrameInteriorColor={legendFrameInteriorColor}
            paletteColor={paletteColor}
            setLineColorMap={setLineColorMap}
            lineColorMap={lineColorMap}
            setLineWidthMap={setLineWidthMap}
            lineWidthMap={lineWidthMap}
            setLineStyleMap={setLineStyleMap}
            lineStyleMap={lineStyleMap}
            plotHeight={plotHeight}
            setSelectedOptions={setSelectedOptions}
            linesStyle={linesStyle}
          />
          <div>
            <div style={{ display: "flex", marginTop: "10px" }}>
              <div style={{ marginRight: "10px" }}>
                <NumberInput
                  label="X Minimum:"
                  style={styleForNumberInputInXYMinimum()}
                  value={graphState.xMin || ""}
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
                  value={graphState.xMax || ""}
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
                  value={graphState.yMin || ""}
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
                  value={graphState.yMax || ""}
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
                    Export To PDF
                  </button>
                  <button
                    className={"edit-export-style"}
                    style={{
                      color: isDarkMode ? "white" : "black",
                      marginTop: "10px",
                    }}
                    onClick={handleShowMoreData}
                  >
                    Show Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {(isDataTableDocked || isSteadyStateDocked) && (
			<>
			  <VerticalResizer onResizeStart={handleResizeStart} />
			  <div
				style={{
				  flex: "0 0 auto",
				  height: `${dataTableHeight}px`,
				  overflowY: "auto",
				}}
			  >
				{isDataTableDocked && (
				  <DataTablePopup
					data={data}
					isDarkMode={isDarkMode}
					isDocked={true}
					onUndock={handleDataTableUndock}
					onClose={handleCloseDataTable}
				  />
				)}
				{isSteadyStateDocked && (
				  <SteadyStateMorePopup
					isDarkMode={isDarkMode}
					isDocked={true}
					onUndock={handleSteadyStateUndock}
					onClose={handleCloseSteadyStatePopup}
					jacobian={jacobian}
					fluxControl={fluxControl}
					reactionRates={reactionRates}
					concentration={concentration}
					elasticities={elasticities}
				  />
				)}
			  </div>
			</>
		  )}
      </div>
      {showMoreDataPopup && !isDataTableDocked && (
        <DataTablePopup
          data={data}
          onClose={() => {
            setShowMoreDataPopup(false);
          }}
          isDarkMode={isDarkMode}
          onDock={handleDataTableDock}
          isDocked={false}
        />
      )}
      {showSteadyStatePopup && !isSteadyStateDocked &&
		<SteadyStateMorePopup
			onClose={() => {setShowSteadyStatePopup(false)}}
			isDarkMode={isDarkMode}
			jacobian={jacobian}
			concentration={concentration}
			fluxControl={fluxControl}
            reactionRates={reactionRates}
            elasticities={elasticities}
			isDock={false}
			onDock={handleSteadyStateDock}
			onUndock={handleSteadyStateUndock}
		/>}
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