import React, { Component } from 'react';
import YAxis from "./YAxis";

class ToolbarDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeToolbarButton: '',
            showDropdownToolbar: false,
            fileItems: [
                { label: 'New Graph'},
                { label: 'New File'},
                { label: 'New Window'},
                { label: 'Open...'},
                { label: 'Save'},
                { label: 'Save As...'},
                { label: 'Import SBML...'},
                {label: 'Export SBML...'},
                {label: 'Save Graph as PDF'},
                {label: 'Quit'}
            ],
            analysisItems: [
                { label: 'Time Course Simulation'},
                { label: 'Steady-State'},
                { label: 'Parameter Scan'},
                { label: 'Real-Time Simulation'},
                { label: 'Structure Analysis'}
            ],
            optionsItems: [
                { label: 'Preferences...'},
                { label: 'Use Floating Graph'},
                { label: 'Save Configuration'}
            ],
            examplesItems: [
                { label: 'Example Models'}
            ],
            helpItems: [
                { label: 'Help...'},
                { label: 'Help on Antimony'},
                { label: 'About Iridium'}
            ]
        };
    }

    handleToolbarButtons = (menu) => {
        const { activeToolbarButton, showDropdownToolbar } = this.state;
        this.setState({
            showDropdownToolbar: menu !== activeToolbarButton || !showDropdownToolbar,
            activeToolbarButton: menu === activeToolbarButton ? '' : menu
        });
    };

    renderDropdownForButton = (button, items, containerClass, buttonStyle) => {
        const { activeToolbarButton, showDropdownToolbar } = this.state;
        const dropdownStyle = {
            backgroundColor: '#242323'
        };

        if (activeToolbarButton === button && showDropdownToolbar) {
            return (
                <YAxis
                    className={containerClass}
                    options={items}
                    dropdownStyle={dropdownStyle}
                    withCheckboxes={false}
                    dropdown_toolbar_buttons_style={buttonStyle}
                />
            );
        }
        return null;
    };

    render() {
        const { fileItems, analysisItems, optionsItems, examplesItems, helpItems } = this.state;

        return (
            <div className="top-menu">
                {/* Repeat this structure for each category of toolbar button */}
                <div className={"container-of-toolbar-and-dropdown"}>
                    <button className="top-menu-button" onClick={() => this.handleToolbarButtons('File')}>File</button>
                    {this.renderDropdownForButton('File', fileItems, "dropdown-file-container", "dropdown-toolbar-button-file")}
                </div>
                {/* Repeat for Analysis, Options, Examples, and Help with their respective items */}
            </div>
        );
    }
}

export default ToolbarDropdown;
