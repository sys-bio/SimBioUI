import React from 'react';
import './CSS/Left Sub Panel/dropdown-components.css'

const YAxis = ({className, options, setOptions, dropdownStyle, dropdownListStyle }) => {
    const toggleOptionSpecific = (optionValue) => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            [optionValue]: !prevOptions[optionValue], // Toggle the checkbox state
        }));
    };

    return (
        <div className={className}>
            <div
                style={{
                    ...dropdownStyle,
                    display: 'block',
                    maxHeight: '200px', // Ensure the dropdown has a maximum height
                    overflowY: 'scroll', // Hide the default scrollbar
                }}
                className="dropdown-list"
            >
                    <div>
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
            </div>
        </div>
    );
};

export default YAxis;
