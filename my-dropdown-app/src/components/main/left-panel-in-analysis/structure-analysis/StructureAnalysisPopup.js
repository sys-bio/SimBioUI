import React, { Component } from "react";
import "./StructureAnalysisPopup.css";

class StructureAnalysisPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false, // Controls the visibility of the popup
            showStoichiometry: true,
            showReducedStoichMatrix: false,
            showLinkMatrix: false,
            showConservationMatrix: false
        };
    }

    componentDidMount() {
        this.setState({ isVisible: true }); // Show the popup when the component mounts
    }

    closePopup = () => {
        this.setState({ isVisible: false });
        this.props.onClose(); // Notify parent component to handle the close event if needed
    };

    generalStyle = (darkBackground, lightBackGround, darkColor, lightColor, darkBorder, lightBorder, radius) => ({
        backgroundColor: this.props.isDarkMode ? darkBackground : lightBackGround,
        color: this.props.isDarkMode ? darkColor : lightColor,
        border: this.props.isDarkMode ? `1px solid ${darkBorder}` : `1px solid ${lightBorder}`,
        borderRadius: radius
    });

    render() {
        const { isVisible } = this.state;

        if (!isVisible) return null; // Render nothing if the popup is not visible

        return (
            <div className="structure-analysis-popup-overlay" onClick={this.closePopup}>
                <div className="structure-analysis-content"
                     style={this.generalStyle("#2e2d2d", "white", "white", "black", "gray", "black", "8px")}
                     onClick={(e) => e.stopPropagation()}>
                    <div className="structure-analysis-popup-buttons-container"
                         style={this.generalStyle("#9e9b9b", "white", "white", "black", "gray", "black", "8px")}>
                        <button
                            className="structure-analysis-popup-buttons"
                            style={{
                                backgroundColor: this.props.isDarkMode ? (this.state.showStoichiometry ? "black" : "#2e2d2d") : "white",
                                color: this.props.isDarkMode ? "white" : "black",
                                border: "1px solid gray"
                            }}
                            onClick={() => this.setState({ showStoichiometry: true, showReducedStoichMatrix: false, showLinkMatrix: false, showConservationMatrix: false })}
                        >
                            Stoichiometry Matrix
                        </button>
                        <button
                            className="structure-analysis-popup-buttons"
                            style={{
                                backgroundColor: this.props.isDarkMode ? (this.state.showReducedStoichMatrix ? "black" : "#2e2d2d") : "white",
                                color: this.props.isDarkMode ? "white" : "black",
                                border: "1px solid gray"
                            }}
                            onClick={() => this.setState({ showStoichiometry: false, showReducedStoichMatrix: true, showLinkMatrix: false, showConservationMatrix: false })}
                        >
                            Reduced Stoich Matrix
                        </button>
                        <button
                            className="structure-analysis-popup-buttons"
                            style={{
                                backgroundColor: this.props.isDarkMode ? (this.state.showLinkMatrix ? "black" : "#2e2d2d") : "white",
                                color: this.props.isDarkMode ? "white" : "black",
                                border: "1px solid gray"
                            }}
                            onClick={() => this.setState({ showStoichiometry: false, showReducedStoichMatrix: false, showLinkMatrix: true, showConservationMatrix: false })}
                        >
                            Link Matrix
                        </button>
                        <button
                            className="structure-analysis-popup-buttons"
                            style={{
                                backgroundColor: this.props.isDarkMode ? (this.state.showConservationMatrix ? "black" : "#2e2d2d") : "white",
                                color: this.props.isDarkMode ? "white" : "black",
                                border: "1px solid gray"
                            }}
                            onClick={() => this.setState({ showStoichiometry: false, showReducedStoichMatrix: false, showLinkMatrix: false, showConservationMatrix: true })}
                        >
                            Conservation Matrix
                        </button>
                    </div>
                    {/* Close button in the bottom-right corner */}
                    <div className="structure-analysis-popup-bottom"
                         style={this.generalStyle("#9e9b9b", "white", "white", "black", "gray", "black", "8px")}>
                        <button
                            className="structure-analysis-popup-close-button"
                            style={this.generalStyle("black", "white", "white", "black", "gray", "black", "8px")}
                            onClick={this.closePopup}>Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default StructureAnalysisPopup;
