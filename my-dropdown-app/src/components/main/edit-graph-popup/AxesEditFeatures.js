import React, { useState } from 'react';
import AxisProperties from './AxisProperties';

const AxesEditFeatures = ({
    isDarkMode,
    nameOfXAxisUserInput,
    nameOfYAxisUserInput,
    setNameOfXAxisUserInput,
    setNameOfYAxisUserInput,
    xAxis_selected_option,
    xAxisTitleIsShown,
    setXAxisTitleIsShown,
    yAxisTitleIsShown,
    setYAxisTitleIsShown,
    styleForNumberInputInXYMinimum,
    graphState,
    setGraphState,
    styleForCheckboxCustomize,
    showXMajorTicks,
    setShowXMajorTicks,
    showYMajorTicks,
    setShowYMajorTicks,
    showXMinorTicks,
    setShowXMinorTicks,
    showYMinorTicks,
    setShowYMinorTicks,
    colorForXAxis,
    setColorForXAxis,
    colorForYAxis,
    setColorForYAxis,
    setIsXAutoscaleChecked,
    isXAutoscaleChecked,
    setIsYAutoscaleChecked,
    isYAutoscaleChecked
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
    const handleShowXMajorTicksChange = () => {
        setShowXMajorTicks(prev => !prev);
    }
    const handleShowXMinorTicksChange = () => {
        setShowXMinorTicks(prev => !prev);
    }
    const handleShowYMajorTicksChange = () => {
        setShowYMajorTicks(prev => !prev);
    }
    const handleShowYMinorTicksChange = () => {
        setShowYMinorTicks(prev => !prev);
    }

    // Handle autoscale X change
    const handleAutoscaleXChange = () => {
        setIsXAutoscaleChecked(!isXAutoscaleChecked);
    }
    // Handle autoscale Y change
    const handleAutoscaleYChange = () => {
        setIsYAutoscaleChecked(!isYAutoscaleChecked);
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
                <AxisProperties
                    isDarkMode={isDarkMode}
                    axisType="X"
                    nameOfAxisUserInput={nameOfXAxisUserInput}
                    setNameOfAxisUserInput={setNameOfXAxisUserInput}
                    axis_selected_option={xAxis_selected_option}
                    axisTitleIsShown={xAxisTitleIsShown}
                    setAxisTitleIsShown={setXAxisTitleIsShown}
                    styleForNumberInputInXYMinimum={styleForNumberInputInXYMinimum}
                    graphState={graphState}
                    setGraphState={setGraphState}
                    styleForCheckboxCustomize={styleForCheckboxCustomize}
                    showMajorTicks={showXMajorTicks}
                    handleShowMajorTicksChange={handleShowXMajorTicksChange}
                    showMinorTicks={showXMinorTicks}
                    handleShowMinorTicksChange={handleShowXMinorTicksChange}
                    colorForAxis={colorForXAxis}
                    setColorForAxis={setColorForXAxis}
                    isAutoscaleChecked={isXAutoscaleChecked}
                    handleAutoscaleChange={handleAutoscaleXChange}
                />
            )}
            {isYButtonOpen && (
                <AxisProperties
                    isDarkMode={isDarkMode}
                    axisType="Y"
                    nameOfAxisUserInput={nameOfYAxisUserInput}
                    setNameOfAxisUserInput={setNameOfYAxisUserInput}
                    axisTitleIsShown={yAxisTitleIsShown}
                    setAxisTitleIsShown={setYAxisTitleIsShown}
                    styleForNumberInputInXYMinimum={styleForNumberInputInXYMinimum}
                    graphState={graphState}
                    setGraphState={setGraphState}
                    styleForCheckboxCustomize={styleForCheckboxCustomize}
                    showMajorTicks={showYMajorTicks}
                    handleShowMajorTicksChange={handleShowYMajorTicksChange}
                    showMinorTicks={showYMinorTicks}
                    handleShowMinorTicksChange={handleShowYMinorTicksChange}
                    colorForAxis={colorForYAxis}
                    setColorForAxis={setColorForYAxis}
                    isAutoscaleChecked={isYAutoscaleChecked}
                    handleAutoscaleChange={handleAutoscaleYChange}
                />
            )}
        </div>
    )
};

export default AxesEditFeatures;
