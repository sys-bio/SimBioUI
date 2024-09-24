import React, { Component, createRef } from "react";
import "./SteadyStateMorePopup.css";
import Draggable from 'react-draggable';
import chroma from 'chroma-js';

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

    // Function to compute the background color based on the cell's value
    getCellBackgroundColor = (value) => {
        const { isDarkMode } = this.props;

        if (typeof value !== 'number' || isNaN(value)) {
            return isDarkMode ? '#242323' : 'white';
        }

        if (value === 0) {
            return '#72aed4'; // Color for zero
        }

        let color;
        const maxAbsValue = Math.max(...this.props.jacobian.values.flat().map(Math.abs)) || 1;

        if (value > 0) {
            const scalePositive = chroma.scale(['#ffadad', '#f56e6e']).domain([0, maxAbsValue]);
            color = scalePositive(value).hex();
        } else {
            const scaleNegative = chroma.scale(['#99e0a3', '#78f772']).domain([-maxAbsValue, 0]);
            color = scaleNegative(value).hex();
        }

        return color;
    };

    renderTable = () => {
        const { jacobian } = this.props;

        // Ensure jacobian is defined and has the expected structure
        if (!jacobian || !jacobian.rows || !jacobian.columns || !jacobian.values) {
            return <div>No data available</div>;
        }

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
                                    style={{
                                        ...this.generalStyle("black", "gray", "white", "black", "gray", "black", "0px"),
                                        backgroundColor: this.getCellBackgroundColor(value)
                                    }}
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

    saveAsCSV = () => {
        const { jacobian } = this.props;

        // Prompt the user for the filename with extension
        let filename = window.prompt("Enter the name of the file with extension");
        if (!filename) return;

        // Validate the filename to ensure it ends with .csv or .txt
        if (!filename.endsWith(".csv") && !filename.endsWith(".txt")) {
            alert("Invalid file extension. Please include .csv or .txt in the filename.");
            return;
        }

        // Convert the data to CSV format
        let csvContent = "";

        // Add headers
        csvContent += jacobian.columns.map(col => `[${col}]`).join(",") + "\n";

        // Add rows
        jacobian.rows.forEach((row, rIndex) => {
            const rowValues = jacobian.values[rIndex].map(value => value.toFixed(8));
            csvContent += `[${row}],` + rowValues.join(",") + "\n";
        });

        // Create a blob with the CSV content
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

        // Create a link and trigger the download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", filename);
        document.body.appendChild(link); // Required for Firefox
        link.click();
        document.body.removeChild(link);
    };

    render() {
        const { isVisible } = this.state;

        if (!isVisible) return null;

        return (
            <div className="steady-state-popup-overlay" onClick={this.closePopup}>
                <Draggable nodeRef={this.nodeRef}>
                    <div ref={this.nodeRef}
                        className="steady-state-popup-content"
                        style={this.generalStyle("#242323", "white", "white", "black", "gray", "black", "8px")}
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
                        <div className="steady-state-popup-jacobian-table-container"
                            style={this.generalStyle("#242323", "white", "", "", "#242323", "white", "0px")}>
                            {this.state.showJacobian && this.renderTable()}
                        </div>
                        <div className="steady-state-popup-bottom"
                            style={this.generalStyle("#9e9b9b", "white", "white", "black", "gray", "black", "8px")}>
                            <button
                                className="steady-state-popup-close-button"
                                style={this.generalStyle("black", "white", "white", "black", "gray", "black", "8px")}
                                onClick={this.saveAsCSV}>
                                Save as CSV
                            </button>
                            <button
                                className="steady-state-popup-close-button"
                                style={this.generalStyle("black", "white", "white", "black", "gray", "black", "8px")}
                                onClick={this.closePopup}>Close
                            </button>
                        </div>
                        {this.state.tooltipContent && (
                            <div
                                className="custom-tooltip"
                                style={{ ...this.generalStyle("#242323", "gray", "white", "black", "gray", "black", "5px"),
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
