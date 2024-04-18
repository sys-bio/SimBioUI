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
            data: { columns: [], titles: []},
            info: null,
            textareaContent: "",
            sbmlCode: "",
            sbmlExport:"",
            convertedAnt: "",
            isChecked: true,
            changeValues: "",
            simulationParameters: {
                timeStart: 0.0,
                timeEnd: 40.0,
                numPoints: 100
            },
            initialOptions: "",
            simulationParameterChanges: false
        };
    };
    handleCheckboxChange = (isChecked) => {
        if (this.state.simulationParameterChanges) {
            this.loadCopasiAPI();
            this.setState({simulationParameterChanges: false});
        } else {
            this.setState({ isChecked }, () => {
                if (isChecked) {
                    const updates = { changeValues: "Change" };  // Always update changeValues when isChecked

                    if (this.state.changeValues !== "") {
                        const { timeStart, timeEnd } = this.state.simulationParameters;
                        // Calculate the new values
                        let newTimeStart = timeEnd;  // Assuming sF should be the current timeEnd
                        let newTimeEnd = 3 * timeEnd - timeStart;  // Assuming eF is 2 * current timeEnd - current timeStart
                        this.setState(prevState => ({ index: prevState.index + 1 }));
                        // Prepare updated simulation parameters
                        updates.simulationParameters = {
                            ...this.state.simulationParameters,
                            timeStart: newTimeStart,
                            timeEnd: newTimeEnd
                        };
                    }
                    this.setState(updates, () => {
                        this.loadCopasiAPI();
                    });
                }
            });
        }
    }

    handleParametersChange = (parameterName, value) => {
        this.setState(prevState => ({
            simulationParameters: {
                ...prevState.simulationParameters,
                [parameterName]: parseFloat(value)
            },
            simulationParameterChanges: true
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

    handleTextChange = (content, reset) => {
        // Check if content has changed
        if (content === this.state.textareaContent && reset === false) {
            return; // Exit the function if content hasn't changed
        }
        this.setState(prevState => ({
            textareaContent: content,
            index: 1,
            simulationParameters: {
                ...prevState.simulationParameters,
                timeStart: 0.0, // Reset timeStart to 0
                timeEnd: 40.0   // Reset timeEnd to 40
            }
        }), () => {
            if (content.trim() !== "") {
                const result = ant_wrap.convertAntimonyToSBML(content);
                if(result.isSuccess()) {
                    const sbml = result.getResult();
                    this.setState({
                        sbmlCode: sbml,
                        convertedAnt: ""
                    }, () => {
                        this.loadCopasiAPI();
                    });
                } else {
                    // Show popup indicating that Antimony syntax is invalid
                    alert('Antimony syntax is not valid.');
                }
            }
        });
    }

    handleSBMLfile = (content) => {
        var antCode;
        if (content.trim() !== "") {
            const res = ant_wrap.convertSBMLToAntimony(content);
            if (res.isSuccess()) {
                antCode = res.getResult();
                this.setState({ sbmlCode: content, convertedAnt: antCode});
            }
        }
    }

    // In App.js
      handleExportSBML = (antimonyContent) => {
        if (antimonyContent.trim() !== "") {
          const result = ant_wrap.convertAntimonyToSBML(antimonyContent);
          if (result.isSuccess()) {
            const sbml = result.getResult();
            this.setState({ sbmlExport: sbml }, () => {
              // Prompt user for file name after state update
              this.promptForFileNameAndDownload(sbml);
            });
          } else {
            alert('Antimony syntax is not valid');
          }
        } else {
          alert('No content provided');
        }
      };

      promptForFileNameAndDownload = (sbml) => {
        const fileName = prompt("Please enter the name of the file to save:", "MyModel.xml");
        if (fileName) {
          this.downloadFile(sbml, fileName);
        }
      };

      downloadFile = (data, fileName) => {
        const blob = new Blob([data], { type: 'application/xml' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);  // Clean up
      };


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

            this.setState({
                copasi: instance,
                data: {
                    columns: simResults.columns,
                    titles: simResults.titles // Assuming simResults contains a titles array
                },
                info: modelInfo,
                initialOptions: simResults.titles.reduce((acc, title) => ({ ...acc, [title]: true }), {})});
        } catch (err) {
            console.error(`Error in loadCopasiAPI: ${err.message}`);
        }
    };

    render() {
        const simulationParameters = this.state;
        const initialOptions = this.state;
        const additionalElements = ['[A]', '[B]', '[C]', 'S[2]', 'S[4]', 'S[6]', 'S[8]', 'S[10]', 'S[12]', 'S[14]',
            'J_0', 'J_1', 'J_2', 'J_3', 'J_4', 'J_5'];
        return (
            <div className="App">
                <DropdownWithPopup
                    handleSBMLfile={this.handleSBMLfile}
                    initialOptions={initialOptions}
                    onParametersChange={this.handleParametersChange}
                    handleExportSBML={this.handleExportSBML}
                    simulationParam={simulationParameters}
                    SBMLContent={this.state.sbmlExport}
                    handleTextChange = {this.handleTextChange}
                    handleResetInApp = {this.handleResetInApp}
                    additionalElements={additionalElements}
                    data={this.state.data}
                    isChecked={this.state.isChecked}
                    onCheckboxChange={this.handleCheckboxChange}
                    convertedAnt={this.state.convertedAnt}
                />
                <header className="App-header">
                    <span>COPASI version: {this.state.copasi?.version}</span>
                </header>
            </div>
        );
    }
}

export default App;

