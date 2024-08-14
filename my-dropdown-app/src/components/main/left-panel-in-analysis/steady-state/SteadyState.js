import React, { Component } from "react";
import { MIN_PANEL_WIDTH } from "../../../../constants/const";
import { FaBars } from "react-icons/fa";
import "./SteadyState.css";
import SteadyStateMorePopup from "./SteadyStateMorePopup"; // Import the new popup component

class SteadyState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showData: sessionStorage.getItem('showData') === 'true' || false,
            isSteadyStateComputed: sessionStorage.getItem('isSteadyStateComputed') === 'true' || false,
            showMorePopup: false // State to control the visibility of the More popup
        };
    }

    generalStyle = (isDarkMode, darkBackground, lightBackGround) => ({
        backgroundColor: isDarkMode ? darkBackground : lightBackGround,
        color: isDarkMode ? "white" : "black",
        border: isDarkMode ? "1px solid gray" : "1px solid black"
    });

    handleComputeClick = () => {
        this.props.computeSteadyState();
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
                            const index = data.titles.indexOf(key);
                            const value = index !== -1 ? parseFloat(data.columns[index][0]).toFixed(8) : "N/A";
                            return (
                                <tr key={key}>
                                    <td style={this.generalStyle(isDarkMode, "black", "#dedcdc")}>[{key}]</td>
                                    <td style={this.generalStyle(isDarkMode, "black", "#dedcdc")}>{value.toString()}</td>
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
        const { isDarkMode, leftSubpanelStyle, panelWidth, handleIconClick, selectedOptions, steadyState, eigenValues } = this.props;
        const { showData, isSteadyStateComputed, showMorePopup } = this.state;

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
                            <div style={{ marginTop: '10px' }}>
                                <button
                                    className={"compute-steady-state-button"}
                                    style={this.generalStyle(isDarkMode, "black", "white")}
                                    onClick={this.handleComputeClick}
                                >
                                    Compute the Steady-State
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
