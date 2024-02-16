import React from 'react';
import Plot from 'react-plotly.js';

const PlotGraph = ({xData, yData1, yData2, rightPanelWidth, rightPanelHeight, isDarkMode}) => {
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
                            color: isDarkMode ? 'black' : 'white', // For visibility on dark background
                        },
                    },
                    paper_bgcolor: isDarkMode ? 'white' : '#5e5d5d', // Dark background color
                    plot_bgcolor: isDarkMode ? 'white' : '#5e5d5d', // Dark background color
                    xaxis: {
                        title: {
                            text: 'X-axis Label',
                            standoff: 10,
                            font: {
                                color: isDarkMode ? 'black' : 'white', // For visibility on dark background
                            },
                        },
                        tickfont: {
                            color: isDarkMode ? 'black' : 'white', // For visibility on dark background
                        },
                        gridcolor: isDarkMode ? '#d4cfcf' : 'gray', // Lighter gray for visibility on dark background
                        zerolinecolor: isDarkMode ? 'black' : 'white', // Color for x=0 line, match gridcolor for consistency
                    },
                    yaxis: {
                        title: {
                            text: 'Entities',
                            standoff: 10,
                            font: {
                                color: isDarkMode ? 'black' : 'white', // For visibility on dark background
                            },
                        },
                        tickfont: {
                            color: isDarkMode ? 'black' : 'white', // For visibility on dark background
                        },
                        gridcolor: isDarkMode ? '#d4cfcf' : 'gray', // Lighter gray for visibility on dark background
                        zerolinecolor: isDarkMode ? 'black' : 'white', // Color for y=0 line, match gridcolor for consistency
                    }
                }}
            />

        </div>
    );
};

export default PlotGraph;
