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
            textareaContent: "",
            sbmlCode: "",
            sbmlExport:"",
            convertedAnt: "",
            isChecked: false,
            changeValues: "",
            simulationParameters: {
                timeStart: 0.0,
                timeEnd: 20.0,
                numPoints: 200
            },
            initialOptions: [],
            simulationParameterChanges: false,
            oldNumPoints: 0,
            oldSBMLContent: "",
            kOptions: [],
            kValues: []
        };
    };
    componentDidMount() {
        this.loadCopasiAPI();
    }
    loadCopasiAPI = async () => {
        try {
            const cps = await createCpsModule();
            const instance = new COPASI(cps);
            this.setState({
                copasi: instance
            })
        } catch (err) {
            console.error(`Error in loadCopasiAPI: ${err.message}`);
        }
    };

    loadCopasi = async () => {
        try {
            const { timeStart, timeEnd, numPoints } = this.state.simulationParameters;
            if (this.state.sbmlCode !== this.state.oldSBMLContent) {
                this.state.copasi.loadModel(this.state.sbmlCode);
                const kValues = this.state.copasi.globalParameterValues; // Moved inside the if block
                const kOptions = this.state.copasi.globalParameterNames;
                this.setState({
                    kValues: kValues,
                    kOptions: kOptions
                });
            }
            const simResults = JSON.parse(this.state.copasi.Module.simulateEx(timeStart, timeEnd, numPoints));
            const dist_old_with_current_NumPoints = numPoints - simResults.columns[0].length;

            this.setState({
                data: {
                    columns: simResults.columns,
                    titles: simResults.titles
                },
                oldNumPoints: dist_old_with_current_NumPoints,
                oldSBMLContent: this.state.sbmlCode,
                initialOptions: simResults.titles.reduce((acc, title) => ({ ...acc, [title]: true }), {}),
            });
        } catch (err) {
            console.error(`Error in loadCopasi: ${err.message}`);
        }
    };
    handleLocalReset = () => {
          this.state.copasi.reset;
          this.loadCopasi();
    };

    handleKValuesChanges = (option, value) => {
        try {
            this.state.copasi.setValue(option, value);
            this.loadCopasi();
        } catch (err) {
            console.error(`Error in handleKValuesChanges: ${err.message}`);
        }
    };

    handleCheckboxChange = (isChecked) => {
        if (this.state.simulationParameterChanges) {
            this.loadCopasi();
            this.setState({simulationParameterChanges: false});
        } else {
            this.setState({ isChecked }, () => {
                if (!isChecked) {
                    const updates = {};
                    const { timeStart, timeEnd } = this.state.simulationParameters;
                    let dist = timeEnd - timeStart;
                    let newTimeStart = timeEnd;  // Assuming sF should be the current timeEnd
                    let newTimeEnd = newTimeStart + dist;
                    this.setState(prevState => ({ index: prevState.index + 1 }));
                    // Prepare updated simulation parameters
                    updates.simulationParameters = {
                        ...this.state.simulationParameters,
                        timeStart: newTimeStart,
                        timeEnd: newTimeEnd
                    };
                    this.setState(updates, () => {
                        this.loadCopasi();
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

    loadAntimonyLib(callback) {
      try {
        libantimony().then((libantimony) => {
          ant_wrap = new antimonyWrapper(libantimony);
          console.log('libantimony loaded');
          if (typeof callback === 'function') {
            callback();  // This ensures that the next step only happens after libantimony is fully loaded and ant_wrap is initialized
          }
        });
      } catch (err) {
        console.log('Load libantimony Error: ', err);
      }
    }

    handleTextChange = (content, reset) => {
        if (!ant_wrap) {
            this.loadAntimonyLib(() => this.processTextChange(content, reset));
        } else {
            this.processTextChange(content, reset);
        }
    }

    processTextChange = (content, reset) => {
        if (content === this.state.textareaContent && reset === false) {
            return;
        }
        this.setState(prevState => ({
            textareaContent: content,
            index: 1,
            simulationParameters: {
                ...prevState.simulationParameters,
                timeStart: 0.0,
                timeEnd: 20.0
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
                        this.loadCopasi();
                    });
                } else {
                    alert('Antimony syntax is not valid.');
                }
            }
        });
    }

    handleSBMLfile = (content) => {
        // Check if ant_wrap is ready, if not, load and then process
        if (!ant_wrap) {
            this.loadAntimonyLib(() => this.processSBMLFile(content));
        } else {
            this.processSBMLFile(content);
        }
    }

    // Process the SBML content once the library is loaded
    processSBMLFile = (content) => {
        var antCode;
        if (content.trim() !== "") {
            const res = ant_wrap.convertSBMLToAntimony(content);
            if (res.isSuccess()) {
                antCode = res.getResult();
                this.setState({ sbmlCode: content, convertedAnt: antCode });
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

    render() {
        const simulationParameters = this.state;
        const additionalElements = ['[A]', '[B]', '[C]', 'S[2]', 'S[4]', 'S[6]', 'S[8]', 'S[10]', 'S[12]', 'S[14]',
            'J_0', 'J_1', 'J_2', 'J_3', 'J_4', 'J_5'];
        return (
            <div className="App">
                <DropdownWithPopup
                    handleSBMLfile={this.handleSBMLfile}
                    onParametersChange={this.handleParametersChange}
                    initialOptions={this.state.initialOptions}
                    handleExportSBML={this.handleExportSBML}
                    simulationParam={simulationParameters}
                    SBMLContent={this.state.sbmlExport}
                    handleLocalReset={this.handleLocalReset}
                    handleTextChange = {this.handleTextChange}
                    handleResetInApp = {this.handleResetInApp}
                    handleKValuesChanges={this.handleKValuesChanges}
                    additionalElements={additionalElements}
                    data={this.state.data}
                    isChecked={this.state.isChecked}
                    onCheckboxChange={this.handleCheckboxChange}
                    convertedAnt={this.state.convertedAnt}
                    kOptions={this.state.kOptions}
                    kValues={this.state.kValues}
                />
                <header className="App-header">
                    <span>COPASI version: {this.state.copasi?.version}</span>
                </header>
            </div>
        );
    }
}

export default App;