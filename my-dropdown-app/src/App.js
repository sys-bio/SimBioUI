import React, {Component} from 'react';
import DropdownWithPopup from './DropdownWithPopup';
import SimulationParameters from './SimulationParameters';
import createCpsModule from './copasijs.js';
import COPASI from './copasi.js';
const libantimony = require('./libantimony.js'); // libantimony.js in local dir
var antimonyWrapper = require('./antimony_wrap.js');
var ant_wrap;

export class App extends React.Component  {

    constructor(props) {
        super(props);
        this.handleParametersChange = this.handleParametersChange.bind(this);
        this.state = {
            copasi: {version: 'not loaded'},
            data: { columns: [] },
            info: null,
            textareaContent: "",
            sbmlCode: "",
            sbmlExport:"",
            convertedAnt: "",
            simulationParameters: {
                timeStart: 0.0,
                timeEnd: 40.0,
                numPoints: 100
            }
        };
    };

    handleParametersChange = (parameterName, value) => {
        this.setState(prevState => ({
            simulationParameters: {
                ...prevState.simulationParameters,
                [parameterName]: parseFloat(value)
            }
        }));
    }

    loadAntimonyLib() {
      try {
        libantimony().then((libantimony) => {
          ant_wrap = new antimonyWrapper(libantimony);
          console.log('libantimony loaded');
          this.handleTextChange(this.state.textareaContent);
        });
      } catch (err) {
        console.log('Load libantimony Error: ', err);
      }
    }

    componentDidMount() {
        this.loadAntimonyLib(this.handleTextChange);
    }
    handleTextChange = (content) => {
        this.setState({textareaContent: content})
        //console.log(content);
        var sbml;
        if (content.trim() !== "") {
            const result = ant_wrap.convertAntimonyToSBML(content);
            if(result.isSuccess()) {
                sbml = result.getResult();
                this.setState({ sbmlCode: sbml }, () => {
                    this.loadCopasiAPI();
                });
            }
        }
    }

    handleSBMLfile = (content) => {
        var antCode;
        if (content.trim() !== "") {
            const res = ant_wrap.convertSBMLToAntimony(content);
            if (res.isSuccess()) {
                antCode = res.getResult();
                this.setState({ sbmlCode: content, convertedAnt: antCode}, () => {
                    this.loadCopasiAPI();
                });
            }
        }
    }

    // In App.js
    handleExportSBML = (antimonyContent, callback) => {
      if (antimonyContent.trim() !== "") {
        const result = ant_wrap.convertAntimonyToSBML(antimonyContent);
        if (result.isSuccess()) {
          const sbml = result.getResult();
          this.setState({ sbmlExport: sbml }, () => {
              // After state is updated, call the callback
              if (callback && typeof callback === 'function') {
                  callback();
              }
          });
        }
      }
    }

    handleResetInApp = (value) => {
        if (value === true) {
            this.setState({data: {columns: []}});
        }
    }

    loadCopasiAPI = async () => {
        try {
//            const response = await fetch(`${process.env.PUBLIC_URL}/brusselator-model.xml`);
//            const brusselator = await response.text();
            const { timeStart, timeEnd, numPoints } = this.state.simulationParameters;
            const cps = await createCpsModule();
            const instance = new COPASI(cps);

            const modelInfo = instance.loadModel(this.state.sbmlCode);
            const simResults = JSON.parse(instance.Module.simulateEx(timeStart,timeEnd,numPoints));
            this.setState({ copasi: instance, data: simResults, info: modelInfo });
        } catch (err) {
            console.error(`Error in loadCopasiAPI: ${err.message}`);
        }
    };

    render() {
        const initialOptions = { '[A]': true, '[B]': true, '[C]': true };
        const additionalElements = ['[A]', '[B]', '[C]', 'S[2]', 'S[4]', 'S[6]', 'S[8]', 'S[10]', 'S[12]', 'S[14]',
            'J_0', 'J_1', 'J_2', 'J_3', 'J_4', 'J_5'];
        const simulationParameters = this.state;
        return (
            <div className="App">
                <DropdownWithPopup
                    initialOptions={initialOptions}
                    onParametersChange={this.handleParametersChange}
                    handleExportSBML={this.handleExportSBML}
                    simulationParam={simulationParameters}
                    SBMLContent={this.state.sbmlExport}
                    handleTextChange = {this.handleTextChange}
                    handleResetInApp = {this.handleResetInApp}
                    additionalElements={additionalElements}
                    data={this.state.data}
                />
                <header className="App-header">
                    <span>COPASI version: {this.state.copasi?.version}</span>
                </header>
            </div>
        );
    }
}

export default App;

