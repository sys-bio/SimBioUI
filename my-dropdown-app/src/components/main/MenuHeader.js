import React, { useEffect, useMemo, useRef, useState } from "react";
import { ANALYSIS_ITEM, EXAMPLE_ITEMS, FILE_ITEMS, HELP_ITEMS, OPTIONS_ITEMS } from "../../constants/const";
import { FaMoon, FaSun } from "react-icons/fa";
import DropdownContainers from "./DropdownContainers";
import ExamplePopup from "./examples-popup/ExamplePopup";

const MenuHeader = (props) => {
    const {
        isDarkMode,
        handleContentSelect,
        toggleDarkMode,
        handleDownloadPDF,
        handleExportSBML,
        SBMLContent,
        handleSBMLfile,
        getContentOfActiveTab,
        isNewFileUploaded,
        setIsNewFileUploaded,
        refreshCurrentTab,
        promptForFileNameAndDownload,
        simulationParam,
        setSelectedParameter,
        updateActiveTabContent
    } = props;

    const fileDropdownRef = useRef(null);
    const analysisDropdownRef = useRef(null);
    const optionsDropdownRef = useRef(null);
    const examplesDropdownRef = useRef(null);
    const helpDropdownRef = useRef(null);

    const [showDropdownToolbar, setShowDropdownToolbar] = useState(false);
    const [activeToolbarButton, setActiveToolbarButton] = useState("");
    const [showExamplePopup, setShowExamplePopup] = useState(false);
    const [showHelpPopup, setShowHelpPopup] = useState(false);

    const { dropdownToolbarStyle, dropdownToolbarButtonsStyle, modeIcon, modeTooltip } = useMemo(() => {
        const dropdownToolbarStyle = {
            backgroundColor: isDarkMode ? "#1f1f1e" : "white",
            borderRadius: "4px",
            border: "1px solid gray"
        };
        const dropdownToolbarButtonsStyle = {
            backgroundColor: isDarkMode ? "#1f1f1e" : "white",
            color: isDarkMode ? "white" : "black",
        };

        const modeIcon = isDarkMode ? <FaSun /> : <FaMoon />;
        const modeTooltip = isDarkMode ? "Switch to Bright Mode" : "Switch to Dark Mode";

        return { dropdownToolbarStyle, dropdownToolbarButtonsStyle, modeIcon, modeTooltip };
    }, [isDarkMode]);

    const handleToolbarButtons = (menu) => {
        setShowDropdownToolbar(menu !== activeToolbarButton);
        setActiveToolbarButton(menu === activeToolbarButton ? "" : menu);
    };

    const onExportSBMLSelected = () => {
        const antimonyContent = getContentOfActiveTab();
        handleExportSBML(antimonyContent);
    };

    const onExportAntSelected = () => {
        const content = getContentOfActiveTab();
        const timeStart = simulationParam.simulationParameters.timeStart;
        const timeEnd = simulationParam.simulationParameters.timeEnd;
        const numPoints = simulationParam.simulationParameters.numPoints;
        const res = content + '\n\n// Time Start: ' + timeStart + '\n// Time End: ' + timeEnd + '\n// Number of points: ' + numPoints;
        promptForFileNameAndDownload(res, false)
    }

    const onImportSBML = (content) => {
        handleSBMLfile(content);
        setSelectedParameter(null);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showDropdownToolbar) {
                if (
                    fileDropdownRef.current && !fileDropdownRef.current.contains(event.target) &&
                    analysisDropdownRef.current && !analysisDropdownRef.current.contains(event.target) &&
                    optionsDropdownRef.current && !optionsDropdownRef.current.contains(event.target) &&
                    examplesDropdownRef.current && !examplesDropdownRef.current.contains(event.target) &&
                    helpDropdownRef.current && !helpDropdownRef.current.contains(event.target)
                ) {
                    setShowDropdownToolbar(false);
                    setActiveToolbarButton("");
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdownToolbar]);

    return (
        <div className="top-menu">
            <div ref={fileDropdownRef}>
                <button
                    className="top-menu-button"
                    style={{
                        backgroundColor: isDarkMode ? (activeToolbarButton === "File" ? "black" : "#2e2d2d") : "white",
                        color: isDarkMode ? "white" : "black",
                    }}
                    onClick={() => handleToolbarButtons("File")}
                >
                    File
                </button>
                {activeToolbarButton === "File" && showDropdownToolbar && (
                    <DropdownContainers
                        onDownloadPDF={handleDownloadPDF}
                        onExportSBMLSelected={onExportSBMLSelected}
                        onExportAntSelected={onExportAntSelected}
                        SBMLContent={SBMLContent}
                        onImportSBML={onImportSBML}
                        onContentSelect={handleContentSelect}
                        className={"dropdown-file-container"}
                        dropdownToolbarStyle={dropdownToolbarStyle}
                        dropdownToolbarButtonsStyle={dropdownToolbarButtonsStyle}
                        options={FILE_ITEMS}
                        withCheckboxes={false}
                        xAxis={false}
                        dropdown_toolbar_buttons_style={"dropdown-toolbar-button-file"}
                        refreshCurrentTab={refreshCurrentTab}
                        isNewFileUploaded={isNewFileUploaded}
                        setIsNewFileUploaded={setIsNewFileUploaded}
                        setShowDropdownToolbar={setShowDropdownToolbar}
                        setActiveToolbarButton={setActiveToolbarButton}
                    />
                )}
            </div>
            <div ref={analysisDropdownRef}>
                <button
                    className="top-menu-button"
                    style={{
                        backgroundColor: isDarkMode ? (activeToolbarButton === "Analysis" ? "black" : "#2e2d2d") : "white",
                        color: isDarkMode ? "white" : "black",
                    }}
                    onClick={() => handleToolbarButtons("Analysis")}
                >
                    Analysis
                </button>
                {activeToolbarButton === "Analysis" && showDropdownToolbar && (
                    <DropdownContainers
                        className={"dropdown-analysis-container"}
                        dropdownToolbarStyle={dropdownToolbarStyle}
                        dropdownToolbarButtonsStyle={dropdownToolbarButtonsStyle}
                        options={ANALYSIS_ITEM}
                        withCheckboxes={false}
                        xAxis={false}
                        dropdown_toolbar_buttons_style={"dropdown-toolbar-button-analysis"}
                        setShowDropdownToolbar={setShowDropdownToolbar}
                        setActiveToolbarButton={setActiveToolbarButton}
                    />
                )}
            </div>
            <div ref={optionsDropdownRef}>
                <button
                    className="top-menu-button"
                    style={{
                        backgroundColor: isDarkMode ? (activeToolbarButton === "Options" ? "black" : "#2e2d2d") : "white",
                        color: isDarkMode ? "white" : "black",
                    }}
                    onClick={() => handleToolbarButtons("Options")}
                >
                    Options
                </button>
                {activeToolbarButton === "Options" && showDropdownToolbar && (
                    <DropdownContainers
                        className={"dropdown-options-container"}
                        dropdownToolbarStyle={dropdownToolbarStyle}
                        dropdownToolbarButtonsStyle={dropdownToolbarButtonsStyle}
                        options={OPTIONS_ITEMS}
                        withCheckboxes={false}
                        xAxis={false}
                        dropdown_toolbar_buttons_style={"dropdown-toolbar-button-options"}
                        setShowDropdownToolbar={setShowDropdownToolbar}
                        setActiveToolbarButton={setActiveToolbarButton}
                    />
                )}
            </div>
            <div ref={examplesDropdownRef} className={"container-of-toolbar-and-dropdown"}>
                <button
                    className="top-menu-button"
                    style={{
                        backgroundColor: isDarkMode ? (activeToolbarButton === "Examples" ? "black" : "#2e2d2d") : "white",
                        color: isDarkMode ? "white" : "black",
                    }}
                    onClick={() => handleToolbarButtons("Examples")}
                >
                    Examples
                </button>
                {activeToolbarButton === "Examples" && showDropdownToolbar && (
                    <DropdownContainers
                        className={"dropdown-examples-container"}
                        dropdownToolbarStyle={dropdownToolbarStyle}
                        dropdownToolbarButtonsStyle={dropdownToolbarButtonsStyle}
                        options={EXAMPLE_ITEMS}
                        withCheckboxes={false}
                        xAxis={false}
                        dropdown_toolbar_buttons_style={"dropdown-toolbar-button-examples"}
                        setShowExamplePopup={setShowExamplePopup}
                        setShowDropdownToolbar={setShowDropdownToolbar}
                        setActiveToolbarButton={setActiveToolbarButton}
                    />
                )}
            </div>
            <div ref={helpDropdownRef} className={"container-of-toolbar-and-dropdown"}>
                <button
                    className="top-menu-button"
                    style={{
                        backgroundColor: isDarkMode ? (activeToolbarButton === "Help" ? "black" : "#2e2d2d") : "white",
                        color: isDarkMode ? "white" : "black",
                    }}
                    onClick={() => handleToolbarButtons("Help")}
                >
                    Help
                </button>
                {activeToolbarButton === "Help" && showDropdownToolbar && (
                    <DropdownContainers
                        className={"dropdown-help-container"}
                        dropdownToolbarStyle={dropdownToolbarStyle}
                        dropdownToolbarButtonsStyle={dropdownToolbarButtonsStyle}
                        options={HELP_ITEMS}
                        withCheckboxes={false}
                        xAxis={false}
                        dropdown_toolbar_buttons_style={"dropdown-toolbar-button-help"}
                        setShowDropdownToolbar={setShowDropdownToolbar}
                        setActiveToolbarButton={setActiveToolbarButton}
                        setShowHelpPopup={setShowHelpPopup}
                    />
                )}
            </div>
            <button onClick={toggleDarkMode} title={modeTooltip}>
                {modeIcon}
            </button>
            {showExamplePopup && (
                <ExamplePopup isDarkMode={isDarkMode} setShowExamplePopup={setShowExamplePopup} updateActiveTabContent={updateActiveTabContent}/>
            )}
            {showHelpPopup && (
                <div className={"modal-overlay"}>
                    <div
                        style={{
                            backgroundColor: isDarkMode ? "#2e2d2d" : "#fff",
                            border: "1px solid grey",
                            borderRadius: "8px",
                            width: "300px",
                            height: "300px"
                        }}
                    >
//
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuHeader;