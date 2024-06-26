import React, { PureComponent, forwardRef } from 'react';
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js-basic-dist';
import jsPDF from 'jspdf';
import DraggableLegend from '../draggable/DraggableLegend';

class PlotGraph extends PureComponent {
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
        const { rightPanelWidth, rightPanelHeight, isXAutoscaleChecked, isYAutoscaleChecked, graphState } = this.props;
        let indexOfX;
        let name_of_xAxis;
        if (this.props.data.titles !== undefined) {
            if (this.props.xAxis_selected_option == null) {
                indexOfX = 0;
                name_of_xAxis = "Time";
            } else {
                indexOfX = this.props.data.titles.indexOf(this.props.xAxis_selected_option);
                name_of_xAxis = this.props.xAxis_selected_option;
            }
        }

        const baseFontSize = 12;
        const dynamicFontSize = Math.max(baseFontSize, (rightPanelWidth / 500) * baseFontSize);
        const xValues = this.props.data.columns[indexOfX];
        const plotsCount = this.props.data.columns.length;
        const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

        const plotData = [];
        if (this.props.data.titles) {
            for (let i = 0; i < plotsCount; i++) {
                if (this.props.selectedOptions[this.props.data.titles[i]]) {
                    plotData.push({
                        x: xValues,
                        y: this.props.data.columns[i],
                        type: 'scatter',
                        mode: 'lines',
                        marker: { color: colors[i % colors.length] },
                        line: { width: 2 },
                    });
                }
            }
        }

        let xaxisRange, yaxisRange;
        if (isXAutoscaleChecked) {
            xaxisRange = [parseFloat(this.props.simulationParam.simulationParameters.timeStart), parseFloat(this.props.simulationParam.simulationParameters.timeEnd)];
        } else {
            if (parseFloat(graphState.xMin) >= parseFloat(graphState.xMax)) {
                xaxisRange = undefined; // Keep the previous value or use autoscale
            } else {
                xaxisRange = [parseFloat(graphState.xMin), parseFloat(graphState.xMax)];
            }
        }

        if (parseFloat(graphState.yMin) >= parseFloat(graphState.yMax)) {
            yaxisRange = undefined; // Keep the previous value or use autoscale
        } else {
            yaxisRange = [parseFloat(graphState.yMin), parseFloat(graphState.yMax)];
        }

        // Calculate dtick for x and y axis based on the grid count and axis range
        const xMajorDTick = xaxisRange ? (xaxisRange[1] - xaxisRange[0]) / this.props.xMajorGridCount : null;
        const yMajorDTick = yaxisRange ? (yaxisRange[1] - yaxisRange[0]) / this.props.yMajorGridCount : null;
        const xMinorDTick = xMajorDTick / this.props.xMinorGridCount;
        const yMinorDTick = yMajorDTick / this.props.yMinorGridCount;

