import React, { useState } from "react";
import TimeCourseSimulation from "./time-course-simulation/TimeCourseSimulation";
import SteadyState from "./steady-state/SteadyState";
import ParameterScan from "./parameter-scan/ParameterScan";
import RealTimeSimulation from "./realtime-simulation/RealTimeSimulation";
import StructureAnalysis from "./structure-analysis/StructureAnalysis";

const LeftPanel = (props) => {
    const {
        leftSubpanelStyle,
        panelWidth,
        isDarkMode,
        // For Time Course Simulation
        handleLocalReset,
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
        isNewFileUploaded,
        setIsNewFileUploaded,
        isNewTabCreated,
        activeAnalysisPanel,
        setIsResetInitialState,
        isResetInitialState,
		floatingSpecies,
		boundarySpecies,
		reactionRates,
		handleMoreOptionsApply,
		isNewOptionsAdded,
        setIsNewOptionsAdded,
        // For Steady State
        data,
        computeSteadyState,
        steadyState,
        eigenValues,
        jacobian,
        // For Parameter Scan
        kOptions,
        isShowLegendChecked,
        setIsShowLegendChecked,
        setPaletteColor,
        editorInstance
    } = props;

    return (
        <>
            {activeAnalysisPanel === "Time Course Simulation" ? (
                <TimeCourseSimulation
                    leftSubpanelStyle={leftSubpanelStyle}
                    panelWidth={panelWidth}
                    isDarkMode={isDarkMode}
                    handleLocalReset={handleLocalReset}
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
                    isNewFileUploaded={isNewFileUploaded}
                    setIsNewFileUploaded={setIsNewFileUploaded}
                    isNewTabCreated={isNewTabCreated}
                    setIsResetInitialState={setIsResetInitialState}
                    isResetInitialState={isResetInitialState}
                    editorInstance={editorInstance}
                    floatingSpecies={floatingSpecies}
					boundarySpecies={boundarySpecies}
					reactionRates={reactionRates}
					kOptions={kOptions}
					handleMoreOptionsApply={handleMoreOptionsApply}
					isNewOptionsAdded={isNewOptionsAdded}
                    setIsNewOptionsAdded={setIsNewOptionsAdded}
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
                    isResetInitialState={isResetInitialState}
                    eigenValues={eigenValues}
                    jacobian={jacobian}
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
                    editorInstance={editorInstance}
                    onPaletteChange={(colors) => setPaletteColor(colors)}
                />
            ) : activeAnalysisPanel === "Real-Time Simulation" ? (
                <RealTimeSimulation
                    leftSubpanelStyle={leftSubpanelStyle}
                    panelWidth={panelWidth}
                    isDarkMode={isDarkMode}
                    handleIconClick={handleIconClick}
                />
            ) : activeAnalysisPanel === "Structure Analysis" ? (
                <StructureAnalysis
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
