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
const BREAKPOINT_WIDTH = 960;

const DropdownWithPopup = (
    { initialOptions,
        convertedAnt,
        onParametersChange,
        onCheckboxChange,
        simulationParam,
        SBMLContent,
        handleExportSBML,
        handleTextChange,
        handleResetInApp,
        handleSBMLfile,
        handleKValuesChanges,
        handleLocalReset,
        additionalElements = [],
        data,
        kOptions,
        kValues,
        kCurrentValues}) => {
     useEffect(() => {
        const handleResize = () => {
            // Update the state based on the resized window dimensions
            if (window.innerWidth < BREAKPOINT_WIDTH) {
                setCenterSubPanelHeight((window.innerHeight - 100) / 2);
            } else {
                setCenterSubPanelHeight(window.innerHeight - 100);
            }
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const [shouldUpdateSelectedOptions, setShouldUpdateSelectedOptions] = useState(false);

    const [selectedXOption, setSelectedXOption] = useState("Time")
    const [previousContent, setPreviousContent] = useState("");
    const [isChecked, setIsChecked] = useState(true);

    const [centerSubPanelHeight, setCenterSubPanelHeight] = useState(window.innerWidth <= BREAKPOINT_WIDTH ? (window.innerHeight - 100) / 2 : window.innerHeight - 100);
    const [showSplitView, setShowSplitView] = useState(false); // State to manage split view display

    const [showDropdown, setShowDropdown] = useState(false);
    const [showXDropdown, setShowXDropdown] = useState(false);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [options, setOptions] = useState(initialOptions);
    const [selectedElements, setSelectedElements] = useState([]);
    const [showDropdownButtons, setShowDropdownButtons] = useState(false);
    const [showXDropdownButtons, setShowXDropdownButtons] = useState(false);

    const leftPanelFixedWidth = 300; // Fixed width for the left panel
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [panelWidth, setPanelWidth] = useState(leftPanelFixedWidth);
    const [centerPanelWidth, setCenterPanelWidth] = useState(0);
    const [rightPanelWidth, setRightPanelWidth] = useState(0); // Initial width of the right sub-panel
    const rightPanelRef = useRef(null);
    const rightResizingRef = useRef(false);

    const fileDropdownRef = useRef(null);

    const [sizeOfInput, setSizeOfInput] = useState(12);
    const [deleteMessage, setDeleteMessage] = useState('');
    const fileItems = [
        { label: 'New'},
        { label: 'New Window'},
        { label: 'Open...'},
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

    const initialGraphState = {
        data: data,
        xMin: "0.00",
        yMin: "10.00",
        xMax: "0.00",
        yMax: "10.00",
        showSettings: true, // Show settings for the first graph initially
        textContext: ""
    };
    const [activeToolbarButton, setActiveToolbarButton] = useState('');

    const [showDropdownToolbar, setShowDropdownToolbar] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    const initialTabData = { textContent: '', data: data};
    const plotGraphRef = useRef(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [xAxis_selected_option, set_xAxis_selected_option] = useState(null);
    const [kOptions_for_sliders, set_kOptions_for_sliders] = useState({});
    const [sliderValues, setSliderValues] = useState({});
    const [minMaxValues, setMinMaxValues] = useState({});

    const handleXOptionSelected = (option) => {
        set_xAxis_selected_option(option);
    };
    const updateSelectedOptions = (newOptions) => {
        setSelectedOptions(newOptions);
    }
    const handleDownloadPDF = () => {
        if (plotGraphRef.current) {
            plotGraphRef.current.downloadPDF();
        }
    };


    // Use the custom hook for tab management
    const { tabs, addNewTab, switchTab, updateActiveTabContent, activeTabId, closeTab, getContentOfActiveTab } = useTabManager(initialTabData);
    const confirmAndCloseTab = (tabId, event) => {
        event.stopPropagation(); // Prevent the click from triggering any parent event
        const isConfirmed = window.confirm("Do you really want to close this tab?");
        if (isConfirmed) {
            closeTab(tabId);
        }
    };
    const handleSimulateButtonClick = () => {
        const currentContent = getContentOfActiveTab();
        if (currentContent !== previousContent) {
            setSelectedOptions([]);
            handleTextChange(currentContent, isChecked, false);
            setShouldUpdateSelectedOptions(true);
        } else {
            setShouldUpdateSelectedOptions(false);
            onCheckboxChange(isChecked);
        }
        setPreviousContent(currentContent);
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
    const createInitialState = (keys, defaultValue) => {
        return keys.reduce((acc, key) => {
            acc[key] = defaultValue;
            return acc;
        }, {});
    };

    const createInitialSliderValues = (keys, kValues) => {
        return keys.reduce((acc, key, index) => {
            const value = kValues[index] || 100;
            acc[key] = value;
            return acc;
        }, {});
    };

    const createInitialMinMaxValues = (keys, kValues) => {
        return keys.reduce((acc, key, index) => {
            const value = kValues[index] || 100;
            const minValue = (value * 0.1).toFixed(2);
            const maxValue = (value * 5).toFixed(2);
            acc[key] = { min: minValue, max: maxValue };
            return acc;
        }, {});
    };

    useEffect(() => {
        if (kOptions.length > 0 && kValues.length > 0) {
            const newStateForSliders = createInitialState(kOptions, true);
            const newSliderValues = createInitialSliderValues(kOptions, kValues); // Example default slider value of 50

            const newMinMaxValues = createInitialMinMaxValues(kOptions, kValues);

            set_kOptions_for_sliders(newStateForSliders);
            setSliderValues(newSliderValues);
            setMinMaxValues(newMinMaxValues);
        }
    }, [kOptions, kValues]);

    const [selectedParameter, setSelectedParameter] = useState(null);

    const handleCheckboxChange = (option) => {
        set_kOptions_for_sliders(prev => ({ ...prev, [option]: !prev[option] }));
    };

    const handleSliderChange = (option, value) => {
        const roundedValue = Number(value).toFixed(2);
        setSliderValues(prev => ({ ...prev, [option]: roundedValue }));
        handleKValuesChanges(option, roundedValue);
    };

    const handleLabelClick = (parameter) => {
        setSelectedParameter(parameter);
    };

    const handleMaxValueChange = (e) => {
        const parameter = selectedParameter;
        const newMax = e.target.value || ''; // Use parseFloat to allow decimal values
        const newMin = minMaxValues[parameter].min;
        setMinMaxValues(prev => ({
            ...prev,
            [parameter]: {
                ...prev[parameter],
                max: newMax
            }
        }));
        let newValue;
        if (newMin < newMax) {
            newValue = ((Number(newMin) + Number(newMax)) / 2).toFixed(2);
        } else {
            newValue = Number(newMin);
        }
        setSliderValues(prev => ({
            ...prev,
            [parameter]: newValue
        }));
        handleKValuesChanges(parameter, newValue);
    };

    const handleMinValueChange = (e) => {
        const parameter = selectedParameter;
        const newMin = e.target.value || '';
        const newMax = minMaxValues[parameter].max;
        setMinMaxValues(prev => ({
            ...prev,
            [parameter]: {
                ...prev[parameter],
                min: newMin
            }
        }));
        let newValue;
        if (newMin < newMax) {
           newValue = ((Number(newMin) + Number(newMax)) / 2).toFixed(2);
        } else {
            newValue = Number(newMin);
        }
        setSliderValues(prev => ({
            ...prev,
            [parameter]: newValue
        }));
        handleKValuesChanges(parameter, newValue);
    };

    const renderActiveTabContent = () => {
        const activeTab = tabs.find(tab => tab.id === activeTabId);

        if (!activeTab) return null;
        if (showSplitView) {
            // When split view is active, display text input on top and a blue box on bottom
            return (
                <>
                    <div className={"centered-input-box"} style={{
                        height: `${(centerSubPanelHeight - 80) / 2}px`,
                        width: `${centerPanelWidth - 42}px`,
                        backgroundColor: isDarkMode ? "black" : "white",
                        border: isDarkMode ? "white" : "black",
                        outline: isDarkMode ? '1px solid white' : '1px solid black',
                        marginLeft: '10px'
                    }}>
                        <textarea
                            style={{
                                fontSize: `${sizeOfInput}px`,
                                backgroundColor: isDarkMode ? "black" : "white",
                                color: isDarkMode ? "white" : "black",
                                height: '100%', // Make sure the textarea fills the container
                                resize: 'none', // Optional: disable resizing of the textarea
                            }}
                            value={activeTab.textContent || ""}
                            onChange={handleTextareaChange}
                        />
                    </div>
                    <div style={{
                            height: `${(centerSubPanelHeight - 104) / 2}px`,
                            width: `${centerPanelWidth - 22}px`,
                            backgroundColor: isDarkMode ? '#2e2d2d' : '#c4c2c2', // Set the background color to blue for the bottom half
                            border: isDarkMode ? '1px solid white' : '1px solid black',
                            color: 'white', // Set the text color to white if needed
                            marginLeft: '10px',
                            marginTop: '10px',
                            display: 'flex', // Use flexbox to layout children side by side
                            flexDirection: 'row', // Align children horizontally
                            alignItems: 'flex-start', // Align items at the start of the flex container
                        }}>
                        {/* Container for checkboxes */}
                        <div style={{
                            height: '90%', // Set to 90% of the parent div's height
                            width: '20%', // Adjusted width to make space for sliders
                            marginTop: '15px',
                            backgroundColor: isDarkMode ? '#2e2d2d' : '#c4c2c2',
                            display: 'flex', // Further nest flexbox for internal layout
                            flexDirection: 'column', // Stack children vertically
                            overflowY: 'auto', // Add overflow-y property to enable vertical scrolling
                            boxSizing: 'border-box', // Include border width in the total width calculation
                        }}>

                            <p style={{
                                fontSize: '12px',
                                marginLeft: '25px',
                                color: isDarkMode ? 'white' : 'black', // Ensure text is white for visibility on dark backgrounds
                                marginTop:'20px'
                            }}>
                                Add slider
                            </p>
                            <div style={{
                                height: '70%', // Set height to fit content
                                width: '70%', // Adjust width to fill parent
                                backgroundColor: isDarkMode ? 'black' : '#c4c2c2', // Set the background color to blue for the bottom half
                                border: isDarkMode ? '1px solid gray' : '1px solid black',
                                marginLeft: '25px',
                                overflowY: 'auto', // Add overflow-y property to enable vertical scrolling
                            }}>
                                {kOptions.map((option) => (
                                    <div key={option} style={{ color: isDarkMode ? 'white' : 'black', padding: '5px', fontSize: '12px' }}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={kOptions_for_sliders[option]}
                                                onChange={() => handleCheckboxChange(option)}
                                            />
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{
                            height: '100%', // Set to 90% of the parent div's height
                            width: '80%', // Set to 50% to fit next to checkboxes
                            backgroundColor: isDarkMode ? '#2e2d2d' : '#c4c2c2',
                            display: 'flex', // Use flexbox to layout sliders
                            flexDirection: 'column', // Stack sliders vertically
                            justifyContent: 'center', // Center sliders vertically within the container
                            padding: '40px', // Padding around sliders
                            boxSizing: 'border-box', // Include border width in the total width calculation
                        }}>

                        <div style={{
                                height: '15%', // Set to 20% of the parent div's height
                                width: '100%',
                                display: 'flex', // Use flexbox to layout controls horizontally
                                flexDirection: 'row', // Align controls horizontally
                                justifyContent: 'space-between', // Space controls evenly within the subpanel
                                alignItems: 'center', // Align controls vertically at the center
                                marginTop: '-45px'
                            }}>
                                {selectedParameter && (
                                    <div>
                                        <span style={{ fontSize: '12px', marginRight: '10px' }}>{selectedParameter}</span>
                                        <div className="minMaxInputContainer">
                                            <label>Min Value:</label>
                                            <input
                                                type="number"
                                                value={minMaxValues[selectedParameter] ? minMaxValues[selectedParameter].min : 0}
                                                onChange={handleMinValueChange}
                                            />
                                        </div>
                                        <div className="minMaxInputContainer">
                                            <label>Max Value:</label>
                                            <input
                                                type="number"
                                                value={minMaxValues[selectedParameter].max}
                                                onChange={handleMaxValueChange}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div style={{
                                    height: '85%', // Set to 80% of the parent div's height
                                    width: '100%',
                                    backgroundColor: isDarkMode ? '#2e2d2d' : '#c4c2c2',
                                    display: 'flex', // Use flexbox to layout sliders
                                    flexDirection: 'column', // Stack sliders vertically
                                    justifyContent: 'center', // Center sliders vertically within the subpanel
                                    padding: '20px', // Padding around sliders
                                    boxSizing: 'border-box', // Include padding in the total width calculation
                                    marginTop: '10px',
                                    overflowY: 'auto', // Add scrollbar when content overflows vertically
                                }}>
                                {kOptions.map((option) => {
                                        if (kOptions_for_sliders[option]) {
                                            const range = minMaxValues[option].max - minMaxValues[option].min;
                                            const stepSize = range < 10 ? 0.1 : range / 100;
                                            const currentVal = sliderValues[option] === minMaxValues[option].min ? 0 : sliderValues[option];

                                            return (
                                                <div key={option + '-slider'} className="slidecontainer" style={{ position: 'relative', width: '100%', margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                                                    <div style={{ flex: 1, position: 'relative'}}>
                                                        <input
                                                            type="range"
                                                            min={minMaxValues[option].min}
                                                            max={minMaxValues[option].max}
                                                            value={sliderValues[option]}
                                                            step={stepSize} // Use the computed stepSize here
                                                            onChange={(e) => handleSliderChange(option, e.target.value)}
                                                            style={{
                                                                width: '100%',
                                                                background: `linear-gradient(to right, #2273f5 0%, blue ${((sliderValues[option] - minMaxValues[option].min) / (minMaxValues[option].max - minMaxValues[option].min) * 100)}%, #d3d3d3 ${((sliderValues[option] - minMaxValues[option].min) / (minMaxValues[option].max - minMaxValues[option].min) * 100)}%, #d3d3d3 100%, transparent 100%)`
                                                            }}
                                                            className="slider"
                                                        />
                                                        <div style={{ position: 'absolute', top: '-10px', left: '10px', transform: 'translateX(-50%)', fontSize: '12px' }}>
                                                            {currentVal}
                                                        </div>
                                                    </div>
                                                    <div className="labelContainer">
                                                        <label className="sliderLabel" style={{ marginLeft: '15px', fontSize: '12px', marginTop: '7px' }} onClick={() => handleLabelClick(option)}>
                                                            <span>{option} [{minMaxValues[option]?.min || 0}, {minMaxValues[option]?.max || 0}]</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })}
                            </div>
                        </div>
                    </div>
                </>
            );
        } else {
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
                                backgroundColor: isDarkMode ? "black" : "white",
                                color: isDarkMode ? "white" : "black"
                            }}
                            value={activeTab.textContent || ""}
                            onChange={handleTextareaChange}
                        />
                    </div>
                </>
            ) : null;
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };
    const modeIcon = isDarkMode ? <FaSun /> : <FaMoon />;
    const modeTooltip = isDarkMode ? "Switch to Bright Mode" : "Switch to Dark Mode";

    const handleTextareaChange = (event) => {
        const content = event.target.value;
        updateActiveTabContent(content);
    };
    const handleContentSelect = (content) => {
        updateActiveTabContent(content);
        handleResetInApp();
    };
    useEffect(() => {
        if (convertedAnt) {
            handleContentSelect(convertedAnt);
        }
    }, [convertedAnt]);

   const onImportSBML = (content) => {
        handleSBMLfile(content);
   }
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
            let newRightPanelWidth = window.innerWidth - e.clientX;
            const maxRightPanelWidth = window.innerWidth - leftPanelFixedWidth;
            newRightPanelWidth = Math.max(Math.min(newRightPanelWidth, maxRightPanelWidth), 0);

            // Set the new width for the right panel.
            setRightPanelWidth(newRightPanelWidth);
            const newCenterPanelWidth = window.innerWidth - leftPanelFixedWidth - newRightPanelWidth;
            // Ensure center panel width does not go below the minimum width.
            const adjustedCenterPanelWidth = Math.max(newCenterPanelWidth, 0);
            setCenterPanelWidth(adjustedCenterPanelWidth);
        }
    };

    const [layoutVertical, setLayoutVertical] = useState(window.innerWidth <= BREAKPOINT_WIDTH);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setLayoutVertical(window.innerWidth <= BREAKPOINT_WIDTH);
        };

        // Recalculate panel widths
        const calculatePanelWidths = () => {
            const remainingWidth = windowWidth - panelWidth;
            if (layoutVertical) {
                setCenterPanelWidth(remainingWidth); // 50% of remaining width
                setRightPanelWidth(remainingWidth); // 50% of remaining width
            } else {
                setCenterPanelWidth(remainingWidth * 0.5); // 50% of remaining width
                setRightPanelWidth(remainingWidth * 0.5); // 50% of remaining width
            }
        };

        // Listen for window resize events
        window.addEventListener('resize', handleResize);

        // Initial calculation and recalculation on window resize
        calculatePanelWidths();

        // Cleanup listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth, panelWidth]);

        const getPanelStyles = () => {
            if (layoutVertical) {
                return {
                    leftSubpanelStyle: {
                        overflow: 'scroll',
                        width: panelWidth,
                        backgroundColor: isDarkMode
                            ? (panelWidth > MIN_PANEL_WIDTH ? '#2e2d2d' : '#000000')
                            : (panelWidth > MIN_PANEL_WIDTH ? 'white' : '#c4c2c2'), // Adjust colors for dark/bright mode
                        border: isDarkMode ? "1px solid gray" : "1px solid #5e5d5d"
                    },
                    centerSubPanelStyle: {
                        // Adjust styles for center panel when stacked vertically
                        width: centerPanelWidth,
                        height: window.innerHeight / 2,
                        marginTop: '60px',
                        order: 1 // Place below the left panel
                    },
                    rightSubpanelStyle: {
                        overflow: 'scroll',
                        width: rightPanelWidth,
                        height: (window.innerHeight - 100) / 2,
                        marginBottom: '40px',
                        order: 2 // Place below the center panel
                    }
                };
            } else {
                // Original styles for horizontal layout
                return {
                    leftSubpanelStyle: {
                        overflow: 'scroll',
                        width: panelWidth,

                        backgroundColor: isDarkMode
                            ? (panelWidth > MIN_PANEL_WIDTH ? '#2e2d2d' : '#000000')
                            : (panelWidth > MIN_PANEL_WIDTH ? 'white' : '#c4c2c2'), // Adjust colors for dark/bright mode
                        border: isDarkMode ? "1px solid gray" : "1px solid #5e5d5d"
                    },
                    centerSubPanelStyle: {
                        width: centerPanelWidth,
                        height: (window.innerHeight - 100),
                        backgroundColor: isDarkMode ? '#2e2d2d' : 'white',
                        border: isDarkMode ? "1px solid gray" : "1px solid #5e5d5d",
                        marginTop: "60px", // Adjust the margin-top to move the sub-panel up
                        marginBottom: "80px" // Remove margin-bottom
                    },
                    rightSubpanelStyle: {
                        overflow: 'scroll',
                        width: rightPanelWidth,
                        height: (window.innerHeight - 100),
                        backgroundColor: isDarkMode ? '#2e2d2d' : 'white',
                        border: isDarkMode ? "1px solid gray" : "1px solid #5e5d5d",
                        marginTop: "60px", /* Adjust the margin-top to move the sub-panel up */
                        marginBottom: "80px" /* Remove margin-bottom */
                    }
                };
            }
        };
    const { leftSubpanelStyle, centerSubPanelStyle, rightSubpanelStyle } = getPanelStyles();

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
        setShowDropdownToolbar(menu !== activeToolbarButton);
        setActiveToolbarButton(menu === activeToolbarButton ? '' : menu);
    };

    useEffect(() => {
        const modifiedInitialOptions = { ...initialOptions };
        const keys = Object.keys(modifiedInitialOptions);
        if (keys.length > 0) {
            modifiedInitialOptions[keys[0]] = false;
        }
        if (shouldUpdateSelectedOptions) {
            setOptions(modifiedInitialOptions);
            setSelectedOptions(modifiedInitialOptions);
        }
    }, [initialOptions]);

    const resetInitialConditions = (e) => {
        setIsChecked(e.target.checked);
        handleTextChange(getContentOfActiveTab(), !isChecked, false);
    }

    // Example logic in DropdownWithPopup
    const onExportSBMLSelected = () => {
      // Assuming `getContentOfActiveTab` or similar method exists to get the current content
      const antimonyContent = getContentOfActiveTab(); // You need to implement this
      handleExportSBML(antimonyContent);
    }

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (showDropdownToolbar && fileDropdownRef.current) {
            if (!fileDropdownRef.current.contains(event.target)) {
                setShowDropdownToolbar(false);
            }
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        // Clean up event listener
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [showDropdownToolbar]); // Dependency on showDropdownToolbar to add/remove the listener appropriately

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
    const dropdownXAxisButtonStyle = {
        backgroundColor: isDarkMode ? '#242323' : '#c4c2c2',
        color: isDarkMode ? 'white' : 'black'
    }

    const handleSlideButtonClick = () => {
        setShowSplitView(!showSplitView); // Toggle the split view on button click
    };

    return (
        <>
            <div className={`main-container ${isDarkMode ? 'dark-mode' : 'bright-mode'}`}>
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

                            <div className={"simulate-reset-buttons"}>
                            <SimulationParameters
                                className={"border-with-text-simulation"}
                                isDarkMode={isDarkMode}
                                onParametersChange={onParametersChange}
                                simulationParam={simulationParam}
                            />
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between', // Distribute items evenly along the main axis
                                    width: '100%', // Ensure full width of the container
                                }}>
                                    <button className={"simulate-style"}
                                        style={{
                                            color: isDarkMode ? "white" : "black"
                                        }}
                                        onClick={handleSimulateButtonClick}>Simulate</button>
                                    <button className={"simulate-style"}
                                        style={{
                                            marginLeft:'-10px',
                                            color: isDarkMode ? "white" : "black"
                                        }}
                                        onClick={() => handleLocalReset(getContentOfActiveTab(), isChecked)}>Reset</button>
                                    <button onClick={handleSlideButtonClick}>Slider</button>
                                </div>

                            </div>
                            <div className="text-checkbox-input">
                                <label style={{
                                    color: isDarkMode ? "white" : "black"
                                }}>
                                    <input
                                        className={"checkbox-input"}
                                        checked={isChecked}
                                        type="checkbox"
                                        onChange={resetInitialConditions}
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
                                    onClick={() => {
                                        setShowXDropdown(!showXDropdown);
                                        setShowXDropdownButtons(!showXDropdownButtons)}}
                                > {selectedXOption} </button>
                                {showXDropdown && ( // This dropdown will show for both X and Y axis buttons
                                        <DropdownContainers
                                            key={JSON.stringify(options)}
                                            className={"dropdown-container"}
                                            onXOptionSelected={handleXOptionSelected}
                                            isDarkMode={isDarkMode}
                                            options={options}
                                            xAxis={true}
                                            withCheckboxes={false}
                                            dropdownStyle={dropdownStyle}
                                            dropdownToolbarButtonsStyle={dropdownXAxisButtonStyle}
                                            dropdown_toolbar_buttons_style={"dropdown-toolbar-button-xAxis"}
                                            setShowXDropdown={setShowXDropdown}
                                            showXDropdown={showXDropdown}
                                            setShowXDropdownButtons={setShowXDropdownButtons}
                                            showXDropdownButtons={showXDropdownButtons}
                                            selectedXOption={selectedXOption}
                                            setSelectedXOption={setSelectedXOption}
                                        />
                                    )}
                                {showXDropdownButtons && (
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
                                > Select Y </button>
                                {showDropdown && ( // This dropdown will show for both X and Y axis buttons
                                    <DropdownContainers
                                        key={JSON.stringify(options)}
                                        updateOptions={updateSelectedOptions}
                                        className={"dropdown-container"}
                                        isDarkMode={isDarkMode}
                                        withCheckboxes={true}
                                        options={options}
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
                <div className={"panels-container"} style={{ flexDirection: layoutVertical ? 'column' : 'row', width: `${window.innerWidth - panelWidth}px`}}>
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
                    <div ref={rightPanelRef} className="right-subpanel" style={rightSubpanelStyle}>
                        {!layoutVertical && (
                                <ResizingHandle
                                    panelRef={rightPanelRef}
                                    resizingRef={rightResizingRef}
                                    handleResize={handleRightResize}
                                    resizeStyle={"resize-right-handle"}
                                    isRightPanel={true}
                                />
                        )}
                        <div className="graphs-container">
                                    <PlotGraph
                                        ref={plotGraphRef}
                                        selectedOptions={selectedOptions}
                                        xAxis_selected_option={xAxis_selected_option}
                                        data={data}
                                        rightPanelWidth={rightPanelWidth}
                                        rightPanelHeight={window.innerHeight}
                                        isDarkMode={isDarkMode}/>
                                    {initialGraphState.showSettings && (
                                        <div>
                                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                                <div style={{ marginRight: '10px' }}>
                                                    <NumberInput label="X Minimum:" value={initialGraphState.xMin} onChange={(newValue) => updateGraphSetting(index, 'xMin', newValue)} />
                                                    <NumberInput label="X Maximum:" value={initialGraphState.xMax} onChange={(newValue) => updateGraphSetting(index, 'xMax', newValue)} />
                                                </div>
                                                <div>
                                                    <NumberInput label="Y Minimum:" value={initialGraphState.yMin} onChange={(newValue) => updateGraphSetting(index, 'yMin', newValue)} />
                                                    <NumberInput label="Y Maximum:" value={initialGraphState.yMax} onChange={(newValue) => updateGraphSetting(index, 'yMax', newValue)} />
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
                                                                        const isChecked = e.target.checked;
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
                    </div>
                </div>
                <div className="top-menu">
                        <div ref={fileDropdownRef} className={"container-of-toolbar-and-dropdown"}>
                            <button className="top-menu-button" style={{
                                backgroundColor: isDarkMode ? "#2e2d2d" : "white",
                                color: isDarkMode ? "white" : "black"
                            }} onClick={() => handleToolbarButtons('File')}>File</button>
                            {activeToolbarButton === 'File' && showDropdownToolbar && (
                                <DropdownContainers
                                    onDownloadPDF={handleDownloadPDF}
                                    onExportSBMLSelected={onExportSBMLSelected}
                                    SBMLContent={SBMLContent}
                                    onImportSBML={onImportSBML}
                                    onContentSelect={handleContentSelect}
                                    className={"dropdown-file-container"}
                                    dropdownToolbarStyle={dropdownToolbarStyle}
                                    dropdownToolbarButtonsStyle={dropdownToolbarButtonsStyle}
                                    options={fileItems}
                                    dropdownStyle={dropdownStyle}
                                    withCheckboxes={false}
                                    xAxis={false}
                                    dropdown_toolbar_buttons_style={"dropdown-toolbar-button-file"}
                                    setShowDropdownToolbar={setShowDropdownToolbar}
                                    addNewTab={addNewTab}
                                />
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
                                    xAxis={false}
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
                                    xAxis={false}
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
                                    xAxis={false}
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
                                    xAxis={false}
                                    dropdown_toolbar_buttons_style={"dropdown-toolbar-button-help"}
                                />
                            )}
                        </div>
                        <button onClick={toggleDarkMode} title={modeTooltip}>
                            {modeIcon}
                        </button>
                    </div>
            </div>
        </>
    );
};
export default DropdownWithPopup;


