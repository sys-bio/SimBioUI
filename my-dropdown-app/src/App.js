import React from "react";
import DropdownWithPopup from "./components/main/DropdownWithPopup";
import createCpsModule from "./libs/copasijs.js";
import COPASI from "./libs/copasi.js";
const libantimony = require("./libs/libantimony.js"); // libantimony.js in local dir
var antimonyWrapper = require("./libs/antimony_wrap.js");
var ant_wrap;

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleParametersChange = this.handleParametersChange.bind(this);
        this.handleMoreOptionsApply = this.handleMoreOptionsApply.bind(this);
        this.setIsNewOptionsAdded = this.setIsNewOptionsAdded.bind(this);
        this.setSelectedOptions = this.setSelectedOptions.bind(this);
        this.state = {
            copasi: { version: "not loaded" },
            data: { columns: [], titles: [] },
            isNewOptionsAdded: false,
            selectedOptions: {},
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
            steadyState: 0,
            eigenValues: [],
            jacobian: [],
            floatingSpecies: [],
            boundarySpecies: [],
            reactionRates: []
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
                    kOptions: kOptions
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
                floatingSpecies: this.state.copasi.floatingSpeciesNames,
				boundarySpecies: this.state.copasi.boundarySpeciesNames,
				reactionRates: this.state.copasi.reactionNames
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
//        // If "Always set back to initial" is on and content is the same as the current state
//        if (isChecked && content === this.state.textareaContent && isNewFileUploaded === false) {
//        	console.log("hi")
//            this.state.copasi.reset();
//            this.loadCopasi();
//            return;
//        }

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

    handleKValuesChanges = (option, value, isEigenvaluesRecalculated) => {
        try {
            this.state.copasi.setValue(option, value);
            this.loadCopasi();
            if (isEigenvaluesRecalculated) {
            	const steadyStateValue = this.state.copasi.steadyState();
            	const eigenValuesRes = this.state.copasi.eigenValues2D;
				const jacobianRes = this.state.copasi.jacobian;
				this.setState({
					steadyState: steadyStateValue,
					eigenValues: eigenValuesRes,
					jacobian: jacobianRes
				});
            }
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
                        oldSBMLContent: this.state.sbmlCode,
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
       let antCode;
       if (content.trim() !== "") {
           const res = ant_wrap.convertSBMLToAntimony(content);
           if (res.isSuccess()) {
               antCode = res.getResult();

               // Set the processed antCode without the notes
               this.setState({ sbmlCode: content, convertedAnt: antCode });
           }
       }
       this.handleResetInApp();
       this.handleResetParameters();
   };

    // In App.js
    handleExportSBML = (antimonyContent) => {
        if (typeof ant_wrap === 'undefined') {
            alert("Run \"Simulation\" to export SBML")
            return;
        }
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
        sbmlExport: "",
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
    computeSteadyState = () => {
        if (ant_wrap) {
            const parameters = this.state.simulationParameters;
            const start = parameters.timeStart;
            const end = parameters.timeEnd;
            const points = parameters.numPoints;

            // Reset the model to ensure it starts from initial conditions
            this.state.copasi.reset();

            // Set time course settings explicitly
            this.state.copasi.timeCourseSettings = {
                startTime: start,
                endTime: end,
                numPoints: points
            };

            const steadyStateValue = this.state.copasi.steadyState();
            // Run the simulation from start to end
            const simResults = this.state.copasi.simulateEx(start, end, points);
            if (typeof simResults == 'string') {
                // If it's a string, we assume it's JSON
                const parsedResults = JSON.parse(simResults);
                this.setState({
                    steadyState: steadyStateValue,
                    data: {
                        columns: parsedResults.columns,
                        titles: parsedResults.titles,
                    },
                });
            } else {
                // If it's an object, use it directly
                this.setState({
                    steadyState: steadyStateValue,
                    data: {
                        columns: simResults.columns,
                        titles: simResults.titles,
                    },
                });
            }

            const eigenValuesRes = this.state.copasi.eigenValues2D;
            const jacobianRes = this.state.copasi.jacobian;
            this.setState({
                steadyState: steadyStateValue,
                data: {
                    columns: simResults.columns,
                    titles: simResults.titles,
                },
                eigenValues: eigenValuesRes,
                jacobian: jacobianRes
            });
        } else {
            alert("Run Simulation to perform this feature");
        }
    };

    handleMoreOptionsApply(selectedOptions) {
        // Initialize speciesRateSelection with defaultList
        this.setState({isNewOptionsAdded: true, data: { columns: [], titles: [] }});
        let speciesRateSelection = [...this.state.copasi.selectionList];

        // Iterate through the selectedOptions map
        for (const [key, values] of Object.entries(selectedOptions)) {
            if (key === "Rate of Changes") {
                // Add ".Rate" to each value and append to speciesRateSelection
                const rateValues = values.map((name) => `${name.replace(/'/g, '')}.Rate`);
                speciesRateSelection = [...speciesRateSelection, ...rateValues];
            }
            if (key === "Reaction Rates") {
            	const rateValues = values.map((name) => `${name}.Flux`);
            	speciesRateSelection = [...speciesRateSelection, ...rateValues];
            }
        }
		 const updatedOptions = speciesRateSelection.reduce((acc, item) => {
			acc[item] = item === "Time" ? false : true;
			return acc;
		}, {});

		// Update selectedOptions in the state
		this.setSelectedOptions(updatedOptions);
        // Update copasi selectionList with the new speciesRateSelection
        this.state.copasi.selectionList = speciesRateSelection;
    }

	setIsNewOptionsAdded(isNewOptionsAdded) {
		this.setState({isNewOptionsAdded: isNewOptionsAdded})
	}

	setSelectedOptions(selectedOptions) {
		this.setState({selectedOptions: selectedOptions})
	}

    render() {
        const simulationParameters = this.state;
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
                    data={this.state.data}
                    isChecked={this.state.isChecked}
                    onCheckboxChange={this.handleCheckboxChange}
                    convertedAnt={this.state.convertedAnt}
                    kOptions={this.state.kOptions}
                    kValues={this.state.kValues}
                    handleResetParameters={this.handleResetParameters}
                    promptForFileNameAndDownload={this.promptForFileNameAndDownload}
                    computeSteadyState={this.computeSteadyState}
                    steadyState={this.state.steadyState}
                    eigenValues={this.state.eigenValues}
                    jacobian={this.state.jacobian}
                    floatingSpecies={this.state.floatingSpecies}
					boundarySpecies={this.state.boundarySpecies}
					reactionRates={this.state.reactionRates}
					handleMoreOptionsApply={this.handleMoreOptionsApply}
					isNewOptionsAdded={this.state.isNewOptionsAdded}
					setIsNewOptionsAdded={this.setIsNewOptionsAdded}
					selectedOptions={this.state.selectedOptions}
					setSelectedOptions={this.setSelectedOptions}
                />
                <header className="App-header">
                    <span>COPASI version: {this.state.copasi?.version}</span>
                </header>
            </div>
        );
    }
}

export default App;
