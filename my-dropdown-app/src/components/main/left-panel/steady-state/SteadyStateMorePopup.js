import React, { Component, createRef } from "react";
import "./SteadyStateMorePopup.css";
import Draggable from 'react-draggable';
import chroma from 'chroma-js';

class SteadyStateMorePopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isResizing: false,
            showJacobian: true,
            showFluxControl: false,
            showConcentrationControl: false,
            showElasticities: false,
            tooltipContent: "",
            tooltipPosition: { top: 0, left: 0 },
            size: { width: 700, height: 400 }
        };
        this.nodeRef = createRef();
    }

    closePopup = () => {
        this.props.onClose();
    };

    generalStyle = (darkBackground, lightBackGround, darkColor, lightColor, darkBorder, lightBorder, radius) => ({
        backgroundColor: this.props.isDarkMode ? darkBackground : lightBackGround,
        color: this.props.isDarkMode ? darkColor : lightColor,
        border: this.props.isDarkMode ? `1px solid ${darkBorder}` : `1px solid ${lightBorder}`,
        borderRadius: radius
    });

    showTooltip = (event, rowLabel, colLabel, value) => {
        if (!this.nodeRef.current) return; // Add this null check
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

        // Define a threshold for rounding to zero
        const threshold = 1e-10;

        // Check if the value is very close to zero
        if (Math.abs(value) < threshold) {
            return '#72aed4'; // Color for zero
        }

        if (typeof value !== 'number' || isNaN(value)) {
            return isDarkMode ? '#242323' : 'white';
        }

        let color;
        const maxAbsValue = Math.max(...this.props.jacobian.values.flat().map(Math.abs)) || 1;

        if (value > 0) {
            const scalePositive = chroma.scale(["#f5e4e4", "#b81c1c"]).domain([0, maxAbsValue]);
            color = scalePositive(value).hex();
        } else {
            const scaleNegative = chroma.scale(["#ebfae6", "#4da12f"]).domain([-maxAbsValue, 0]);
            color = scaleNegative(value).hex();
        }

        return color;
    };

    renderTable = (data) => {

        // Ensure jacobian is defined and has the expected structure
        if (!data || !data.rows || !data.columns || !data.values) {
            return <div>No data available</div>;
        }

        return (
            <table className="jacobian-table">
                <thead>
                    <tr style={this.generalStyle("black", "gray", "white", "black", "gray", "black", "0px")}>
                        <th></th>
                        {data.columns.map((col, index) => (
                            <th key={index} style={{ fontWeight: "normal", fontSize: "12px" }}>[{col}]</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.rows.map((row, rIndex) => (
                        <tr style={this.generalStyle("black", "gray", "white", "black", "gray", "black", "0px")} key={rIndex}>
                            <td style={this.generalStyle("black", "gray", "white", "black", "white", "black", "0px")}>[{row}]</td>
                            {data.values[rIndex].map((value, cIndex) => (
                                <td
                                    style={{
                                        ...this.generalStyle("black", "gray", "black", "black", "gray", "black", "0px"),
                                        backgroundColor: this.getCellBackgroundColor(value)
                                    }}
                                    key={cIndex}
                                    onMouseEnter={(e) => this.showTooltip(e, row, data.columns[cIndex], value)}
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
        csvContent += "," + jacobian.columns.map(col => `[${col}]`).join(",") + "\n";

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

    handleResize = (corner, e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ isResizing: true });

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = this.nodeRef.current.offsetWidth; // Use offsetWidth for exact width
        const startHeight = this.nodeRef.current.offsetHeight; // Use offsetHeight for exact height
        const startLeft = this.nodeRef.current.offsetLeft;
        const startTop = this.nodeRef.current.offsetTop;

        const handleMouseMove = (e) => {
            let newWidth = startWidth;
            let newHeight = startHeight;
            let newLeft = startLeft;
            let newTop = startTop;

            if (corner.includes("right")) {
                newWidth = startWidth + (e.clientX - startX);
            } else if (corner.includes("left")) {
                newWidth = startWidth - (e.clientX - startX);
                newLeft = startLeft + (e.clientX - startX); // Only update left if resizing from the left
            }

            if (corner.includes("bottom")) {
                newHeight = startHeight + (e.clientY - startY);
            } else if (corner.includes("top")) {
                newHeight = startHeight - (e.clientY - startY);
                newTop = startTop + (e.clientY - startY); // Only update top if resizing from the top
            }

            // Apply the minimum width/height constraints
            if (newWidth >= 400) {
                this.nodeRef.current.style.width = `${newWidth}px`;
            }

            // Only update left when resizing from the left, otherwise leave it unchanged
            if (corner.includes("left") && newWidth >= 400) {
                this.nodeRef.current.style.left = `${newLeft}px`;
            }

            if (newHeight >= 400) {
                this.nodeRef.current.style.height = `${newHeight}px`;
            }

            // Only update top when resizing from the top, otherwise leave it unchanged
            if (corner.includes("top") && newHeight >= 400) {
                this.nodeRef.current.style.top = `${newTop}px`;
            }
        };

        const handleMouseUp = () => {
            this.setState({ isResizing: false });
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    render() {
        const { isResizing } = this.state;
        const { isDocked, isDarkMode } = this.props;

        if (isDocked) {
            // Docked version
            return (
                <div
                    ref={this.nodeRef} // Assign ref here
                    className="steady-state-docked"
                    style={{
                        backgroundColor: isDarkMode ? "#242323" : "white",
                        border: isDarkMode ? "1px solid grey" : "1px solid black",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                    }}
                >
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
                    {/* Scrollable container for table */}
                    <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
                        {this.state.showJacobian && this.renderTable(this.props.jacobian)}
                    </div>
                    <div style={{ flex: 1, overflowY: "auto", padding: "20px", marginTop: "-50%" }}>
						{this.state.showFluxControl && this.renderTable(this.props.fluxControl)}
					</div>
					<div style={{ flex: 1, overflowY: "auto", padding: "20px", marginTop: "-50%" }}>
						{this.state.showConcentrationControl && this.renderTable(this.props.concentration)}
					</div>
					<div style={{ flex: 1, overflowY: "auto", padding: "20px", marginTop: "-50%" }}>
						{this.state.showElasticities && this.renderTable(this.props.elasticities)}
					</div>


                    {/* Fixed container for buttons */}
                    <div
                        style={{
                            padding: "10px",
                            borderTop: isDarkMode ? "1px solid #2d2d2d" : "1px solid white",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <div style={{ marginLeft: "auto" }}>
                            <button
                                onClick={this.saveAsCSV}
                                style={{
                                    padding: "5px 10px",
                                    backgroundColor: isDarkMode ? "black" : "white",
                                    border: isDarkMode ? "1px solid grey" : "1px solid black",
                                    color: isDarkMode ? "white" : "black",
                                    marginRight: "10px",
                                }}
                            >
                                Save as CSV
                            </button>
                            <button
                                onClick={this.props.onUndock}
                                style={{
                                    backgroundColor: isDarkMode ? "black" : "white",
                                    border: isDarkMode ? "1px solid grey" : "1px solid black",
                                    color: isDarkMode ? "white" : "black",
                                }}
                            >
                                Undock
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else {
            // Undocked (popup) version
            return (
                <div className="steady-state-popup-overlay">
                    <Draggable nodeRef={this.nodeRef} disabled={isResizing}>
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
							{this.state.showJacobian && this.renderTable(this.props.jacobian)}
							{this.state.showFluxControl && this.renderTable(this.props.fluxControl)}
							{this.state.showConcentrationControl && this.renderTable(this.props.concentration)}
							{this.state.showElasticities && this.renderTable(this.props.elasticities)}
						</div>
						<div className="steady-state-popup-bottom"
							style={this.generalStyle("#9e9b9b", "white", "white", "black", "gray", "black", "8px")}>
							<button
								className="steady-state-popup-close-button"
								style={this.generalStyle("black", "white", "white", "black", "gray", "black", "8px")}
								onClick={this.props.onDock}>
								Dock
							</button>
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
								style={{
									...this.generalStyle("#242323", "gray", "white", "black", "gray", "black", "5px"),
									top: `${this.state.tooltipPosition.top}px`,
									left: `${this.state.tooltipPosition.left}px`
								}}
							>
								{this.state.tooltipContent}
							</div>
						)}
						<div
							className="resize-handle-steady-state-popup resize-handle-top-left-steady-state-popup"
							onMouseDown={(e) => this.handleResize("top-left", e)}
						/>
						<div
							className="resize-handle-steady-state-popup resize-handle-top-right-steady-state-popup"
							onMouseDown={(e) => this.handleResize("top-right", e)}
						/>
						<div
							className="resize-handle-steady-state-popup resize-handle-bottom-left-steady-state-popup"
							onMouseDown={(e) => this.handleResize("bottom-left", e)}
						/>
						<div
							className="resize-handle-steady-state-popup resize-handle-bottom-right-steady-state-popup"
							onMouseDown={(e) => this.handleResize("bottom-right", e)}
						/>
						</div>
					</Draggable>
				</div>
			);
		}
	}
}

export default SteadyStateMorePopup;
