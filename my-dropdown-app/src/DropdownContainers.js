import React, { Component } from 'react';
import './CSS/Left Sub Panel/dropdown-components.css';

class DropdownContainers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: this.props.options,
            showExportModal: false, // Whether to show the export modal
            customFilename: 'exported_model.xml',
        };
        this.fileInputRef = React.createRef();
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    toggleOptionSpecific = (optionValue) => {
        this.setState(prevState => ({
            options: {
                ...prevState.options,
                [optionValue]: !prevState.options[optionValue]
            }
        }), () => {
            this.props.updateOptions(this.state.options);
        });
    };


    handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                const fileName = file.name;
                const fileExtension = fileName.split('.').pop().toLowerCase();
                switch (fileExtension) {
                    case 'txt':
                    case 'ant':
                        // Process as text file
                        if (typeof this.props.onContentSelect === 'function') {
                            this.props.onContentSelect(fileContent);
                        }
                        break;
                    case 'xml':
                        if (typeof this.props.onContentSelect === 'function') {
                            this.props.onImportSBML(fileContent);
                        }
                        break;
                    default:
                        console.error("Unsupported file format");
                }
            };
            reader.readAsText(file);
        }
    };
    exportSBMLFile = () => {
        const filename = "exported_model.xml";
        const content = this.props.SBMLContent;
        if (!content) {
            console.error("SBML content is empty or undefined.");
            return;
        }

        // Create a Blob from the SBML content
        const blob = new Blob([content], { type: 'application/xml' });

        // Create a temporary link to trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;

        // Append to the document and trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up by removing the link
        document.body.removeChild(link);
    };

    handleButtonClick = (item) => {
        if (item === "Open...") {
            this.fileInputRef.current.click();
        } else if (item === "Import SBML...") {
            this.fileInputRef.current.click();
        } else if (item === "New Window") {
            window.open('https://sys-bio.github.io/SimBioUI/', '_blank');
        } else if (item === "Export SBML...") {
            this.props.onExportSBMLSelected();
        } else if (item === "Save Graph as PDF") {
             this.props.onDownloadPDF();
        } else {
            if (typeof this.props.func === 'function') {
                this.props.func(item);
            }
        }
    };

    render() {
        const { className, dropdownToolbarStyle, dropdownToolbarButtonsStyle, isDarkMode, dropdownStyle, withCheckboxes, dropdown_toolbar_buttons_style } = this.props;
        const { options } = this.state;
        console.log(this.props.SBMLContent);
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
