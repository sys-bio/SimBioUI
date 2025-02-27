import { React, useRef, useState } from 'react';
import { MdClose } from "react-icons/md";
import "./SliderPopupWindow.css";
import Draggable from "react-draggable";

const SliderPopupWindow = ({
    kOptions,
    kOptionsForSliders,
    minMaxValues,
    sliderValues,
    isDarkMode,
    selectedParameter,
    handleCheckboxChange,
    handleSliderChangeInSteadyState,
    handleMinValueChange,
    handleMaxValueChange,
    handleLabelClick,
    closeWindow,
    setShowSplitView,
	showSplitView,
	showSliderPopup,
	setShowSliderPopup,
}) => {
    const [size, setSize] = useState({ width: 500, height: 400 });
	const [isResizing, setIsResizing] = useState(false); // Flag to handle resizing
	const nodeRef = useRef(null);


    const handleDock = () => {
    	 setShowSliderPopup(false) // Hide the popup
		 setShowSplitView(true);   // Set split view to true
	 };

	const handleResize = (corner, e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsResizing(true);

		const startX = e.clientX;
		const startY = e.clientY;
		const startWidth = nodeRef.current.offsetWidth;
		const startHeight = nodeRef.current.offsetHeight;
		const startTop = nodeRef.current.offsetTop; // Get initial top position
		const startLeft = nodeRef.current.offsetLeft; // Get initial left position

		const handleMouseMove = (e) => {
			let newWidth = startWidth;
			let newHeight = startHeight;
			let newTop = startTop; // Default to the starting top position
			let newLeft = startLeft; // Default to the starting left position

			if (corner.includes("right")) {
				newWidth = Math.max(400, startWidth + (e.clientX - startX));
			} else if (corner.includes("left")) {
				newWidth = Math.max(400, startWidth - (e.clientX - startX));
				newLeft = startLeft + (e.clientX - startX); // Move the popup to the right when resizing from the left
			}

			if (corner.includes("bottom")) {
				newHeight = Math.max(300, startHeight + (e.clientY - startY));
			} else if (corner.includes("top")) {
				newHeight = Math.max(300, startHeight - (e.clientY - startY));
				newTop = startTop + (e.clientY - startY); // Move the popup down when resizing from the top
			}

			setSize({ width: newWidth, height: newHeight });
			nodeRef.current.style.width = `${newWidth}px`;
			nodeRef.current.style.height = `${newHeight}px`;
			nodeRef.current.style.top = `${newTop}px`; // Update the top position
			nodeRef.current.style.left = `${newLeft}px`; // Update the left position
		};

		const handleMouseUp = () => {
			setIsResizing(false);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);
	};

    return (
        <Draggable
			nodeRef={nodeRef}
   			disabled={isResizing} // Disable dragging while resizing
    		defaultPosition={{ x: 0, y: 0 }}
   			cancel=".non-draggable, .resize-handle-slider-popup"
        >
            <div
                ref={nodeRef}
                className={"slider-popup-window"}
                style={{
                    width: kOptions.length === 0 ? "30%" : "40%",
                    height: kOptions.length === 0 ? "10%" : "50%",
                    backgroundColor: isDarkMode ? "#242323" : "white",
                    padding: kOptions.length === 0 ? "10px" : "20px",
                    zIndex: 1001
                }}
            >
                {kOptions.length === 0 ? (
                    <div
                        style={{
                            color: isDarkMode ? "white" : "black",
                            textAlign: "center",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px"
                        }}
                    >
                        Click "Simulate" to show more data
                        <button
                            onClick={() => closeWindow(false)}
                            style={{
                                position: "absolute",
                                top: "50%",
                                right: "10px",
                                background: isDarkMode ? "black" : "white",
                                border: "1px solid gray",
                                borderRadius: "8px",
                                fontSize: "12px",
                                color: isDarkMode ? "white" : "black",
                                cursor: "pointer",
                            }}
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Options List with Checkboxes */}
                        <div
                            style={{
                                height: "100%", // Full height
                                width: "20%",
                                backgroundColor: isDarkMode ? "#242323" : "white",
                                display: "flex", // Nest flexbox for internal layout
                                flexDirection: "column", // Stack children vertically
                                overflowY: "auto",
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
                                Add sliders
                            </p>
                            <div
                                className={isDarkMode ? "custom-scrollbar-dark-mode" : "custom-scrollbar-light-mode"}
                                style={{
                                    height: "calc(100% - 40px)", // Adjust height to take up the full space below the heading
                                    width: "100%", // Full width
                                    backgroundColor: isDarkMode ? "black" : "white",
                                    borderRadius: "5px",
                                    overflowY: "auto", // Enable vertical scrolling
                                }}
                            >
                                {kOptions.map((option) => (
                                    <div
                                        key={option}
                                        className="non-draggable" // Apply non-draggable class here
                                        style={{
                                            color: isDarkMode ? "white" : "black",
                                            padding: "5px",
                                            fontSize: "12px",
                                        }}
                                    >
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={kOptionsForSliders[option]}
                                                onChange={() => handleCheckboxChange(option)}
                                            />
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sliders Section */}
                        <div
                            style={{
                                height: "100%", // Full height for this section too
                                width: "80%", // Set to 50% to fit next to checkboxes
                                backgroundColor: isDarkMode ? "#242323" : "white",
                                display: "flex", // Use flexbox to layout sliders
                                flexDirection: "column", // Stack sliders vertically
                                justifyContent: "center", // Center sliders vertically within the container
                                padding: "40px", // Padding around sliders
                                boxSizing: "border-box", // Include border width in the total width calculation
                            }}
                        >
                            <MdClose
                                onClick={() => closeWindow(false)}
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
                                                className="non-draggable" // Prevent dragging when using input
                                                style={{backgroundColor: isDarkMode ? 'black' : 'white', color: isDarkMode ? 'white' : 'black'}}
                                                type="number"
                                                value={minMaxValues[selectedParameter]?.min || 0}
                                                onChange={handleMinValueChange}
                                            />
                                        </div>
                                        <div className="minMaxInputContainer">
                                            <label style={{color: isDarkMode ? 'white' : 'black'}}>Max Value:</label>
                                            <input
                                                className="non-draggable" // Prevent dragging when using input
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
                                    display: "flex", // Use flexbox to layout sliders
                                    flexDirection: "column", // Stack sliders vertically
                                    justifyContent: "flex-start", // Align items at the start of the container
                                    marginTop: "2%",
                                    boxSizing: "border-box",
                                    overflowY: "auto", // Add scrollbar when content overflows vertically
                                }}
                            >
                                {kOptions.map((option) => {
                                    if (kOptionsForSliders[option]) {
                                        const range = minMaxValues[option].max - minMaxValues[option].min;
                                        const stepSize = range / 100;
                                        const currentVal =
                                            sliderValues[option] === minMaxValues[option].min
                                                ? 0
                                                : sliderValues[option];

                                        return (
                                            <div
                                                key={option + "-slider"}
                                                className="non-draggable" // Prevent dragging when interacting with sliders
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
                                                        onChange={(e) => handleSliderChangeInSteadyState(option, e.target.value, true)}
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
                                                        className="slider non-draggable" // Prevent dragging when using slider
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
                                                        className="sliderLabel non-draggable"
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
                                        return null;
                                    }
                                })}
                            </div>
                        </div>
                    </>
                )}
                <button
					className="dock-button"
					onClick={handleDock} // Attach the handleDoc function to onClick
					style={{
						position: "absolute",
						bottom: "10px",
						right: "70px",
						background: isDarkMode ? "black" : "white",
						border: "1px solid gray",
						borderRadius: "8px",
						fontSize: "12px",
						color: isDarkMode ? "white" : "black",
						cursor: "pointer",
						padding: "5px 10px",
					}}
				>
					Dock
				</button>
                <div
					className="resize-handle-slider-popup resize-handle-top-left-slider-popup"
					onMouseDown={(e) => handleResize("top-left", e)}
				/>
				<div
					className="resize-handle-slider-popup resize-handle-top-right-slider-popup"
					onMouseDown={(e) => handleResize("top-right", e)}
				/>
				<div
					className="resize-handle-slider-popup resize-handle-bottom-left-slider-popup"
					onMouseDown={(e) => handleResize("bottom-left", e)}
				/>
				<div
					className="resize-handle-slider-popup resize-handle-bottom-right-slider-popup"
					onMouseDown={(e) => handleResize("bottom-right", e)}
				/>
            </div>
        </Draggable>
    );
};

export default SliderPopupWindow;
