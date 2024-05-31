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
        const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']

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
                                size: dynamicFontSize * 0.8
                            },
                            gridcolor: this.props.selectedGraphDrawingAreaColor,
                            zeroline: false,
                            range: xaxisRange,
                            autorange: isXAutoscaleChecked,
                            showline: false
                        },
                        yaxis: {
                            title: {
                                text: 'Entities',
                                font: {
                                    color: 'black',
                                    size: dynamicFontSize,
                                },
                            },
                            tickfont: {
                                color: 'black',
                                size: dynamicFontSize * 0.8,
                            },
                            gridcolor: this.props.selectedGraphDrawingAreaColor,
                            range: yaxisRange,
                            zeroline: false,
                            autorange: isYAutoscaleChecked,
                            showline: false,
                            linecolor: 'black'
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
                                    width: this.props.borderWidth == '' ? 0.5 : this.props.borderWidth,
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
                {this.props.isShowLegendChecked && <DraggableLegend data={this.props.data} selectedOptions={this.props.selectedOptions} colors={colors}/>}
            </div>
        );
    }
}

export default forwardRef((props, ref) => <PlotGraph {...props} ref={ref} />);
