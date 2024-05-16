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
        const { rightPanelWidth, rightPanelHeight, isDarkMode, isXAutoscaleChecked, isYAutoscaleChecked, graphState } = this.props;

        let indexOfX;
        let name_of_xAxis;
        if (this.props.xAxis_selected_option == null) {
            indexOfX = 0;
            name_of_xAxis = "Time";
        } else {
            indexOfX = this.props.data.titles.indexOf(this.props.xAxis_selected_option);
            name_of_xAxis = this.props.xAxis_selected_option;
        }

        const baseFontSize = 12;
        const dynamicFontSize = Math.max(baseFontSize, (rightPanelWidth / 500) * baseFontSize);
        const xValues = this.props.data.columns[indexOfX];
        const plotsCount = this.props.data.columns.length;

        // Generate plot data configurations dynamically, but filter based on selected options
        const plotData = [];
        const colors = ['black', 'light blue', 'green', 'red', 'purple', 'yellow', 'cyan', 'magenta'];
        if (this.props.data.titles) {
            for (let i = 0; i < plotsCount; i++) {
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

        let xaxisRange, yaxisRange;

        if (isXAutoscaleChecked || parseFloat(graphState.xMin) >= parseFloat(graphState.xMax)) {
            xaxisRange = undefined; // Keep the previous value or use autoscale
        } else {
            xaxisRange = [parseFloat(graphState.xMin), parseFloat(graphState.xMax)];
        }

        if (isYAutoscaleChecked || parseFloat(graphState.yMin) >= parseFloat(graphState.yMax)) {
            yaxisRange = undefined; // Keep the previous value or use autoscale
        } else {
            yaxisRange = [parseFloat(graphState.yMin), parseFloat(graphState.yMax)];
        }

        console.log(graphState.xMin);
        console.log(graphState.xMax);
        return (
            <div>
                <Plot
                    ref={this.plotRef}
                    data={plotData}
                    layout={{
                        width: rightPanelWidth * 0.95,
                        height: rightPanelHeight * 0.60,
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
                                size: dynamicFontSize * 0.8
                            },
                            gridcolor: isDarkMode ? 'white' : '#c4c2c2',
                            zeroline: false,
                            range: xaxisRange,
                            autorange: isXAutoscaleChecked,
                            showline: true
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
                            gridcolor: isDarkMode ? 'white' : '#c4c2c2',
                            range: yaxisRange,
                            zeroline: false,
                            autorange: isYAutoscaleChecked,
                            showline: true,
                            linecolor: 'black'
                        },
                    }}
                    config={{
                        staticPlot: true, // Disable all interactions
                        displayModeBar: false, // Hide the mode bar
                    }}
                />
            </div>
        );
    }
}

export default PlotGraph;
