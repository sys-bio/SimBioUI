import React from "react";
import TimeCourseSimulation from "./time-course-simulation/TimeCourseSimulation";
import SteadyState from "./steady-state/SteadyState";
import ParameterScan from "./parameter-scan/ParameterScan";
import RealTimeSimulation from "./realtime-simulation/RealTimeSimulation";

const LeftPanel = (props) => {
    const {
        leftSubpanelStyle,
        panelWidth,
        isDarkMode,
        // For Time Course Simulation
        handleLocalReset,
        getContentOfActiveTab,
        onParametersChange,
        handleIconClick,
        simulationParam,
        setShowSplitView,
        handleTextChange,
        initialOptions,
        setSelectedOptions,
        selectedOptions,
        set_xAxis_selected_option,
        onCheckboxChange,
        additionalElements,
        isNewFileUploaded,
        setIsNewFileUploaded,
        isNewTabCreated,
        activeAnalysisPanel,
        setIsResetInitialState,
        isResetInitialState,
        // For Steady State
        data,
        computeSteadyState,
        steadyState,
        // For Parameter Scan
        kOptions,
        isShowLegendChecked,
        setIsShowLegendChecked,
        setGraphColor
    } = props;

    return (
        <>
            {activeAnalysisPanel === "Time Course Simulation" ? (
                <TimeCourseSimulation
                    leftSubpanelStyle={leftSubpanelStyle}
                    panelWidth={panelWidth}
                    isDarkMode={isDarkMode}
                    handleLocalReset={handleLocalReset}
                    getContentOfActiveTab={getContentOfActiveTab}
                    onParametersChange={onParametersChange}
                    handleIconClick={handleIconClick}
                    simulationParam={simulationParam}
                    setShowSplitView={setShowSplitView}
                    handleTextChange={handleTextChange}
                    initialOptions={initialOptions}
                    setSelectedOptions={setSelectedOptions}
                    selectedOptions={selectedOptions}
                    set_xAxis_selected_option={set_xAxis_selected_option}
                    onCheckboxChange={onCheckboxChange}
                    additionalElements={additionalElements}
                    isNewFileUploaded={isNewFileUploaded}
                    setIsNewFileUploaded={setIsNewFileUploaded}
                    isNewTabCreated={isNewTabCreated}
                    setIsResetInitialState={setIsResetInitialState}
                    isResetInitialState={isResetInitialState}
                />
            ) : activeAnalysisPanel === "Steady-State" ? (
                <SteadyState
                    leftSubpanelStyle={leftSubpanelStyle}
                    panelWidth={panelWidth}
                    isDarkMode={isDarkMode}
                    handleIconClick={handleIconClick}
                    selectedOptions={selectedOptions}
                    data={data}
                    computeSteadyState={computeSteadyState}
                    steadyState={steadyState}
                    getContentOfActiveTab={getContentOfActiveTab}
                    isResetInitialState={isResetInitialState}
                />
            ) :  activeAnalysisPanel === "Parameter Scan" ? (
                <ParameterScan
                    leftSubpanelStyle={leftSubpanelStyle}
                    panelWidth={panelWidth}
                    isDarkMode={isDarkMode}
                    handleIconClick={handleIconClick}
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                    simulationParam={simulationParam}
                    kOptions={kOptions}
                    isShowLegendChecked={isShowLegendChecked}
                    setIsShowLegendChecked={setIsShowLegendChecked}
                    getContentOfActiveTab={getContentOfActiveTab}
                    onPaletteChange={(colors) => setGraphColor(colors)}
                />
            ) : activeAnalysisPanel === "Real-Time Simulation" ? (
                <RealTimeSimulation
                    leftSubpanelStyle={leftSubpanelStyle}
                    panelWidth={panelWidth}
                    isDarkMode={isDarkMode}
                    handleIconClick={handleIconClick}
                />
            ) : null}
        </>
    );
};

export default LeftPanel;