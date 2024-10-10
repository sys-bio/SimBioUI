// Inside MenuHeader.js
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ANALYSIS_ITEM, EXAMPLE_ITEMS, FILE_ITEMS, HELP_ITEMS, OPTIONS_ITEMS } from "../../constants/const";
import { FaMoon, FaSun } from "react-icons/fa";
import DropdownContainers from "./DropdownContainers";
import ExamplePopup from "./examples-popup/ExamplePopup";
import AboutIridiumPopup from "./about-iridium-popup/AboutIridiumPopup"; // Import the new popup

const MenuHeader = (props) => {
    const {
        isDarkMode,
        handleContentSelect,
        toggleDarkMode,
        handleDownloadPDF,
        handleExportSBML,
        SBMLContent,
        handleSBMLfile,
        isNewFileUploaded,
        setIsNewFileUploaded,
        promptForFileNameAndDownload,
        simulationParam,
        setSelectedParameter,
        selectedParameter,
        setActiveAnalysisPanel,
        editorInstance,
        initialTabData,
        handleResetParameters,
        handleResetInApp
    } = props;

    const fileDropdownRef = useRef(null);
    const analysisDropdownRef = useRef(null);
    const optionsDropdownRef = useRef(null);
    const examplesDropdownRef = useRef(null);
    const helpDropdownRef = useRef(null);
    const fileInputRef = useRef(null);

    const [showDropdownToolbar, setShowDropdownToolbar] = useState(false);
    const [activeToolbarButton, setActiveToolbarButton] = useState("");
    const [showHelpPopup, setShowHelpPopup] = useState(false);
    const [showAboutIridiumPopup, setShowAboutIridiumPopup] = useState(false); // State for the new popup

    const [showExamplePopup, setShowExamplePopup] = useState(false);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                const fileName = file.name;
                const fileExtension = fileName.split(".").pop().toLowerCase();
                switch (fileExtension) {
                    case "txt":
                    case "ant":
                        if (typeof handleContentSelect === "function") {
                            handleContentSelect(fileContent);
                        }
                        break;
                    case "xml":
                        if (typeof handleSBMLfile === "function") {
                            handleSBMLfile(fileContent);
                            handleResetInApp();
                            handleResetParameters();
                            setSelectedParameter(null);
                        }
                        break;
                    default:
                        console.error("Unsupported file format");
                }
            };
            reader.readAsText(file);
            event.target.value = null; // Reset the file input
        }
    };

    const handleOpenFile = () => {
        const acceptedFileTypes = ".txt,.ant,.xml";
        const fileInput = fileInputRef.current;
        if (fileInput) {
            fileInput.accept = acceptedFileTypes;
            fileInput.click();
        }
    };

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
        const antimonyContent = editorInstance?.getValue();
        handleExportSBML(antimonyContent);
    };

    const onExportAntSelected = () => {
        const content = editorInstance?.getValue();
        const timeStart = simulationParam.simulationParameters.timeStart;
        const timeEnd = simulationParam.simulationParameters.timeEnd;
        const numPoints = simulationParam.simulationParameters.numPoints;
        const res = content + '\n\n// Time Start: ' + timeStart + '\n// Time End: ' + timeEnd + '\n// Number of points: ' + numPoints;
        promptForFileNameAndDownload(res, false)
    }

    const onImportSBML = (content) => {
        handleSBMLfile(content);
        handleResetInApp();
        handleResetParameters();
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
            <div ref={fileDropdownRef}> {/* Only file button + icons are inline */}
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
                        onImportSBML={onImportSBML}
                        onExportSBMLSelected={onExportSBMLSelected}
                        onExportAntSelected={onExportAntSelected}
                        SBMLContent={SBMLContent}
                        onContentSelect={handleContentSelect}
                        className={"dropdown-file-container"}
                        dropdownToolbarStyle={dropdownToolbarStyle}
                        dropdownToolbarButtonsStyle={dropdownToolbarButtonsStyle}
                        options={FILE_ITEMS}
                        withCheckboxes={false}
                        xAxis={false}
                        dropdown_toolbar_buttons_style={"dropdown-toolbar-button-file"}
                        isNewFileUploaded={isNewFileUploaded}
                        setIsNewFileUploaded={setIsNewFileUploaded}
                        setShowDropdownToolbar={setShowDropdownToolbar}
                        setActiveToolbarButton={setActiveToolbarButton}
                        editorInstance={editorInstance}
                        initialTabData={initialTabData}
                    />
                )}
                <div style={{ display: 'flex'}}> {/* Only affects icons inside this container */}
                    <img
                        src={`${process.env.PUBLIC_URL}/NewFileIcon.png`}
                        alt="New File Icon"
                        style={{ width: "25px", height: "25px", marginLeft: "15px", marginTop: "-4px",
                        backgroundColor: "#747875"}}
                        onClick={() => {
							if (editorInstance) {
								// Set the new content in the editor
								editorInstance.setValue(initialTabData.textContent);
							}
						}}
                    />

                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    accept=".txt,.ant,.xml"
                    style={{ display: "none" }}
                    onChange={handleFileSelect}
                />
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
                <div style={{ display: 'flex'}}> {/* Only affects icons inside this container */}
                	<img
						src={`${process.env.PUBLIC_URL}/SaveIcon.png`}
						alt="Save Icon"
						style={{ width: "25px", height: "25px", marginTop: "-4px",
						backgroundColor: "#747875"}}
						onClick={onExportAntSelected}
					/>
					<img
						src={`${process.env.PUBLIC_URL}/OpenIcon.png`}
						alt="Open"
						style={{ width: "25px", height: "25px", marginLeft: "15px", marginTop: "-4px",
						backgroundColor: "#747875"}}
						onClick={handleOpenFile}
					/>

				</div>
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
                        setActiveAnalysisPanel={setActiveAnalysisPanel}
                        activeToolbarButton={activeToolbarButton}
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
                <div style={{ display: 'flex'}}> {/* Only affects icons inside this container */}
                	<div
						style={{
							height: "30px", /* Match the icon height */
							width: "1px", /* Thickness of the line */
							backgroundColor: "gray", /* Line color */
							marginTop: "-5px"
						}}
					/>
					<img
						src={`${process.env.PUBLIC_URL}/TimeCourseSimulation.png`}
						alt="Time Course Simulation"
						style={{ width: "25px", height: "25px", marginLeft: "15px", marginTop: "-4px",
						backgroundColor: "#747875"}}
						onClick={() => setActiveAnalysisPanel("Time Course Simulation")}
					/>
					<img
						src={`${process.env.PUBLIC_URL}/SteadyState.svg`}
						alt="Steady State"
						style={{ width: "25px", height: "25px", marginLeft: "15px", marginTop: "-4px",
						backgroundColor: "#747875"}}
						onClick={() => setActiveAnalysisPanel("Steady-State")}
					/>
				</div>
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
            <div ref={examplesDropdownRef} >
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
                <div style={{ display: 'flex'}}> {/* Only affects icons inside this container */}
					<img
						src={`${process.env.PUBLIC_URL}/ParameterScanIcon.png`}
						alt="ParameterScan"
						style={{ width: "25px", height: "25px", marginLeft: "15px", marginTop: "-4px",
						backgroundColor: "#747875",  }}
						onClick={() => setActiveAnalysisPanel("Parameter Scan")}
					/>
					<div
						style={{
							height: "30px", /* Match the icon height */
							width: "1px", /* Thickness of the line */
							backgroundColor: "gray", /* Line color */
							marginTop: "-5px",
							marginLeft: "15px"
						}}
					/>
				</div>
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
                <div style={{ display: 'flex'}}> {/* Only affects icons inside this container */}
					<img
						src={`${process.env.PUBLIC_URL}/example.png`}
						alt="Example"
						style={{ width: "25px", height: "25px", marginLeft: "-15px", marginTop: "-4px",
						backgroundColor: "#747875"}}
						onClick={() => {
							if (setShowExamplePopup) {
								setShowExamplePopup(true);
							}
						}}
					/>
				</div>
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
                        setShowAboutIridiumPopup={setShowAboutIridiumPopup}
                    />
                )}
            </div>
            <button onClick={toggleDarkMode} title={modeTooltip}>
                {modeIcon}
            </button>
            {showExamplePopup && (
                <ExamplePopup
                    isDarkMode={isDarkMode}
                    setShowExamplePopup={setShowExamplePopup}
                    editorInstance={editorInstance}
                    handleResetInApp={handleResetInApp}
                    handleResetParameters={handleResetParameters}
                />
            )}
            {showHelpPopup && (
                <div className={"modal-overlay"}>
                    <div
                        style={{
                            backgroundColor: isDarkMode ? "#2e2d2d" : "#fff",
                            border: "1px solid grey",
                            borderRadius: "8px",
                            width: "300px",
                            height: "100px",
                            position: "relative", // Ensure relative positioning for absolute positioning of text
                            padding: "10px" // Add padding for text container
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: "10px", // Adjust top positioning as needed
                                left: "10px", // Adjust left positioning as needed
                                color: isDarkMode ? "white" : "black",
                                fontSize: "12px",
                                lineHeight: "1.5"
                            }}
                        >
                            There is no help at present. You are on your own...
                            <br />
                            Hint: Press the simulation button.
                        </div>

                        <button
                            className="example-popup-buttons"
                            style={{
                                backgroundColor: isDarkMode ? "black" : "white",
                                color: isDarkMode ? "white" : "black",
                                border: "1px solid gray",
                                position: "absolute",
                                bottom: "10px", // Adjust bottom positioning as needed
                                right: "10px", // Adjust right positioning as needed
                            }}
                            onClick={() => setShowHelpPopup(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {showAboutIridiumPopup && (
                <AboutIridiumPopup isDarkMode={isDarkMode} setShowAboutIridiumPopup={setShowAboutIridiumPopup} />
            )}
        </div>
    );
};

export default MenuHeader;
