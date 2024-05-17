import React, { useEffect, useMemo, useState } from "react";
import { MIN_PANEL_WIDTH } from "../constants/const";
import SimulationParameters from "./SimulationParameters";
import { FaBars } from "react-icons/fa";
import DropdownContainers from "./DropdownContainers";

const LeftPanel = (props) => {
    const {
        leftSubpanelStyle,
        panelWidth,
        isDarkMode,
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
        setIsNewFileUploaded
    } = props;

    const [options, setOptions] = useState(initialOptions);
    const [previousContent, setPreviousContent] = useState("");
    const [isChecked, setIsChecked] = useState(true);
    const [selectedXOption, setSelectedXOption] = useState("Time");
    const [showDropdown, setShowDropdown] = useState(false);
    const [showXDropdown, setShowXDropdown] = useState(false);
    const [showDropdownButtons, setShowDropdownButtons] = useState(false);
    const [showXDropdownButtons, setShowXDropdownButtons] = useState(false);
    const [shouldUpdateSelectedOptions, setShouldUpdateSelectedOptions] = useState(false);
    const [selectedElements, setSelectedElements] = useState([]);
    const [showMoreOptions, setShowMoreOptions] = useState(false);

    useEffect(() => {
        const modifiedInitialOptions = { ...initialOptions };
        const keys = Object.keys(modifiedInitialOptions);
        if (keys.length > 0) {
            modifiedInitialOptions[keys[0]] = false;
        }
        if (shouldUpdateSelectedOptions) {
            setOptions(modifiedInitialOptions);
            setSelectedOptions(modifiedInitialOptions);
        }
    }, [initialOptions]);

    const { dropdownXAxisButtonStyle } = useMemo(() => {
        const dropdownXAxisButtonStyle = {
            backgroundColor: isDarkMode ? "#242323" : "#c4c2c2",
            color: isDarkMode ? "white" : "black",
        };

        return { dropdownXAxisButtonStyle };
    }, [isDarkMode]);

    const handleSlideButtonClick = () => {
        setShowSplitView((prev) => !prev); // Toggle the split view on button click
    };

    const handleSimulateButtonClick = () => {
        const currentContent = getContentOfActiveTab();
        if (currentContent !== previousContent) {
            setSelectedOptions([]);
            handleTextChange(currentContent, isChecked, true);
            setShouldUpdateSelectedOptions(true);
        } else {
            setShouldUpdateSelectedOptions(false);
            if (isNewFileUploaded) {
                handleTextChange(currentContent, isChecked, true);
                setIsNewFileUploaded(false);
            } else {
                onCheckboxChange(isChecked);
            }
        }
        setPreviousContent(currentContent);
    };

    const resetInitialConditions = (e) => {
        setIsChecked(e.target.checked);
        handleTextChange(getContentOfActiveTab(), !isChecked, false);
    };

    const handleXOptionSelected = (option) => {
        set_xAxis_selected_option(option);
    };
    const updateSelectedOptions = (newOptions) => {
        setSelectedOptions(newOptions);
    };

    const selectAllOptions = () => {
        setSelectedOptions(
            Object.keys(options).reduce((acc, key) => {
                acc[key] = true;
                console.log(`Selected option '${key}'`);
                return acc;
            }, {}),
        );
        setOptions(
            Object.keys(options).reduce((acc, key) => {
                acc[key] = true;
                return acc;
            }, {}),
        );
    };

    const unselectAllOptions = () => {
        setSelectedOptions(
            Object.keys(options).reduce((acc, key) => {
                acc[key] = false;
                return acc;
            }, {}),
        );
        setOptions(
            Object.keys(options).reduce((acc, key) => {
                acc[key] = false;
                return acc;
            }, {}),
        );
    };

    const applySelectedElements = () => {
        selectedElements.forEach((element) => {
            toggleOption(element);
        });
        setSelectedElements([]);
        setShowMoreOptions(false);
    };

    const closePopup = () => {
        setSelectedElements([]);
        setShowMoreOptions(false);
    };

    const addElementToSelected = (element) => {
        setSelectedElements((prevSelected) => [...prevSelected, element]);
    };

    const addAllElements = () => {
        setSelectedElements(additionalElements);
    };

    const clearAllElements = () => {
        setSelectedElements([]);
    };

    const toggleOption = (optionValue) => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            [optionValue]: true,
        }));
    };

    return (
        <>
            <div className="left-subpanel" style={leftSubpanelStyle}>
                {panelWidth > MIN_PANEL_WIDTH ? (
                    <>
                        <FaBars
                            className={"axis-icon"}
                            size="20"
                            color={isDarkMode ? "white" : "black"}
                            onClick={() => handleIconClick("narrow")}
                        />
                        <div
                            className={"text-simulation"}
                            style={{
                                color: isDarkMode ? "white" : "black",
                            }}
                        >
                            Time Course Simulation
                            <button
                                className={"config-button"}
                                style={{
                                    backgroundColor: isDarkMode ? "black" : "#c4c2c2",
                                    color: isDarkMode ? "white" : "black",
                                    border: isDarkMode ? "1px solid gray" : "1px solid black",
                                }}
                            >
                                Config
                            </button>
                        </div>

                        <div className={"simulate-reset-buttons"}>
                            <SimulationParameters
                                className={"border-with-text-simulation"}
                                isDarkMode={isDarkMode}
                                onParametersChange={onParametersChange}
                                simulationParam={simulationParam}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between", // Distribute items evenly along the main axis
                                    width: "100%", // Ensure full width of the container
                                }}
                            >
                                <button
                                    className={"simulate-style"}
                                    style={{
                                        color: isDarkMode ? "white" : "black",
                                    }}
                                    onClick={handleSimulateButtonClick}
                                >
                                    Simulate
                                </button>
                                <button
                                    className={"simulate-style"}
                                    style={{
                                        marginLeft: "-10px",
                                        color: isDarkMode ? "white" : "black",
                                    }}
                                    onClick={handleLocalReset}
                                >
                                    Reset
                                </button>
                                <button onClick={handleSlideButtonClick}>Slider</button>
                            </div>
                        </div>
                        <div className="text-checkbox-input">
                            <label
                                style={{
                                    color: isDarkMode ? "white" : "black",
                                }}
                            >
                                <input
                                    className={"checkbox-input"}
                                    checked={isChecked}
                                    type="checkbox"
                                    onChange={resetInitialConditions}
                                />
                                Always reset initial conditions
                            </label>
                        </div>
                        <div
                            className="border-with-text"
                            style={{
                                border: isDarkMode ? "1px solid white" : "1px solid black",
                            }}
                        >
                            <span
                                className="text-on-border"
                                style={{
                                    backgroundColor: isDarkMode ? "#2e2d2d" : "white",
                                    color: isDarkMode ? "white" : "black",
                                }}
                            >
                                X Axis
                            </span>
                            <button
                                className="button-style"
                                style={{
                                    backgroundColor: isDarkMode ? "#242323" : "#c4c2c2",
                                    color: isDarkMode ? "white" : "black",
                                    border: isDarkMode ? "1px solid gray" : "1px solid black",
                                }}
                                onClick={() => {
                                    setShowXDropdown(!showXDropdown);
                                    setShowXDropdownButtons(!showXDropdownButtons);
                                }}
                            >
                                {" "}
                                {selectedXOption}{" "}
                            </button>
                            {showXDropdown && ( // This dropdown will show for both X and Y axis buttons
                                <DropdownContainers
                                    key={JSON.stringify(options)}
                                    className={"dropdown-container"}
                                    onXOptionSelected={handleXOptionSelected}
                                    isDarkMode={isDarkMode}
                                    options={options}
                                    xAxis={true}
                                    withCheckboxes={false}
                                    dropdownToolbarButtonsStyle={dropdownXAxisButtonStyle}
                                    dropdown_toolbar_buttons_style={"dropdown-toolbar-button-xAxis"}
                                    setShowXDropdown={setShowXDropdown}
                                    showXDropdown={showXDropdown}
                                    selectedXOption={selectedXOption}
                                    setSelectedXOption={setSelectedXOption}
                                />
                            )}
                        </div>

                        <div
                            className="border-with-text"
                            style={{
                                border: isDarkMode ? "1px solid white" : "1px solid black",
                            }}
                        >
                            <span
                                className="text-on-border"
                                style={{
                                    backgroundColor: isDarkMode ? "#2e2d2d" : "white",
                                    color: isDarkMode ? "white" : "black",
                                }}
                            >
                                Y Axis
                            </span>
                            <button
                                className="button-style"
                                style={{
                                    backgroundColor: isDarkMode ? "#242323" : "#c4c2c2",
                                    color: isDarkMode ? "white" : "black",
                                    border: isDarkMode ? "1px solid gray" : "1px solid black",
                                }}
                                onClick={() => {
                                    setShowDropdown(!showDropdown);
                                    setShowDropdownButtons(!showDropdownButtons);
                                }} // Reuse showDropdown for Y-axis
                            >
                                {" "}
                                Select Y{" "}
                            </button>
                            {showDropdown && ( // This dropdown will show for both X and Y axis buttons
                                <DropdownContainers
                                    key={JSON.stringify(options)}
                                    updateOptions={updateSelectedOptions}
                                    className={"dropdown-container"}
                                    isDarkMode={isDarkMode}
                                    withCheckboxes={true}
                                    options={selectedOptions}
                                />
                            )}
                            {showDropdownButtons && (
                                <div>
                                    <button
                                        style={{
                                            backgroundColor: isDarkMode ? "black" : "#c4c2c2",
                                            color: isDarkMode ? "white" : "black",
                                        }}
                                        onClick={selectAllOptions}
                                    >
                                        Select all
                                    </button>
                                    <button
                                        style={{
                                            backgroundColor: isDarkMode ? "black" : "#c4c2c2",
                                            color: isDarkMode ? "white" : "black",
                                        }}
                                        onClick={unselectAllOptions}
                                    >
                                        Unselect all
                                    </button>
                                    <button
                                        style={{
                                            backgroundColor: isDarkMode ? "black" : "#c4c2c2",
                                            color: isDarkMode ? "white" : "black",
                                        }}
                                        onClick={() => setShowMoreOptions(true)}
                                    >
                                        More options
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className={"parameter-icon"}>
                        <FaBars
                            className={"axis-icon"}
                            size="25"
                            color="white"
                            onClick={() => handleIconClick("x-axis")}
                        />
                    </div>
                )}
            </div>

            {showMoreOptions && (
                <div className="popup">
                    <div className="popup-left">
                        {additionalElements.map((element) => (
                            <button key={element} onClick={() => addElementToSelected(element)}>
                                {element}
                            </button>
                        ))}
                    </div>
                    <div className="popup-right">
                        <div className={"small-text"}>
                            {selectedElements.map((element) => (
                                <div key={element}>{element}</div>
                            ))}
                        </div>
                    </div>
                    <div className="popup-top">
                        <button onClick={addAllElements}>Add All</button>
                        <button onClick={clearAllElements}>Clear All</button>
                    </div>
                    <div className="popup-bottom">
                        <button onClick={applySelectedElements}>Apply</button>
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default LeftPanel;
