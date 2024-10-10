import { MIN_PANEL_WIDTH } from "../constants/const";

export const getPanelStyles = ({ layoutVertical, panelWidth, isDarkMode, centerPanelWidth, rightPanelWidth }) => {
    if (layoutVertical) {
        return {
            leftSubpanelStyle: {
                overflow: "scroll",
                width: panelWidth,
                backgroundColor: isDarkMode
                    ? panelWidth > MIN_PANEL_WIDTH
                        ? "#2e2d2d"
                        : "black"
                    : panelWidth > MIN_PANEL_WIDTH
                    ? "white"
                    : "black", // Adjust colors for dark/bright mode
                border: isDarkMode ? "1px solid gray" : "1px solid #5e5d5d",
            },
            centerSubPanelStyle: {
                // Adjust styles for center panel when stacked vertically
                width: centerPanelWidth,
                height: window.innerHeight / 2,
                marginTop: "60px",
                order: 1, // Place below the left panel
            },
            rightSubpanelStyle: {
                overflow: "scroll",
                width: rightPanelWidth,
                height: (window.innerHeight - 100) / 2,
                marginBottom: "40px",
                order: 2, // Place below the center panel
            },
        };
    } else {
        // Original styles for horizontal layout
        return {
            leftSubpanelStyle: {
                overflow: "scroll",
                width: panelWidth,

                backgroundColor: isDarkMode
                    ? panelWidth > MIN_PANEL_WIDTH
                        ? "#2e2d2d"
                        : "#000000"
                    : "white", // Adjust colors for dark/bright mode
                border: isDarkMode ? "1px solid gray" : "1px solid #5e5d5d",
                marginTop: "70px", /* Adjust the margin-top to move the sub-panel up */
                marginBottom: "80px" /* Remove margin-bottom */
            },
            centerSubPanelStyle: {
                width: centerPanelWidth,
                height: window.innerHeight - 100,
                backgroundColor: isDarkMode ? "#2e2d2d" : "white",
                border: isDarkMode ? "1px solid gray" : "1px solid #5e5d5d",
                marginTop: "70px", // Adjust the margin-top to move the sub-panel up
                marginBottom: "80px", // Remove margin-bottom
            },
            rightSubpanelStyle: {
                overflow: "scroll",
                width: rightPanelWidth,
                height: window.innerHeight - 100,
                backgroundColor: isDarkMode ? "#2e2d2d" : "white",
                border: isDarkMode ? "1px solid gray" : "1px solid #5e5d5d",
                marginTop: "70px" /* Adjust the margin-top to move the sub-panel up */,
                marginBottom: "80px" /* Remove margin-bottom */,
            },
        };
    }
};
