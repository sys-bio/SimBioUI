// ParameterScan.js
import React, { Component } from "react";
import { MIN_PANEL_WIDTH } from "../../../../constants/const";
import "./ParameterScan.css";
import { FaBars } from "react-icons/fa";
import NumberInput from "../../NumberInput";
import Modal from "./Modal"; // Import the modal component

const generalStyle = (isDarkMode, darkBackground, lightBackGround, darkBorder, lightBorder) => ({
    backgroundColor: isDarkMode ? darkBackground : lightBackGround,
    color: isDarkMode ? "white" : "black",
    border: isDarkMode ? `1px solid ${darkBorder}` : `1px solid ${lightBorder}`,
});

const Checkbox = ({ isChecked, onChange, label, isDarkMode }) => (
    <div className={"square-checkbox-container"} onClick={onChange} style={{ cursor: "pointer" }}>
        <div
            className="square-checkbox"
            style={{
                backgroundColor: isChecked ? "dodgerblue" : "transparent",
            }}
        >
            {isChecked && <span style={{ color: "black", fontSize: "12px" }}>✓</span>}
        </div>
        <span className={"text"} style={{ ...generalStyle(isDarkMode), marginLeft: "5px" }}>
            {label}
        </span>
    </div>
);

const colorPalettes = {
    Default: [], // No specific colors for default
    BlueRed: ["#0000FF", "#FF0000"],
    RedGreen: ["#FF0000", "#00FF00"],
    BlackWhite: ["#000000", "#FFFFFF"],
    SunSet: ["#FF4500", "#FFD700"],
    CosmicFusion: ["#800080", "#8A2BE2"],
    Nepal: ["#7F7F7F", "#708090"],
    AzurePop: ["#00FFFF", "#008080"],
    GreenPale: ["#98FB98", "#32CD32"],
    GreyShades: ["#A9A9A9", "#696969"],
    Jupiter: ["#FF6347", "#FF4500"],
    Sherbert: ["#FF69B4", "#FFB6C1"],
    RedBlack: ["#FF0000", "#000000"],
    Timber: ["#D2B48C", "#8B4513"],
    OceanBlue: ["#1E90FF", "#4682B4"],
    // Add other palettes here
};

