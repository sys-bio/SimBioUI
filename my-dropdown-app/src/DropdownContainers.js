import React, { Component } from 'react';
import './CSS/Left Sub Panel/dropdown-components.css';

class DropdownContainers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: this.props.options,
        };
        this.fileInputRef = React.createRef();
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    toggleOptionSpecific = (optionValue) => {
        this.setState((prevState) => ({
            options: {
                ...prevState.options,
                [optionValue]: !prevState.options[optionValue], // Toggle the checkbox state
            },
        }));
    };

    handleButtonClick = (item) => {
        console.log("Button clicked:");
        if (item === "Import SBML...") {
            this.fileInputRef.current.click();
        } else {
            if (typeof this.props.func === 'function') {
                this.props.func(item);
            }
        }
    };

    handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Handle the file, e.g., uploading or processing
            console.log("Selected file:", file.name);
            // Optionally, you can call an upload function here
        }
    };

    render() {
        const { className, dropdownToolbarStyle, dropdownToolbarButtonsStyle, isDarkMode, dropdownStyle, withCheckboxes, dropdown_toolbar_buttons_style } = this.props;
        const { options } = this.state;
        return (
            <div className={className}>
                <div
                    style={{
                        ...dropdownStyle,
                        display: 'block',
                        maxHeight: '200px', // Ensure the dropdown has a maximum height
                        overflowY: 'scroll', // Add scroll if content overflows
                        backgroundColor: isDarkMode ? "#242323" : "#c4c2c2",
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
                                    onChange={() => this.toggleOptionSpecific(option)}
                                />
                                <label
                                    htmlFor={`checkbox-${option}`}
                                    style={{ color: isDarkMode ? "white" : "black" }} // Adjust label color based on isDarkMode
                                >
                                    {option}
                                </label>
                            </div>
                        ))
                    ) : (
                        <div className={className}>
                        <button onClick={() => console.log("Hi")}>Test Button</button>
                            <div
                                style={dropdownToolbarStyle}
                                className="dropdown-list-toolbar"
                            >
                                {options.map((item, index) => (
                                    <button
                                        key={index}
                                        style={dropdownToolbarButtonsStyle}
                                        className={dropdown_toolbar_buttons_style}
                                        onClick={() => this.handleButtonClick(item.label)}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                                <input
                                    type="file"
                                    ref={this.fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={this.handleFileSelect}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default DropdownContainers;