        return (
            <div>
                <Plot
                    ref={this.plotRef}
                    data={plotData}
                    layout={{
                        width: rightPanelWidth * 0.95,
                        height: rightPanelHeight * 0.60,
                        title: {
                            text: this.props.titleVisible ? this.props.graphTitleName : "",
                            font: {
                                color: this.props.selectedColor,
                                size: dynamicFontSize,
                            },
                        },
                        paper_bgcolor: this.props.selectedGraphBackgroundColor,
                        plot_bgcolor: this.props.selectedGraphDrawingAreaColor,
                        xaxis: {
                            title: {
                                text: this.props.xAxisTitleIsShown ? (this.props.nameOfXAxisUserInput !== '' ? this.props.nameOfXAxisUserInput : name_of_xAxis) : '',
                                font: {
                                    color: 'black',
                                    size: dynamicFontSize,
                                },
                            },
                            tickfont: {
                                color: 'black',
                                size: dynamicFontSize * 0.8,
                            },
                            gridcolor: this.props.isXMajorGridOn ? this.props.xMajorGridColor : this.props.selectedGraphDrawingAreaColor,
                            gridwidth: this.props.isXMajorGridOn ? this.props.xMajorGridWidth : 0,
                            zeroline: false,
                            range: xaxisRange,
                            autorange: isXAutoscaleChecked,
                            showline: this.props.includeGraphBorder ? false : true,
                            tickmode: 'linear',
                            dtick: xMajorDTick,
                            showgrid: this.props.isXMajorGridOn,
                            showticklabels: this.props.showXMajorTicks,
                            color: this.props.includeGraphBorder ? this.props.selectedGraphBorderColor : this.props.colorForXAxis, // Set the color of the x-axis line directly
                            minor: {
                                showgrid: this.props.isXMinorGridOn,
                                gridcolor: this.props.isXMinorGridOn ? this.props.xMinorGridColor : this.props.selectedGraphDrawingAreaColor,
                                gridwidth: this.props.isXMinorGridOn ? this.props.xMinorGridWidth : 0,
                                dtick: xMinorDTick,
                            },
                        },

                        yaxis: {
                            title: {
                                text: this.props.yAxisTitleIsShown ? (this.props.nameOfYAxisUserInput !== '' ? this.props.nameOfYAxisUserInput : 'Entities') : '',
                                font: {
                                    color: 'black',
                                    size: dynamicFontSize,
                                },
                            },
                            tickfont: {
                                color: 'black',
                                size: dynamicFontSize * 0.8,
                            },
                            gridcolor: this.props.isYMajorGridOn ? this.props.yMajorGridColor : this.props.selectedGraphDrawingAreaColor,
                            gridwidth: this.props.isYMajorGridOn ? this.props.yMajorGridWidth : 0,
                            range: yaxisRange,
                            zeroline: false,
                            autorange: isYAutoscaleChecked,
                            showline: this.props.includeGraphBorder ? false : true,
                            tickmode: 'linear',
                            dtick: yMajorDTick,
                            showgrid: this.props.isYMajorGridOn,
                            showticklabels: this.props.showYMajorTicks,
                            color: this.props.includeGraphBorder ? this.props.selectedGraphBorderColor : this.props.colorForYAxis,
                            minor: {
                                showgrid: this.props.isYMinorGridOn,
                                gridcolor: this.props.isYMinorGridOn ? this.props.yMinorGridColor : this.props.selectedGraphDrawingAreaColor,
                                gridwidth: this.props.isYMinorGridOn ? this.props.yMinorGridWidth : 0,
                                dtick: yMinorDTick
                            },
                        },
                        showlegend: false,
                        shapes: this.props.includeGraphBorder ? [
                            {
                                type: 'rect',
                                xref: 'paper',
                                yref: 'paper',
                                x0: 0,
                                y0: 0,
                                x1: 1,
                                y1: 1,
                                line: {
                                    color: this.props.selectedGraphBorderColor,
                                    width: this.props.borderWidth === '' ? 0.5 : this.props.borderWidth,
                                },
                            },
                        ] : [],
                        margin: {
                            l: 50,
                            r: 50,
                            b: 50,
                            t: 50,
                        }
                    }}
                    config={{
                        displayModeBar: false,
                    }}
                />
                {this.props.isShowLegendChecked &&
                <DraggableLegend
                    data={this.props.data}
                    selectedOptions={this.props.selectedOptions}
                    colors={colors}
                    isLegendFrameBorderOn={this.props.isLegendFrameBorderOn}
                    legendFrameColor={this.props.legendFrameColor}
                    legendFrameWidth={this.props.legendFrameWidth}
                    legendFrameGap={this.props.legendFrameGap}
                    legendFrameLineLength={this.props.legendFrameLineLength}
                    legendFrameInteriorColor={this.props.legendFrameInteriorColor}
                />
                }
            </div>
        );
    }
}

export default forwardRef((props, ref) => <PlotGraph {...props} ref={ref} />);
