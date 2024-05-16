import React, { forwardRef, useRef, useState } from "react";
import ResizingHandle from "./ResizingHandle";
import PlotGraph from "./PlotGraph";
import NumberInput from "./NumberInput";
import { INITIAL_GRAPH_STATE, LEFT_PANEL_FIXED_WIDTH } from "../constants/const";

const RightPanel = (props, ref) => {
    const {
        rightSubpanelStyle,
        layoutVertical,
        setRightPanelWidth,
        isDarkMode,
        rightPanelWidth,
        data,
        selectedOptions,
        xAxis_selected_option,
    } = props;

    const [graphState, setGraphState] = useState(INITIAL_GRAPH_STATE);
    const [isXAutoscaleChecked, setIsXAutoscaleChecked] = useState(false);
    const [isYAutoscaleChecked, setIsYAutoscaleChecked] = useState(false);

    const rightPanelRef = useRef(null);
    const rightResizingRef = useRef(false);

    const handleRightResize = (e) => {
        if (rightResizingRef.current && rightPanelRef.current) {
            let newRightPanelWidth = window.innerWidth - e.clientX;
            const maxRightPanelWidth = window.innerWidth - LEFT_PANEL_FIXED_WIDTH;
            newRightPanelWidth = Math.max(Math.min(newRightPanelWidth, maxRightPanelWidth), 0);

            // Set the new width for the right panel.
            setRightPanelWidth(newRightPanelWidth);
            const newCenterPanelWidth = window.innerWidth - LEFT_PANEL_FIXED_WIDTH - newRightPanelWidth;
            // Ensure center panel width does not go below the minimum width.
            const adjustedCenterPanelWidth = Math.max(newCenterPanelWidth, 0);
            setCenterPanelWidth(adjustedCenterPanelWidth);
        }
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
                                            onChange={(e) => {
                                                setIsXAutoscaleChecked(e.target.checked);
                                            }}
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
                                            onChange={(e) => {
                                                setIsYAutoscaleChecked(e.target.checked);
                                            }}
                                        />
                                        Autoscale Y
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
                                    style={{
                                        marginBottom: "10px",
                                        backgroundColor: isDarkMode ? "black" : "#c4c2c2",
                                        color: isDarkMode ? "white" : "black",
                                    }}
                                >
                                    Edit Graph
                                </button>
                                <button
                                    className={"edit-export-style"}
                                    style={{
                                        backgroundColor: isDarkMode ? "black" : "#c4c2c2",
                                        color: isDarkMode ? "white" : "black",
                                    }}
                                >
                                    {" "}
                                    Export To PDF
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default forwardRef(RightPanel);
