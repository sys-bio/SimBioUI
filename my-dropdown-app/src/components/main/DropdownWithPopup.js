import React, { useEffect, useRef, useState } from "react";

import "../../styles/leftSubPanel/main-container.css";
import "../../styles/leftSubPanel/popup-components.css";
import "../../styles/leftSubPanel/dropdown-components.css";
import "../../styles/leftSubPanel/border-with-text.css";
import "../../styles/centerPanel/center-subpanel.css";
import "../../styles/centerPanel/centered-input.css";
import "../../styles/rightSubPanel/right-subpanel.css";
import "../../styles/leftTopCorner/left-top-corner.css";

// Monaco text editor
import BioModelsService from "./BioModelsService";
import Loader from "./Loader";
import { WebIridiumTheme } from "./WebIridiumTheme";
import { WebIridiumLanguage } from "./WebIridiumLanguage";
import * as monaco from 'monaco-editor';
import ModelSemanticsChecker from "./ModelSemanticsChecker";
import CreateAnnotationModal from "./create-annotation/CreateAnnotationModal";
import { SrcPosition, SrcRange } from "./Types";

import { MdClose } from "react-icons/md";
import MenuHeader from "./MenuHeader";
import LeftPanel from "./left-panel-in-analysis/LeftPanel";
import { getPanelStyles } from "../../utils/common";
import { MIN_PANEL_WIDTH, BREAKPOINT_WIDTH, LEFT_PANEL_FIXED_WIDTH } from "../../constants/const";
import RightPanel from "./RightPanel";

