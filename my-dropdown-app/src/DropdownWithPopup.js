import React, {useEffect, useRef, useState} from 'react';
import PlotGraph from './PlotGraph';
import ResizingHandle from "./ResizingHandle";
import './CSS/Left Sub Panel/main-container.css'
import './CSS/Left Sub Panel/popup-components.css'
import './CSS/Left Sub Panel/dropdown-components.css'
import './CSS/Left Sub Panel/border-with-text.css'
import './CSS/Center Panel/center-subpanel.css'
import './CSS/Center Panel/centered-input.css'
import './CSS/Right Sub Panel/right-subpanel.css'
import './CSS/Left Top Corner/left-top-corner.css'
import './SimulationParameters';
import SimulationParameters from "./SimulationParameters";
import YAxis from "./YAxis"
import {FaBars} from 'react-icons/fa'; // Replace 'fa' with the desired icon set
const MIN_PANEL_WIDTH = 50;
const MAX_LEFT_PANEL_WIDTH = 300;
const MIN_RIGHT_PANEL_WIDTH = window.innerWidth * 0.3;
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

    const [panelWidth, setPanelWidth] = useState(350); // Initial width of the left sub-panel
    const leftPanelRef = useRef(null);

    const [centerPanelWidth, setCenterPanelWidth] = useState(window.innerWidth * 0.47);

    const [rightPanelWidth, setRightPanelWidth] = useState(window.innerWidth * 0.4); // Initial width of the right sub-panel
    const rightPanelRef = useRef(null);
    const rightResizingRef = useRef(false);

    const [showParams, setShowParams] = useState(false);
    const [showXAxis, setShowXAxis] = useState(false);
    const [showYAxis, setShowYAxis] = useState(false);

    const [sizeOfInput, setSizeOfInput] = useState(12);
    const [deleteMessage, setDeleteMessage] = useState('');
    const fileItems = [
        { label: 'New Graph'},
        { label: 'New File'},
        { label: 'New Window'},
        { label: 'Open...'},
        { label: 'Save'},
        { label: 'Save As...'},
        { label: 'Import SBML...'},
        {label: 'Export SBML...'},
        {label: 'Save Graph as PDF'},
        {label: 'Quit'}
    ];
    const analysisItems = [
        { label: 'Time Course Simulation'},
        { label: 'Steady-State'},
        { label: 'Parameter Scan'},
        { label: 'Real-Time Simulation'},
        { label: 'Structure Analysis'}
    ];
    const optionsItems = [
        { label: 'Preferences...'},
        { label: 'Use Floating Graph'},
        { label: 'Save Configuration'}
    ];
    const examplesItems = [
        { label: 'Example Models'}
    ];
    const helpItems = [
        { label: 'Help...'},
        { label: 'Help on Antimony'},
        { label: 'About Iridium'}
    ];

    const [graphs, setGraphs] = useState([{
        // Initial graph data
        xData: [],
        yData1: [],
        yData2: [],
        xMin: "0.00",
        yMin: "10.00",
        xMax: "0.00",
        yMax: "10.00",
        showSettings: true // Show settings for the first graph initially
    }]);

    const [activeGraphIndex, setActiveGraphIndex] = useState(0); // Index of the currently active graph
    const [activeToolbarButton, setActiveToolbarButton] = useState('');

    const [showDropdownToolbar, setShowDropdownToolbar] = useState(false);
    const addNewGraph = () => {
        const newGraph = {
            xData: [],
            yData1: [],
            yData2: [],
            xMin: "0.00",
            yMin: "10.00",
            xMax: "0.00",
            yMax: "10.00",
            showSettings: true // Show settings for the new graph
        };
        // Set showSettings to false for all existing graphs and add the new graph
        setGraphs(graphs.map(graph => ({...graph, showSettings: false})).concat(newGraph));
        setActiveGraphIndex(graphs.length); // Update the active graph index to the new graph
    };

    // Function to select an active graph
    const selectGraph = (index) => {
        setActiveGraphIndex(index);
        // Only show settings for the selected graph
        setGraphs(graphs.map((graph, i) => ({
            ...graph,
            showSettings: i === index
        })));
    };

    const updateGraphSetting = (index, setting, newValue) => {
        setGraphs(graphs.map((graph, i) => {
            if (i === index) {
                return { ...graph, [setting]: newValue };
            }
            return graph;
        }));
    };

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
        if (icon === 'x-axis') {
            setShowParams(false);
            setShowYAxis(false);
            setShowXAxis(!showXAxis);

            // Apply the new width to the left panel
            setPanelWidth(MAX_LEFT_PANEL_WIDTH);

            // Adjust the center panel width accordingly
            setCenterPanelWidth(window.innerWidth - rightPanelWidth - MAX_LEFT_PANEL_WIDTH);
        }
        else if (icon === 'narrow') {
            setPanelWidth(MIN_PANEL_WIDTH);
            setCenterPanelWidth(window.innerWidth - rightPanelWidth - MIN_PANEL_WIDTH);
        }
    };

    const handleInputChange = (e) => {
        setSizeOfInput(e.target.value);
    };

    const handleToolbarButtons = (menu) => {
        setShowDropdownToolbar(menu !== activeToolbarButton || !showDropdownToolbar);
        setActiveToolbarButton(menu === activeToolbarButton ? '' : menu);
    };

    useEffect(() => {
        const handleClickOutside = () => {
            setShowDropdownToolbar(false);
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const NumberInput = ({ label, value, onChange }) => (
        <div style={{ marginBottom: '10px' }}>
            <label style={{ color: "white", fontSize: 12, display: 'block' }}>
                {label}
                <input
                    style={{
                        backgroundColor: "black",
                        color: "white",
                        border: '1px solid gray',
                        borderRadius: '4px',
                        width: '60px',
                        fontSize: 12
                    }}
                    type="number"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                />
            </label>
        </div>
    );

    return (
        <>
            <div className="main-container">
                <div className="panels-container">
                    <div ref={leftPanelRef} className="left-subpanel" style={leftSubpanelStyle}>
                        {panelWidth > MIN_PANEL_WIDTH ? (
                            <><FaBars className={"axis-icon"} size="20" color="white" onClick={() => handleIconClick('narrow')}/>
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
                                            withCheckboxes={true}
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
                                <FaBars className={"axis-icon"} size="25" color="white" onClick={() => handleIconClick('x-axis')}/>
                            </div>
                        )}
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

                    <div className="top-menu">
                        <div className={"container-of-toolbar-and-dropdown"}>
                            <button className="top-menu-button" onClick={() => handleToolbarButtons('File')}>File</button>
                            {activeToolbarButton === 'File' && showDropdownToolbar && (
                                <YAxis
                                    className={"dropdown-file-container"}
                                    options={fileItems}
                                    dropdownStyle={dropdownStyle}
                                    withCheckboxes={false}
                                    dropdown_toolbar_buttons_style={"dropdown-toolbar-button-file"}
                                />
                            )}
                        </div>
                        <div className={"container-of-toolbar-and-dropdown"}>
                            <button className="top-menu-button" onClick={() => handleToolbarButtons('Analysis')}>Analysis</button>
                            {activeToolbarButton === 'Analysis' && showDropdownToolbar && (
                                <YAxis
                                    className={"dropdown-analysis-container"}
                                    options={analysisItems}
                                    dropdownStyle={dropdownStyle}
                                    withCheckboxes={false}
                                    dropdown_toolbar_buttons_style={"dropdown-toolbar-button-analysis"}
                                />
                            )}
                        </div>
                        <div className={"container-of-toolbar-and-dropdown"}>
                            <button className="top-menu-button" onClick={() => handleToolbarButtons('Options')}>Options</button>
                            {activeToolbarButton === 'Options' && showDropdownToolbar && (
                                <YAxis
                                    className={"dropdown-options-container"}
                                    options={optionsItems}
                                    dropdownStyle={dropdownStyle}
                                    withCheckboxes={false}
                                    dropdown_toolbar_buttons_style={"dropdown-toolbar-button-options"}
                                />
                            )}
                        </div>
                        <div className={"container-of-toolbar-and-dropdown"}>
                            <button className="top-menu-button" onClick={() => handleToolbarButtons('Examples')}>Examples</button>
                            {activeToolbarButton === 'Examples' && showDropdownToolbar && (
                                <YAxis
                                    className={"dropdown-examples-container"}
                                    options={examplesItems}
                                    dropdownStyle={dropdownStyle}
                                    withCheckboxes={false}
                                    dropdown_toolbar_buttons_style={"dropdown-toolbar-button-examples"}
                                />
                            )}
                        </div>
                        <div className={"container-of-toolbar-and-dropdown"}>
                            <button className="top-menu-button" onClick={() => handleToolbarButtons('Help')}>Help</button>
                            {activeToolbarButton === 'Help' && showDropdownToolbar && (
                                <YAxis
                                    className={"dropdown-help-container"}
                                    options={helpItems}
                                    dropdownStyle={dropdownStyle}
                                    withCheckboxes={false}
                                    dropdown_toolbar_buttons_style={"dropdown-toolbar-button-help"}
                                />
                            )}
                        </div>

                    </div>
                    <div ref={rightPanelRef} className="right-subpanel" style={rightSubpanelStyle}>
                        <ResizingHandle
                            panelRef={rightPanelRef}
                            resizingRef={rightResizingRef}
                            handleResize={handleRightResize}
                            resizeStyle={"resize-right-handle"}
                            isRightPanel={true}
                        />
                        <button onClick={addNewGraph}>New Graph</button>
                        <div className="graphs-container">
                            {graphs.map((graph, index) => (
                                <div key={index} className={`graph-container ${index === activeGraphIndex ? 'active' : ''}`} onClick={() => selectGraph(index)}>
                                    <PlotGraph xData={graph.xData} yData1={graph.yData1} yData2={graph.yData2} rightPanelWidth={rightPanelWidth} rightPanelHeight={window.innerHeight}/>
                                    {graph.showSettings && (
                                        <div>
                                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                                <div style={{ marginRight: '10px' }}>
                                                    <NumberInput label="X Minimum:" value={graph.xMin} onChange={(newValue) => updateGraphSetting(index, 'xMin', newValue)} />
                                                    <NumberInput label="X Maximum:" value={graph.yMin} onChange={(newValue) => updateGraphSetting(index, 'xMax', newValue)} />
                                                </div>
                                                <div>
                                                    <NumberInput label="Y Minimum:" value={graph.yMin} onChange={(newValue) => updateGraphSetting(index, 'yMin', newValue)} />
                                                    <NumberInput label="Y Maximum:" value={graph.yMax} onChange={(newValue) => updateGraphSetting(index, 'yMax', newValue)} />
                                                </div>
                                                <div className="text-checkbox-input-autoscale" style={{ display: 'flex', justifyContent: 'space-between',
                                                    alignItems: 'flex-start', marginBottom: '10px' }}>
                                                    <div className="autoscale-container">
                                                        <div className="checkbox-container">
                                                            <label className="label-space">
                                                                <input
                                                                    className={"checkbox-input"}
                                                                    type="checkbox"
                                                                    onChange={(e) => {
                                                                        // Handle checkbox change here
                                                                        const isChecked = e.target.checked;
                                                                        // You can use the checkbox state as needed
                                                                    }}
                                                                />
                                                                Autoscale X
                                                            </label>
                                                        </div>
                                                        <div className="checkbox-container">
                                                            <label>
                                                                <input
                                                                    className="checkbox-input"
                                                                    type="checkbox"
                                                                    onChange={(e) => {
                                                                        // Handle checkbox change here
                                                                        const isChecked = e.target.checked;
                                                                        // You can use the checkbox state as needed
                                                                    }}
                                                                />
                                                                Autoscale Y
                                                            </label>
                                                        </div>

                                                    </div>
                                                    <div className="edit-export-buttons" style={{ display: 'flex', flexDirection: 'column', marginTop: '-10px', marginLeft: '10px' }}>
                                                        <button className={'edit-export-style'} style={{ marginBottom: '10px'}}>Edit Graph</button>
                                                        <button className={'edit-export-style'}> Export To PDF</button>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Render your NumberInput components here, passing the graph-specific settings */}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default DropdownWithPopup;
