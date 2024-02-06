import React, {useRef, useState} from 'react';
import PlotGraph from './PlotGraph';
import ResizingHandle from "./ResizingHandle";
import './CSS/Left Sub Panel/main-container.css'
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
const MAX_LEFT_PANEL_WIDTH = window.innerWidth * 0.15;
const MIN_RIGHT_PANEL_WIDTH = window.innerWidth * 0.2;
const MIN_CENTER_PANEL_WIDTH = window.innerWidth * 0.2;
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

    const [panelWidth, setPanelWidth] = useState(window.innerWidth * 0.15); // Initial width of the left sub-panel
    const leftPanelRef = useRef(null);
    const leftResizingRef = useRef(false);

    const [centerPanelWidth, setCenterPanelWidth] = useState(window.innerWidth * 0.47);

    const [rightPanelWidth, setRightPanelWidth] = useState(window.innerWidth * 0.4); // Initial width of the right sub-panel
    const rightPanelRef = useRef(null);
    const rightResizingRef = useRef(false);

    const [showParams, setShowParams] = useState(false);
    const [showXAxis, setShowXAxis] = useState(false);
    const [showYAxis, setShowYAxis] = useState(false);

    const [sizeOfInput, setSizeOfInput] = useState(12);
    const [deleteMessage, setDeleteMessage] = useState('');

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

    const DEFAULT_OPTIONS = ['[A]', '[B]', '[C]'];
    const deleteOptions = () => {
        const updatedOptions = {};
        let nonDefaultOptionFound = false;

        Object.keys(options).forEach((option) => {
            if (DEFAULT_OPTIONS.includes(option) || !options[option]) {
                updatedOptions[option] = options[option];
            } else {
                nonDefaultOptionFound = true;
            }
        });

        setOptions(updatedOptions);

        if (!nonDefaultOptionFound && Object.keys(updatedOptions).every(option => DEFAULT_OPTIONS.includes(option))) {
            setDeleteMessage('Y-axis list is in default mode. No additional options to delete.');
            // Clear the message after 3 seconds
            setTimeout(() => {
                setDeleteMessage('');
            }, 2000);
        } else {
            setDeleteMessage(''); // Immediately clear the message in other cases
        }
    };

    const handleResize = (e) => {
        if (leftResizingRef.current && leftPanelRef.current) {
            const newWidth = e.clientX - leftPanelRef.current.getBoundingClientRect().left;
            const adjustedWidth = Math.min(Math.max(newWidth, MIN_PANEL_WIDTH), MAX_LEFT_PANEL_WIDTH);
            setCenterPanelWidth(window.innerWidth - rightPanelWidth - adjustedWidth);
            setPanelWidth(adjustedWidth);
            setShowYAxis(false);
            setShowXAxis(false);
            setShowParams(false);
        }
    };

    const handleRightResize = (e) => {
        if (rightResizingRef.current && rightPanelRef.current) {
            const newWidth = rightPanelRef.current.getBoundingClientRect().right - e.clientX;
            const adjustedWidth = Math.max(newWidth, MIN_RIGHT_PANEL_WIDTH);

            // Calculate the potential new center panel width
            const potentialCenterWidth = window.innerWidth - panelWidth - adjustedWidth;

            // Check if the potential new center panel width is less than the minimum
            if (potentialCenterWidth < MIN_CENTER_PANEL_WIDTH) {
                // Set the center panel width to its minimum
                setCenterPanelWidth(MIN_CENTER_PANEL_WIDTH);
                // Adjust the right panel width accordingly to maintain the layout
                setRightPanelWidth(window.innerWidth - panelWidth - MIN_CENTER_PANEL_WIDTH);
            } else {
                // Proceed as normal if the minimum size is not breached
                setCenterPanelWidth(potentialCenterWidth);
                setRightPanelWidth(adjustedWidth);
            }
        }
    };


    const leftSubpanelStyle = {

        width: panelWidth,
        backgroundColor: panelWidth > MIN_PANEL_WIDTH ? '#2e2d2d' : '#000000', // Replace with desired colors
    };
    const rightSubpanelStyle = {
        width: rightPanelWidth,
        backgroundColor: '#2e2d2d',
    };

    const centerSubPanelStyle = {
        width: centerPanelWidth,
        backgroundColor: '#2e2d2d',
    }

    const handleIconClick = (icon) => {
        if (icon === 'param') {
            setShowXAxis(false)
            setShowYAxis(false)
            setShowParams(!showParams);
        }
        else if (icon === 'x-axis') {
            setShowParams(false);
            setShowYAxis(false);
            setShowXAxis(!showXAxis);

            // Dynamically calculate 13% of the current window width
            const newWidth = window.innerWidth * 0.15;

            // Apply the new width to the left panel
            setPanelWidth(newWidth);

            // Adjust the center panel width accordingly
            setCenterPanelWidth(window.innerWidth - rightPanelWidth - newWidth);
        }
        else if (icon === 'y-axis') {
            setShowParams(false);
            setShowYAxis(false);
            setShowYAxis(!showYAxis)
        }
    };

    const handleInputChange = (e) => {
        setSizeOfInput(e.target.value);
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
                                />
                            )}
                            {showDropdownButtons && (
                                <div>
                                    <button onClick={selectAllOptions}>Select all</button>
                                    <button onClick={unselectAllOptions}>Unselect all</button>
                                    <button onClick={deleteOptions}>Delete</button>
                                    <div>
                                        {deleteMessage && <div className="delete-message">{deleteMessage}</div>}
                                    </div>
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
                <div className="center-subpanel" style={centerSubPanelStyle}>
                    <div className={"centered-input-box"}>
                        <textarea style={{fontSize: `${sizeOfInput}px`}} ></textarea>
                    </div>
                    <div>
                        <label style={{ color: "white", fontSize: 12 }}> Font Size: </label>
                        <input
                            style={{
                                backgroundColor: "black",
                                color: "white",
                                border: '1px solid gray',
                                marginTop: '10px',
                                width: '40px',
                                fontSize: 12 }}
                            type="number"
                            value={sizeOfInput}
                            onChange={handleInputChange}
                        />
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
                                />
                                <div>
                                    <button className="dropdown-buttons" onClick={selectAllOptions}>Select all</button>
                                    <button className="dropdown-buttons" onClick={unselectAllOptions}>Unselect all</button>
                                    <button className={"dropdown-buttons"} onClick={deleteOptions}>Delete</button>
                                    <div>
                                        {deleteMessage && <div className="delete-message">{deleteMessage}</div>}
                                    </div>
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
        </div>
    );
};
export default DropdownWithPopup;