const DropdownWithPopup = ({
    initialOptions,
    convertedAnt,
    onParametersChange,
    onCheckboxChange,
    simulationParam,
    SBMLContent,
    handleExportSBML,
    promptForFileNameAndDownload,
    handleTextChange,
    handleResetInApp,
    handleResetParameters,
    handleSBMLfile,
    handleKValuesChanges,
    handleLocalReset,
    additionalElements = [],
    data,
    kOptions,
    kValues,
    computeSteadyState,
    steadyState,
    eigenValues,
    jacobian,
    textareaContent,
    sbmlCode
}) => {
    const initialTabData = {
        textContent: `// Load a model from disk, type in a model,
// or pick one of the example models from
// the Examples menu

// Note: // is used to indicate a comment

// e.g.

A -> B; k1*A
B -> C; k2*B
k1 = 0.35; k2 = 0.2
B = 0; C = 0
A = 10

// If you're not sure what to do, just
// click the simulate button to the left`,
        data: data
    };
    const plotGraphRef = useRef(null);

    const [centerSubPanelHeight, setCenterSubPanelHeight] = useState(
        window.innerWidth <= BREAKPOINT_WIDTH ? (window.innerHeight - 100) / 2 : window.innerHeight - 100,
    );
    const [showSplitView, setShowSplitView] = useState(false);
    const [isNewFileUploaded, setIsNewFileUploaded] = useState(false)

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [panelWidth, setPanelWidth] = useState(LEFT_PANEL_FIXED_WIDTH);
    const [centerPanelWidth, setCenterPanelWidth] = useState(0);
    const [rightPanelWidth, setRightPanelWidth] = useState(0); // Initial width of the right sub-panel
    const [sizeOfInput, setSizeOfInput] = useState(12);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [xAxis_selected_option, set_xAxis_selected_option] = useState(null);
    const [kOptions_for_sliders, set_kOptions_for_sliders] = useState({});
    const [sliderValues, setSliderValues] = useState({});
    const [minMaxValues, setMinMaxValues] = useState({});
    const [selectedParameter, setSelectedParameter] = useState("");
    const [layoutVertical, setLayoutVertical] = useState(window.innerWidth <= BREAKPOINT_WIDTH);
    const [isNewTabCreated, setIsNewTabCreated] = useState(false);

    // Search area + monaco text editor
    const bioModelService = new BioModelsService();
     const [loading, setLoading] = useState(false);
     const [chosenModel, setChosenModel] = useState(null);
     const [searchTerm, setSearchTerm] = useState("");
     const [suggestions, setSuggestions] = useState([]);
     const editorRef = useRef(null);
     const modalRef = useRef(null);
     const [varToAnnotate, setVarToAnnotate] = useState(null);
     const [isModalVisible, setModalVisible] = useState(false);
     const [editorInstance, setEditorInstance] = useState(null);
     const [annotUnderlinedOn, setAnnotUnderlinedOn] = useState(false);
     const [newContent, setNewContent] = useState(convertedAnt);
     const [annotationAddPosition, setAnnotationAddPosition] = useState(null);
     // Set highlight color for unannotated variables
     const [highlightColor, setHighlightColor] = useState("red");
     const [decorations, setDecorations] = useState([]);

    // Active Analysis Panel
    const [activeAnalysisPanel, setActiveAnalysisPanel] = useState("Time Course Simulation");
    // Show legend
    const [isShowLegendChecked, setIsShowLegendChecked] = useState(true);
    const [paletteColor, setPaletteColor] = useState([]);
    // Create map of colors, key is parameter, and value is color
    const [lineColorMap, setLineColorMap] = useState({});
    const [lineWidthMap, setLineWidthMap] = useState({});
    const [lineStyleMap, setLineStyleMap] = useState({});

    const resetContent = () => {
        setSelectedOptions([]);
        set_xAxis_selected_option(null);
        set_kOptions_for_sliders({});
        setSliderValues({});
        setMinMaxValues({});
        setSelectedParameter(null);

        handleResetInApp();
        handleResetParameters();
        setIsNewTabCreated(true);
    };
    const [isResetInitialState, setIsResetInitialState] = useState(true);

    // Initial setup
	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
	};

	const { leftSubpanelStyle, centerSubPanelStyle, rightSubpanelStyle } = getPanelStyles({
		layoutVertical,
		panelWidth,
		isDarkMode,
		centerPanelWidth,
		rightPanelWidth,
	});

	const handleIconClick = (icon) => {
		if (icon === "x-axis") {
			// Apply the new width to the left panel
			setPanelWidth(LEFT_PANEL_FIXED_WIDTH);

			// Adjust the center panel width accordingly
			setCenterPanelWidth(window.innerWidth - rightPanelWidth - LEFT_PANEL_FIXED_WIDTH);
		} else if (icon === "narrow") {
			setPanelWidth(MIN_PANEL_WIDTH);
			setCenterPanelWidth(window.innerWidth - rightPanelWidth - MIN_PANEL_WIDTH);
		}
	};

	const createInitialState = (keys, defaultValue) => {
        const top10Keys = keys.slice(0, 10); // Extract the first 10 keys
        return top10Keys.reduce((acc, key) => {
            acc[key] = defaultValue;
            return acc;
        }, {});
    };

    const createInitialSliderValues = (keys, kValues) => {
        return keys.reduce((acc, key, index) => {
            const value = kValues[index] || 100;
            acc[key] = value;
            return acc;
        }, {});
    };

    const createInitialMinMaxValues = (keys, kValues) => {
        return keys.reduce((acc, key, index) => {
            const value = kValues[index] || 100;
            const minValue = (value * 0.1).toFixed(2);
            const maxValue = (value * 5).toFixed(2);
            acc[key] = { min: minValue, max: maxValue };
            return acc;
        }, {});
    };

    const handleCheckboxChange = (option) => {
        set_kOptions_for_sliders((prev) => ({
            ...prev,
            [option]: !prev[option],
        }));
    };

    const handleSliderChange = (option, value) => {
        const roundedValue = Number(value).toFixed(2);
        setSliderValues((prev) => ({ ...prev, [option]: roundedValue }));
        handleKValuesChanges(option, roundedValue);
    };

    const handleLabelClick = (parameter) => {
        setSelectedParameter(parameter);
    };

    const handleMinValueChange = (e) => {
        const parameter = selectedParameter;
        const newMin = e.target.value || ""; // Always ensure a string value, never undefined
        if (!minMaxValues[parameter]) {
            setMinMaxValues((prev) => ({
                ...prev,
                [parameter]: {
                    min: newMin,
                    max: 100, // Default max if not set
                },
            }));
        } else {
            const newMax = minMaxValues[parameter].max;
            setMinMaxValues((prev) => ({
                ...prev,
                [parameter]: {
                    ...prev[parameter],
                    min: newMin,
                },
            }));
            let newValue;
            if (newMin < newMax) {
                newValue = ((Number(newMin) + Number(newMax)) / 2).toFixed(2);
            } else {
                newValue = Number(newMin);
            }
            setSliderValues((prev) => ({
                ...prev,
                [parameter]: newValue,
            }));
            handleKValuesChanges(parameter, newValue);
        }
    };

    const handleMaxValueChange = (e) => {
        const parameter = selectedParameter;
        const newMax = e.target.value || ""; // Always ensure a string value, never undefined
        if (!minMaxValues[parameter]) {
            setMinMaxValues((prev) => ({
                ...prev,
                [parameter]: {
                    min: 0,
                    max: newMax,
                },
            }));
        } else {
            const newMin = minMaxValues[parameter].min;
            setMinMaxValues((prev) => ({
                ...prev,
                [parameter]: {
                    ...prev[parameter],
                    max: newMax,
                },
            }));
            let newValue;
            if (newMin < newMax) {
                newValue = ((Number(newMin) + Number(newMax)) / 2).toFixed(2);
            } else {
                newValue = Number(newMax);
            }
            setSliderValues((prev) => ({
                ...prev,
                [parameter]: newValue,
            }));
            handleKValuesChanges(parameter, newValue);
        }
    };

	const handleInputChange = (e) => {
		const newFontSize = e.target.value;
		editorInstance.updateOptions({
		  fontSize: newFontSize
		});
		setSizeOfInput(newFontSize);
	};

    useEffect(() => {
        const handleResize = () => {
            // Update the state based on the resized window dimensions
            if (window.innerWidth < BREAKPOINT_WIDTH) {
                setCenterSubPanelHeight((window.innerHeight - 100) / 2);
            } else {
                setCenterSubPanelHeight(window.innerHeight - 100);
            }
        };

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
      if (editorInstance) {
        ModelSemanticsChecker(editorInstance, annotUnderlinedOn, false, highlightColor, decorations);
      }
    }, [annotUnderlinedOn, editorInstance]);

    useEffect(() => {
      if (kOptions.length > 0 && kValues.length > 0) {
            const newStateForSliders = createInitialState(kOptions, true);
            const newSliderValues = createInitialSliderValues(kOptions, kValues); // Example default slider value of 50

            const newMinMaxValues = createInitialMinMaxValues(kOptions, kValues);

            set_kOptions_for_sliders(newStateForSliders);
            setSliderValues(newSliderValues);
            setMinMaxValues(newMinMaxValues);
            setSelectedParameter(kOptions[0]);
        }
    }, [kOptions, kValues]);

    const handleSearchChange = async (e) => {
		const queryText = e.target.value.trim();
		setSearchTerm(queryText);

		if (queryText.length > 2) {
		  setLoading(true);
		  try {
			const models = await bioModelService.searchModels(queryText);
			setSuggestions(Array.from(models.models.values()));
		  } catch (error) {
			console.error("Error fetching models:", error);
		  } finally {
			setLoading(false);
		  }
		} else {
		  setSuggestions([]);
		}
	};

    // Text editor search models
	const handleContentSelect = (content) => {
		// Set the new content directly in the Monaco Editor
		if (editorInstance) {
			editorInstance.setValue(content); // Set the new content in the editor
		}

		// Perform additional actions
		handleResetInApp();
		handleResetParameters();
		setSelectedParameter(null);
	};

	const handleModelSelect = async (modelId) => {
		setLoading(true);
	    try {
         	const model = await bioModelService.getModel(modelId);
			setChosenModel(model);
			// Handle the selected model as needed, e.g., updating the state, calling a conversion function, etc.
		} catch (error) {
			console.error("Error fetching model:", error);
		} finally {
			setLoading(false);
		}
	};

    const handleEditorContentChange = (editor: any) => {
        // Delay the model parser to avoid parsing while the user is typing
        let typingTimer: any;
        const delayedModelParser = (editor: monaco.editor.IStandaloneCodeEditor) => {
       	    clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
       		     ModelSemanticsChecker(editor, annotUnderlinedOn, true, highlightColor, decorations);
            }, 600);
        };
        // Parse the model whenever the user types
        editor.onDidChangeModelContent(() => {
            setNewContent(editor.getValue());
            delayedModelParser(editor);
        });
        ModelSemanticsChecker(editor, annotUnderlinedOn, true, highlightColor, decorations);
    };

	// Handle buttons in text editor
    const addAnnotationOption = editor => {
      if (editorRef.current) {
        // Adds the create annotations option to the context menu of the editor
        editor.addAction({
          id: "create-annotation", // Unique identifier of the contributed action
          label: "Create Annotations", // Label of the action that will be presented to the user
          keybindings: [
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.F10, // Keybinding using Ctrl or Cmd with F10
            // Chorded keybinding, requiring a sequence of keys
            monaco.KeyMod.chord(
              monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK,
              monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyM
            )
          ],
          precondition: null, // No precondition for this action
          keybindingContext: null, // No additional rules to evaluate for keybinding dispatch
          contextMenuGroupId: "navigation", // Group where this action will appear in the context menu
          contextMenuOrder: 1, // Order within the group where this action will appear
          run: function(ed) {
              const position = ed.getPosition();
              if (position) {
                  const word = ed.getModel()?.getWordAtPosition(position);
                  if (word) {
                      let start = new SrcPosition(position.lineNumber, word.startColumn);
                      let end = new SrcPosition(position.lineNumber, word.endColumn);
                      let srcRange = new SrcRange(start, end);

                      let { symbolTable: ST } = ModelSemanticsChecker(
                          ed,
                          annotUnderlinedOn,
                          false,
                          highlightColor,
                          decorations
                      );
                      let varAndAnnotationPositionInfo = ST.hasVarAtLocation(
                          word.word,
                          srcRange
                      );
                      if (varAndAnnotationPositionInfo) {
                          setModalVisible(true);
                          setAnnotationAddPosition(varAndAnnotationPositionInfo.annotationPositon);
                          let displayName = varAndAnnotationPositionInfo.varInfo.displayName?.replaceAll('"', "");
                          setVarToAnnotate({ id: word.word, name: displayName });
                      } else {
                          alert("Please select a variable to annotate.");
                      }
                  } else {
                      alert("Please select a variable to annotate.");
                  }
              }
          }
        })
      }
    }

    const addAnnotationVarUnderlineOption = editor => {
      if (editorRef.current) {
        // Adds the "Highlight Unannotated Variables" option to the context menu.
        // Checks if the cursor is on an actual variable or not.
        editor.addAction({
          // An unique identifier of the contributed action.
          id: "underline-annotation",

          // A label of the action that will be presented to the user.
          label: `Highlight Unannotated Variables ${
            annotUnderlinedOn ? "Off" : "On"
          }`,

          keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.F10],

          // A precondition for this action.
          precondition: null,

          // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
          keybindingContext: null,

          contextMenuGroupId: "navigation",

          contextMenuOrder: 1.5,

          run: function (editor: monaco.editor.IStandaloneCodeEditor) {
            setAnnotUnderlinedOn((prevAnnotUnderlinedOn) => !prevAnnotUnderlinedOn);
          },
        })
      }
    }

    /**
     * @description Adds the menu option to navigate to the first annotation (by line number) for a selected variable.
     * @param editor The Monaco editor instance.
     */
    const addNavigateEditAnnotationOption = editor => {
      if (editorRef.current) {
        editor.addAction({
          // An unique identifier of the contributed action.
          id: "Navigate to Edit Annotation",

          // A label of the action that will be presented to the user.
          label: `Navigate to Edit Annotation`,

          // A precondition for this action.
          precondition: null,

          // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
          keybindingContext: null,

          // The group in which this action is included in the context menu.
          contextMenuGroupId: "navigation",

          // The order of this action in the context menu group.
          contextMenuOrder: 1.5,

          // Method that will be executed when the action is triggered.
          // @param ed The editor instance is passed in as a convenience.
          run: function(ed) {
            const position = ed.getPosition()
            if (position) {
              const word = ed.getModel()?.getWordAtPosition(position)
              if (word) {
                // Determine the start and end positions of the selected word.
                let start = new SrcPosition(position.lineNumber, word.startColumn)
                let end = new SrcPosition(position.lineNumber, word.endColumn)
                let srcRange = new SrcRange(start, end)

                // Check if the variable exists at the specified location.
                // This might be optimized in the future by caching the symbol table.
                let { symbolTable: ST } = ModelSemanticsChecker(
                  ed,
                  annotUnderlinedOn,
                  false,
                  highlightColor,
                  decorations
                )
                let info = ST.hasVarAtLocation(word.word, srcRange)

                if (info && info.varInfo.annotations.length > 0) {
                  // Find the line number of the first annotation.
                  let line = Number.MAX_VALUE
                  for (const value of info.varInfo.annotationLineRange.values()) {
                    line = Math.min(value.start.line, line)
                  }

                  // Set the editor selection to the annotation's line and reveal it.
                  const range = {
                    startLineNumber: line,
                    startColumn: 1,
                    endLineNumber: line,
                    endColumn: editor.getModel().getLineMaxColumn(line)
                  }
                  ed.setSelection(range)
                  ed.revealLineInCenter(line)
                } else {
                  alert("Please select an annotated variable")
                }
              } else {
                alert("Please select an annotated variable")
              }
            }
          }
        })
      }
    }

    useEffect(() => {
        if (editorRef.current) {
            // Register the language and theme
            monaco.languages.register({ id: "antimony" });
            monaco.languages.setMonarchTokensProvider("antimony", WebIridiumLanguage);
            monaco.editor.defineTheme("WebIridiumTheme", WebIridiumTheme);
            monaco.editor.setTheme("WebIridiumTheme");
            // Initialize Monaco Editor
            const editor = monaco.editor.create(editorRef.current, {
                value: initialTabData.textContent,
                language: "antimony",
                theme: "WebIridiumTheme",
                automaticLayout: true,
            });

            // Set editor instance
            setEditorInstance(editor);

            // Ensure editor is fully ready before registering actions
            addAnnotationOption(editor);
            addAnnotationVarUnderlineOption(editor);
            addNavigateEditAnnotationOption(editor);

            handleEditorContentChange(editor);

            return () => editor.dispose();
        }
    }, [annotUnderlinedOn]);

    useEffect(() => {
        if (chosenModel) {
            const dropdown = document.getElementById("biomddropdown");
            if (dropdown) {
                dropdown.style.display = "none";
            }
            setLoading(true);
            if (chosenModel === "") {
                setLoading(false);
                return;
            }
            bioModelService.getModel(chosenModel)
                .then((model) => {
                    handleSBMLfile(model.sbmlData)
                    window.modelId = model.modelId;
                    window.biomodelsUrl = "https://www.ebi.ac.uk/biomodels/" + window.modelId;
                    window.title = model.title;
                    window.authors = model.authors;
                    window.url = model.url;
                    window.citation = model.citation;
                    window.date = model.date;
                    window.journal = model.journal;
                    window.fileName = model.modelId;
                    window.sbmlString = model.sbmlData;
                    window.conversion = "biomodels";
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching model:", error);
                    setLoading(false);
                });
        }
    }, [chosenModel]);

    useEffect(() => {
        if (convertedAnt) {
            handleContentSelect(convertedAnt);
        }
    }, [convertedAnt]); // eslint-disable-next-line react-hooks/exhaustive-deps

    useEffect(() => {
        bioModelService.getBiomodels(setLoading, setChosenModel);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setLayoutVertical(window.innerWidth <= BREAKPOINT_WIDTH);
        };

        // Recalculate panel widths
        const calculatePanelWidths = () => {
            const remainingWidth = windowWidth - panelWidth;
            if (layoutVertical) {
                setCenterPanelWidth(remainingWidth); // 50% of remaining width
                setRightPanelWidth(remainingWidth); // 50% of remaining width
            } else {
                setCenterPanelWidth(remainingWidth * 0.5); // 50% of remaining width
                setRightPanelWidth(remainingWidth * 0.5); // 50% of remaining width
            }
        };

        // Listen for window resize events
        window.addEventListener("resize", handleResize);

        // Initial calculation and recalculation on window resize
        calculatePanelWidths();

        // Cleanup listener on component unmount
        return () => window.removeEventListener("resize", handleResize);
    }, [windowWidth, panelWidth]); // eslint-disable-next-line react-hooks/exhaustive-deps

    const handleDownloadPDF = () => {
        if (plotGraphRef.current) {
            plotGraphRef.current.downloadPDF();
        }
    };

    const renderActiveTabContent = () => {
        if (showSplitView) {
            // When split view is active, display text input on top and a blue box on bottom
            return (
                <>
                    <div
                        className={"centered-input-box"}
                        style={{
                            height: `${(centerSubPanelHeight - 80) / 2}px`,
                            width: `${centerPanelWidth - 42}px`,
                            backgroundColor: isDarkMode ? "#1e1e1e" : "white",
                            border: isDarkMode ? "white" : "black",
                            outline: isDarkMode ? "1px solid white" : "1px solid black",
                            marginLeft: "10px"
                        }}
                    >
                        <div className="search-container">
                            <input
                                id="biomodel-browse"
                                style={{
                                    backgroundColor: isDarkMode ? "black" : "white",
                                    color: isDarkMode ? "white" : "black",
                                    border: isDarkMode ? "1px solid gray" : "1px solid black",
                                    borderRadius: "5px",
                                    width: "80%",
                                    height: "30px"
                                }}
                                type="text"
                                placeholder="Search Biomodels"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div id="biomddropdown" className="suggestions-dropdown">
                                <ul>
                                    {suggestions.map((model) => (
                                        <li
                                            key={model.id}
                                            onClick={() => setChosenModel(model.id)}
                                            style={{ cursor: "pointer"}}
                                        >
                                            {model.title}
                                            <div style={{ color: "#FD7F20"}}>
                                                {model.journal}, {model.date} - {model.authors.join(", ")}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {loading && <Loader loading={loading} />}
                        </div>
                        <div ref={editorRef} style={{ height: "100%", width: "100%" }} />
                    </div>
                    <div
                        style={{
                            height: `${(centerSubPanelHeight - 50) / 2}px`,
                            width: `${centerPanelWidth - 22}px`,
                            backgroundColor: isDarkMode ? "#2e2d2d" : "white", // Set the background color to blue for the bottom half
                            border: isDarkMode ? "1px solid white" : "1px solid black",
                            color: "white", // Set the text color to white if needed
                            marginLeft: "10px",
                            marginTop: "10px",
                            display: "flex", // Use flexbox to layout children side by side
                            flexDirection: "row", // Align children horizontally
                            alignItems: "flex-start", // Align items at the start of the flex container
                        }}
                    >

                        <div
                            style={{
                                height: "90%", // Set to 90% of the parent div's height
                                width: "150px", // Adjusted width to make space for sliders
                                marginTop: "15px",
                                backgroundColor: isDarkMode ? "#2e2d2d" : "white",
                                display: "flex", // Further nest flexbox for internal layout
                                flexDirection: "column", // Stack children vertically
                                overflowY: "auto", // Add overflow-y property to enable vertical scrolling
                                boxSizing: "border-box", // Include border width in the total width calculation
                            }}
                        >
                            <p
                                style={{
                                    fontSize: "12px",
                                    marginLeft: "25px",
                                    color: isDarkMode ? "white" : "black", // Ensure text is white for visibility on dark backgrounds
                                    marginTop: "20px",
                                }}
                            >
                                Add slider
                            </p>
                            <div className={isDarkMode ? "custom-scrollbar-dark-mode" : "custom-scrollbar-light-mode"}
                                style={{
                                    height: "70%", // Set height to fit content
                                    width: "70%", // Adjust width to fill parent
                                    backgroundColor: isDarkMode ? "black" : "white", // Set the background color to blue for the bottom half
                                    border: isDarkMode ? "1px solid gray" : "1px solid black",
                                    marginLeft: "25px",
                                    overflowY: "auto", // Add overflow-y property to enable vertical scrolling
                                }}
                            >
                                {kOptions.map((option) => (
                                    <div
                                        key={option}
                                        style={{
                                            color: isDarkMode ? "white" : "black",
                                            padding: "5px",
                                            fontSize: "12px",
                                        }}
                                    >
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={kOptions_for_sliders[option]}
                                                onChange={() => handleCheckboxChange(option)}
                                            />
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            style={{
                                height: "100%", // Set to 90% of the parent div's height
                                width: "80%", // Set to 50% to fit next to checkboxes
                                backgroundColor: isDarkMode ? "#2e2d2d" : "white",
                                display: "flex", // Use flexbox to layout sliders
                                flexDirection: "column", // Stack sliders vertically
                                justifyContent: "center", // Center sliders vertically within the container
                                padding: "40px", // Padding around sliders
                                boxSizing: "border-box", // Include border width in the total width calculation
                            }}
                        >
                             <MdClose
                                onClick={() => setShowSplitView(!showSplitView)}
                                style={{
                                    cursor: "pointer",
                                    marginLeft: "100%",
                                    marginTop: "-40px",
                                    fontSize: "20px",
                                    color: isDarkMode ? "white" : "black",
                                }}
                            />
                            <div
                                style={{
                                    height: "15%", // Set to 20% of the parent div's height
                                    width: "100%",
                                    display: "flex", // Use flexbox to layout controls horizontally
                                    flexDirection: "row", // Align controls horizontally
                                    justifyContent: "space-between", // Space controls evenly within the subpanel
                                    alignItems: "center", // Align controls vertically at the center
                                    marginTop: "-10px",
                                }}
                            >
                                {selectedParameter && (
                                    <div>
                                        <span
                                            style={{
                                                fontSize: "12px",
                                                marginRight: "10px",
                                                color: isDarkMode ? 'white' : 'black'
                                            }}
                                        >
                                            {selectedParameter}
                                        </span>
                                        <div className="minMaxInputContainer">
                                            <label style={{color: isDarkMode ? 'white' : 'black'}}>Min Value:</label>
                                            <input
                                                style={{backgroundColor: isDarkMode ? 'black' : 'white', color: isDarkMode ? 'white' : 'black'}}
                                                type="number"
                                                value={
                                                    minMaxValues[selectedParameter]
                                                        ? minMaxValues[selectedParameter]?.min || 0
                                                        : 0
                                                }
                                                onChange={handleMinValueChange}
                                            />
                                        </div>
                                        <div className="minMaxInputContainer">
                                            <label style={{color: isDarkMode ? 'white' : 'black'}}>Max Value:</label>
                                            <input
                                                style={{backgroundColor: isDarkMode ? 'black' : 'white', color: isDarkMode ? 'white' : 'black'}}
                                                type="number"
                                                value={minMaxValues[selectedParameter]?.max || 100}
                                                onChange={handleMaxValueChange}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={isDarkMode ? "custom-scrollbar-sliders-dark-mode" : "custom-scrollbar-light-mode"}
                                style={{
                                        height: "85%", // Set to 85% of the parent div's height
                                        width: "100%",
                                        backgroundColor: isDarkMode ? "#2e2d2d" : "white",
                                        display: "flex", // Use flexbox to layout sliders
                                        flexDirection: "column", // Stack sliders vertically
                                        justifyContent: "flex-start", // Align items at the start of the container
                                        marginTop: "2%",
                                        boxSizing: "border-box",
                                        overflowY: "auto", // Add scrollbar when content overflows vertically
                                    }}
                            >
                                {kOptions.map((option) => {
                                    if (kOptions_for_sliders[option]) {
                                        const range = minMaxValues[option].max - minMaxValues[option].min;
                                        const stepSize = range / 100;
                                        const currentVal =
                                            sliderValues[option] === minMaxValues[option].min
                                                ? 0
                                                : sliderValues[option];

                                        return (
                                            <div
                                                key={option + "-slider"}
                                                style={{
                                                    width: "100%",
                                                    marginTop: "5%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        flex: 1,
                                                        position: "relative",
                                                    }}
                                                >
                                                    <input
                                                        type="range"
                                                        min={minMaxValues[option].min}
                                                        max={minMaxValues[option].max}
                                                        value={sliderValues[option]}
                                                        step={stepSize} // Use the computed stepSize here
                                                        onChange={(e) => handleSliderChange(option, e.target.value)}
                                                        style={{
                                                            width: "100%",
                                                            background: `linear-gradient(to right, #2273f5 0%, blue ${
                                                                ((sliderValues[option] - minMaxValues[option].min) /
                                                                    (minMaxValues[option].max - minMaxValues[option].min)) *
                                                                100
                                                            }%, ${"#9b9a9c"} ${
                                                                ((sliderValues[option] - minMaxValues[option].min) /
                                                                    (minMaxValues[option].max - minMaxValues[option].min)) *
                                                                100
                                                            }%, ${"#9b9a9c"} 100%, transparent 100%)`,
                                                        }}

                                                        className="slider"
                                                    />
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            top: "-10px",
                                                            left: "20px",
                                                            transform: "translateX(-50%)",
                                                            fontSize: "12px",
                                                            color: isDarkMode ? 'white' : 'black'
                                                        }}
                                                    >
                                                        {currentVal}
                                                    </div>
                                                </div>
                                                <div className="labelContainer">
                                                    <label
                                                        className="sliderLabel"
                                                        style={{
                                                            marginLeft: "15px",
                                                            fontSize: "12px",
                                                            marginTop: "7px",
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() => handleLabelClick(option)}
                                                    >
                                                        <span style={{color: isDarkMode ? 'white' : 'black'}}>
                                                            {option} [{minMaxValues[option]?.min || 0},{" "}
                                                            {minMaxValues[option]?.max || 0}]
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return;
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div
                        className={"centered-input-box"}
                        style={{
                            height: `${centerSubPanelHeight - 50}px`,
                            width: `${centerPanelWidth - 42}px`,
                            backgroundColor: isDarkMode ? "#1e1e1e" : "white",
                            border: isDarkMode ? "white" : "black",
                            outline: isDarkMode ? "1px solid white" : "1px solid black",
                            marginLeft: "10px",
                        }}
                    >
                        <div ref={editorRef} style={{ height: "100%", width: "100%" }} />
                        {isModalVisible && (
                            <div ref={modalRef}>
                              <CreateAnnotationModal
                                  onClose={() => setModalVisible(false)}
                                  annotationAddPosition={annotationAddPosition}
                                  editorInstance={editorInstance}
                                  varToAnnotate={varToAnnotate}
                              />
                            </div>
                        )}
                    </div>
                </>
            );
        }
    };

    return (
        <div className={`main-container ${isDarkMode ? "dark-mode" : "bright-mode"}`}>
            <LeftPanel
                // For general left panel
                leftSubpanelStyle={leftSubpanelStyle}
                panelWidth={panelWidth}
                isDarkMode={isDarkMode}
                activeAnalysisPanel={activeAnalysisPanel}
                // For Time Course Simulation
                handleLocalReset={handleLocalReset}
                onParametersChange={onParametersChange}
                handleIconClick={handleIconClick}
                simulationParam={simulationParam}
                setShowSplitView={setShowSplitView}
                handleTextChange={handleTextChange}
                initialOptions={initialOptions}
                setSelectedOptions={setSelectedOptions}
                selectedOptions={selectedOptions} // For Parameter Scan
                set_xAxis_selected_option={set_xAxis_selected_option}
                onCheckboxChange={onCheckboxChange}
                additionalElements={additionalElements}
                isNewFileUploaded={isNewFileUploaded}
                setIsNewFileUploaded={setIsNewFileUploaded}
                isNewTabCreated={isNewTabCreated}
                setIsResetInitialState={setIsResetInitialState}
                isResetInitialState={isResetInitialState}
                editorInstance={editorInstance}
                // For Steady State
                data={data}
                computeSteadyState={computeSteadyState}
                steadyState={steadyState}
                eigenValues={eigenValues}
                jacobian={jacobian}
                // For Parameter Scan
                kOptions={kOptions}
                isShowLegendChecked={isShowLegendChecked}
                setIsShowLegendChecked={setIsShowLegendChecked}
                setPaletteColor={setPaletteColor}
            />

            <div
                className={"panels-container"}
                style={{
                    flexDirection: layoutVertical ? "column" : "row",
                    width: `${window.innerWidth - panelWidth}px`,
                }}
            >
                <div
                    className="center-subpanel"
                    style={{
                        ...centerSubPanelStyle,
                        height: `${centerSubPanelHeight}px`,
                    }}
                >
                    <div className="tab-content">{renderActiveTabContent()}</div>
                    <div
                        className={"front-size-adjustment"}
                        style={{
                            height: `${centerSubPanelHeight * 0.1}px`,
                            marginLeft: "10px",
                        }}
                    >
                        <label
                            style={{
                                color: isDarkMode ? "white" : "black",
                                fontSize: 12,
                            }}
                        >
                            Font Size:{" "}
                        </label>
                        <input
                            style={{
                                backgroundColor: isDarkMode ? "black" : "white",
                                color: isDarkMode ? "white" : "black",
                                border: isDarkMode ? "1px solid gray" : "1px solid #5e5d5d",
                                borderRadius: "4px",
                                width: "40px",
                                fontSize: 12,
                            }}
                            type="number"
                            value={sizeOfInput}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <RightPanel
                    rightSubpanelStyle={rightSubpanelStyle}
                    layoutVertical={layoutVertical}
                    setRightPanelWidth={setRightPanelWidth}
                    setCenterPanelWidth={setCenterPanelWidth}
                    leftPanelWidth={panelWidth}
                    isDarkMode={isDarkMode}
                    ref={plotGraphRef}
                    rightPanelWidth={rightPanelWidth}
                    data={data}
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                    xAxis_selected_option={xAxis_selected_option}
                    isNewTabCreated={isNewTabCreated}
                    handleDownloadPDF={handleDownloadPDF}
                    simulationParam={simulationParam}
                    isShowLegendChecked={isShowLegendChecked}
                    setIsShowLegendChecked={setIsShowLegendChecked}
                    paletteColor={paletteColor}
                    setLineColorMap={setLineColorMap}
                    lineColorMap={lineColorMap}
                    setLineWidthMap={setLineWidthMap}
                    lineWidthMap={lineWidthMap}
                    setLineStyleMap={setLineStyleMap}
                    lineStyleMap={lineStyleMap}
                />
            </div>

            <MenuHeader
                isDarkMode={isDarkMode}
                handleContentSelect={handleContentSelect}
                toggleDarkMode={toggleDarkMode}
                handleDownloadPDF={handleDownloadPDF}
                handleExportSBML={handleExportSBML}
                SBMLContent={SBMLContent}
                handleSBMLfile={handleSBMLfile}
                isNewFileUploaded={isNewFileUploaded}
                setIsNewFileUploaded={setIsNewFileUploaded}
                promptForFileNameAndDownload={promptForFileNameAndDownload}
                simulationParam={simulationParam}
                setSelectedParameter={setSelectedParameter}
                setActiveAnalysisPanel={setActiveAnalysisPanel}
                editorInstance={editorInstance}
                initialTabData={initialTabData}
                handleResetParameters={handleResetParameters}
                handleResetInApp={handleResetInApp}
            />
            <div className="search-container">
				<input
					id="biomodel-browse"
					style={{
						backgroundColor: isDarkMode ? "black" : "white",
						color: isDarkMode ? "white" : "black",
						border: isDarkMode ? "1px solid gray" : "1px solid black",
						borderRadius: "5px"
					}}
					type="text"
					placeholder="Search Biomodels"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<div id="biomddropdown" className="suggestions-dropdown"
					style={{
						backgroundColor: isDarkMode ? "black" : "white",
						color: isDarkMode ? "white" : "black",
						border: isDarkMode ? "1px solid gray" : "1px solid black"
					}}>
					<ul>
						{suggestions.map((model) => (
							<li
								key={model.id}
								onClick={() => setChosenModel(model.id)}
								style={{ cursor: "pointer" }}
							>
								{model.title}
								<div style={{ color: "#FD7F20" }}>
									{model.journal}, {model.date} - {model.authors.join(", ")}
								</div>
							</li>
						))}
					</ul>
				</div>
				{loading && <Loader loading={loading} />}
			</div>
        </div>
    );
};
export default DropdownWithPopup;
