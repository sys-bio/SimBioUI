import React, { Component } from "react";
import { MIN_PANEL_WIDTH } from "../../../../constants/const";
import SimulationParameters from "../../SimulationParameters";
import { FaBars } from "react-icons/fa";
import DropdownContainers from "../../DropdownContainers";
import "./TimeCourseSimulation.css";

class TimeCourseSimulation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: props.initialOptions,
            previousContent: "",
            selectedXOption: "Time",
            showDropdown: false,
            showXDropdown: false,
            showDropdownButtons: false,
            shouldUpdateSelectedOptions: false,
            selectedElements: [],
            showMoreOptions: false,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.isNewTabCreated && !prevProps.isNewTabCreated) {
            this.props.setIsResetInitialState(true);
        }

        if (this.props.initialOptions !== prevProps.initialOptions) {
            const modifiedInitialOptions = { ...this.props.initialOptions };
            const keys = Object.keys(modifiedInitialOptions);
            if (keys.length > 0) {
                modifiedInitialOptions[keys[0]] = false;
            }
            if (this.state.shouldUpdateSelectedOptions) {
                this.setState({
                    options: modifiedInitialOptions,
                });
                this.props.setSelectedOptions(modifiedInitialOptions);
            }
        }
    }

    handleSlideButtonClick = () => {
        this.props.setShowSplitView((prev) => !prev); // Toggle the split view on button click
    };

    handleSimulateButtonClick = () => {
        const currentContent = this.props.getContentOfActiveTab();
        if (currentContent !== this.state.previousContent) {
            this.props.setSelectedOptions([]);
            this.props.handleTextChange(currentContent, this.props.isResetInitialState, true);
            this.setState({ shouldUpdateSelectedOptions: true });
        } else {
            this.setState({ shouldUpdateSelectedOptions: false });
            if (this.props.isNewFileUploaded) {
                this.props.handleTextChange(currentContent, this.props.isResetInitialState, true);
                this.props.setIsNewFileUploaded(false);
            } else {
                this.props.onCheckboxChange(this.props.isResetInitialState);
            }
        }
        this.setState({ previousContent: currentContent });
    };

    resetInitialConditions = (e) => {
        const isChecked = e.target.checked;
        this.props.setIsResetInitialState(isChecked);
        this.props.handleTextChange(this.props.getContentOfActiveTab(), !isChecked, false);
    };

    handleXOptionSelected = (option) => {
        this.props.set_xAxis_selected_option(option);
        this.setState({ selectedXOption: option });
    };

    updateSelectedOptions = (newOptions) => {
        this.props.setSelectedOptions(newOptions);
    };

    selectAllOptions = () => {
        const newOptions = Object.keys(this.state.options).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {});
        this.setState({ options: newOptions });
        this.props.setSelectedOptions(newOptions);
    };

    unselectAllOptions = () => {
        const newOptions = Object.keys(this.state.options).reduce((acc, key) => {
            acc[key] = false;
            return acc;
        }, {});
        this.setState({ options: newOptions });
        this.props.setSelectedOptions(newOptions);
    };

    applySelectedElements = () => {
        this.state.selectedElements.forEach((element) => {
            this.toggleOption(element);
        });
        this.setState({ selectedElements: [], showMoreOptions: false });
    };

    closePopup = () => {
        this.setState({ selectedElements: [], showMoreOptions: false });
    };

    addElementToSelected = (element) => {
        this.setState((prevState) => ({
            selectedElements: [...prevState.selectedElements, element],
        }));
    };

    addAllElements = () => {
        this.setState({ selectedElements: this.props.additionalElements });
    };

    clearAllElements = () => {
        this.setState({ selectedElements: [] });
    };

    toggleOption = (optionValue) => {
        this.setState((prevState) => ({
            options: {
                ...prevState.options,
                [optionValue]: true,
            },
        }));
    };

    render() {
        const { isDarkMode, leftSubpanelStyle, panelWidth, handleIconClick, simulationParam, onParametersChange, handleLocalReset, additionalElements, isResetInitialState } = this.props;
        const { options, selectedXOption, showDropdown, showXDropdown, showDropdownButtons, showMoreOptions, selectedElements } = this.state;

        const dropdownXAxisButtonStyle = {
            backgroundColor: isDarkMode ? "#242323" : "white",
            color: isDarkMode ? "white" : "black",
        };

        return (
            <>
                <div className={`left-subpanel ${isDarkMode ? "custom-scrollbar-sliders-dark-mode" : "custom-scrollbar-light-mode"}`}
                     style={leftSubpanelStyle}>
                    {panelWidth > MIN_PANEL_WIDTH ? (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FaBars
                                    size="15"
                                    color={isDarkMode ? "white" : "black"}
                                    onClick={() => handleIconClick("narrow")}
                                    style={{ marginRight: '10px' }}
                                />
                                <div
                                    style={{
                                        color: isDarkMode ? "white" : "black",
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    Time Course Simulation
                                    <button
                                        className={"config-button"}
                                        style={{
                                            backgroundColor: isDarkMode ? "black" : "white",
                                            color: isDarkMode ? "white" : "black",
                                            border: isDarkMode ? "1px solid gray" : "1px solid black",
                                            marginLeft: '10px',
                                        }}
                                    >
                                        Config
                                    </button>
                                </div>
                            </div>

                            <div>
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
                                            marginTop: '10px',
                                            color: isDarkMode ? "white" : "black",
                                        }}
                                        onClick={this.handleSimulateButtonClick}
                                    >
                                        Simulate
                                    </button>
                                    <button
                                        className={"simulate-style"}
                                        style={{
                                            marginLeft: "-10px",
                                            marginTop: '10px',
                                            color: isDarkMode ? "white" : "black",
                                        }}
                                        onClick={handleLocalReset}
                                    >
                                        Reset
                                    </button>
                                    <button style={{ marginTop: '10px' }} onClick={this.handleSlideButtonClick}>Slider</button>
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
                                        checked={isResetInitialState}
                                        type="checkbox"
                                        onChange={this.resetInitialConditions}
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
                                    className="x-axis-option-style"
                                    style={{
                                        backgroundColor: isDarkMode ? "#242323" : "white",
                                        color: isDarkMode ? "white" : "black",
                                        border: isDarkMode ? "1px solid gray" : "1px solid black",
                                    }}
                                    onClick={() => {
                                        this.setState((prevState) => ({
                                            showXDropdown: !prevState.showXDropdown
                                        }));
                                    }}
                                >
                                    {" "}
                                    {selectedXOption}{" "}
                                </button>
                                {showXDropdown && (
                                    <DropdownContainers
                                        key={JSON.stringify(options)}
                                        className={"dropdown-container"}
                                        onXOptionSelected={this.handleXOptionSelected}
                                        isDarkMode={isDarkMode}
                                        options={options}
                                        xAxis={true}
                                        withCheckboxes={false}
                                        dropdownToolbarButtonsStyle={dropdownXAxisButtonStyle}
                                        dropdown_toolbar_buttons_style={"dropdown-toolbar-button-xAxis"}
                                        setShowXDropdown={(value) => this.setState({ showXDropdown: value })}
                                        showXDropdown={showXDropdown}
                                        selectedXOption={selectedXOption}
                                        setSelectedXOption={(value) => this.setState({ selectedXOption: value })}
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
                                    className="x-axis-option-style"
                                    style={{
                                        backgroundColor: isDarkMode ? "#242323" : "white",
                                        color: isDarkMode ? "white" : "black",
                                        border: isDarkMode ? "1px solid gray" : "1px solid black",
                                    }}
                                    onClick={() => {
                                        this.setState((prevState) => ({
                                            showDropdown: !prevState.showDropdown,
                                            showDropdownButtons: !prevState.showDropdownButtons,
                                        }));
                                    }}
                                >
                                    {" "}
                                    Select Y{" "}
                                </button>
                                {showDropdown && (
                                    <DropdownContainers
                                        key={JSON.stringify(options)}
                                        updateOptions={this.updateSelectedOptions}
                                        className={"dropdown-container"}
                                        isDarkMode={isDarkMode}
                                        withCheckboxes={true}
                                        options={this.props.selectedOptions}
                                    />
                                )}
                                {showDropdownButtons && (
                                    <div>
                                        <button
                                            className={'select-and-unselect-all-style'}
                                            style={{
                                                color: isDarkMode ? "white" : "black",
                                            }}
                                            onClick={this.selectAllOptions}
                                        >
                                            Select All
                                        </button>
                                        <button
                                            className={'select-and-unselect-all-style'}
                                            style={{
                                                color: isDarkMode ? "white" : "black",
                                            }}
                                            onClick={this.unselectAllOptions}
                                        >
                                            Unselect All
                                        </button>
                                        <button
                                            className={'select-and-unselect-all-style'}
                                            style={{
                                                color: isDarkMode ? "white" : "black",
                                            }}
                                            onClick={() => this.setState({ showMoreOptions: true })}
                                        >
                                            More options
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div>
                            <FaBars
                                className={"hide-left-subpanel-icon"}
                                size="25"
                                color={isDarkMode ? "white" : "black"}
                                onClick={() => handleIconClick("x-axis")}
                            />
                        </div>
                    )}
                </div>

                {showMoreOptions && (
                    <div className="popup">
                        <div className="popup-left">
                            {additionalElements.map((element) => (
                                <button key={element} onClick={() => this.addElementToSelected(element)}>
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
                            <button onClick={this.addAllElements}>Add All</button>
                            <button onClick={this.clearAllElements}>Clear All</button>
                        </div>
                        <div className="popup-bottom">
                            <button onClick={this.applySelectedElements}>Apply</button>
                            <button onClick={this.closePopup}>Close</button>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default TimeCourseSimulation;
