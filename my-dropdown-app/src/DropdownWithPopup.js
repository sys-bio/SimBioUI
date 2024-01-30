import React, { useState } from 'react';
import CustomScrollbar from './CustomScrollBar'; // Replace with the correct path to your CustomScrollbar component
import './CSS/Left Sub Panel/main-container.css'
import './CSS/Left Sub Panel/custom-scroll-bar.css'
import './CSS/Left Sub Panel/popup-components.css'
import './CSS/Left Sub Panel/dropdown-components.css'
import './CSS/Left Sub Panel/border-with-text.css'
import './CSS/Center Panel/center-subpanel.css'
import './CSS/Center Panel/centered-input.css'
const DropdownWithPopup = ({ initialOptions = [], additionalElements = [] }) => {

    const [showDropdown, setShowDropdown] = useState(false);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [options, setOptions] = useState(initialOptions);
    const [selectedElements, setSelectedElements] = useState([]);
    const [showDropdownButtons, setShowDropdownButtons] = useState(false);

    const toggleOption = (optionValue) => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            [optionValue]: true,
        }));
    };

    const toggleOptionSpecific = (optionValue) => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            [optionValue]: !prevOptions[optionValue], // Toggle the checkbox state
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

    const dropdownListStyle = {
        maxHeight: '200px', // Set a max height if more than 3 visible options
        overflowY: 'scroll', // Show scrollbar if more than 3 visible options
    };

    return (
        <div className="main-container">
            <div className="left-subpanel">
                <div className={"text-simulation"}>
                    Time Course Simulation
                    <button className={"config-button"}>Config</button>
                </div>
                <div className="border-with-text-simulation">
                    <span className="text-on-border-simulation">Simulation Parameters</span>
                    <div className={"small-text"}>Time Start:
                        <input
                            className={"parameter-input"}
                            type="text"
                            placeholder="0.0"
                            onChange={(e) => {
                                // Handle input change here
                                const value = e.target.value;
                                // You can store or use the input value as needed
                            }}
                        /></div>
                    <div className={"small-text"}>Time End:
                        <input
                            className={"parameter-input"}
                            type="text"
                            placeholder="40.0"
                            onChange={(e) => {
                                // Handle input change here
                                const value = e.target.value;
                                // You can store or use the input value as needed
                            }}
                        /></div>
                    <div className={"small-text"}>Number of points:
                        <input
                            className={"parameter-input"}
                            type="text"
                            placeholder="100"
                            onChange={(e) => {
                                // Handle input change here
                                const value = e.target.value;
                                // You can store or use the input value as needed
                            }}
                        />
                    </div>
                </div>
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
                <div className="xy-button">
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
                            <div className="dropdown-container" style={dropdownListStyle}>
                                <div
                                    style={{
                                        ...dropdownStyle,
                                        ...dropdownListStyle,
                                        display: 'block'
                                    }}
                                    className="dropdown-list"
                                >
                                    <CustomScrollbar>
                                        <div className="dropdown-list">
                                            {Object.keys(options).map((option) => (
                                                <div key={option}>
                                                    <input
                                                        type="checkbox"
                                                        id={`checkbox-${option}`}
                                                        checked={options[option]}
                                                        onChange={() => toggleOptionSpecific(option)}
                                                    />
                                                    <label htmlFor={`checkbox-${option}`}>{option}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </CustomScrollbar>
                                </div>
                            </div>
                        )}
                        {showDropdownButtons && (
                            <div className="dropdown-buttons">
                                <button onClick={selectAllOptions}>Select all</button>
                                <button onClick={unselectAllOptions}>Unselect all</button>
                                <button onClick={deleteOptions}>Delete</button>
                                <button onClick={() => setShowMoreOptions(true)}>More options</button>
                            </div>
                        )}
                    </div>
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
                <div className="centered-input-box" contentEditable="true">
                    <input type="text" />
                </div>
            </div>
        </div>
    );
};

export default DropdownWithPopup;