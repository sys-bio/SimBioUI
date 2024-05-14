import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js-basic-dist';
import jsPDF from 'jspdf';

class PlotGraph extends Component {
    constructor(props) {
        super(props);
        this.plotRef = React.createRef();
    }

    downloadPDF = () => {
        const gd = this.plotRef.current.el;
        const { rightPanelWidth, rightPanelHeight } = this.props;

        Plotly.toImage(gd, {
            format: 'png',
            width: rightPanelWidth * 0.95,
            height: rightPanelHeight * 0.45
        }).then((url) => {
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [rightPanelWidth * 0.95, rightPanelHeight * 0.45]
            });
            pdf.addImage(url, 'PNG', 0, 0);
            pdf.save('plot.pdf');
        });
    };

    render() {

        let indexOfX;
        let name_of_xAxis;
        if (this.props.xAxis_selected_option == null) {
            indexOfX = 0;
            name_of_xAxis = "Time";
        } else {
            indexOfX = this.props.data.titles.indexOf(this.props.xAxis_selected_option);
            name_of_xAxis = this.props.xAxis_selected_option;
        }
        const { rightPanelWidth, rightPanelHeight, isDarkMode } = this.props;
        const baseFontSize = 12;
        const dynamicFontSize = Math.max(baseFontSize, (rightPanelWidth / 500) * baseFontSize);
        const xValues = this.props.data.columns[indexOfX];
        const plotsCount = this.props.data.columns.length;
        // Generate plot data configurations dynamically, but filter based on selected options
        const plotData = [];
        const colors = ['black', 'light blue', 'green', 'red', 'purple', 'yellow', 'cyan', 'magenta'];
        if (this.props.data.titles) {
            for (let i = 0; i <= plotsCount; i++) {
                if (this.props.selectedOptions[this.props.data.titles[i]]) { // Check if the option for this series is true
                    plotData.push({
                        x: xValues,
                        y: this.props.data.columns[i],
                        type: 'scatter',
                        mode: 'lines',
                        name: this.props.data.titles[i],
                        marker: { color: colors[i % colors.length] }, // Alternate color for even series
                        line: { width: 2 },
                    });
                }
            }
        }

        return (
            <div>
                <Plot
                    ref={this.plotRef}
                    data={plotData}
                    layout={{
                        width: rightPanelWidth * 0.95,
                        height: rightPanelHeight * 0.45,
                        title: {
                            text: 'Transition of substances in chemical reaction',
                            font: {
                                color: isDarkMode ? 'black' : 'white',
                                size: dynamicFontSize, // Apply dynamic font size
                            },
                        },
                        paper_bgcolor: isDarkMode ? 'white' : '#c4c2c2', // Dark background color
                        plot_bgcolor: isDarkMode ? 'white' : '#c4c2c2', // Dark background color
                        xaxis: {
                            title: {
                                text: name_of_xAxis,
                                font: {
                                    color: isDarkMode ? 'black' : 'white',
                                    size: dynamicFontSize, // Apply dynamic font size
                                },
                            },
                            tickfont: {
                                color: isDarkMode ? 'black' : 'white',
                                size: dynamicFontSize * 0.8, // Smaller font size for ticks
                            },
                            gridcolor: isDarkMode ? '#d4cfcf' : 'gray', // Lighter gray for visibility on dark background
                            zerolinecolor: 'black',
                        },
                        yaxis: {
                            title: {
                                text: 'Entities',
                                font: {
                                    color: isDarkMode ? 'black' : 'white',
                                    size: dynamicFontSize, // Apply dynamic font size
                                },
                            },
                            tickfont: {
                                color: isDarkMode ? 'black' : 'white',
                                size: dynamicFontSize * 0.8, // Smaller font size for ticks
                            },
                            gridcolor: isDarkMode ? '#d4cfcf' : 'gray', // Lighter gray for visibility on dark background
                            zerolinecolor: 'black', // Color for y=0 line, match gridcolor for consistency

                        },
                    }}
                />
            </div>
        );
    }
}

export default PlotGraph;