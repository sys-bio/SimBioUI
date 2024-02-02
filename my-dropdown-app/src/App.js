import React, {Component} from 'react';
import DropdownWithPopup from './DropdownWithPopup';
import {createCpsModule} from './copasijs'
import {COPASI} from './copasi'

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
                <DropdownWithPopup
                    initialOptions={initialOptions}
                    additionalElements={additionalElements}
                    xData={xData}
                    yData1={yData1}
                    yData2={yData2}
                />
                <header className="App-header">
                    <span>COPASI version: {this.state.copasi?.version}</span>
                </header>
            </div>
        );
    }
}

export default App;

