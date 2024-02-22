import React from 'react';
import Plot from 'react-plotly.js';

const PlotGraph = ({xData, yData1, yData2, rightPanelWidth, rightPanelHeight, isDarkMode}) => {
    const baseFontSize = 12;
    const dynamicFontSize = Math.max(baseFontSize, (rightPanelWidth / 500) * baseFontSize);

    return (
        <div>
            <Plot
                data={[
                    {
                        x: xData,
                        y: yData1,
                        type: 'scatter',
                        mode: 'lines+markers',
                        name: 'Line 1',
                        marker: {color: isDarkMode ? 'black' : 'white'}, // Ensure visibility on dark background
                    },
                    {
                        x: xData,
                        y: yData2,
                        type: 'scatter',
                        mode: 'lines+markers',
                        name: 'Line 2',
                        marker: {color: 'red'}, // Ensure visibility on dark background
                    },
                ]}
                layout={{
                    width: rightPanelWidth * 0.95,
                    height: rightPanelHeight * 0.4,
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
};

export default PlotGraph;
