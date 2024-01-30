import React, {Component} from 'react';
import DropdownWithPopup from './DropdownWithPopup';
import {createCpsModule} from './copasijs'
import {COPASI} from './copasi'
import Plot from 'react-plotly.js';

export class App extends React.Component  {

    constructor(props) {
        super(props);
        this.state = { copasi: {version: 'not loaded'}, data: { columns: [[0], [0], [0]] }, info: null };
    };

    componentDidMount = () => {
        this.loadCopasiAPI();
    };

    loadCopasiAPI = async () => {
        try {
            const response = await fetch("brusselator.cps");
            const brusselator = await response.text();

            const cps = await createCpsModule();
            const instance = new COPASI(cps);

            const modelInfo = instance.loadModel(brusselator);
            const simResults = JSON.parse(instance.Module.simulate());

            this.setState({ copasi: instance, data: simResults, info: modelInfo });
        } catch (err) {
            console.error(`Error in loadCopasiAPI: ${err.message}`);
            // Additional error handling logic
        }
    };

    render() {
        const initialOptions = { '[A]': true, '[B]': true, '[C]': true };
        const additionalElements = ['[A]', '[B]', '[C]', 'S[2]', 'S[4]', 'S[6]', 'S[8]', 'S[10]', 'S[12]', 'S[14]',
            'J_0', 'J_1', 'J_2', 'J_3', 'J_4', 'J_5'];
        const xData = [1, 2, 3, 4, 5];
        const yData1 = [10, 12, 8, 15, 7];
        const yData2 = [5, 8, 10, 6, 9];
        return (
            <div className="App">
                <DropdownWithPopup initialOptions={initialOptions} additionalElements={additionalElements} />
                <header className="App-header">
                    <div className={"plot-container"}>
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
                                width: 500,
                                height: 600,
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
                    <span>COPASI version: {this.state.copasi?.version}</span>
                </header>
            </div>
        );
    }
}

export default App;

