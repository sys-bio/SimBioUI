import React from "react";
import DropdownWithPopup from "./components/DropdownWithPopup";
import createCpsModule from "./libs/copasijs.js";
import COPASI from "./libs/copasi.js";
const libantimony = require("./libs/libantimony.js"); // libantimony.js in local dir
var antimonyWrapper = require("./libs/antimony_wrap.js");
var ant_wrap;

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleParametersChange = this.handleParametersChange.bind(this);
        this.state = {
            copasi: { version: "not loaded" },
            data: { columns: [], titles: [] },
            textareaContent: "",
            sbmlCode: "",
            sbmlExport: "",
            convertedAnt: "",
            isChecked: false,
            changeValues: "",
            simulationParameters: {
                timeStart: 0.0,
                timeEnd: 20.0,
                numPoints: 200,
            },
            initialOptions: [],
            simulationParameterChanges: false,
            oldSBMLContent: "",
            kOptions: [],
            kValues: [],
        };
    }
    componentDidMount() {
        this.loadCopasiAPI();
    }
    loadCopasiAPI = async () => {
        try {
            const cps = await createCpsModule();
            const instance = new COPASI(cps);
            this.setState({
                copasi: instance,
            });
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
                    kOptions: kOptions,
                });
            }
            this.state.copasi.reset();
            const simResults = JSON.parse(this.state.copasi.Module.simulateEx(timeStart, timeEnd, numPoints));
            this.setState({
                data: {
                    columns: simResults.columns,
                    titles: simResults.titles,
                },
                initialOptions: simResults.titles.reduce((acc, title) => ({ ...acc, [title]: true }), {}),
                oldSBMLContent: this.state.sbmlCode,
            });
        } catch (err) {
            console.error(`Error in loadCopasi: ${err.message}`);
        }
    };
    handleTextChange = (content, isChecked) => {
        if (!ant_wrap) {
            this.loadAntimonyLib(() => this.processTextChange(content, isChecked));
        } else {
            this.processTextChange(content, isChecked);
        }
    };
    processTextChange = (content, isChecked, isNewFileUploaded) => {
        // If "Always set back to initial" is on and content is the same as the current state
        if (isChecked && content === this.state.textareaContent && isNewFileUploaded === false) {
            this.state.copasi.reset();
            this.loadCopasi();
            return;
        }

        // If content has changed, handle the change
        if (content.trim() !== "") {
            const result = ant_wrap.convertAntimonyToSBML(content);
            if (result.isSuccess()) {
                const sbml = result.getResult();
                this.setState(
                    {
                        sbmlCode: sbml,
                        convertedAnt: "",
                    },
                    () => {
                        this.loadCopasi();
                    },
                );
            } else {
                alert("Antimony syntax is not valid.");
            }
        }
    };
    handleLocalReset = () => {
        this.state.copasi.reset();
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
            this.setState({ simulationParameterChanges: false });
        } else {
            this.setState({ isChecked }, () => {
                if (!isChecked) {
                    const simResults = JSON.parse(this.state.copasi.Module.simulate());
                    this.setState({
                        data: {
                            columns: simResults.columns,
                            titles: simResults.titles
                        },
                        initialOptions: simResults.titles.reduce((acc, title) => ({ ...acc, [title]: true }), {}),
                        oldSBMLContent: this.state.sbmlCode
                    });
                }
            });
        }
    };

    handleParametersChange = (parameterName, value) => {
        this.setState((prevState) => ({
            simulationParameters: {
                ...prevState.simulationParameters,
                [parameterName]: parseFloat(value),
            },
            simulationParameterChanges: true,
        }));
    };

    loadAntimonyLib(callback) {
        try {
            libantimony().then((libantimony) => {
                ant_wrap = new antimonyWrapper(libantimony);
                console.log("libantimony loaded");
                if (typeof callback === "function") {
                    callback(); // This ensures that the next step only happens after libantimony is fully loaded and ant_wrap is initialized
                }
            });
        } catch (err) {
            console.log("Load libantimony Error: ", err);
        }
    }

    handleSBMLfile = (content) => {
        // Check if ant_wrap is ready, if not, load and then process
        if (!ant_wrap) {
            this.loadAntimonyLib(() => this.processSBMLFile(content));
        } else {
            this.processSBMLFile(content);
        }
    };

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
        this.handleResetInApp();
    };

    // In App.js
    handleExportSBML = (antimonyContent) => {
        if (antimonyContent.trim() !== "") {
            const result = ant_wrap.convertAntimonyToSBML(antimonyContent);
            if (result.isSuccess()) {
                const sbml = result.getResult();
                this.setState({ sbmlExport: sbml }, () => {
                    this.promptForFileNameAndDownload(sbml, true);
                });
            } else {
                alert("Antimony syntax is not valid");
            }
        } else {
            alert("No content provided");
        }
    };

    promptForFileNameAndDownload = (content, isSBML) => {
        let fileName;
        if (isSBML) {
            fileName = prompt("Please enter the name of the file to save:", "MyModel.xml");
        } else {
            fileName = prompt("Please enter the name of the file to save:", "MyModel.txt");
        }
        if (fileName) {
            this.downloadFile(content, fileName, isSBML);
        }
    };

    downloadFile = (data, fileName, isSBML) => {
        const mimeType = isSBML ? "application/xml" : "text/plain";
        const blob = new Blob([data], { type: mimeType });
        const href = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href); // Clean up
    };

    handleResetInApp = () => {
        this.setState({ data: { columns: [] } });
    };

    handleResetParameters = () => {
        this.setState({
        sbmlCode: "",
        sbmlExport: "",
        convertedAnt: "",
        isChecked: false,
        changeValues: "",
        simulationParameters: {
           timeStart: 0.0,
           timeEnd: 20.0,
           numPoints: 200,
        },
        initialOptions: [],
        simulationParameterChanges: false,
        oldSBMLContent: "",
        kOptions: [],
        kValues: [],})
    }
    handleParametersChange = (parameterName, value) => {
            this.setState((prevState) => ({
                simulationParameters: {
                    ...prevState.simulationParameters,
                    [parameterName]: parseFloat(value),
                },
                simulationParameterChanges: true,
            }));
        };
    render() {
        const simulationParameters = this.state;
        const additionalElements = [
            "[A]",
            "[B]",
            "[C]",
            "S[2]",
            "S[4]",
            "S[6]",
            "S[8]",
            "S[10]",
            "S[12]",
            "S[14]",
            "J_0",
            "J_1",
            "J_2",
            "J_3",
            "J_4",
            "J_5",
        ];
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
                    handleTextChange={this.handleTextChange}
                    handleResetInApp={this.handleResetInApp}
                    handleKValuesChanges={this.handleKValuesChanges}
                    additionalElements={additionalElements}
                    data={this.state.data}
                    isChecked={this.state.isChecked}
                    onCheckboxChange={this.handleCheckboxChange}
                    convertedAnt={this.state.convertedAnt}
                    kOptions={this.state.kOptions}
                    kValues={this.state.kValues}
                    handleResetParameters={this.handleResetParameters}
                    promptForFileNameAndDownload={this.promptForFileNameAndDownload}
                />
                <header className="App-header">
                    <span>COPASI version: {this.state.copasi?.version}</span>
                </header>
            </div>
        );
    }
}

export default App;
