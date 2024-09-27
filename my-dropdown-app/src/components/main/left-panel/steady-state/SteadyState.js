import React, { Component } from "react";
import { MIN_PANEL_WIDTH } from "../../../../constants/const";
import { FaBars } from "react-icons/fa";
import "./SteadyState.css";
import SteadyStateMorePopup from "./SteadyStateMorePopup";
import SliderPopupWindow from "./SliderPopupWindow"; // Import the SliderPopup component

class SteadyState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showData: sessionStorage.getItem('showData') === 'true' || false,
            isSteadyStateComputed: sessionStorage.getItem('isSteadyStateComputed') === 'true' || false,
            showMorePopup: false,
            showSliderPopup: false // State to control the visibility of the Slider popup
        };
    }

	componentDidUpdate(prevProps) {
		if (prevProps.initialOptions !== this.props.initialOptions) {
			const modifiedInitialOptions = { ...this.props.initialOptions };
			const keys = Object.keys(modifiedInitialOptions);
			if (keys.length > 0) {
				modifiedInitialOptions[keys[0]] = false;
			}
			this.setState({
				options: modifiedInitialOptions,
			});
			this.props.setSelectedOptions(modifiedInitialOptions);
		}
	}

    generalStyle = (isDarkMode, darkBackground, lightBackGround) => ({
        backgroundColor: isDarkMode ? darkBackground : lightBackGround,
        color: isDarkMode ? "white" : "black",
        border: isDarkMode ? "1px solid gray" : "1px solid black"
    });

    handleComputeClick = () => {
        this.props.computeSteadyState(this.props.editorInstance?.getValue());
        this.setState({
            showData: true,
            isSteadyStateComputed: true
        }, () => {
            sessionStorage.setItem('showData', 'true');
            sessionStorage.setItem('isSteadyStateComputed', 'true');
        });
    }

    handleShowMoreClick = () => {
        if (this.props.jacobian.length === 0) {
            alert("Compute Steady State to show more information")
        } else {
            this.setState({ showMorePopup: true });
        }
    }

    handleCloseMorePopup = () => {
        this.setState({ showMorePopup: false });
    }

    // Handle the popup for the Slider
    handleSliderPopupClick = () => {
        this.setState({ showSliderPopup: true});
        this.props.setShowSplitView(false);
    }

    handleCloseSliderPopup = () => {
        this.setState({ showSliderPopup: false });
    }

    setShowSliderPopup = (value) => {
    	this.setState({showSliderPopup: value})
    }

    renderTable = (dataSource, label_of_first_column, label_of_second_columns, isEigenvalues) => {
        const { data, isDarkMode } = this.props;
        const { showData } = this.state;
        let filteredOptions;

        if (isEigenvalues) {
            filteredOptions = dataSource;
        } else {
            filteredOptions = Object.entries(dataSource).filter(([key, value]) => value === true);
        }

        return (
            <div className={`table-container ${isDarkMode ? "custom-scrollbar-xyaxis-dropdown-dark-mode" : "custom-scrollbar-light-mode"}`}>
                <table className="table">
                    <thead>
                    <tr>
                        <th style={this.generalStyle(isDarkMode, "#2e2d2d", "white")}>{label_of_first_column}</th>
                        <th style={this.generalStyle(isDarkMode, "#2e2d2d", "white")}>{label_of_second_columns}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {showData && (filteredOptions.length > 0 ? filteredOptions.map((item, index) => {
                        if (isEigenvalues) {
                            const [real, imaginary] = item;
                            return (
                                <tr key={index}>
                                    <td style={this.generalStyle(isDarkMode, "black", "#dedcdc")}>{real.toFixed(6)}</td>
                                    <td style={this.generalStyle(isDarkMode, "black", "#dedcdc")}>{imaginary.toFixed(6)}</td>
                                </tr>
                            );
                        } else {
                            const [key] = item;
							// Check if data.titles is not empty
							let value = "N/A";
							if (data.columns.length > 0 && this.props.selectedValues.length > 0) {
								const index = data.titles.indexOf(key);
								if (index !== -1) {
									value = parseFloat(this.props.selectedValues[index]).toFixed(8);
								}
							}
							return (
								<tr key={key}>
									<td style={this.generalStyle(isDarkMode, "black", "#dedcdc")}>[{key}]</td>
									<td style={this.generalStyle(isDarkMode, "black", "#dedcdc")}>{value}</td>
								</tr>
							);
                        }
                    }) : (
                        <tr>
                            <td style={this.generalStyle(isDarkMode, "black", "#dedcdc")} colSpan="2">No Data Available</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        const { isDarkMode, leftSubpanelStyle, panelWidth, handleIconClick, selectedOptions, steadyState, eigenValues, kOptions, kOptionsForSliders, minMaxValues, sliderValues } = this.props;
        const { showData, isSteadyStateComputed, showMorePopup, showSliderPopup } = this.state;

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
                                    Compute Steady State
                                    <button
                                        className={"config-button"}
                                        style={{
                                            ...this.generalStyle(isDarkMode, "black", "white"),
                                            marginLeft: '10px',
                                        }}
                                    >
                                        Config
                                    </button>

                                </div>
                            </div>
                            <div className={"container-for-compute-and-icon"}>
                                <button
                                    className={"compute-steady-state-button"}
                                    style={this.generalStyle(isDarkMode, "black", "white")}
                                    onClick={this.handleComputeClick}
                                >
                                    Compute the Steady-State
                                </button>
                                <button
                                    style={{ backgroundColor: "#2d2d2d" }}
                                    onClick={this.handleSliderPopupClick}>
                                    <img src={`${process.env.PUBLIC_URL}/slider.png`}
                                    	style={{marginTop:'-5px', width: '35px', height: '35px' }}
                                    />
                                </button>
                            </div>
                            <div style={{ marginTop: '10px', color: isDarkMode ? "white" : "black", fontSize: "12px" }}>
                                {steadyState}
                            </div>
                            {isSteadyStateComputed && (
                                <>
                                    <div style={{ marginTop: '20px' }}>
                                        {this.renderTable(selectedOptions, "Symbol", "Value", false)}
                                    </div>
                                    <div style={{ marginTop: '20px' }}>
                                        <h3 style={{ color: isDarkMode ? "white" : "black", fontSize: "12px" }}>Eigenvalues:</h3>
                                        {this.renderTable(eigenValues, "Real", "Imaginary", true)}
                                    </div>
                                    <div style={{ marginTop: '20px' }}>
                                        <button
                                            className={"more-info-button"}
                                            style={this.generalStyle(isDarkMode, "black", "white")}
                                            onClick={this.handleShowMoreClick}
                                        >
                                            More >>
                                        </button>
                                    </div>
                                </>
                            )}
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
                {/* Conditionally render SliderPopup */}
                {showSliderPopup &&
                    <SliderPopupWindow
                        kOptions={this.props.kOptions}
                        kOptionsForSliders={this.props.kOptionsForSliders}
                        minMaxValues={this.props.minMaxValues}
                        sliderValues={this.props.sliderValues}
                        isDarkMode={this.props.isDarkMode}
                        selectedParameter={this.props.selectedParameter}
                        handleCheckboxChange={this.props.handleCheckboxChange}
                        handleSliderChange={this.props.handleSliderChange}
                        handleMinValueChange={this.props.handleMinValueChange}
                        handleMaxValueChange={this.props.handleMaxValueChange}
                        handleLabelClick={this.props.handleLabelClick}
                        closeWindow={this.handleCloseSliderPopup} // Close the popup when clicked
                        setShowSplitView={this.props.setShowSplitView}
						showSplitView={this.props.showSplitView}
						showSliderPopup={this.state.showSliderPopup}
						setShowSliderPopup={this.setShowSliderPopup}
                    />
                }
                {showMorePopup &&
				<SteadyStateMorePopup
					onClose={this.handleCloseMorePopup}
					isDarkMode={isDarkMode}
					jacobian={this.props.jacobian}
				/>}
            </>
        );
    }
}

export default SteadyState;
