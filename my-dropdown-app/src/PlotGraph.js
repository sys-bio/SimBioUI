import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class PlotGraph extends Component {
    render() {
        const { rightPanelWidth, rightPanelHeight, isDarkMode } = this.props;
        const baseFontSize = 12;
        const dynamicFontSize = Math.max(baseFontSize, (rightPanelWidth / 500) * baseFontSize);
        const xValues = this.props.data.columns[0];
        const plotsCount = this.props.data.columns.length - 1; // Excluding x-axis column

        // Generate plot data configurations dynamically
        const plotData = [];
        for (let i = 1; i <= plotsCount; i++) {
            plotData.push({
                x: xValues,
                y: this.props.data.columns[i],
                type: 'scatter',
                mode: 'lines+markers',
                name: `Line ${i}`,
                marker: { color: i % 2 === 0 ? 'red' : (isDarkMode ? 'black' : 'white') }, // Alternate color for even series
                line: { width: 1 },
            });
        }
        return (
            <div>
                <Plot
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
                                text: 'X-axis Label',
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
                            zerolinecolor: 'black', // Color for x=0 line, match gridcolor for consistency

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

                        }
                    }}
                />
            </div>
        );
    }
}

export default PlotGraph;