import React, { useState } from 'react';
import GridProperties from './GridProperties';

const GridEditFeatures = ({
    isDarkMode
}) => {

    return (
        <div className="popup-center-edit-graph" style={{ backgroundColor: isDarkMode ? "#2e2d2d" : "white", display: "flex", flexDirection: "column"}}>
            <div style={{backgroundColor: isDarkMode ? "#2e2d2d" : "white", width: "375px", height: "100%", marginTop: "12px"}}>
                <div className={"border-with-text-simulation"} style={{ border: isDarkMode ? "1px solid gray" : "1px solid black", width: "350px", height: "100%"}}>
                    <span className="text-on-border-simulation" style={{ backgroundColor: isDarkMode ? "#2e2d2d" : "white", color: isDarkMode ? "white" : "black"}}>
                        Major Grids
                    </span>
                    <GridProperties isDarkMode={isDarkMode} />
                </div>
            </div>
        </div>
    )
};

export default GridEditFeatures;
