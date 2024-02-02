import React, {useEffect, useRef, useState} from 'react';
import PlotGraph from './PlotGraph';
import ResizingHandle from "./ResizingHandle";
import './CSS/Left Sub Panel/main-container.css'
import './CSS/Left Sub Panel/custom-scroll-bar.css'
import './CSS/Left Sub Panel/popup-components.css'
import './CSS/Left Sub Panel/dropdown-components.css'
import './CSS/Left Sub Panel/border-with-text.css'
import './CSS/Center Panel/center-subpanel.css'
import './CSS/Center Panel/centered-input.css'
import './CSS/Right Sub Panel/right-subpanel.css'
import {UilSetting} from "@iconscout/react-unicons";
import './SimulationParameters';
import SimulationParameters from "./SimulationParameters";
import YAxis from "./YAxis"
import { FaArrowUp, FaArrowRight } from 'react-icons/fa'; // Replace 'fa' with the desired icon set
const MIN_PANEL_WIDTH = 50;
const DropdownWithPopup = (
    { initialOptions = [], 
        additionalElements = [], 
        xData = [], 
        yData1 = [], 
        yData2 = [] }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [options, setOptions] = useState(initialOptions);
    const [selectedElements, setSelectedElements] = useState([]);
    const [showDropdownButtons, setShowDropdownButtons] = useState(false);

    const [panelWidth, setPanelWidth] = useState(300); // Initial width of the left sub-panel
    const leftPanelRef = useRef(null);
    const leftResizingRef = useRef(false);

    const [rightPanelWidth, setRightPanelWidth] = useState(600); // Initial width of the right sub-panel
    const rightPanelRef = useRef(null);
    const rightResizingRef = useRef(false);

    const [showParams, setShowParams] = useState(false);
    const [showXAxis, setShowXAxis] = useState(false);
    const [showYAxis, setShowYAxis] = useState(false);

    const toggleOption = (optionValue) => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            [optionValue]: true,
        }));
    };

    const dropdownStyle = {
        backgroundColor: '#242323'
    };

    const applySelectedElements = () => {
        selectedElements.forEach((element) => {
            toggleOption(element);
        });
        setSelectedElements([]);
        setShowMoreOptions(false);
    };

    const closePopup = () => {
        setSelectedElements([]);
        setShowMoreOptions(false);
    }

    const addElementToSelected = (element) => {
        setSelectedElements((prevSelected) => [...prevSelected, element]);
    };

    const selectAllOptions = () => {
        setOptions(Object.keys(options).reduce((acc, key) => {
            acc[key] = true;
            console.log(`Selected option '${key}'`);
            return acc;
        }, {}));
    };

    const unselectAllOptions = () => {
        setOptions(Object.keys(options).reduce((acc, key) => {
            acc[key] = false;
            return acc;
        }, {}));
    };

    const addAllElements = () => {
        setSelectedElements(additionalElements);
    };

    const clearAllElements = () => {
        setSelectedElements([]);
    };
    const deleteOptions = () => {
        const updatedOptions = {};
        Object.keys(options).forEach((option) => {
            if (!options[option]) {
                // Only keep options that are not selected
                updatedOptions[option] = options[option];
            }
        });
        setOptions(updatedOptions);
    };

    const handleResize = (e) => {
        if (leftResizingRef.current && leftPanelRef.current) {
            const newWidth = e.clientX - leftPanelRef.current.getBoundingClientRect().left;
            setPanelWidth(Math.max(newWidth, MIN_PANEL_WIDTH));
            setShowYAxis(false);
            setShowXAxis(false);
            setShowParams(false);
        }
    };
    const handleRightResize = (e) => {
        if (rightResizingRef.current && rightPanelRef.current) {
            const newWidth =
                rightPanelRef.current.getBoundingClientRect().right - e.clientX;
            setRightPanelWidth(Math.max(newWidth, MIN_PANEL_WIDTH));
        }
    };

    const leftSubpanelStyle = {
        width: panelWidth,
        backgroundColor: panelWidth > MIN_PANEL_WIDTH ? '#2e2d2d' : '#000000', // Replace with desired colors
    };
    const rightSubpanelStyle = {
        width: rightPanelWidth,
        backgroundColor:
            rightPanelWidth > MIN_PANEL_WIDTH ? '#2e2d2d' : '#000000', // Replace with desired colors
    };

    const dropdownListStyle = {
        maxHeight: '200px', // Set a max height if more than 3 visible options
        overflowY: 'scroll', // Show scrollbar if more than 3 visible options
    };

    const handleIconClick = (icon) => {
        if (icon === 'param') {
            setShowXAxis(false)
            setShowYAxis(false)
            setShowParams(!showParams);
        }
        else if (icon === 'x-axis') {
            setShowParams(false);
            setShowYAxis(false);
            setShowXAxis(!showXAxis)
        }
        else if (icon === 'y-axis') {
            setShowParams(false);
            setShowYAxis(false);
            setShowYAxis(!showYAxis)
        }
    };

    return (
        <div className="main-container">
            <div className="panels-container">
                <div ref={leftPanelRef} className="left-subpanel" style={leftSubpanelStyle}>
                    {panelWidth > MIN_PANEL_WIDTH ? (
                        <>
                        <div className={"text-simulation"}>
                            Time Course Simulation
                            <button className={"config-button"}>Config</button>
                        </div>
                        <SimulationParameters className={"border-with-text-simulation"} />
                            <div className={"simulate-reset-buttons"}>
                                <button className={"simulate-style"}>Simulate</button>
                                <button className={"reset-style"}>Reset</button>
                            </div>
                        <div className="text-checkbox-input">
                            <label>
                                <input
                                    className={"checkbox-input"}
                                    type="checkbox"
                                    onChange={(e) => {
                                        // Handle checkbox change here
                                        const isChecked = e.target.checked;
                                        // You can use the checkbox state as needed
                                    }}
                                />
                                Always reset initial conditions
                            </label>
                        </div>
                        <div className="border-with-text">
                            <span className="text-on-border">X Axis</span>
                            <button
                                className="button-style"
                            > Time </button>
                        </div>

                        <div className="border-with-text">
                            <span className="text-on-border">Y Axis</span>
                            <button
                                className="button-style"
                                onClick={() => {
                                    setShowDropdown(!showDropdown);
                                    setShowDropdownButtons(!showDropdownButtons)}} // Reuse showDropdown for Y-axis
                            > [A] </button>
                            {showDropdown && ( // This dropdown will show for both X and Y axis buttons
                                <YAxis
                                    className={"dropdown-container"}
                                    options={options}
                                    setOptions={setOptions}
                                    dropdownStyle={dropdownStyle}
                                    dropdownListStyle={dropdownListStyle}
                                />
                            )}
                            {showDropdownButtons && (
                                <div>
                                    <button onClick={selectAllOptions}>Select all</button>
                                    <button onClick={unselectAllOptions}>Unselect all</button>
                                    <button onClick={deleteOptions}>Delete</button>
                                    <button onClick={() => setShowMoreOptions(true)}>More options</button>
                                </div>
                            )}
                        </div>
                        </>
                    ) : (
                            <div className={"parameter-icon"}>
                                <UilSetting size="25" color="white" onClick={() => handleIconClick('param')}/>
                                <FaArrowUp className={"axis-icon"} size="25" color="white" onClick={() => handleIconClick('y-axis')}/>
                                <FaArrowRight className={"axis-icon"} size="25" color="white" onClick={() => handleIconClick('x-axis')}/>
                            </div>
                        )}
                    <ResizingHandle panelRef={leftPanelRef} resizingRef={leftResizingRef} handleResize={handleResize} resizeStyle={"resize-handle"}/>
                </div>
                {showMoreOptions && (
                    <div className="popup">
                        <div className="popup-left">
                            {additionalElements.map((element) => (
                                <button key={element} onClick={() => addElementToSelected(element)}>
                                    {element}
                                </button>
                            ))}
                        </div>
                        <div className="popup-right">
                            <div className={"small-text"}>
                                {selectedElements.map((element) => (
                                    <div key={element}>{element}</div>
                                ))}
                            </div>
                        </div>
                        <div className="popup-top">
                            <button onClick={addAllElements}>Add All</button>
                            <button onClick={clearAllElements}>Clear All</button>
                        </div>
                        <div className="popup-bottom">
                            <button onClick={applySelectedElements}>Apply</button>
                            <button onClick={closePopup}>Close</button>
                        </div>
                    </div>
                )}
            </div>
            <div className="center-subpanel">
                <div className="centered-input-box">
                    <textarea></textarea>
                </div>
                {showParams && (
                    <div className="components-container-in-param-popup">
                        <SimulationParameters className={"border-with-text-simulation-popup"} />
                        <div className={"simulate-reset-buttons"}>
                            <button className={"simulate-style"}>Simulate</button>
                            <button className={"reset-style"}>Reset</button>
                        </div>
                    </div>
                )}
                {showYAxis && (
                    <div className="components-container-in-yaxis-popup">
                        <div className="border-with-text-yaxis-popup">
                            <span className="text-on-border">Y Axis</span>
                            <YAxis
                                className={"dropdown-container-for-yaxis-icon"}
                                options={options}
                                setOptions={setOptions}
                                dropdownStyle={dropdownStyle}
                                dropdownListStyle={dropdownListStyle}
                            />
                            <div>
                                <button className="dropdown-buttons" onClick={selectAllOptions}>Select all</button>
                                <button className="dropdown-buttons" onClick={unselectAllOptions}>Unselect all</button>
                                <button className="dropdown-buttons" onClick={deleteOptions}>Delete</button>
                                <button className="dropdown-buttons" onClick={() => setShowMoreOptions(true)}>More options</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div ref={rightPanelRef} className="right-subpanel" style={rightSubpanelStyle}>
                <ResizingHandle
                    panelRef={rightPanelRef}
                    resizingRef={rightResizingRef}
                    handleResize={handleRightResize}
                    resizeStyle={"resize-right-handle"}
                    isRightPanel={true}
                />
                <div className="plot-box">
                    <PlotGraph
                        xData={xData}
                        yData1={yData1}
                        yData2={yData2}
                    ></PlotGraph>
                </div>
            </div>
        </div>
    );
};
export default DropdownWithPopup;