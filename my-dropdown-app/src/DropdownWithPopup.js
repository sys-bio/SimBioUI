import React, { useState } from 'react';

const DropdownWithPopup = ({ initialOptions = [], additionalElements = [] }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [options, setOptions] = useState(initialOptions);
    const [selectedElements, setSelectedElements] = useState([]);

    const toggleOption = (optionValue) => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            [optionValue]: !prevOptions[optionValue],
        }));
    };

    const applySelectedElements = () => {
        selectedElements.forEach((element) => {
            toggleOption(element);
        });
        setSelectedElements([]);
        setShowMoreOptions(false);
    };

    const addElementToSelected = (element) => {
        setSelectedElements((prevSelected) => [...prevSelected, element]);
    };

    const selectAllOptions = () => {
        setOptions(Object.keys(options).reduce((acc, key) => {
            acc[key] = true;
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

    return (
        <div>
            <button onClick={() => setShowDropdown(!showDropdown)}>Options</button>
            <div style={{ display: showDropdown ? 'block' : 'none' }} className="dropdown-list">
                {Object.keys(options).map((option) => (
                    <div key={option}>
                        <input
                            type="checkbox"
                            id={`checkbox-${option}`}
                            checked={options[option]}
                            onChange={() => toggleOption(option)}
                        />
                        <label htmlFor={`checkbox-${option}`}>{option}</label>
                    </div>
                ))}
                <button onClick={selectAllOptions}>Select all</button>
                <button onClick={unselectAllOptions}>Unselect all</button>
                <button onClick={() => setShowMoreOptions(true)}>More options</button>
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
                        {selectedElements.map((element) => (
                            <div key={element}>{element}</div>
                        ))}
                    </div>
                    <div className="popup-top">
                        <button onClick={addAllElements}>Add All</button>
                        <button onClick={clearAllElements}>Clear All</button>
                    </div>
                    <div className="popup-bottom">
                        <button onClick={applySelectedElements}>Apply</button>
                        <button onClick={() => setShowMoreOptions(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownWithPopup;
