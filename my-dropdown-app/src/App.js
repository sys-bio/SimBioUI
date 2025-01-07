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
            tempSimulationParameters: {
				timeStart: 0.0,
				timeEnd: 20.0,
				numPoints: 200,
			},
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
			isSteadyState: false
        };
    }

    /**
     * Loads the COPASI API module, initializes an instance, and updates the component state.
     * Called during component mounting.
     */
    componentDidMount() {
        this.loadCopasiAPI();
    }

    /**
     * Initializes COPASI API by loading a module asynchronously.
     * Sets the instance in the component state.
     * @returns {Promise<void>}
     */
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

    /**
     * Loads COPASI model data into the application, resets the model state,
     * and updates relevant state variables with model data.
     * @returns {Promise<void>}
     */
    loadCopasi = () => {
        return new Promise((resolve, reject) => {
            try {
                const { timeStart, timeEnd, numPoints } = this.state.tempSimulationParameters;
                if (this.state.sbmlCode !== this.state.oldSBMLContent) {
                	this.state.copasi.loadModel(this.state.sbmlCode);
                    const kValues = this.state.copasi.globalParameterValues;
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
                console.log(simResults)
                const selectionList = simResults.titles.reduce((acc, title) => ({
                    ...acc,
                    [title]: title === 'Time' ? false : true,
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
                    simulationParameters: { ...this.state.tempSimulationParameters },
                }, () => {
                    resolve();
                });
            } catch (err) {
                console.error(`Error in loadCopasi: ${err.message}`);
                reject(err);
            }
        });
    };

    /**
     * Processes a text change in Antimony content by converting it to SBML.
     * Calls loadCopasi if conversion succeeds.
     * @param {string} content - The Antimony content.
     * @param {boolean} isChecked - Checkbox state indicating conversion requirement.
     * @param {boolean} isComputeSteadyState - Whether to compute steady state.
     * @returns {Promise<void>}
     */
    handleTextChange = (content, isChecked, isComputeSteadyState) => {
        if (!ant_wrap) {
            return this.loadAntimonyLib().then(() => this.processTextChange(content, isChecked, isComputeSteadyState));
        } else {
            return this.processTextChange(content, isChecked, isComputeSteadyState);
        }
    };

    /**
     * Converts Antimony content to SBML if valid; updates sbmlCode in state.
     * Calls loadCopasi for further processing if isComputeSteadyState is false.
     * @param {string} content - Antimony content to process.
     * @param {boolean} isChecked - Checkbox state.
     * @param {boolean} isComputeSteadyState - Flag indicating steady state computation.
     * @returns {Promise<void>}
     */
    processTextChange = (content, isChecked, isComputeSteadyState) => {
        return new Promise((resolve, reject) => {
            if (content.trim() !== "") {
                // Parse content to extract `timeEnd` and `numPoints`
                let timeEnd = null;
                let numPoints = null;
                const lines = content.split("\n"); // Split content into lines

                lines.forEach((line) => {
                    const trimmedLine = line.trim();
                    if (trimmedLine.startsWith("#")) {
                        // Extract the text after the # symbol
                        if (trimmedLine.startsWith("#TimeEnd")) {
                            const match = trimmedLine.match(/#TimeEnd\s+(\d+(\.\d+)?)/);
                            if (match) {
                                timeEnd = parseFloat(match[1]);
                            }
                        } else if (trimmedLine.startsWith("#NumberPoints")) {
                            const match = trimmedLine.match(/#NumberPoints\s+(\d+)/);
                            if (match) {
                                numPoints = parseInt(match[1], 10);
                            }
                        }
                    }
                });

                const result = ant_wrap.convertAntimonyToSBML(content);
                if (result.isSuccess()) {
                    const sbml = result.getResult();
                    this.setState(
                        {
                            sbmlCode: sbml,
                            convertedAnt: "",
                            simulationParameters: {
                                ...this.state.simulationParameters,
                                timeEnd: timeEnd !== null ? timeEnd : this.state.simulationParameters.timeEnd,
                                numPoints: numPoints !== null ? numPoints : this.state.simulationParameters.numPoints,
                            },
                        },
                        () => {
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
                resolve();
            }
        });
    };

    /**
     * Resets the model state to its initial conditions using COPASI's reset function.
     */
    handleLocalReset = () => {
        this.state.copasi.reset();
    };

    /**
     * Updates COPASI's global parameter values and, if specified, recalculates eigenvalues.
     * @param {string} option - Parameter option name.
     * @param {number} value - New parameter value.
     * @param {boolean} isEigenvaluesRecalculated - Flag for recalculating eigenvalues.
     */
    handleKValuesChanges = (option, value, isEigenvaluesRecalculated) => {
        try {
            this.state.copasi.setValue(option, value);
            const { timeStart, timeEnd, numPoints } = this.state.simulationParameters;
            this.state.copasi.reset();
            const simResults = JSON.parse(this.state.copasi.Module.simulateEx(timeStart, timeEnd, numPoints));

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

	handleKValuesChangesInSteadyState = (option, value, isEigenvaluesRecalculated) => {
		try {
			this.state.copasi.setValue(option, value);
			const { timeStart, timeEnd, numPoints } = this.state.simulationParameters;
			this.state.copasi.reset();

			this.setState({
				selectedValues: this.state.copasi.selectedValues,
			});

			if (isEigenvaluesRecalculated) {
				const steadyStateValue = this.state.copasi.steadyState();
				const eigenValuesRes = this.state.copasi.eigenValues2D
				this.setState({
					eigenValues: eigenValuesRes
				});
			}
		} catch (err) {
			console.error(`Error in handleKValuesChangesInSteadyState: ${err.message}`);
		}
	};

    /**
     * Handles changes to the checkbox state.
     * Updates simulation results in the state if changes are made.
     * @param {boolean} isChecked - New checkbox state.
     */
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

    /**
     * Updates simulation parameter values in the component state.
     * @param {string} parameterName - The name of the parameter.
     * @param {number} value - The new value for the parameter.
     */
    handleParametersChange = (parameterName, value) => {
        this.setState((prevState) => ({
            tempSimulationParameters: {
                ...prevState.tempSimulationParameters,
                [parameterName]: parseFloat(value),
            },
            simulationParameterChanges: true,
        }));
    };

    /**
     * Loads Antimony library asynchronously and initializes antimonyWrapper.
     * @returns {Promise<void>}
     */
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

    /**
     * Processes and converts SBML content to Antimony format.
     * Sets the resulting Antimony content in the state.
     * @param {string} content - The SBML content to process.
     */
    handleSBMLfile = (content) => {
        if (!ant_wrap) {
            this.loadAntimonyLib().then(() => this.processSBMLFile(content));
        } else {
            this.processSBMLFile(content);
        }
    };

    /**
     * Converts SBML content to Antimony if valid, updates component state with converted Antimony code.
     * @param {string} content - SBML content to be processed.
     */
    processSBMLFile = (content) => {
        let antCode;
        if (content.trim() !== "") {
            const res = ant_wrap.convertSBMLToAntimony(content);
            if (res.isSuccess()) {
                antCode = res.getResult();
                this.setState({ sbmlCode: content, convertedAnt: antCode });
            }
        }
        this.handleResetInApp();
        this.handleResetParameters();
    };

    /**
     * Exports SBML content from Antimony format, prompts for file name, and downloads the file.
     * @param {string} antimonyContent - The Antimony content to be exported.
     */
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

    /**
     * Prompts user for file name and triggers download of specified content.
     * @param {string} content - The content to be downloaded.
     * @param {boolean} isSBML - Flag indicating if content is SBML format.
     */
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

    /**
     * Downloads the specified data as a file with the provided filename.
     * @param {string} data - The data to download.
     * @param {string} fileName - The name for the downloaded file.
     * @param {boolean} isSBML - Determines the MIME type of the download.
     */
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
        URL.revokeObjectURL(href);
    };

    /**
     * Resets data in the application state to initial values.
     */
    handleResetInApp = () => {
        this.setState({ data: { columns: [] } });
    };

    /**
     * Resets simulation parameters and other variables to initial values.
     */
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
        });
    }

    /**
     * Computes the steady state for a model loaded into COPASI.
     * Loads and processes SBML if needed, then updates state with simulation results.
     * @param {string} content - Content to be processed if provided.
     */
    computeSteadyState = (content) => {
        const proceedWithComputation = () => {
            const parameters = this.state.simulationParameters;
            const start = parameters.timeStart;
            const end = parameters.timeEnd;
            const points = parameters.numPoints;

            if (this.state.sbmlCode !== this.state.oldSBMLContent) {
				this.state.copasi.loadModel(this.state.sbmlCode);
				const kValues = this.state.copasi.globalParameterValues;
				const kOptions = this.state.copasi.globalParameterNames;
				this.setState({
					kValues: kValues,
					kOptions: kOptions
				});
			}
            this.state.copasi.reset();
            this.state.copasi.timeCourseSettings = {
                startTime: start,
                endTime: end,
                numPoints: points
            };

            const steadyStateValue = this.state.copasi.steadyState();
			this.state.copasi.computeMca(true);
            const eigenValuesRes = this.state.copasi.eigenValues2D;
            const jacobianRes = this.state.copasi.jacobian;
            const selectedValues = this.state.copasi.selectedValues;
            const concentration = this.state.copasi.getConcentrationControlCoefficients(true);
			const fluxControl = this.state.copasi.getFluxControlCoefficients(true);
			const elasticities = this.state.copasi.getElasticities(true);

            this.state.copasi.reset();
            const simResults = this.state.copasi.simulateEx(start, end, points);
            //const parsedResults = typeof simResults === 'string' ? JSON.parse(simResults) : simResults;
            const selectionList = simResults.titles.reduce((acc, title) => ({
				...acc,
				[title]: title === 'Time' ? false : true,
			}), {});

            this.setState({
            	//initialOptions: simResults.titles.reduce((acc, title) => ({ ...acc, [title]: true }), {}),
                oldSBMLContent: this.state.sbmlCode,
                steadyState: steadyStateValue,
				data: {
					columns: [], // Explicitly set to empty
					titles: [],  // Explicitly set to empty
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

    computeParameterScanSteadyState = (valuesSeparatedBySpace, updatedSelectionList, isUseListOfNumbers, isLog) => {
//        const { minValue, maxValue, numValues } = this.state.firstParameter;
        const parameters = this.state.simulationParameters;
		const start = parameters.timeStart;
		const end = parameters.timeEnd;
		const points = parameters.numPoints;
//
//
//        const stepSize = (maxValue - minValue) / (numValues - 1);
//        const parameterValues = Array.from({ length: numValues }, (_, i) => minValue + i * stepSize);
		let parameterValues = this.getListOfValues(valuesSeparatedBySpace, updatedSelectionList, isUseListOfNumbers, isLog);

        // Initialize steady-state results with parameter values and dynamic species
        const steadyStateResults = {
            parameter: parameterValues, // Parameter values
        };

        // Populate steadyStateResults with keys for each species in selectionList
        const selectionList = this.state.copasi.selectionList.slice(1);
        selectionList.forEach((species) => {
            steadyStateResults[species] = []; // Initialize empty arrays for each species
        });
        const parameterName = this.state.firstParameter.parameterName === ''
                    ? this.state.copasi.globalParameterNames[0]
                    : this.state.firstParameter.parameterName;

        parameterValues.forEach((value) => {
            try {
                // Set parameter value in COPASI
                this.state.copasi.setValue(parameterName, value);
                this.state.copasi.reset();
				this.state.copasi.timeCourseSettings = {
					startTime: start,
					endTime: end,
					numPoints: points
				};

				const steadyStateValue = this.state.copasi.steadyState();

                // Retrieve steady-state values for all selected species
                const speciesValues = this.state.copasi.selectedValues.slice(1);

                // Log and handle missing values
                if (!speciesValues || speciesValues.length !== selectionList.length) {
                    selectionList.forEach((species) => steadyStateResults[species].push(null));
                    return;
                }

                // Populate steadyStateResults for each species
                selectionList.forEach((species, index) => {
                    steadyStateResults[species].push(speciesValues[index]);
                });
            } catch (err) {
                console.error(`Error computing steady state for parameter=${value}:`, err.message);
                selectionList.forEach((species) => steadyStateResults[species].push(null)); // Fill with null on error
            }
        });

        // Prepare columns and titles for the state update
        const columns = [steadyStateResults.parameter]; // Start with parameter values
        const titles = [parameterName]; // Start with parameter name
		const selectionListTmp = this.state.copasi.selectionList.reduce((acc, title) => ({
			...acc,
			[title]: title === 'Time' ? false : true,
		}), {});

        selectionList.forEach((species) => {
            columns.push(steadyStateResults[species]); // Add species data
            titles.push(species); // Add species name
        });

        const initialOptions = titles.reduce((acc, title) => {
			return {
				...acc,
				[title]: title === parameterName ? false : true,
			};
		}, {});

        // Update the state with the computed steady-state results
        this.setState(
            {
                data: {
                    columns: columns,
                    titles: titles,
                },
                initialOptions: initialOptions,
                selectedOptions: initialOptions,
				selectionList: selectionListTmp,
            }
        );
    };

    /**
     * Applies selected options to the COPASI species rate selection list.
     * Updates state with new species selections.
     * @param {Object} selectedOptions - Map of selected options to apply.
     */
	handleMoreOptionsApply(selectedOptions) {
        this.setState({ isNewOptionsAdded: true, data: { columns: [], titles: [] } });
        let speciesRateSelection = [...this.state.copasi.selectionList];

        for (const [key, values] of Object.entries(selectedOptions)) {
        	if (key === "Floating Species") {
				const rateValues = values.map((name) => `${name}`);
				speciesRateSelection = [...speciesRateSelection, ...rateValues.filter(value => !speciesRateSelection.includes(value))];
			}
			if (key === "Rate of Changes") {
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

        this.setSelectedOptions(updatedOptions);
        this.state.copasi.selectionList = speciesRateSelection;
        this.setState({selectionList: updatedOptions});
    }

    /**
     * Sets whether new options have been added to the component state.
     * @param {boolean} isNewOptionsAdded - Flag indicating if new options were added.
     */
    setIsNewOptionsAdded(isNewOptionsAdded) {
        this.setState({ isNewOptionsAdded: isNewOptionsAdded });
    }

    /**
     * Sets selected options for COPASI simulation in component state.
     * @param {Object} selectedOptions - Map of selected options.
     */
    setSelectedOptions(selectedOptions) {
        this.setState({ selectedOptions: selectedOptions });
    }

    /**
     * Updates the selection list in the state and calls handleScanButton after the update.
     * @param {Object} newSelectionList - The new selection list.
     */
	setSelectionList = (newSelectionList) => {
		this.setState({ selectionList: newSelectionList });
//		, () => {
//			this.handleScanButton(
//				this.props.editorInstance?.getValue(),
//				this.state.isUseListOfNumbers,
//				this.state.valuesSeparatedBySpace,
//				this.state.isDataTableDocked,
//				this.state.linesStyle,
//				false,
//				newSelectionList // Pass the updated selection list
//			);
//		});
	};

    /**
     * Sets docking state of data table in the component.
     * @param {boolean} isDocked - Whether the data table is docked.
     */
    setIsDataTableDocked(isDocked) {
    	this.setState({isDataTableDocked: isDocked});
    }

    /**
     * Updates the scan parameters for parameter scans in the state.
     * @param {string} key - The key for the parameter being updated.
     * @param {number|string} value - The new value for the parameter.
     */
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

    /**
     * Executes parameter scanning for COPASI, processes simulation results, and updates state.
     * @param {string} content - Optional content to be processed before scan.
     * @param {boolean} isUseListOfNumbers - Flag indicating list usage for parameter values.
     * @param {string} valuesSeparatedBySpace - List of parameter values.
     * @param {boolean} isDataTableDocked - Docking state of the data table.
     * @param {boolean} isLog - Flag indicating logarithmic scale.
     * @param {boolean} isSteadyState - Whether to perform steady state computation.
     */
	handleScanButton = (content, isUseListOfNumbers, valuesSeparatedBySpace, isDataTableDocked, isLog, isSteadyState,
	updatedSelectionList) => {
		const proceedWithScan = () => {
			this.setState({isSteadyState: isSteadyState});
			if (!isSteadyState) {
				if (isDataTableDocked) {
					this.setIsDataTableDocked(true);
				}
				const parameters = this.state.parametersScanType;
				const start = parseFloat(parameters.timeStart);
				const end = parseFloat(parameters.timeEnd);
				const points = parseFloat(parameters.numPoints);
				let parameterValues = this.getListOfValues(valuesSeparatedBySpace, updatedSelectionList, isUseListOfNumbers, isLog);
				const allSimResults = [];
				let titles = [];
				let timeData = [];
				const parameterName = this.state.firstParameter.parameterName === '' ?
                				 this.state.copasi.globalParameterNames[0] : this.state.firstParameter.parameterName;

				for (let i = 0; i < parameterValues.length; i++) {
					const value = parameterValues[i];

					this.state.copasi.setValue(parameterName, value);
					this.state.copasi.reset();
					this.state.copasi.timeCourseSettings = {
						startTime: start,
						endTime: end,
						numPoints: points
					};
					const simResults = JSON.parse(this.state.copasi.Module.simulateEx(start, end, points));

					allSimResults.push({
						parameterValue: value,
						simResults: simResults
					});

					if (i === 0) {
						titles = simResults.titles;
						timeData = simResults.columns[0];
					}
				}

				const combinedData = {
					columns: [timeData],
					titles: ['Time'],
				};

				for (let varIndex = 1; varIndex < titles.length; varIndex++) {
					const varName = titles[varIndex];
					for (let paramIndex = 0; paramIndex < parameterValues.length; paramIndex++) {
						const paramValue = parameterValues[paramIndex];
						const simResult = allSimResults[paramIndex].simResults;
						const dataColumn = simResult.columns[varIndex];
						const newTitle = `${varName} (${parameterName}=${paramValue.toFixed(3)})`;

						combinedData.columns.push(dataColumn);
						combinedData.titles.push(newTitle);
					}
				}

				const initialOptions = combinedData.titles.reduce((acc, title) => {
					return {
						...acc,
						[title]: title === "Time" ? false : true
					};
				}, {});
				const selectionList = this.state.copasi.selectionList.reduce((acc, title) => ({
					...acc,
					[title]: title === 'Time' ? false : true,
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
			} else {
				this.computeParameterScanSteadyState(valuesSeparatedBySpace, updatedSelectionList, isUseListOfNumbers, isLog);
			}
		};
		this.handleTextChange(content, this.state.isChecked, true)
			.then(proceedWithScan)
			.catch((err) => {
				console.error("Error during computation:", err);
			});
	};

	// Helper functions to handle list of numbers
	computeValuesFromList = (valuesSeparatedBySpace) => {
		let parameterValues = [];
		const specialSeparatorRegex = /[,;:]/;
		if (specialSeparatorRegex.test(valuesSeparatedBySpace)) {
			alert("Values should be separated by spaces.");
			return;
		}
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
		return parameterValues;
	}

	computeValuesFromRange = (isLog) => {
		let parameterValues = [];
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

		if (isLog) {
			const logMinValue = Math.log10(minValue);
			const logMaxValue = Math.log10(maxValue);
			const logStepSize = (logMaxValue - logMinValue) / (numValues - 1);

			for (let i = 0; i < numValues; i++) {
				const logValue = logMinValue + i * logStepSize;
				const value = Math.pow(10, logValue);
				parameterValues.push(value);
			}
		} else {
			const stepSize = (maxValue - minValue) / (numValues - 1);
			for (let i = 0; i < numValues; i++) {
				const value = minValue + i * stepSize;
				parameterValues.push(value);
			}
		}
		return parameterValues;
	}

	getListOfValues = (valuesSeparatedBySpace, updatedSelectionList, isUseListOfNumbers, isLog) => {
		if (this.state.sbmlCode !== this.state.oldSBMLContent) {
			this.state.copasi.loadModel(this.state.sbmlCode);
			const kValues = this.state.copasi.globalParameterValues;
			const kOptions = this.state.copasi.globalParameterNames;
			const floatingSpecies = this.state.copasi.floatingSpeciesNames;
			updatedSelectionList = [];
			this.setState({
				kValues: kValues,
				kOptions: kOptions,
				floatingSpecies: floatingSpecies,
				selectionList: [],
				oldSBMLContent: this.state.sbmlCode,
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
		if (Object.keys(updatedSelectionList).length > 0) {
			const selectionList = Object.keys(updatedSelectionList).filter(
				(key) => key === 'Time' || updatedSelectionList[key] === true
			);
			this.state.copasi.selectionList = selectionList;
		}

		let parameterValues = [];

		if (isUseListOfNumbers) {
			parameterValues = this.computeValuesFromList(valuesSeparatedBySpace);
		} else {
			parameterValues = this.computeValuesFromRange(isLog);
		}
		return parameterValues;
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
                    tempSimulationParameters={this.state.tempSimulationParameters}
                    SBMLContent={this.state.sbmlExport}
                    handleLocalReset={this.handleLocalReset}
                    handleTextChange={this.handleTextChange}
                    handleResetInApp={this.handleResetInApp}
                    handleKValuesChanges={this.handleKValuesChanges}
                    handleKValuesChangesInSteadyState={this.handleKValuesChangesInSteadyState}
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
                    isSteadyState={this.state.isSteadyState}
                />
                <header className="App-header">
                    <span>COPASI version: {this.state.copasi?.version}</span>
                </header>
            </div>
        );
    }
}

export default App;

