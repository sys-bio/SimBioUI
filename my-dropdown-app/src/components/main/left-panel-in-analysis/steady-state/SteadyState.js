import React, { Component } from "react";
import { MIN_PANEL_WIDTH } from "../../../../constants/const";
import { FaBars } from "react-icons/fa";
import "./SteadyState.css";

class SteadyState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showData: sessionStorage.getItem('showData') === 'true' || false
        };
    }

    generalStyle = (isDarkMode, darkBackground, lightBackGround) => ({
        backgroundColor: isDarkMode ? darkBackground : lightBackGround,
        color: isDarkMode ? "white" : "black",
        border: isDarkMode ? "1px solid gray" : "1px solid black"
    });

    renderTable = (options, label_of_first_column, label_of_second_columns) => {
        const { data, isDarkMode } = this.props;
        const { showData } = this.state;
        const filteredOptions = Object.entries(options).filter(([key, value]) => value === true);

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
                    {showData && filteredOptions.map(([key]) => {
                        const index = data.titles.indexOf(key);
                        const value = index !== -1 ? parseFloat(data.columns[index][0]).toFixed(8) : "N/A";
                        return (
                            <tr key={key}>
                                <td style={this.generalStyle(isDarkMode, "black", "#dedcdc")}>[{key}]</td>
                                <td style={this.generalStyle(isDarkMode, "black", "#dedcdc")}>{value.toString()}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }

    handleComputeClick = () => {
        this.props.computeSteadyState();
        this.setState({ showData: true }, () => {
            sessionStorage.setItem('showData', 'true');
        });
    }

    render() {
        const { isDarkMode, leftSubpanelStyle, panelWidth, handleIconClick, selectedOptions, steadyState } = this.props;
        const { showData } = this.state;

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
                            <div style={{ marginTop: '20px' }}>
                                {this.renderTable(selectedOptions, "Symbol", "Value")}
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <h3 style={{ color: isDarkMode ? "white" : "black", fontSize: "12px" }}>Eigenvalues:</h3>
                                {this.renderTable(selectedOptions, "Real", "Imaginary")}
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
            </>
        );
    }
}

export default SteadyState;
