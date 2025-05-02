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
            shouldUpdateSelectedOptions: false
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.isNewTabCreated && !prevProps.isNewTabCreated) {
            this.props.setIsResetInitialState(true);
        }

        if (prevProps.selectedOptions !== this.props.selectedOptions) {
			this.setState({
				options: this.props.selectedOptions,
			});
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
        // Ensure that you have access to the Monaco Editor instance
        const editorContent = this.props.editorInstance?.getValue();

        if (editorContent !== this.state.previousContent || this.props.isNewOptionsAdded) {
        	if (this.props.isNewOptionsAdded) {
        		this.props.setIsNewOptionsAdded(false);
        	}
            this.props.setSelectedOptions([]);
            this.props.handleTextChange(editorContent, this.props.isResetInitialState, false); // Pass the editor content here
            this.setState({ shouldUpdateSelectedOptions: true });
        } else {
            this.setState({ shouldUpdateSelectedOptions: false });
            if (this.props.isNewFileUploaded) {
                this.props.handleTextChange(editorContent, this.props.isResetInitialState, false); // Use editor content here
                this.props.setIsNewFileUploaded(false);
            } else {
                this.props.onCheckboxChange(this.props.isResetInitialState);
            }
        }
		this.props.setPaletteColor([]);
        this.setState({ previousContent: editorContent }); // Store the content as the previous content
    };

    resetInitialConditions = (e) => {
        const isChecked = e.target.checked;
        this.props.setIsResetInitialState(isChecked);
        this.props.handleTextChange(this.props.editorInstance?.getValue(), !isChecked, false);
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

    render() {
        const { isDarkMode, leftSubpanelStyle, panelWidth, handleIconClick, tempSimulationParameters, onParametersChange, handleLocalReset, isResetInitialState, showMoreOptions } = this.props;
        const { options, selectedXOption, showDropdown, showXDropdown, showDropdownButtons } = this.state;

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
                                    simulationParam={tempSimulationParameters}
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

                                            marginTop: '10px',
                                            color: isDarkMode ? "white" : "black",
                                        }}
                                        onClick={handleLocalReset}
                                    >
                                        Reset
                                    </button>
                                    <button style={{backgroundColor: "#2d2d2d"}} onClick={this.handleSlideButtonClick}>
										<img src={`${process.env.PUBLIC_URL}/slider.png`} style={{ width: '35px', height: '35px'}} />
									</button>
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
                                    Independent Variables
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
                                    Dependent Variables
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
                                {(
                                    <DropdownContainers
                                        key={JSON.stringify(options)}
                                        className={"dropdown-container"}
                                        updateOptions={this.updateSelectedOptions}
                                        isDarkMode={isDarkMode}
                                        withCheckboxes={true}
                                        options={this.props.selectedOptions}
                                    />
                                )}
                                {(
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
                                            onClick={() => {
                                                this.props.setShowMoreOptions(true);
                                                this.props.setIsParameterScan(false);
                                            }}
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
            </>
        );
    }
}

export default TimeCourseSimulation;
