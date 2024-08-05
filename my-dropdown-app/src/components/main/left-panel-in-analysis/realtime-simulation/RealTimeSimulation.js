import React, { Component } from "react";
import { MIN_PANEL_WIDTH } from "../../../../constants/const";
import { FaBars } from "react-icons/fa";
import "./RealTimeSimulation.css";

class RealTimeSimulation extends Component {
    constructor(props) {
        super(props);
    }

    generalStyle = (isDarkMode, darkBackground, lightBackGround) => ({
        backgroundColor: isDarkMode ? darkBackground : lightBackGround,
        color: isDarkMode ? "white" : "black",
        border: isDarkMode ? "1px solid gray" : "1px solid black"
    });


    render() {
        const { isDarkMode, leftSubpanelStyle, panelWidth, handleIconClick } = this.props;

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
                                    Real-Time Simulation
                                </div>
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

export default RealTimeSimulation;
