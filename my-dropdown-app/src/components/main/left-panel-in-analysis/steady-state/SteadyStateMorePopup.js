import React, { Component, createRef } from "react";
import "./SteadyStateMorePopup.css";
import Draggable from 'react-draggable';

class SteadyStateMorePopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            showJacobian: true,
            showFluxControl: false,
            showConcentrationControl: false,
            showElasticities: false,
            tooltipContent: "",
            tooltipPosition: { top: 0, left: 0 }
        };
        this.nodeRef = createRef(); // Create a ref
    }

    componentDidMount() {
        this.setState({ isVisible: true });
    }

    closePopup = () => {
        this.setState({ isVisible: false });
        this.props.onClose();
    };

    generalStyle = (darkBackground, lightBackGround, darkColor, lightColor, darkBorder, lightBorder, radius) => ({
        backgroundColor: this.props.isDarkMode ? darkBackground : lightBackGround,
        color: this.props.isDarkMode ? darkColor : lightColor,
        border: this.props.isDarkMode ? `1px solid ${darkBorder}` : `1px solid ${lightBorder}`,
        borderRadius: radius
    });

	showTooltip = (event, rowLabel, colLabel, value) => {
		const tooltipContent = `Row: [${rowLabel}]\nColumn: [${colLabel}]\nValue: ${value.toFixed(8)}`;
		const popupRect = this.nodeRef.current.getBoundingClientRect(); // Get the position of the popup
		this.setState({
			tooltipContent,
			tooltipPosition: {
				top: event.clientY - popupRect.top + this.nodeRef.current.scrollTop, // Adjust relative to popup
				left: event.clientX - popupRect.left + this.nodeRef.current.scrollLeft // Adjust relative to popup
			}
		});
	};

    hideTooltip = () => {
        this.setState({
            tooltipContent: "",
            tooltipPosition: { top: 0, left: 0 }
        });
    };

    renderTable = () => {
        const { jacobian } = this.props;

        return (
            <table className="jacobian-table">
                <thead>
                    <tr style={this.generalStyle("black", "gray", "white", "black", "gray", "black", "0px")}>
                        <th></th>
                        {jacobian.columns.map((col, index) => (
                            <th key={index} style={{ fontWeight: "normal", fontSize: "12px" }}>[{col}]</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {jacobian.rows.map((row, rIndex) => (
                        <tr style={this.generalStyle("black", "gray", "white", "black", "gray", "black", "0px")} key={rIndex}>
                            <td style={this.generalStyle("black", "gray", "white", "black", "white", "black", "0px")}>[{row}]</td>
                            {jacobian.values[rIndex].map((value, cIndex) => (
                                <td
                                    style={this.generalStyle("black", "gray", "white", "black", "gray", "black", "0px")}
                                    key={cIndex}
                                    onMouseEnter={(e) => this.showTooltip(e, row, jacobian.columns[cIndex], value)}
                                    onMouseLeave={this.hideTooltip}
                                >
                                    {value.toFixed(8)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    render() {
        const { isVisible } = this.state;

        if (!isVisible) return null;

        return (
            <div className="steady-state-popup-overlay" onClick={this.closePopup}>
                <Draggable nodeRef={this.nodeRef}>
                    <div ref={this.nodeRef}
                        className="steady-state-popup-content"
                        style={this.generalStyle("#2e2d2d", "white", "white", "black", "gray", "black", "8px")}
                        onClick={(e) => e.stopPropagation()}>
                        <div className="steady-state-popup-buttons-container"
                            style={this.generalStyle("#9e9b9b", "white", "white", "black", "gray", "black", "8px")}>
                            <button
                                className="steady-state-popup-buttons"
                                style={{
                                    backgroundColor: this.props.isDarkMode ? (this.state.showJacobian ? "black" : "#2e2d2d") : "white",
                                    color: this.props.isDarkMode ? "white" : "black",
                                    border: "1px solid gray"
                                }}
                                onClick={() => this.setState({ showJacobian: true, showFluxControl: false, showConcentrationControl: false, showElasticities: false })}
                            >
                                Jacobian
                            </button>
                            <button
                                className="steady-state-popup-buttons"
                                style={{
                                    backgroundColor: this.props.isDarkMode ? (this.state.showFluxControl ? "black" : "#2e2d2d") : "white",
                                    color: this.props.isDarkMode ? "white" : "black",
                                    border: "1px solid gray"
                                }}
                                onClick={() => this.setState({ showJacobian: false, showFluxControl: true, showConcentrationControl: false, showElasticities: false })}
                            >
                                Flux Control
                            </button>
                            <button
                                className="steady-state-popup-buttons"
                                style={{
                                    backgroundColor: this.props.isDarkMode ? (this.state.showConcentrationControl ? "black" : "#2e2d2d") : "white",
                                    color: this.props.isDarkMode ? "white" : "black",
                                    border: "1px solid gray"
                                }}
                                onClick={() => this.setState({ showJacobian: false, showFluxControl: false, showConcentrationControl: true, showElasticities: false })}
                            >
                                Concentration Control
                            </button>
                            <button
                                className="steady-state-popup-buttons"
                                style={{
                                    backgroundColor: this.props.isDarkMode ? (this.state.showElasticities ? "black" : "#2e2d2d") : "white",
                                    color: this.props.isDarkMode ? "white" : "black",
                                    border: "1px solid gray"
                                }}
                                onClick={() => this.setState({ showJacobian: false, showFluxControl: false, showConcentrationControl: false, showElasticities: true })}
                            >
                                Elasticities
                            </button>
                        </div>
                        <div
                            className="steady-state-popup-text-container"
                            style={this.generalStyle("#2d2d2d", "white", "white", "black", "#2d2d2d", "white", "0px")}>
                            <div className="steady-state-popup-left">
                                <div className="steady-state-popup-row"
                                    style={this.generalStyle("#2d2d2d", "white", "white", "black", "#2d2d2d", "white", "0px")}>
                                    <span>Row: f(x) = dx/dt</span>
                                </div>
                                <div className="steady-state-popup-columns"
                                    style={this.generalStyle("#2d2d2d", "white", "white", "black", "#2d2d2d", "white", "0px")}>
                                    <span>Columns: x</span>
                                </div>
                            </div>
                            <div className="steady-state-popup-df"
                                style={this.generalStyle("#2d2d2d", "white", "white", "black", "#2d2d2d", "white", "0px")}>
                                <span>df(x)/dx</span>
                            </div>
                        </div>
                        <div className="steady-state-popup-jacobian-table-container"
                            style={this.generalStyle("#2e2d2d", "white", "", "", "#2e2d2d", "white", "0px")}>
                            {this.state.showJacobian && this.renderTable()}
                        </div>
                        <div className="steady-state-popup-bottom"
                            style={this.generalStyle("#9e9b9b", "white", "white", "black", "gray", "black", "8px")}>
                            <button
                                className="steady-state-popup-close-button"
                                style={this.generalStyle("black", "white", "white", "black", "gray", "black", "8px")}
                                onClick={this.closePopup}>Close
                            </button>
                        </div>
                        {this.state.tooltipContent && (
                            <div
                                className="custom-tooltip"
                                style={{...this.generalStyle("#2d2d2d", "gray", "white", "black", "gray", "black", "5px"),
                                    top: `${this.state.tooltipPosition.top}px`,
                                    left: `${this.state.tooltipPosition.left}px` }}
                            >
                                {this.state.tooltipContent}
                            </div>
                        )}
                    </div>
                </Draggable>
            </div>
        );
    }
}

export default SteadyStateMorePopup;
