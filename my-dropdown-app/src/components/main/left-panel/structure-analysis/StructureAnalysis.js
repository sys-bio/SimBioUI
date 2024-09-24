import React, { Component } from "react";
import { MIN_PANEL_WIDTH } from "../../../../constants/const";
import { FaBars } from "react-icons/fa";
import "./StructureAnalysis.css";
import StructureAnalysisPopup from "./StructureAnalysisPopup"; // Import the popup

class StructureAnalysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
        };
    }

    generalStyle = (darkBackground, lightBackGround, darkColor, lightColor, darkBorder, lightBorder) => ({
        backgroundColor: this.props.isDarkMode ? darkBackground : lightBackGround,
        color: this.props.isDarkMode ? darkColor : lightColor,
        border: this.props.isDarkMode ? `1px solid ${darkBorder}` : `1px solid ${lightBorder}`
    });

    handlePopupClose = () => {
        this.setState({ showPopup: false });
    };

    handleShowPopup = () => {
        this.setState({ showPopup: true });
    };

    render() {
        const { isDarkMode, leftSubpanelStyle, panelWidth, handleIconClick } = this.props;
        const { showPopup } = this.state;

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
                                    style={this.generalStyle("#2e2d2d", "white", "white", "black", "#2e2d2d", "white")}
                                >
                                    Structure Analysis
                                </div>
                            </div>
                            {/* Add the button below the "Structure Analysis" text */}
                            <div style={{ marginTop: '10px' }}>
                                <button
                                    style={this.generalStyle("black", "white", "white", "black", "gray", "black")}
                                    onClick={this.handleShowPopup}
                                >
                                    Show Structure Analysis
                                </button>
                            </div>
                            {/* Conditionally render the popup */}
                            {showPopup && (
                                <StructureAnalysisPopup
                                    onClose={this.handlePopupClose}
                                    isDarkMode={isDarkMode}
                                />
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
            </>
        );
    }
}

export default StructureAnalysis;