class ParameterScan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTimeCourse: true,
            isSteadyState: false,
            selectedParameter: "",
            isUseListOfNumbers: false,
            isLogarithmicDistribution: false,
            isPlotGraph: true,
            isTable: false,
            valuesSeparatedBySpace: "",
            showModal: false,
            pythonContent: '', // To store the generated Python content
            selectedPalette: 'Default', // Default selection
            selectedPaletteColors: colorPalettes.Default, // Store the colors
        };
    }

    handleOptionClick = (key, value) => {
        console.log(`Option clicked: ${key} with value ${value}`);
    };

    handleFirstParameterCheckboxChange = (key) => {
        this.setState((prevState) => ({
            [key]: !prevState[key],
        }));
    };

    handleScanTypeCheckboxChange = (type) => {
        this.setState((prevState) => ({
            isTimeCourse: type === "timeCourse" ? !prevState.isTimeCourse : false,
            isSteadyState: type === "steadyState" ? !prevState.isSteadyState : false,
        }));
    };

    handleUseListOfNumberValuesChange = (event) => {
        this.setState({ valuesSeparatedBySpace: event.target.value });
    };

    styleForTextbox = (width) => {
        return {
            backgroundColor: this.props.isDarkMode ? "black" : "white",
            color: this.props.isDarkMode ? "white" : "black",
            border: this.props.isDarkMode ? "1px solid gray" : "1px solid black",
            borderRadius: "4px",
            width: width,
            height: "20px",
            fontSize: "12px",
            marginTop: "3px",
        };
    };

    handleParameterChange = (event) => {
        this.setState({ selectedParameter: event.target.value });
    };

    handleShowLegendChange = (event) => {
        this.props.setIsShowLegendChecked(!this.props.isShowLegendChecked);
    };

    handlePaletteChange = (e) => {
        const selectedPalette = e.target.value;
        const selectedPaletteColors = colorPalettes[selectedPalette];
        this.setState({
            selectedPalette,
            selectedPaletteColors,
        });
        this.props.onPaletteChange(selectedPaletteColors);
    };

    toggleModal = () => {
        if (!this.state.showModal) {
            this.generatePythonContent(); // Generate the content when opening the modal
        }
        this.setState((prevState) => ({
            showModal: !prevState.showModal,
        }));
    };

    formatSelectionText = (selectedOptions) => {
        // Create an array of formatted keys
        const formattedKeys = Object.keys(selectedOptions).map((key) =>
            key === "Time" ? `'${key}'` : `'[${key}]'`
        );
        // Join the array elements with ", " and wrap with square brackets
        return `[${formattedKeys.join(", ")}]`;
    };

    generatePythonContent = () => {
        const { minValue, maxValue, numValues, selectedParameter } = this.state;
        const { editorInstance, isShowLegendChecked, simulationParam, selectedOptions } = this.props;
        const end = simulationParam.simulationParameters.timeEnd;
        const selectionText = this.formatSelectionText(selectedOptions);

        // Using template literals for better readability
        const pythonContent =
`import tellurium as te
import matplotlib.pyplot as plt
import math

r = te.loada('''
${editorInstance?.getValue()}
''')

showLegend = ${isShowLegendChecked}
k = ${minValue}
numScans = ${numValues}
stepSize = (${maxValue} - ${minValue}) / numScans
timeEnd = ${end}
selection = ${selectionText}

for i in range(numScans):
    r.setValue('${selectedParameter}', k)
    r.reset()
    m = r.simulate(0, timeEnd, 100, selection)
    for j in range(len(selection) - 1):
        plt.plot(m[selection[0]], m[selection[j+1]], label='k=' + str(math.trunc(k*1000)/1000))
        k = k + stepSize
        plt.xlabel(selection[0])

if showLegend:
    plt.legend()
`;

        this.setState({ pythonContent });
    };

    handleInputChange = (key, value) => {
        this.props.handleParameterScansUpdate(key, value, this.state.selectedParameter);
    };

    componentDidMount() {
        this.updateSelectedParameter();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.kOptions !== this.props.kOptions || prevProps.selectedOptions !== this.props.selectedOptions) {
            this.updateSelectedParameter();
        }
    }

    updateSelectedParameter = () => {
        const { kOptions, selectedOptions } = this.props;
        const allOptions = [...kOptions];
        Object.entries(selectedOptions).forEach(([key, value]) => {
            if (value) {
                allOptions.push(`Init([${key}])`);
            }
        });

        if (allOptions.length > 0 && (!this.state.selectedParameter || !allOptions.includes(this.state.selectedParameter))) {
            const firstOption = allOptions[0];
            this.setState({ selectedParameter: firstOption });
            this.props.handleParameterScansUpdate('parameterName', firstOption);
        }
    };

    renderDropdown = () => {
        const { kOptions, selectedOptions, isDarkMode } = this.props;
        const allOptions = [...kOptions];
        Object.entries(selectedOptions).forEach(([key, value]) => {
            if (value) {
                allOptions.push(`Init([${key}])`);
            }
        });

        return (
            <select
                value={this.state.selectedParameter}
                onChange={(event) => {
					const selectedParameter = event.target.value;
					this.handleParameterChange(event); // Call handleParameterChange
					this.handleInputChange('parameterName', selectedParameter); // Call handleInputChange with key and value
				}}
                style={{
                    ...generalStyle(isDarkMode, "black", "white", "gray", "black"),
                    borderRadius: "4px",
                    height: "25px",
                    marginLeft: "10px",
                }}
            >
                {allOptions.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        );
    };

    renderOptions = (options) => {
        const filteredOptions = Object.entries(options).filter(([key, value]) => value === true);
        return (
            <div>
                {filteredOptions.map(([key, value]) => (
                    <div
                        key={key}
                        className="option-item"
                        style={generalStyle(this.props.isDarkMode, "black", "white", "gray", "black")}
                        onClick={() => this.handleOptionClick(key, value)}
                    >
                        [{key}]
                    </div>
                ))}
            </div>
        );
    };

    renderNumberInput = (label, value, disabled, width, onChange) => {
        const { isDarkMode } = this.props;
        return (
            <NumberInput
                label={label}
                style={this.styleForTextbox(width)}
                value={value}
                isDarkMode={isDarkMode}
                disabled={disabled}
                onChange={onChange}
            />
        );
    };

    renderColorPaletteDropdown = () => {
        return (
            <select
                value={this.state.selectedPalette}
                onChange={this.handlePaletteChange}
                style={{
                    ...generalStyle(this.props.isDarkMode, "black", "white", "gray", "black"),
                    borderRadius: "4px",
                    height: "25px",
                    marginLeft: "10px",
                }}
            >
                {Object.keys(colorPalettes).map((paletteName, index) => (
                    <option key={index} value={paletteName}>
                        {paletteName}
                    </option>
                ))}
            </select>
        );
    };

    render() {
        const {
            isDarkMode,
            leftSubpanelStyle,
            panelWidth,
            handleIconClick,
            selectedOptions,
            simulationParam,
            isShowLegendChecked,
            handleParameterScansUpdate,
            parametersScanType,
            firstParameter
        } = this.props;
        const {
            isTimeCourse,
            isSteadyState,
            isUseListOfNumbers,
            isLogarithmicDistribution,
            isPlotGraph,
            isTable,
            valuesSeparatedBySpace,
            showModal,
            pythonContent,
        } = this.state;
        return (
            <>
                <div
                    className={`left-subpanel ${
                        isDarkMode ? "custom-scrollbar-sliders-dark-mode" : "custom-scrollbar-light-mode"
                    }`}
                    style={leftSubpanelStyle}
                >
                    {panelWidth > MIN_PANEL_WIDTH ? (
                        <>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <FaBars
                                    size="15"
                                    color={isDarkMode ? "white" : "black"}
                                    onClick={() => handleIconClick("narrow")}
                                    style={{marginRight: "10px"}}
                                />
                                <div
                                    style={{
                                        color: isDarkMode ? "white" : "black",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    Parameter Scan
                                </div>
                            </div>
                            <div style={{marginTop: "10px"}}>
                                <button
                                    className={"text"}
                                    style={generalStyle(isDarkMode, "black", "white", "gray", "black")}
                                >
                                    What to plot
                                </button>
                            </div>
                            <div
                                className={`options-container ${
                                    isDarkMode ? "custom-scrollbar-dark-mode" : "custom-scrollbar-light-mode"
                                }`}
                                style={generalStyle(isDarkMode, "black", "white", "gray", "black")}
                            >
                                {this.renderOptions(selectedOptions)}
                            </div>
                            <div style={{marginTop: "10px", display: "flex", justifyContent: "space-between"}}>
                                <button
                                    className={"text"}
                                    style={generalStyle(isDarkMode, "black", "white", "gray", "black")}
                                    onClick={() => this.props.handleScanButton(this.props.editorInstance?.getValue())} // Change to a function call
                                >
                                    Scan
                                </button>
                                <button
                                    className={"text"}
                                    style={generalStyle(isDarkMode, "black", "white", "gray", "black")}
                                >
                                    Stop
                                </button>
                            </div>
                            <div
                                className={"border-with-text-simulation scan-container"}
                                style={generalStyle(isDarkMode, "", "", "gray", "black")}
                            >
                                <span
                                    className="text-on-border-simulation"
                                    style={generalStyle(isDarkMode, "#2e2d2d", "white", "#2e2d2d", "white")}
                                >
                                    Scan Type
                                </span>
                                <div className={"circle-checkbox-container"}>
                                    <div className={"large-circle-checkbox-container"} style={{marginRight: "20px"}}>
                                        <div
                                            className="circle-checkbox"
                                            onClick={() => this.handleScanTypeCheckboxChange("timeCourse")}
                                        >
                                            {isTimeCourse && <div className="circle-checkbox-tick"/>}
                                        </div>
                                        <span className={"text"} style={generalStyle(isDarkMode)}>
                                            Time Course
                                        </span>
                                    </div>
                                    <div className={"small-circle-checkbox-container"}>
                                        <div
                                            className="circle-checkbox"
                                            onClick={() => this.handleScanTypeCheckboxChange("steadyState")}
                                        >
                                            {isSteadyState && <div className="circle-checkbox-tick"/>}
                                        </div>
                                        <span className={"text"} style={generalStyle(isDarkMode)}>
                                            Steady State
                                        </span>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        marginTop: "10px",
                                        gap: "5px",
                                    }}
                                >
                                    {this.renderNumberInput(
                                        "Time Start:",
                                        parametersScanType.timeStart,
                                        !isTimeCourse,
                                        "60px",
                                        (e) => this.handleInputChange("timeStart", e.target.value)
                                    )}
                                    {this.renderNumberInput(
                                        "Time End:",
                                        parametersScanType.timeEnd,
                                        !isTimeCourse,
                                        "60px",
                                        (e) => this.handleInputChange("timeEnd", e.target.value)
                                    )}
                                    {this.renderNumberInput(
                                        "Num Of Points:",
                                        parametersScanType.numPoints,
                                        !isTimeCourse,
                                        "60px",
                                        (e) => this.handleInputChange("numPoints", e.target.value)
                                    )}
                                </div>
                            </div>
                            <div
                                className={"border-with-text-simulation first-parameter-container"}
                                style={generalStyle(isDarkMode, "", "", "gray", "black")}
                            >
                                <span
                                    className="text-on-border-simulation"
                                    style={generalStyle(isDarkMode, "#2e2d2d", "white", "#2e2d2d", "white")}
                                >
                                    First Parameter
                                </span>
                                <div style={{display: "flex", alignItems: "center", padding: "10px"}}>
                                    <span
                                        className={"text"}
                                        style={generalStyle(isDarkMode, "", "", "#2e2d2d", "white")}
                                    >
                                        Parameter:
                                    </span>
                                    {this.renderDropdown()}
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "5px",
                                    }}
                                >
                                    {!isUseListOfNumbers ? (
                                        <>
                                            {this.renderNumberInput(
                                                "Min:",
                                                firstParameter.minValue,
                                                false,
                                                "60px",
                                                (e) => this.handleInputChange("minValue", e.target.value)
                                            )}
                                            {this.renderNumberInput(
                                                "Max:",
                                                firstParameter.maxValue,
                                                false,
                                                "60px",
                                                (e) => this.handleInputChange("maxValue", e.target.value)
                                            )}
                                            {this.renderNumberInput(
                                                "Num Of Values:",
                                                firstParameter.numValues,
                                                false,
                                                "60px",
                                                (e) => this.handleInputChange("numValues", e.target.value)
                                            )}
                                        </>
                                    ) : (
                                        this.renderNumberInput(
                                            "Values, separated by space:",
                                            valuesSeparatedBySpace,
                                            false,
                                            "100%",
                                            (e) => this.handleUseListOfNumberValuesChange(e)
                                        )
                                    )}
                                </div>
                                <Checkbox
                                    isChecked={isUseListOfNumbers}
                                    onChange={() => this.handleFirstParameterCheckboxChange("isUseListOfNumbers")}
                                    label="Use a list of numbers"
                                    isDarkMode={isDarkMode}
                                />
                                <Checkbox
                                    isChecked={isLogarithmicDistribution}
                                    onChange={() =>
                                        this.handleFirstParameterCheckboxChange("isLogarithmicDistribution")
                                    }
                                    label="Logarithmic distribution of values"
                                    isDarkMode={isDarkMode}
                                />
                            </div>
                            <div
                                className={"border-with-text-simulation select-output-container"}
                                style={generalStyle(isDarkMode, "", "", "gray", "black")}
                            >
                                <span
                                    className="text-on-border-simulation"
                                    style={generalStyle(isDarkMode, "#2e2d2d", "white", "#2e2d2d", "white")}
                                >
                                    Select Output
                                </span>
                                <div style={{display: "flex"}}>
                                    <Checkbox
                                        isChecked={isPlotGraph}
                                        onChange={() => this.handleFirstParameterCheckboxChange("isPlotGraph")}
                                        label="Plot Graph"
                                        isDarkMode={isDarkMode}
                                    />
                                    <Checkbox
                                        isChecked={isTable}
                                        onChange={() => this.handleFirstParameterCheckboxChange("isTable")}
                                        label="Table"
                                        isDarkMode={isDarkMode}
                                    />
                                </div>
                            </div>
                            <div style={{display: "flex"}}>
                                <Checkbox
                                    isChecked={isShowLegendChecked}
                                    onChange={this.handleShowLegendChange}
                                    label="Show Legend"
                                    isDarkMode={isDarkMode}
                                />
                                <button
                                    className={"text"}
                                    style={{
                                        ...generalStyle(isDarkMode, "black", "white", "gray", "black"),
                                        marginTop: "10px",
                                    }}
                                    onClick={this.toggleModal} // Add the onClick event
                                >
                                    Generate Python
                                </button>
                            </div>
                            <div style={{display: "flex", marginTop: "10px"}}>
                                <span className={"text"} style={generalStyle(isDarkMode, "", "", "#2e2d2d", "white")}>
                                    Color palette:
                                </span>
                                    {this.renderColorPaletteDropdown()}
                            </div>
                        </>
                    ) : (
                        <div>
                            <FaBars
                                className={"axis-icon"}
                                size="25"
                                color={isDarkMode ? "white" : "black"}
                                onClick={() => handleIconClick("x-axis")}
                            />
                        </div>
                    )}
                </div>
                <Modal show={showModal} onClose={this.toggleModal} content={pythonContent} isDarkMode={isDarkMode}/> {/* Pass content to Modal */}
            </>
        );
    }
}

export default ParameterScan;
