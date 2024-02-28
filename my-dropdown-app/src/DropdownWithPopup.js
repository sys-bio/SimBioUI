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
import { useTabManager } from './useTabManager';
import SimulationParameters from "./SimulationParameters";
import DropdownContainers from "./DropdownContainers"
import {FaBars, FaMoon, FaSun} from 'react-icons/fa'; // Replace 'fa' with the desired icon set
import { MdClose } from 'react-icons/md';
import {da} from "plotly.js/src/traces/carpet/attributes";
const MIN_PANEL_WIDTH = 50;

const DropdownWithPopup = (
    { initialOptions = [],
        additionalElements = [],
        data}) => {
    const [centerSubPanelHeight, setCenterSubPanelHeight] = useState(window.innerHeight - 100); // Subtract 100px or any other adjustments you need
    useEffect(() => {
        const handleResize = () => {
            setCenterSubPanelHeight(window.innerHeight - 100); // Adjust this value based on your layout needs
        };

        window.addEventListener('resize', handleResize);

        // Call handleResize initially to set the initial height
        handleResize();

        // Clean up event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

    const [showDropdown, setShowDropdown] = useState(false);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [options, setOptions] = useState(initialOptions);
    const [selectedElements, setSelectedElements] = useState([]);
    const [showDropdownButtons, setShowDropdownButtons] = useState(false);

    const leftPanelFixedWidth = 300; // Fixed width for the left panel
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [panelWidth, setPanelWidth] = useState(leftPanelFixedWidth);
    const [centerPanelWidth, setCenterPanelWidth] = useState(0);
    const [rightPanelWidth, setRightPanelWidth] = useState(0); // Initial width of the right sub-panel
    const rightPanelRef = useRef(null);
    const rightResizingRef = useRef(false);

    const [sizeOfInput, setSizeOfInput] = useState(12);
    const [deleteMessage, setDeleteMessage] = useState('');
    const fileItems = [
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
        data: data,
        xMin: "0.00",
        yMin: "10.00",
        xMax: "0.00",
        yMax: "10.00",
        showSettings: true, // Show settings for the first graph initially
        textContext: ""
    }]);

    const [activeGraphIndex, setActiveGraphIndex] = useState(0); // Index of the currently active graph
    const [activeToolbarButton, setActiveToolbarButton] = useState('');

    const [showDropdownToolbar, setShowDropdownToolbar] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    const initialTabData = { textContent: '', data: data};

    // Use the custom hook for tab management
    const { tabs, addNewTab, switchTab, updateActiveTabContent, activeTabId, closeTab } = useTabManager(initialTabData);
    const confirmAndCloseTab = (tabId, event) => {
        event.stopPropagation(); // Prevent the click from triggering any parent event
        const isConfirmed = window.confirm("Do you really want to close this tab?");
        if (isConfirmed) {
            closeTab(tabId);
        }
    };

    const renderTabs = () => (
        <div className="tabs">
            {tabs.map(tab => (
                <button style={{backgroundColor: isDarkMode ? 'black' : '#c4c2c2',
                        color: isDarkMode ? 'white' : 'black',
                        border: isDarkMode ? '1px solid white' : '1px solid black'}}
                        key={tab.id} onClick={() => switchTab(tab.id)} className={`tab-button ${tab.id === activeTabId ? 'active' : ''}`}>
                    Untitled {tab.id}
                    <MdClose onClick={(event) => confirmAndCloseTab(tab.id, event)} style={{ cursor: 'pointer', position: 'relative', top: '-10px', marginLeft: '55px'}} />
                </button>
            ))}
            <button className={"plus-button"} onClick={addNewTab}>+</button>
        </div>
    );

    // Render the content of the active tab
    const renderActiveTabContent = () => {
        const activeTab = tabs.find(tab => tab.id === activeTabId);
        return activeTab ? (
            <>
                <div className={"centered-input-box"} style={{
                    height: `${centerSubPanelHeight - 80}px`,
                    width: `${centerPanelWidth - 42}px`,
                    backgroundColor: isDarkMode ? "black" : "white",
                    border: isDarkMode ? "white" : "black",
                    outline: isDarkMode ? '1px solid white' : '1px solid black',
                    marginLeft: '10px'
                }}>
                            <textarea
                                style={{
                                    fontSize: `${sizeOfInput}px`,
                                    height: '100%',
                                    backgroundColor: isDarkMode ? "black" : "white",
                                    color: isDarkMode ? "white" : "black"
                                }}
                                value={activeTab.textContent || ""}
                                onChange={handleTextareaChange}
                            />
                </div>
            </>
        ) : null;
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };
    const modeIcon = isDarkMode ? <FaSun /> : <FaMoon />;
    const modeTooltip = isDarkMode ? "Switch to Bright Mode" : "Switch to Dark Mode";

    const handleTextareaChange = (event) => {
        const newContent = event.target.value;
        updateActiveTabContent(newContent);
        const updatedGraphs = graphs.map((graph, index) => {
            if (index === activeGraphIndex) {
                return { ...graph, textContent: event.target.value };
            }
            return graph;
        });
        setGraphs(updatedGraphs);
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
            // Calculate the new width of the right panel based on the mouse's X position,
            // ensuring the left panel's fixed width is considered in the calculation.
            let newRightPanelWidth = window.innerWidth - e.clientX;


            // Calculate the maximum allowable width for the right panel to ensure
            // the center panel does not go below its minimum width.
            // This is done by subtracting the left panel's fixed width and the minimum width
            // for the center panel from the window's inner width.
            const maxRightPanelWidth = window.innerWidth - leftPanelFixedWidth;

            // Ensure the new width of the right panel does not exceed its maximum allowable width
            // and does not fall below its minimum width constraint.
            newRightPanelWidth = Math.max(Math.min(newRightPanelWidth, maxRightPanelWidth), 0);

            // Set the new width for the right panel.
            setRightPanelWidth(newRightPanelWidth);

            // Calculate and update the center panel width, ensuring it also respects its minimum width.
            // The calculation here ensures that the center panel's width is the remaining space
            // between the fixed-width left panel and the resized right panel, but not less than its minimum width.
            const newCenterPanelWidth = window.innerWidth - leftPanelFixedWidth - newRightPanelWidth;
            // Ensure center panel width does not go below the minimum width.
            const adjustedCenterPanelWidth = Math.max(newCenterPanelWidth, 0);
            setCenterPanelWidth(adjustedCenterPanelWidth);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Recalculate panel widths
        const calculatePanelWidths = () => {
            const remainingWidth = windowWidth - panelWidth;
            setCenterPanelWidth(remainingWidth * 0.5); // 50% of remaining width
            setRightPanelWidth(remainingWidth * 0.5); // 50% of remaining width
        };

        // Listen for window resize events
        window.addEventListener('resize', handleResize);

        // Initial calculation and recalculation on window resize
        calculatePanelWidths();

        // Cleanup listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth, panelWidth]);


    const leftSubpanelStyle = {
        overflow: 'auto',
        width: panelWidth,
        backgroundColor: isDarkMode
            ? (panelWidth > MIN_PANEL_WIDTH ? '#2e2d2d' : '#000000')
            : (panelWidth > MIN_PANEL_WIDTH ? 'white' : '#c4c2c2'), // Adjust colors for dark/bright mode
        border: isDarkMode ? "1px solid gray" : "1px solid #5e5d5d"
    };
    const rightSubpanelStyle = {
        overflow: 'auto',
        width: rightPanelWidth,
        backgroundColor: isDarkMode ? '#2e2d2d' : 'white',
        border: isDarkMode ? "1px solid gray" : "1px solid #5e5d5d"
    };

    const centerSubPanelStyle = {
        width: centerPanelWidth,
        backgroundColor: isDarkMode ? '#2e2d2d' : 'white',
        border: isDarkMode ? "1px solid gray" : "1px solid #5e5d5d"
    }

    const handleIconClick = (icon) => {
        if (icon === 'x-axis') {
            // Apply the new width to the left panel
            setPanelWidth(leftPanelFixedWidth);

            // Adjust the center panel width accordingly
            setCenterPanelWidth(window.innerWidth - rightPanelWidth - leftPanelFixedWidth);
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
            <label style={{ color: isDarkMode ? "white" : "black", fontSize: 12, display: 'block' }}>
                {label}
                <input
                    style={{
                        backgroundColor: isDarkMode ? "black" : "#c4c2c2",
                        color: isDarkMode ? "white" : "black",
                        border: isDarkMode ? '1px solid gray' : '1px solid black',
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

    const dropdownToolbarStyle = {
        backgroundColor: isDarkMode ? '#1f1f1e' : '#c4c2c2',
        borderRadius: '6px',
        border: '1px solid gray'
    }
    const dropdownToolbarButtonsStyle = {
        backgroundColor: isDarkMode ? '#1f1f1e' : '#c4c2c2',
        color: isDarkMode ? 'white' : 'black'
    }

    return (
        <>
            <div className={`main-container ${isDarkMode ? 'dark-mode' : 'bright-mode'}`}>
                <div className={"panels-container"}>
                    <div className="left-subpanel" style={leftSubpanelStyle}>
                        {panelWidth > MIN_PANEL_WIDTH ? (
                            <><FaBars className={"axis-icon"} size="20" color={isDarkMode ? "white" : "black"}
                                      onClick={() => handleIconClick('narrow')}/>
                                <div className={"text-simulation"} style={{ color: isDarkMode ? "white" : "black" }}>
                                    Time Course Simulation
                                    <button className={"config-button"}
                                            style={{
                                                backgroundColor: isDarkMode ? "black" : "#c4c2c2",
                                                color: isDarkMode ? "white" : "black",
                                                border: isDarkMode ? "1px solid gray" : "1px solid black"
                                            }}
                                    >Config</button>
                                </div>
                                <SimulationParameters
                                    className={"border-with-text-simulation"}
                                    isDarkMode={isDarkMode}
                                />
                                <div className={"simulate-reset-buttons"}>
                                    <button className={"simulate-style"} style={{
                                        color: isDarkMode ? "white" : "black"
                                    }}>Simulate</button>
                                    <button className={"reset-style"} style={{
                                        backgroundColor: isDarkMode ? "black" : "#c4c2c2",
                                        color: isDarkMode ? "white" : "black"
                                    }}
                                    >Reset</button>
                                </div>
                                <div className="text-checkbox-input">
                                    <label style={{
                                        color: isDarkMode ? "white" : "black"
                                    }}>
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
                                <div className="border-with-text" style={{
                                    border: isDarkMode ? "1px solid white" : "1px solid black"
                                }}>
                                    <span className="text-on-border" style={{
                                        backgroundColor: isDarkMode ? "#2e2d2d" : "white",
                                        color: isDarkMode ? "white" : "black"
                                    }}>X Axis</span>
                                    <button
                                        className="button-style"
                                        style={{
                                            backgroundColor: isDarkMode ? "#242323" : "#c4c2c2",
                                            color: isDarkMode ? "white" : "black",
                                            border: isDarkMode ? "1px solid gray" : "1px solid black"
                                        }}
                                    > Time </button>
                                </div>

                                <div className="border-with-text" style={{
                                    border: isDarkMode ? "1px solid white" : "1px solid black"
                                }}>
                                    <span className="text-on-border" style={{
                                        backgroundColor: isDarkMode ? "#2e2d2d" : "white",
                                        color: isDarkMode ? "white" : "black"
                                    }}>Y Axis</span>
                                    <button
                                        className="button-style"
                                        style={{
                                            backgroundColor: isDarkMode ? "#242323" : "#c4c2c2",
                                            color: isDarkMode ? "white" : "black",
                                            border: isDarkMode ? "1px solid gray" : "1px solid black"
                                        }}
                                        onClick={() => {
                                            setShowDropdown(!showDropdown);
                                            setShowDropdownButtons(!showDropdownButtons)}} // Reuse showDropdown for Y-axis
                                    > [A] </button>
                                    {showDropdown && ( // This dropdown will show for both X and Y axis buttons
                                        <DropdownContainers
                                            className={"dropdown-container"}
                                            isDarkMode={isDarkMode}
                                            withCheckboxes={true}
                                            options={options}
                                            setOptions={setOptions}
                                            dropdownStyle={dropdownStyle}
                                        />
                                    )}
                                    {showDropdownButtons && (
                                        <div>
                                            <button
                                                style={{
                                                    backgroundColor: isDarkMode ? "black" : "#c4c2c2",
                                                    color: isDarkMode ? "white" : "black"
                                                }} onClick={selectAllOptions}>Select all</button>
                                            <button
                                                style={{
                                                    backgroundColor: isDarkMode ? "black" : "#c4c2c2",
                                                    color: isDarkMode ? "white" : "black"
                                                }} onClick={unselectAllOptions}>Unselect all</button>
                                            <button
                                                style={{
                                                    backgroundColor: isDarkMode ? "black" : "#c4c2c2",
                                                    color: isDarkMode ? "white" : "black"
                                                }} onClick={deleteOptions}>Delete</button>
                                            <div>
                                                {deleteMessage && <div className="delete-message" style={{
                                                    color: isDarkMode ? "white" : "black"
                                                }}>{deleteMessage}</div>}
                                            </div>
                                            <button
                                                style={{
                                                    backgroundColor: isDarkMode ? "black" : "#c4c2c2",
                                                    color: isDarkMode ? "white" : "black"
                                                }} onClick={() => setShowMoreOptions(true)}>More options</button>
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

                    <div className="center-subpanel" style={{...centerSubPanelStyle, height: `${centerSubPanelHeight}px`}}>
                        {renderTabs()}
                        <div className="tab-content">
                            {renderActiveTabContent()}
                        </div>
                        <div className={"front-size-adjustment"} style={{height: `${centerSubPanelHeight * 0.1}px`, marginLeft: '10px'}}>
                            <label
                                style={{
                                    color: isDarkMode ? "white" : "black",
                                    fontSize: 12 }}>
                                Font Size: </label>
                            <input
                                style={{
                                    backgroundColor: isDarkMode ? "black" : "white",
                                    color: isDarkMode ? "white" : "black",
                                    border: isDarkMode ? '1px solid gray' : '1px solid #5e5d5d',
                                    borderRadius: '4px',
                                    width: '40px',
                                    fontSize: 12 }}
                                type="number"
                                value={sizeOfInput}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="top-menu">
                        <div className={"container-of-toolbar-and-dropdown"}>
                            <button className="top-menu-button" style={{
                                backgroundColor: isDarkMode ? "#2e2d2d" : "white",
                                color: isDarkMode ? "white" : "black"
                            }} onClick={() => handleToolbarButtons('File')}>File</button>
                            {activeToolbarButton === 'File' && showDropdownToolbar && (
                                <div className={"dropdown-file-container"}>
                                   <button onClick={() => console.log("Hi")}>Test Button</button>
                                        <div
                                            style={dropdownToolbarStyle}
                                            className="dropdown-list-toolbar"
                                        >
                                            {fileItems.map((item, index) => (
                                                <button
                                                    key={index}
                                                    style={dropdownToolbarButtonsStyle}
                                                    className={"dropdown-toolbar-button-file"}
                                                    onClick={() => this.handleButtonClick(item.label)}
                                                >
                                                    {item.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                            )}
                        </div>
                        <div className={"container-of-toolbar-and-dropdown"}>
                            <button className="top-menu-button" style={{
                                backgroundColor: isDarkMode ? "#2e2d2d" : "white",
                                color: isDarkMode ? "white" : "black"
                            }} onClick={() => handleToolbarButtons('Analysis')}>Analysis</button>
                            {activeToolbarButton === 'Analysis' && showDropdownToolbar && (
                                <DropdownContainers
                                    className={"dropdown-analysis-container"}
                                    dropdownToolbarStyle={dropdownToolbarStyle}
                                    dropdownToolbarButtonsStyle={dropdownToolbarButtonsStyle}
                                    options={analysisItems}
                                    dropdownStyle={dropdownStyle}
                                    withCheckboxes={false}
                                    dropdown_toolbar_buttons_style={"dropdown-toolbar-button-analysis"}
                                />
                            )}
                        </div>
                        <div className={"container-of-toolbar-and-dropdown"}>
                            <button className="top-menu-button" style={{
                                backgroundColor: isDarkMode ? "#2e2d2d" : "white",
                                color: isDarkMode ? "white" : "black"
                            }} onClick={() => handleToolbarButtons('Options')}>Options</button>
                            {activeToolbarButton === 'Options' && showDropdownToolbar && (
                                <DropdownContainers
                                    className={"dropdown-options-container"}
                                    dropdownToolbarStyle={dropdownToolbarStyle}
                                    dropdownToolbarButtonsStyle={dropdownToolbarButtonsStyle}
                                    options={optionsItems}
                                    dropdownStyle={dropdownStyle}
                                    withCheckboxes={false}
                                    dropdown_toolbar_buttons_style={"dropdown-toolbar-button-options"}
                                />
                            )}
                        </div>
                        <div className={"container-of-toolbar-and-dropdown"}>
                            <button className="top-menu-button" style={{
                                backgroundColor: isDarkMode ? "#2e2d2d" : "white",
                                color: isDarkMode ? "white" : "black"
                            }} onClick={() => handleToolbarButtons('Examples')}>Examples</button>
                            {activeToolbarButton === 'Examples' && showDropdownToolbar && (
                                <DropdownContainers
                                    className={"dropdown-examples-container"}
                                    dropdownToolbarStyle={dropdownToolbarStyle}
                                    dropdownToolbarButtonsStyle={dropdownToolbarButtonsStyle}
                                    options={examplesItems}
                                    dropdownStyle={dropdownStyle}
                                    withCheckboxes={false}
                                    dropdown_toolbar_buttons_style={"dropdown-toolbar-button-examples"}
                                />
                            )}
                        </div>
                        <div className={"container-of-toolbar-and-dropdown"}>
                            <button className="top-menu-button" style={{
                                backgroundColor: isDarkMode ? "#2e2d2d" : "white",
                                color: isDarkMode ? "white" : "black"
                            }} onClick={() => handleToolbarButtons('Help')}>Help</button>
                            {activeToolbarButton === 'Help' && showDropdownToolbar && (
                                <DropdownContainers
                                    className={"dropdown-help-container"}
                                    dropdownToolbarStyle={dropdownToolbarStyle}
                                    dropdownToolbarButtonsStyle={dropdownToolbarButtonsStyle}
                                    options={helpItems}
                                    dropdownStyle={dropdownStyle}
                                    withCheckboxes={false}
                                    dropdown_toolbar_buttons_style={"dropdown-toolbar-button-help"}
                                />
                            )}
                        </div>
                        <button onClick={toggleDarkMode} title={modeTooltip}>
                            {modeIcon}
                        </button>
                    </div>
                    <div ref={rightPanelRef} className="right-subpanel" style={rightSubpanelStyle}>
                        <ResizingHandle
                            panelRef={rightPanelRef}
                            resizingRef={rightResizingRef}
                            handleResize={handleRightResize}
                            resizeStyle={"resize-right-handle"}
                            isRightPanel={true}
                        />
                        <div className="graphs-container">
                            {graphs.map((graph, index) => (
                                <div key={index} className={`${index === activeGraphIndex ? 'active' : ''}`} onClick={() => selectGraph(index)}>
                                    <PlotGraph data={data} rightPanelWidth={rightPanelWidth} rightPanelHeight={window.innerHeight} isDarkMode={isDarkMode}/>
                                    {graph.showSettings && (
                                        <div>
                                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                                <div style={{ marginRight: '10px' }}>
                                                    <NumberInput label="X Minimum:" value={graph.xMin} onChange={(newValue) => updateGraphSetting(index, 'xMin', newValue)} />
                                                    <NumberInput label="X Maximum:" value={graph.xMax} onChange={(newValue) => updateGraphSetting(index, 'xMax', newValue)} />
                                                </div>
                                                <div>
                                                    <NumberInput label="Y Minimum:" value={graph.yMin} onChange={(newValue) => updateGraphSetting(index, 'yMin', newValue)} />
                                                    <NumberInput label="Y Maximum:" value={graph.yMax} onChange={(newValue) => updateGraphSetting(index, 'yMax', newValue)} />
                                                </div>
                                                <div className="text-checkbox-input-autoscale" style={{ display: 'flex', justifyContent: 'space-between',
                                                    alignItems: 'flex-start', marginBottom: '10px' }}>
                                                    <div className="autoscale-container">
                                                        <div className="checkbox-container">
                                                            <label className="label-space" style={{
                                                                color: isDarkMode ? 'white' : "black"
                                                            }}>
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
                                                            <label style={{
                                                                color: isDarkMode ? 'white' : "black"
                                                            }}>
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
                                                    <div className="edit-export-buttons" style=
                                                        {{ display: 'flex',
                                                            flexDirection: 'column',
                                                            marginTop: '-10px',
                                                            marginLeft: '10px',
                                                        }}>
                                                        <button style={{
                                                            marginBottom: '10px',
                                                            backgroundColor: isDarkMode ? 'black' : '#c4c2c2',
                                                            color: isDarkMode ? 'white' : 'black'
                                                        }}>Edit Graph</button>
                                                        <button className={'edit-export-style'} style={{
                                                            backgroundColor: isDarkMode ? 'black' : '#c4c2c2',
                                                            color: isDarkMode ? 'white' : 'black'
                                                        }}> Export To PDF</button>
                                                    </div>
                                                </div>
                                            </div>
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
