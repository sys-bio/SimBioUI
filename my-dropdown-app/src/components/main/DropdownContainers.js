import React, { Component } from "react";
import "../../styles/leftSubPanel/dropdown-components.css";

class DropdownContainers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: this.props.options,
            showExportModal: false,
            customFilename: "exported_model.xml",
            fileInputAccept: "",
        };
        this.fileInputRef = React.createRef();
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    toggleOptionSpecific = (optionValue) => {
        this.setState(
            (prevState) => ({
                options: {
                    ...prevState.options,
                    [optionValue]: !prevState.options[optionValue],
                },
            }),
            () => {
                this.props.updateOptions(this.state.options);
            },
        );
    };

    handleFileSelect = (event) => {
        this.props.setActiveToolbarButton("");
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                const fileName = file.name;
                const fileExtension = fileName.split(".").pop().toLowerCase();
                switch (fileExtension) {
                    case "txt":
                    case "ant":
                        if (typeof this.props.onContentSelect === "function") {
                            this.props.onContentSelect(fileContent);
                        }
                        break;
                    case "xml":
                        if (typeof this.props.onImportSBML === "function") {
                            this.props.onImportSBML(fileContent);
                        }
                        break;
                    default:
                        console.error("Unsupported file format");
                }
            };
            reader.readAsText(file);
            this.props.setShowDropdownToolbar(false);
        }
    };

    exportSBMLFile = () => {
        const filename = "exported_model.xml";
        const content = this.props.SBMLContent;
        if (!content) {
            console.error("SBML content is empty or undefined.");
            return;
        }

        const blob = new Blob([content], { type: "application/xml" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    handleButtonClick = (item, isXAxis) => {
        if (isXAxis) {
            this.props.setSelectedXOption(item);
            this.props.onXOptionSelected(item);
            this.props.setShowXDropdown(!this.props.showXDropdown);
        } else {
            if (item === "Open...") {
                const acceptedFileTypes = ".txt,.ant";
                this.setState({ fileInputAccept: acceptedFileTypes }, () => {
                    this.props.setIsNewFileUploaded(true);
                    this.fileInputRef.current.click();
                });
            } else if (item === "New") {
                this.props.refreshCurrentTab();
                this.props.setShowDropdownToolbar(false);
                this.props.setActiveToolbarButton("");
            } else if (item === "Import SBML...") {
                // Set accepted file types for SBML (xml) files
                this.setState({ fileInputAccept: ".xml" }, () => {
                    this.props.setIsNewFileUploaded(true);
                    this.fileInputRef.current.click();
                });
            } else if (item === "New Window") {
                window.open("https://sys-bio.github.io/SimBioUI/", "_blank");
                this.props.setActiveToolbarButton("");
            } else if (item === "Export SBML...") {
                this.props.onExportSBMLSelected();
                this.props.setShowDropdownToolbar(false);
                this.props.setActiveToolbarButton("");
            } else if (item === "Save...") {
                this.props.onExportAntSelected();
                this.props.setShowDropdownToolbar(false);
                this.props.setActiveToolbarButton("");
            } else if (item === "Save Graph as PDF") {
                this.props.onDownloadPDF();
                this.props.setActiveToolbarButton("");
            } else if (item === "Example Models") {
                this.props.setShowDropdownToolbar(false);
                if (this.props.setShowExamplePopup) {
                    this.props.setShowExamplePopup(true);
                }
                this.props.setActiveToolbarButton("");
            } else if (item === "Help on Antimony") {
                window.open("https://tellurium.readthedocs.io/en/latest/antimony.html", "_blank");
                this.props.setActiveToolbarButton("");
            } else if (item === "Help...") {
                this.props.setShowDropdownToolbar(false);
                if (this.props.setShowHelpPopup) {
                    this.props.setShowHelpPopup(true);
                }
                this.props.setActiveToolbarButton("");
            } else {
                if (typeof this.props.func === "function") {
                    this.props.func(item);
                    this.props.setActiveToolbarButton("");
                }
            }
        }
    };

    render() {
        const {
            className,
            dropdownToolbarStyle,
            dropdownToolbarButtonsStyle,
            isDarkMode,
            dropdownStyle,
            xAxis,
            withCheckboxes,
            dropdown_toolbar_buttons_style,
        } = this.props;
        const { options, fileInputAccept } = this.state;
        return (
            <div
                className={`${className} ${isDarkMode ? "custom-scrollbar-xyaxis-dropdown-dark-mode" : "custom-scrollbar-light-mode"}`}
                style={{
                    ...dropdownStyle,
                    display: "block",
                    maxHeight: "200px",
                    backgroundColor: isDarkMode ? "#242323" : "white",
                }}
            >
                {withCheckboxes ? (
                    Object.keys(options).map((option) => (
                        <div key={option} style={{marginTop: '12px'}}>
                            <input
                                type="checkbox"
                                id={`checkbox-${option}`}
                                checked={options[option]}
                                onChange={() => this.toggleOptionSpecific(option)}
                            />
                            <label
                                htmlFor={`checkbox-${option}`}
                                style={{
                                    color: isDarkMode ? "white" : "black",
                                    fontSize: "12px",
                                }}
                            >
                                {option}
                            </label>
                        </div>
                    ))
                ) : (
                    <div
                    style={{backgroundColor: isDarkMode ? "#242323" : "white", borderRadius: '8px'}}>
                        {xAxis ? (
                          Object.keys(options).map((option, index) => (
                            <div key={option}>
                              <button
                                style={{
                                  ...dropdownToolbarButtonsStyle,
                                  display: 'flex',
                                  justifyContent: 'space-between',  // Space between text and checkmark
                                  paddingRight: '10px',  // Right padding to reserve space for the checkmark
                                }}
                                className={dropdown_toolbar_buttons_style}
                                onClick={() => this.handleButtonClick(option, true)}
                              >
                                {option}
                                {this.props.selectedXOption === option && (
                                  <span
                                    style={{
                                      fontSize: "15px",
                                      color: isDarkMode ? "white" : "black",
                                    }}
                                  >
                                    ✓
                                  </span>
                                )}
                              </button>
                            </div>
                          ))
                        ) : (
                            <div style={dropdownToolbarStyle} >
                                {options.map((item, index) => (
                                    <button
                                        key={index}
                                        style={dropdownToolbarButtonsStyle}
                                        className={dropdown_toolbar_buttons_style}
                                        onClick={() => this.handleButtonClick(item.label, false)}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                                <input
                                    type="file"
                                    ref={this.fileInputRef}
                                    accept={fileInputAccept}
                                    style={{ display: "none" }}
                                    onChange={this.handleFileSelect}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default DropdownContainers;
