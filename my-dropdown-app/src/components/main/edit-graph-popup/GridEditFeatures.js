import React, { useState } from 'react';
import GridProperties from './GridProperties';

const GridEditFeatures = ({
    isDarkMode,
    // Major
    xMajorGridColor,
    setXMajorGridColor,
    yMajorGridColor,
    setYMajorGridColor,
    xMajorGridWidth,
    setXMajorGridWidth,
    yMajorGridWidth,
    setYMajorGridWidth,
    xMajorGridCount,
    setXMajorGridCount,
    yMajorGridCount,
    setYMajorGridCount,
    setIsXMajorGridOn,
    setIsYMajorGridOn,
    // Minor
    xMinorGridColor,
    setXMinorGridColor,
    yMinorGridColor,
    setYMinorGridColor,
    xMinorGridWidth,
    setXMinorGridWidth,
    yMinorGridWidth,
    setYMinorGridWidth,
    xMinorGridCount,
    setXMinorGridCount,
    yMinorGridCount,
    setYMinorGridCount,
    setIsXMinorGridOn,
    setIsYMinorGridOn
}) => {

    return (
        <div className="popup-center-edit-graph" style={{ backgroundColor: isDarkMode ? "#2e2d2d" : "white", display: "flex", flexDirection: "column"}}>
            <div style={{ display: "flex", flexDirection: "row", width: "750px", marginTop: "12px"}}>
                <div className={"border-with-text-simulation"} style={{ border: isDarkMode ? "1px solid gray" : "1px solid black", width: "350px", height: "100%"}}>
                    <span className="text-on-border-simulation" style={{ backgroundColor: isDarkMode ? "#2e2d2d" : "white", color: isDarkMode ? "white" : "black"}}>
                        Major Grids
                    </span>
                    <GridProperties
                        isDarkMode={isDarkMode}
                        xGridColor={xMajorGridColor}
                        setXGridColor={setXMajorGridColor}
                        yGridColor={yMajorGridColor}
                        setYGridColor={setYMajorGridColor}
                        xGridWidth={xMajorGridWidth}
                        setXGridWidth={setXMajorGridWidth}
                        yGridWidth={yMajorGridWidth}
                        setYGridWidth={setYMajorGridWidth}
                        xGridCount={xMajorGridCount}
                        setXGridCount={setXMajorGridCount}
                        yGridCount={yMajorGridCount}
                        setYGridCount={setYMajorGridCount}
                        type={"Major"}
                        setIsXGridOn={setIsXMajorGridOn}
                        setIsYGridOn={setIsYMajorGridOn}
                    />
                </div>
                <div className={"border-with-text-simulation"} style={{ border: isDarkMode ? "1px solid gray" : "1px solid black", width: "350px", height: "100%"}}>
                    <span className="text-on-border-simulation" style={{ backgroundColor: isDarkMode ? "#2e2d2d" : "white", color: isDarkMode ? "white" : "black"}}>
                        Minor Grids
                    </span>
                    <GridProperties
                        isDarkMode={isDarkMode}
                        xGridColor={xMinorGridColor}
                        setXGridColor={setXMinorGridColor}
                        yGridColor={yMinorGridColor}
                        setYGridColor={setYMinorGridColor}
                        xGridWidth={xMinorGridWidth}
                        setXGridWidth={setXMinorGridWidth}
                        yGridWidth={yMinorGridWidth}
                        setYGridWidth={setYMinorGridWidth}
                        xGridCount={xMinorGridCount}
                        setXGridCount={setXMinorGridCount}
                        yGridCount={yMinorGridCount}
                        setYGridCount={setYMinorGridCount}
                        type={"Minor"}
                        setIsXGridOn={setIsXMinorGridOn}
                        setIsYGridOn={setIsYMinorGridOn}
                    />
                </div>
            </div>
        </div>
    );
};

export default GridEditFeatures;
