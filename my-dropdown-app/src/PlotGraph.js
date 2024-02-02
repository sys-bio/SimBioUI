import React from 'react';
import Plot from 'react-plotly.js';

const PlotGraph = ({xData, yData1, yData2}) => {
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
                    },
                    {
                        x: xData,
                        y: yData2,
                        type: 'scatter',
                        mode: 'lines+markers',
                        name: 'Line 2',
                    },
                ]}
                layout={{
                    width: 550,
                    height: 400,
                    title: 'Transition of substances in chemical reaction',
                    xaxis: {
                        title: {
                            text: 'X-axis Label', // Replace with your X-axis label
                            standoff: 10 // Optional: adjust the space between the tick labels and the axis title
                        },
                    },
                    yaxis: {
                        title: {
                            text: 'Entities', // Replace with your Y-axis label
                            standoff: 10 // Optional: adjust the space between the tick labels and the axis title
                        },
                    }
                }}>
            </Plot>
        </div>
    );
};

export default PlotGraph;
