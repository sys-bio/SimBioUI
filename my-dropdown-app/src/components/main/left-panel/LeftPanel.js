import React, { useState } from "react";
import TimeCourseSimulation from "./time-course-simulation/TimeCourseSimulation";
import SteadyState from "./steady-state/SteadyState";
import ParameterScan from "./parameter-scan/ParameterScan";
import RealTimeSimulation from "./realtime-simulation/RealTimeSimulation";
import MoreOptionsPopup from "./time-course-simulation/MoreOptionsPopup";

const LeftPanel = (props) => {
    const {
        leftSubpanelStyle,
        panelWidth,
        isDarkMode,
        // For Time Course Simulation
        handleLocalReset,
        onParametersChange,
        handleIconClick,
        tempSimulationParameters,
        simulationParam,
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
        selectedValues,
        showMoreOptions,
        setShowMoreOptions,
        selectionList,
        setSelectionList,
        onSimulate,
        // For Steady State
        data,
        computeSteadyState,
        steadyState,
        eigenValues,
        jacobian,
        fluxControl,
		kOptionsForSliders,
		minMaxValues,
		sliderValues,
		selectedParameter,
		handleCheckboxChange,
		handleSliderChange,
		handleSliderChangeInSteadyState,
		handleMinValueChange,
		handleMaxValueChange,
		handleLabelClick,
		handleSteadyStateDock,
		handleSteadyStateUndock,
		setShowSteadyStatePopup,
        // For Parameter Scan
        kOptions,
        isShowLegendChecked,
        setIsShowLegendChecked,
        setPaletteColor,
        editorInstance,
        handleParameterScansUpdate,
        parametersScanType,
        firstParameter,
        handleScanButton,
        showSplitView,
        setShowSplitView,
        linesStyle,
        setLinesStyle
    } = props;
    const [selectedElements, setSelectedElements] = useState([]);
    const [isParameterScan, setIsParameterScan] = useState(false);

	const closePopup = () => {
		setSelectedElements([]);
		setShowMoreOptions(false);
	};

	const addElementToSelected = (element) => {
		setSelectedElements((prevSelectedElements) => [
			...prevSelectedElements,
			element
		]);
	};

	const clearAllElements = () => {
		setSelectedElements([]);
	};

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
                    tempSimulationParameters={tempSimulationParameters}
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
                    showMoreOptions={showMoreOptions}
                    setShowMoreOptions={setShowMoreOptions}
                    selectionList={selectionList}
                    setPaletteColor={setPaletteColor}
                    setIsParameterScan={setIsParameterScan}
                    onSimulate={onSimulate}
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
                    kOptions={kOptions}
					kOptionsForSliders={kOptionsForSliders}
					minMaxValues={minMaxValues}
					sliderValues={sliderValues}
					selectedParameter={selectedParameter}
					handleCheckboxChange={handleCheckboxChange}
					handleSliderChange={handleSliderChange}
					handleSliderChangeInSteadyState={handleSliderChangeInSteadyState}
					handleMinValueChange={handleMinValueChange}
					handleMaxValueChange={handleMaxValueChange}
					handleLabelClick={handleLabelClick}
					selectedValues={selectedValues}
					editorInstance={editorInstance}
					initialOptions={initialOptions}
					setSelectedOptions={setSelectedOptions}
					showSplitView={showSplitView}
                    setShowSplitView={setShowSplitView}
                    setShowSteadyStatePopup={setShowSteadyStatePopup}
                    selectionList={selectionList}
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
                    handleParameterScansUpdate={handleParameterScansUpdate}
                    parametersScanType={parametersScanType}
                    firstParameter={firstParameter}
                    editorInstance={editorInstance}
                    handleScanButton={handleScanButton}
                    floatingSpecies={floatingSpecies}
                    setShowMoreOptions={setShowMoreOptions}
                    selectionList={selectionList}
                    setSelectionList={setSelectionList}
                    linesStyle={linesStyle}
                    setLinesStyle={setLinesStyle}
                    setIsParameterScan={setIsParameterScan}
                />
            ) : activeAnalysisPanel === "Real-Time Simulation" ? (
                <RealTimeSimulation
                    leftSubpanelStyle={leftSubpanelStyle}
                    panelWidth={panelWidth}
                    isDarkMode={isDarkMode}
                    handleIconClick={handleIconClick}
                />
            ) : null}
            {showMoreOptions && (
				<MoreOptionsPopup
					selectedElements={selectedElements}
					addElementToSelected={addElementToSelected}
					clearAllElements={clearAllElements}
					closePopup={closePopup}
					floatingSpecies={floatingSpecies}
					boundarySpecies={boundarySpecies}
					reactionRates={reactionRates}
					kOptions={kOptions}
					handleMoreOptionsApply={handleMoreOptionsApply}
					isParameterScan={isParameterScan}
				/>
			)}
        </>
    );
};

export default LeftPanel;
