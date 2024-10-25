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
        this.setSelectionList = this.setSelectionList.bind(this);
        this.setIsDataTableDocked = this.setIsDataTableDocked.bind(this);
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
            concentration: [],
            fluxControl: [],
            elasticities: [],
            floatingSpecies: [],
            boundarySpecies: [],
            reactionRates: [],
            selectedValues: [],
            parametersScanType: {
				timeStart: 0.0,
				timeEnd: 10.0,
				numPoints: 100,
			},
			firstParameter: {
				parameterName: "",
				minValue: 0.1,
				maxValue: 1.0,
				numValues: 16
			},
			selectionList: [],
			isDataTableDocked: false,
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

    // Update loadCopasi to return a Promise
    loadCopasi = () => {
        return new Promise((resolve, reject) => {
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
                const kValues = this.state.kValues;
                const kOptions = this.state.kOptions;
				if (kValues) {
					for (let i = 0; i < kOptions.length; i++) {
						const option = kOptions[i];
						const value = kValues[i];
						this.state.copasi.setValue(option, value);
					}
				}
                const simResults = JSON.parse(this.state.copasi.Module.simulateEx(timeStart, timeEnd, numPoints));
                const selectionList = simResults.titles.reduce((acc, title) => ({
                    ...acc,
                    [title]: title === 'Time' ? false : true, // If the title is "Time", set it to false
                }), {});

                this.setState({
                    data: {
                        columns: simResults.columns,
                        titles: simResults.titles,
                    },
                    initialOptions: simResults.titles.reduce((acc, title) => ({ ...acc, [title]: true }), {}),
                    oldSBMLContent: this.state.sbmlCode,
                    floatingSpecies: this.state.copasi.floatingSpeciesNames,
                    boundarySpecies: this.state.copasi.boundarySpeciesNames,
                    reactionRates: this.state.copasi.reactionNames,
                    jacobian: this.state.copasi.jacobian,
                    concentration: this.state.copasi.getConcentrationControlCoefficients(false),
                    fluxControl: this.state.copasi.getFluxControlCoefficients(false),
                    elasticities: this.state.copasi.getElasticities(false),
                    selectedValues: this.state.copasi.selectedValues,
                    selectionList: selectionList,
                }, () => {
                    resolve();
                });
            } catch (err) {
                console.error(`Error in loadCopasi: ${err.message}`);
                reject(err);
            }
        });
    };

    handleTextChange = (content, isChecked, isComputeSteadyState) => {
        if (!ant_wrap) {
            return this.loadAntimonyLib().then(() => this.processTextChange(content, isChecked, isComputeSteadyState));
        } else {
            return this.processTextChange(content, isChecked);
        }
    };

    // Update processTextChange to return a Promise
    processTextChange = (content, isChecked, isComputeSteadyState) => {
        return new Promise((resolve, reject) => {
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
                            // Only call loadCopasi when isComputeSteadyState is false
                            if (!isComputeSteadyState) {
                                this.loadCopasi().then(resolve).catch(reject);
                            } else {
                                resolve();
                            }
                        },
                    );
                } else {
                    alert("Antimony syntax is not valid.");
                    reject(new Error("Antimony syntax is not valid."));
                }
            } else {
                resolve(); // If content is empty, resolve immediately
            }
        });
    };

    handleLocalReset = () => {
        this.state.copasi.reset();
    };

    handleKValuesChanges = (option, value, isEigenvaluesRecalculated) => {
        try {
            // Set the new parameter value
            this.state.copasi.setValue(option, value);

            // Retrieve simulation parameters
            const { timeStart, timeEnd, numPoints } = this.state.simulationParameters;

            // Reset the model to ensure it starts from initial conditions
            this.state.copasi.reset();

            // Run the simulation with the updated parameter
            const simResults = JSON.parse(this.state.copasi.Module.simulateEx(timeStart, timeEnd, numPoints));

            // Update the state with the new simulation results
            this.setState({
                data: {
                    columns: simResults.columns,
                    titles: simResults.titles,
                },
                initialOptions: simResults.titles.reduce((acc, title) => ({ ...acc, [title]: true }), {}),
                floatingSpecies: this.state.copasi.floatingSpeciesNames,
                boundarySpecies: this.state.copasi.boundarySpeciesNames,
                reactionRates: this.state.copasi.reactionNames,
                jacobian: this.state.copasi.jacobian,
                selectedValues: this.state.copasi.selectedValues,
            });

            // If eigenvalues need to be recalculated
            if (isEigenvaluesRecalculated) {
                const steadyStateValue = this.state.copasi.steadyState();
                const eigenValuesRes = this.state.copasi.eigenValues2D;
                const jacobianRes = this.state.copasi.jacobian;
                this.setState({
                    steadyState: steadyStateValue,
                    eigenValues: eigenValuesRes,
                    jacobian: jacobianRes,
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

    // Update loadAntimonyLib to return a Promise
    loadAntimonyLib() {
        return new Promise((resolve, reject) => {
            try {
                libantimony().then((libantimony) => {
                    ant_wrap = new antimonyWrapper(libantimony);

                    console.log("libantimony loaded");
                    resolve();
                });
            } catch (err) {
                console.log("Load libantimony Error: ", err);
                reject(err);
            }
        });
    }

    handleSBMLfile = (content) => {
        // Check if ant_wrap is ready, if not, load and then process
        if (!ant_wrap) {
            this.loadAntimonyLib().then(() => this.processSBMLFile(content));
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
            alert("Run \"Simulate\" to export SBML")
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
            kValues: [],
        })
    }

    computeSteadyState = (content) => {
        const proceedWithComputation = () => {
            const parameters = this.state.simulationParameters;
            const start = parameters.timeStart;
            const end = parameters.timeEnd;
            const points = parameters.numPoints;

            if (this.state.sbmlCode !== this.state.oldSBMLContent) {
				this.state.copasi.loadModel(this.state.sbmlCode);
				const kValues = this.state.copasi.globalParameterValues; // Moved inside the if block
				const kOptions = this.state.copasi.globalParameterNames;
				this.setState({
					kValues: kValues,
					kOptions: kOptions
				});
			}

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
			this.state.copasi.computeMca(true);
            const eigenValuesRes = this.state.copasi.eigenValues2D;
            const jacobianRes = this.state.copasi.jacobian;
            const selectedValues = this.state.copasi.selectedValues;
            const concentration = this.state.copasi.getConcentrationControlCoefficients(true);
			const fluxControl = this.state.copasi.getFluxControlCoefficients(true);
			const elasticities = this.state.copasi.getElasticities(true);

            this.state.copasi.reset();
            const simResults = this.state.copasi.simulateEx(start, end, points);
            const parsedResults = typeof simResults === 'string' ? JSON.parse(simResults) : simResults;
            const selectionList = simResults.titles.reduce((acc, title) => ({
				...acc,
				[title]: title === 'Time' ? false : true, // If the title is "Time", set it to false
			}), {});

            this.setState({
            	initialOptions: simResults.titles.reduce((acc, title) => ({ ...acc, [title]: true }), {}),
                oldSBMLContent: this.state.sbmlCode,
                steadyState: steadyStateValue,
                data: {
                    columns: parsedResults.columns,
                    titles: parsedResults.titles,
                },
                eigenValues: eigenValuesRes,
                jacobian: jacobianRes,
                selectedValues: selectedValues,
                concentration: concentration,
				fluxControl: fluxControl,
				elasticities: elasticities,
				selectionList: selectionList
            });
        };

		this.handleTextChange(content, this.state.isChecked, true)
			.then(proceedWithComputation)
			.catch((err) => {
				console.error("Error during computation:", err);
			});
    };

    handleMoreOptionsApply(selectedOptions) {
        // Initialize speciesRateSelection with defaultList
        this.setState({ isNewOptionsAdded: true, data: { columns: [], titles: [] } });
        let speciesRateSelection = [...this.state.copasi.selectionList];

        // Iterate through the selectedOptions map
        for (const [key, values] of Object.entries(selectedOptions)) {
        	if (key === "Floating Species") {
				const rateValues = values.map((name) => `${name}`);
				// Only add values that are not already in speciesRateSelection
				speciesRateSelection = [...speciesRateSelection, ...rateValues.filter(value => !speciesRateSelection.includes(value))];
			}
			if (key === "Rate of Changes") {
				// Add ".Rate" to each value and append to speciesRateSelection if not already present
				const rateValues = values.map((name) => `${name.replace(/'/g, '')}.Rate`);
				speciesRateSelection = [...speciesRateSelection, ...rateValues.filter(value => !speciesRateSelection.includes(value))];
			}
			if (key === "Reaction Rates") {
				const rateValues = values.map((name) => `${name}.Flux`);
				speciesRateSelection = [...speciesRateSelection, ...rateValues.filter(value => !speciesRateSelection.includes(value))];
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
        this.setState({selectionList: updatedOptions})
    }

    setIsNewOptionsAdded(isNewOptionsAdded) {
        this.setState({ isNewOptionsAdded: isNewOptionsAdded })
    }

    setSelectedOptions(selectedOptions) {
        this.setState({ selectedOptions: selectedOptions })
    }

	setSelectionList = (newSelectionList) => {
		this.setState({ selectionList: newSelectionList }, () => {
			// Call handleScanButton after the state is updated
			this.handleScanButton(this.props.editorInstance?.getValue(), this.state.isUseListOfNumbers, this.state.valuesSeparatedBySpace, this.state.isDataTableDocked, this.state.linesStyle);
		});
	};

    setIsDataTableDocked(isDocked) {
    	this.setState({isDataTableDocked: isDocked})
    }

	handleParameterScansUpdate = (key, value) => {
		if (['timeStart', 'timeEnd', 'numPoints'].includes(key)) {
			this.setState((prevState) => ({
				parametersScanType: {
					...prevState.parametersScanType,
					[key]: value || '',
				}
			}));
		} else if (['minValue', 'maxValue', 'numValues'].includes(key)) {
			this.setState((prevState) => ({
				firstParameter: {
					...prevState.firstParameter,
					[key]: value || ''
				},
			}));
		} else if (['parameterName'].includes(key)) {
		 	this.setState((prevState) => ({
				firstParameter: {
					...prevState.firstParameter,
					[key]: value
				}
			}));
		}
	};

	handleScanButton = (content, isUseListOfNumbers, valuesSeparatedBySpace, isDataTableDocked, isLog, isSteadyState) => {
			const proceedWithScan = () => {
			if (isDataTableDocked) {
				this.setIsDataTableDocked(true);
			}
			this.state.copasi.loadModel(this.state.sbmlCode);
			if (this.state.sbmlCode !== this.state.oldSBMLContent) {
				const kValues = this.state.copasi.globalParameterValues;
				const kOptions = this.state.copasi.globalParameterNames;
				const floatingSpecies = this.state.copasi.floatingSpeciesNames;
				this.setState({
					kValues: kValues,
					kOptions: kOptions,
					floatingSpecies: floatingSpecies,
					selectionList: [],
					firstParameter: {
						parameterName: "",
						minValue: 0.1,
						maxValue: 1.0,
						numValues: 16
					},
					parametersScanType: {
						timeStart: 0.0,
						timeEnd: 10.0,
						numPoints: 100,
					},
				});
			}
			const parameterName = this.state.firstParameter.parameterName === '' ?
				this.state.copasi.globalParameterNames[0] : this.state.firstParameter.parameterName;
			const parameters = this.state.parametersScanType;
			const start = parseFloat(parameters.timeStart);
			const end = parseFloat(parameters.timeEnd);
			const points = parseFloat(parameters.numPoints);
			if (Object.keys(this.state.selectionList).length > 0) {
				// Filter optionsList to include keys where value is true, but always include "Time"
				const selectionList = Object.keys(this.state.selectionList).filter(
					(key) => key === 'Time' || this.state.selectionList[key] === true
				);
				this.state.copasi.selectionList = selectionList;
			}

			let parameterValues = [];

			if (isUseListOfNumbers) {
				const specialSeparatorRegex = /[,;:]/;
				if (specialSeparatorRegex.test(valuesSeparatedBySpace)) {
					alert("Values should be separated by spaces.");
					return;
				}
				// Use valuesSeparatedBySpace to get parameterValues
				const valuesStrArray = valuesSeparatedBySpace.trim().split(/\s+/);
				for (let i = 0; i < valuesStrArray.length; i++) {
					const valueStr = valuesStrArray[i];
					const value = parseFloat(valueStr);
					if (isNaN(value)) {
						alert("Invalid number '" + valueStr + "' in the list of values.");
						return;
					}
					parameterValues.push(value);
				}
				if (parameterValues.length === 0) {
					alert("No valid values provided in the list.");
					return;
				}
			} else {
				// Use minValue, maxValue, numValues to compute parameterValues
				const minValueStr = this.state.firstParameter.minValue;
				const maxValueStr = this.state.firstParameter.maxValue;
				const numValuesStr = this.state.firstParameter.numValues;

				const minValue = parseFloat(minValueStr);
				const maxValue = parseFloat(maxValueStr);
				const numValues = parseFloat(numValuesStr);

				if (numValues < 2) {
					alert("Number of values must be at least 2.");
					return;
				}

				// Check if log scale is used
				if (isLog) {
					const logMinValue = Math.log10(minValue);
					const logMaxValue = Math.log10(maxValue);
					const logStepSize = (logMaxValue - logMinValue) / (numValues - 1);

					for (let i = 0; i < numValues; i++) {
						const logValue = logMinValue + i * logStepSize;
						const value = Math.pow(10, logValue); // Convert back from log scale to original scale
						parameterValues.push(value);
					}
				} else {
					// Linear scale
					const stepSize = (maxValue - minValue) / (numValues - 1);
					for (let i = 0; i < numValues; i++) {
						const value = minValue + i * stepSize;
						parameterValues.push(value);
					}
				}
			}

			// Arrays to hold results
			const allSimResults = [];
			let titles = [];
			let timeData = [];

			// Loop over parameter values
			for (let i = 0; i < parameterValues.length; i++) {
				const value = parameterValues[i];
				this.state.copasi.setValue(parameterName, value);
				// Reset the model
				this.state.copasi.reset();
				// Set time course settings
				this.state.copasi.timeCourseSettings = {
					startTime: start,
					endTime: end,
					numPoints: points
				};
				if (isSteadyState) {
					this.state.copasi.steadyState();
				}
				// Run the simulation
				const simResults = JSON.parse(this.state.copasi.Module.simulateEx(start, end, points));

				// Collect the simulation results
				allSimResults.push({
					parameterValue: value,
					simResults: simResults
				});

				// Collect titles and time data only once
				if (i === 0) {
					titles = simResults.titles;
					timeData = simResults.columns[0]; // Assuming time is the first column
				}
			}

			// Now, construct combined data for plotting
			const combinedData = {
				columns: [timeData],
				titles: ['Time'],
			};

			// For each variable (excluding Time), collect data across parameter values
			for (let varIndex = 1; varIndex < titles.length; varIndex++) {
				const varName = titles[varIndex];

				for (let paramIndex = 0; paramIndex < parameterValues.length; paramIndex++) {
					const paramValue = parameterValues[paramIndex];
					const simResult = allSimResults[paramIndex].simResults;
					const dataColumn = simResult.columns[varIndex];

					// Create a new title that includes the parameter value
					const newTitle = `${varName} (${parameterName}=${paramValue.toFixed(3)})`;

					combinedData.columns.push(dataColumn);
					combinedData.titles.push(newTitle);
				}
			}

			// Update initialOptions and selectedOptions
			const initialOptions = combinedData.titles.reduce((acc, title) => {
				return {
					...acc,
					[title]: title === "Time" ? false : true // Set to false if title is "Time", otherwise true
				};
			}, {});
			const selectionList = this.state.copasi.selectionList.reduce((acc, title) => ({
				...acc,
				[title]: title === 'Time' ? false : true, // If the title is "Time", set it to false
			}), {});

			this.setState({
				data: combinedData,
				initialOptions: initialOptions,
				selectedOptions: initialOptions,
				selectionList: selectionList,
				floatingSpecies: this.state.copasi.floatingSpeciesNames,
				boundarySpecies: this.state.copasi.boundarySpeciesNames,
				reactionRates: this.state.copasi.reactionNames,
				jacobian: this.state.copasi.jacobian,
				selectedValues: this.state.copasi.selectedValues,
			});
		};

		// Check if content needs to be processed
		if (content) {
			this.handleTextChange(content, this.state.isChecked, true)
				.then(proceedWithScan)
				.catch((err) => {
					console.error("Error during computation:", err);
				});
		} else {
			proceedWithScan();
		}
	};


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
                    concentration={this.state.concentration}
                    fluxControl={this.state.fluxControl}
                    elasticities={this.state.elasticities}
                    floatingSpecies={this.state.floatingSpecies}
                    boundarySpecies={this.state.boundarySpecies}
                    reactionRates={this.state.reactionRates}
                    handleMoreOptionsApply={this.handleMoreOptionsApply}
                    isNewOptionsAdded={this.state.isNewOptionsAdded}
                    setIsNewOptionsAdded={this.setIsNewOptionsAdded}
                    selectedOptions={this.state.selectedOptions}
                    selectedValues={this.state.selectedValues}
                    setSelectedOptions={this.setSelectedOptions}
                    handleParameterScansUpdate={this.handleParameterScansUpdate}
                    parametersScanType={this.state.parametersScanType}
                    firstParameter={this.state.firstParameter}
                    handleScanButton={this.handleScanButton}
                    selectionList={this.state.selectionList}
                    setSelectionList={this.setSelectionList}
                    isDataTableDocked={this.state.isDataTableDocked}
                    setIsDataTableDocked={this.setIsDataTableDocked}

                />
                <header className="App-header">
                    <span>COPASI version: {this.state.copasi?.version}</span>
                </header>
            </div>
        );
    }
}

export default App;
