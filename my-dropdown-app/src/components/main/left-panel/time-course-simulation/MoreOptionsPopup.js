import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import "./MoreOptionsPopup.css"; // Add styles for your popup if needed

const MoreOptionsPopup = ({
    selectedElements,
    addElementToSelected,
    closePopup,
    clearAllElements,
    floatingSpecies = [], // Provide default values as empty arrays
    boundarySpecies = [],
    reactionRates = [],
    kOptions = [], // Add kOptions with a default value
    handleMoreOptionsApply,
    isParameterScan
}) => {
    const nodeRef = useRef(null);
    const [showFloatingSpecies, setShowFloatingSpecies] = useState(false);
    const [showBoundarySpecies, setShowBoundarySpecies] = useState(false);
    const [showReactionRates, setShowReactionRates] = useState(false);
    const [showRateOfChanges, setShowRateOfChanges] = useState(false);
    const [showElasticities, setShowElasticities] = useState(false);
    const [showEigenvalues, setShowEigenvalues] = useState(false);
    const [showOther, setShowOther] = useState(false);
    const [expandedElasticities, setExpandedElasticities] = useState({}); // Track expanded items in Elasticities
    const [rightPopupItems, setRightPopupItems] = useState([]); // Track items added to the right popup
    const [size, setSize] = useState({ width: 700, height: 500 });
    const [selectedMap, setSelectedMap] = useState({}); // Map for selected items

    const handleResize = (corner, e) => {
        e.stopPropagation();
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = size.width;
        const startHeight = size.height;
        const startLeft = nodeRef.current.offsetLeft;
        const startTop = nodeRef.current.offsetTop;

        const handleMouseMove = (e) => {
            let newWidth = startWidth;
            let newHeight = startHeight;
            let newLeft = startLeft;
            let newTop = startTop;

            if (corner.includes("right")) {
                newWidth = startWidth + (e.clientX - startX);
            } else if (corner.includes("left")) {
                newWidth = startWidth - (e.clientX - startX);
                newLeft = startLeft + (e.clientX - startX);
            }

            if (corner.includes("bottom")) {
                newHeight = startHeight + (e.clientY - startY);
            } else if (corner.includes("top")) {
                newHeight = startHeight - (e.clientY - startY);
                newTop = startTop + (e.clientY - startY);
            }

            // Prevent the popup from shrinking too small
            if (newWidth >= 400) {
                setSize((prevSize) => ({
                    ...prevSize,
                    width: newWidth,
                }));
                nodeRef.current.style.left = `${newLeft}px`;
            }

            if (newHeight >= 400) {
                setSize((prevSize) => ({
                    ...prevSize,
                    height: newHeight,
                }));
                nodeRef.current.style.top = `${newTop}px`;
            }
        };

        const handleMouseUp = () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    const rateOfChanges = floatingSpecies.map(species => `${species}'`);
    const eigenvalues = floatingSpecies.flatMap(species => [
        `eigenReal(${species})`,
        `eigenImag(${species})`
    ]);

    const allItems = [
        ...floatingSpecies,
        ...boundarySpecies,
        ...reactionRates,
        ...rateOfChanges,
        ...eigenvalues,
        ...kOptions
    ];

    const ToggleableList = ({ title, items, showItems, toggleItems, handleAddElement, handleToggleItem, expandedItems = {} }) => {
        return (
            <div>
                <div onClick={toggleItems} style={{ cursor: 'pointer', color: 'white', marginTop: '10px' }}>
                    <span className={"more-options-small-text"}>
                        {showItems ? '▼' : '▶'} {title}
                    </span>
                </div>
                {showItems && (
                    <div className="floating-species-list">
                        {items.map(item => (
                            <div key={item}>
                                <div
                                    className={"more-options-small-text more-options-popup-species-options"}
                                    onClick={() => {
                                        if (handleToggleItem) {
                                            handleToggleItem(item);
                                        }
                                        handleAddElement(item); // This adds the whole item name to the right popup
                                    }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {title === "Elasticities" ? (expandedItems[item] ? '▼' : '▶') : null} {item}
                                </div>
                                {expandedItems[item] && title === "Elasticities" && (
                                    <div style={{ marginLeft: '20px', color: 'white' }}>
                                        {floatingSpecies?.map(species => (
                                            <div
                                                className={"more-options-small-text more-options-popup-species-options"}
                                                key={`${item}-${species}`}
                                                onClick={() => handleAddElement(`ec(${item}, ${species})`)}
                                            >
                                                ec({item}, {species})
                                            </div>
                                        ))}
                                        {kOptions?.map(option => (
                                            <div
                                                className={"more-options-small-text more-options-popup-species-options"}
                                                key={`${item}-${option}`}
                                                onClick={() => handleAddElement(`ec(${item}, ${option})`)}
                                            >
                                                ec({item}, {option})
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

     const handleAddElement = (category, element) => {
		if (!rightPopupItems.includes(element)) {
			setRightPopupItems([...rightPopupItems, element]); // Add item to the right popup
		}

		setSelectedMap((prevMap) => {
			const newMap = { ...prevMap };
			if (!newMap[category]) {
				newMap[category] = [];
			}
			if (!newMap[category].includes(element)) {
				newMap[category].push(element);
			}
			return newMap;
		});
	};

	const handleRemoveElement = (element) => {
		// Remove the element from rightPopupItems
		setRightPopupItems(rightPopupItems.filter(e => e !== element));

		// Update the selectedMap
		setSelectedMap((prevMap) => {
			const newMap = { ...prevMap };

			// Find the category which contains the element
			for (const category in newMap) {
				const index = newMap[category].indexOf(element);
				if (index !== -1) {
					// Remove the element from the category
					newMap[category].splice(index, 1);

					// If the category is empty, delete the category from the map
					if (newMap[category].length === 0) {
						delete newMap[category];
					}

					break; // Exit loop once element is found and removed
				}
			}

			return newMap;
		});
	};

    const handleToggleElasticity = (item) => {
        setExpandedElasticities(prevState => ({
            ...prevState,
            [item]: !prevState[item]
        }));
    };

    const handleAddAllElements = () => {
        setRightPopupItems(allItems);
    };

    const handleClearAllElements = () => {
        setRightPopupItems([]);
    };

	const handleApply = () => {
		handleMoreOptionsApply(selectedMap, isParameterScan); // Pass the selected map when Apply is clicked
		closePopup();
	};

    return (
        <Draggable nodeRef={nodeRef} defaultPosition={{ x: -250, y: -250 }}>
            <div
                ref={nodeRef}
                className="more-options-popup"
                style={{
                    width: `${size.width}px`,
                    height: `${size.height}px`
                }}
            >
                <div className="more-options-popup-header">
                    <div className="more-options-popup-header-left">
                        <p>Click entry to add it</p>
                    </div>
                    <div className="more-options-popup-header-right">
                        <p>Click entry to remove it</p>
                    </div>
                </div>
                <div className="more-options-popup-header">
                    <div className="more-options-popup-header-left">
                        <p>Possible Choices:</p>
                    </div>
                    <div className="more-options-popup-header-right">
                        <p>Selected Choices:</p>
                    </div>
                </div>

                <div className="more-options-popup-body">
					<div className="more-options-popup-left">
						<ToggleableList
							title="Floating Species"
							items={floatingSpecies}
							showItems={showFloatingSpecies}
							toggleItems={() => setShowFloatingSpecies(prev => !prev)}
							handleAddElement={(item) => handleAddElement('Floating Species', item)}
						/>

						<ToggleableList
							title="Boundary Species"
							items={boundarySpecies}
							showItems={showBoundarySpecies}
							toggleItems={() => setShowBoundarySpecies(prev => !prev)}
							handleAddElement={(item) => handleAddElement('Boundary Species', item)}
						/>

						<ToggleableList
							title="Reaction Rates"
							items={reactionRates}
							showItems={showReactionRates}
							toggleItems={() => setShowReactionRates(prev => !prev)}
							handleAddElement={(item) => handleAddElement('Reaction Rates', item)}
						/>

						<ToggleableList
							title="Rate of Changes"
							items={rateOfChanges}
							showItems={showRateOfChanges}
							toggleItems={() => setShowRateOfChanges(prev => !prev)}
							handleAddElement={(item) => handleAddElement('Rate of Changes', item)}
						/>

						<ToggleableList
							title="Elasticities"
							items={reactionRates}
							showItems={showElasticities}
							toggleItems={() => setShowElasticities(prev => !prev)}
							handleAddElement={(item) => handleAddElement('Elasticities', item)}
							handleToggleItem={handleToggleElasticity}
							expandedItems={expandedElasticities}
						/>

						<ToggleableList
							title="Eigenvalues"
							items={eigenvalues}
							showItems={showEigenvalues}
							toggleItems={() => setShowEigenvalues(prev => !prev)}
							handleAddElement={(item) => handleAddElement('Eigenvalues', item)}
						/>

						<ToggleableList
							title="Other"
							items={kOptions}
							showItems={showOther}
							toggleItems={() => setShowOther(prev => !prev)}
							handleAddElement={(item) => handleAddElement('Other', item)}
						/>
					</div>

                    <div className="more-options-popup-right">
                        <div className="more-options-small-text">
                            {rightPopupItems.map((element) => (
                                <div
                                    className={"more-options-popup-text-on-the-right"}
                                    key={element}
                                    onClick={() => handleRemoveElement(element)}
                                >
                                    {element}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="more-options-popup-top">
                    <button className={"more-options-popup-buttons"} onClick={handleAddAllElements}>Add All</button>
                    <button className={"more-options-popup-buttons"} onClick={handleClearAllElements}>Clear All</button>
                </div>

                <div className="more-options-popup-bottom">
                    <button className={"more-options-popup-buttons"} onClick={handleApply}>Apply</button>
                    <button className={"more-options-popup-buttons"} onClick={closePopup}>Close</button>
                </div>
				<div
                    className="resize-handle resize-handle-top-left"
                    onMouseDown={(e) => handleResize("top-left", e)}
                />
                <div
                    className="resize-handle resize-handle-top-right"
                    onMouseDown={(e) => handleResize("top-right", e)}
                />
                <div
                    className="resize-handle resize-handle-bottom-left"
                    style={{top: size.height - 11}}
                    onMouseDown={(e) => handleResize("bottom-left", e)}
                />

                <div
					className="resize-handle resize-handle-bottom-right"
					style={{top: size.height - 11}}
					onMouseDown={(e) => handleResize("bottom-right", e)}
				/>

            </div>
        </Draggable>
    );
};

export default MoreOptionsPopup;
