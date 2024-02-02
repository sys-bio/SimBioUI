import React from 'react';
import CustomScrollbar from './CustomScrollBar';
import './CSS/Left Sub Panel/dropdown-components.css'

const YAxis = ({className, options, setOptions, dropdownStyle, dropdownListStyle }) => {
    const toggleOptionSpecific = (optionValue) => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            [optionValue]: !prevOptions[optionValue], // Toggle the checkbox state
        }));
    };

    return (
        <div className={className} style={dropdownListStyle}>
            <div
                style={{
                    ...dropdownStyle,
                    ...dropdownListStyle,
                    display: 'block',
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
    );
};

export default YAxis;
