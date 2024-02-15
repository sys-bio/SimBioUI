import React from 'react';
import './CSS/Left Sub Panel/dropdown-components.css'

const YAxis = ({className, options, setOptions, dropdownStyle, withCheckboxes, func, dropdown_toolbar_buttons_style}) => {
    const toggleOptionSpecific = (optionValue) => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            [optionValue]: !prevOptions[optionValue], // Toggle the checkbox state
        }));
    };
    const handleButtonClick = (item) => {
        // Check if func is a function before calling it
        if (typeof func === 'function') {
            func(item);
        }
    };
    return (
        <div className={className}>
            <div
                style={{
                    ...dropdownStyle,
                    display: 'block',
                    maxHeight: '200px', // Ensure the dropdown has a maximum height
                    overflowY: 'scroll', // Add scroll if content overflows
                }}
                className="dropdown-list"
            >
                {withCheckboxes ? (
                    Object.keys(options).map((option) => (
                        <div key={option} className="dropdown-checkbox-item">
                            <input
                                type="checkbox"
                                id={`checkbox-${option}`}
                                checked={options[option]}
                                onChange={() => toggleOptionSpecific(option)}
                            />
                            <label htmlFor={`checkbox-${option}`}>{option}</label>
                        </div>
                    ))
                ) : (
                    <div className={className} style={dropdownStyle}>
                        <div
                            style={{
                                backgroundColor: '#1f1f1e',
                                borderRadius: '6px',
                                border: '1px solid gray'
                            }}
                            className="dropdown-list-toolbar"
                        >
                            {options.map((item, index) => (
                                <button
                                    key={index}
                                    className={dropdown_toolbar_buttons_style}
                                    onClick={() => handleButtonClick(item)}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default YAxis;
