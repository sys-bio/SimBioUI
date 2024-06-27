import React, { useState } from 'react';
import ColorPickerComponent from './ColorPickerComponent'; // Ensure you have this component or use a library like 'react-color'

const GridProperties = ({
    isDarkMode,
    xGridColor,
    setXGridColor,
    yGridColor,
    setYGridColor,
    xGridWidth,
    setXGridWidth,
    yGridWidth,
    setYGridWidth,
    xGridCount,
    setXGridCount,
    yGridCount,
    setYGridCount,
    type,
    setIsXGridOn,
    setIsYGridOn
    }) => {

    const handleGridWidthChange = (setter, value) => {
        setter(Math.max(1, value));
    };

    // Functions to choose which grid is on
    const handleNoGrid = () => {
        setIsXGridOn(false);
        setIsYGridOn(false);
    }
    const handleXGrid =() => {
        setIsXGridOn(true);
        setIsYGridOn(false);
    }
    const handleYGrid = () => {
        setIsXGridOn(false);
        setIsYGridOn(true);
    }
    const handleBothGrids = () => {
        setIsXGridOn(true);
        setIsYGridOn(true);
    }

    // Function to change style for buttons
    const styleForButtonsInGridPanel = {
        backgroundColor: isDarkMode ? "#2e2d2d" : "white",
        color: isDarkMode ? "white" : "black",
        border: "1px solid gray",
        borderRadius: "8px"
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <button onClick={handleNoGrid} style={{ background: 'none', border: 'none', padding: 0 }}>
                    <img src={`${process.env.PUBLIC_URL}/grid1.png`} style={{ width: '50px', height: '50px' }} />
                </button>
                <button onClick={handleXGrid} style={{ background: 'none', border: 'none', padding: 0 }}>
                    <img src={`${process.env.PUBLIC_URL}/grid2.png`} style={{ width: '50px', height: '50px' }} />
                </button>
                <button onClick={handleYGrid} style={{ background: 'none', border: 'none', padding: 0 }}>
                    <img src={`${process.env.PUBLIC_URL}/grid3.png`} style={{ width: '50px', height: '50px' }} />
                </button>
                <button onClick={handleBothGrids} style={{ background: 'none', border: 'none', padding: 0 }}>
                    <img src={`${process.env.PUBLIC_URL}/grid4.png`} style={{ width: '50px', height: '50px' }} />
                </button>
            </div>
            <div>
                <span style={{color: isDarkMode ? "white" : "black", fontSize: "12px"}}>
                    X {type} Grid Color:
                </span>
                <ColorPickerComponent color={xGridColor} setColor={setXGridColor} isDarkMode={isDarkMode} />
            </div>
            <div>
                <span style={{color: isDarkMode ? "white" : "black", fontSize: "12px"}}>
                    Y {type} Grid Color:
                </span>
                <ColorPickerComponent color={yGridColor} setColor={setYGridColor} isDarkMode={isDarkMode} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <label style={{ flex: 1, color: isDarkMode ? "white" : "black", fontSize: "12px"}}>X {type} Grid Width:</label>
                <button style={styleForButtonsInGridPanel} onClick={() => handleGridWidthChange(setXGridWidth, xGridWidth - 1)}>-</button>
                <input
                    type="number"
                    value={xGridWidth}
                    onChange={(e) => setXGridWidth(Number(e.target.value))}
                    style={{ ...styleForButtonsInGridPanel, width: '50px', textAlign: 'center' }}
                />
                <button style={styleForButtonsInGridPanel} onClick={() => handleGridWidthChange(setXGridWidth, xGridWidth + 1)}>+</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <label style={{ flex: 1, color: isDarkMode ? "white" : "black", fontSize: "12px"}}>Y {type} Grid Width:</label>
                <button style={styleForButtonsInGridPanel} onClick={() => handleGridWidthChange(setYGridWidth, yGridWidth - 1)}>-</button>
                <input
                    type="number"
                    value={yGridWidth}
                    onChange={(e) => setYGridWidth(Number(e.target.value))}
                    style={{ ...styleForButtonsInGridPanel, width: '50px', textAlign: 'center' }}
                />
                <button style={styleForButtonsInGridPanel} onClick={() => handleGridWidthChange(setYGridWidth, yGridWidth + 1)}>+</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <label style={{ flex: 1, color: isDarkMode ? "white" : "black", fontSize: "12px"}}>Number of X {type} Grids:</label>
                <button style={styleForButtonsInGridPanel} onClick={() => setXGridCount(Math.max(1, xGridCount - 1))}>-</button>
                <input
                    type="number"
                    value={xGridCount}
                    onChange={(e) => setXGridCount(Number(e.target.value))}
                    style={{ ...styleForButtonsInGridPanel, width: '50px', textAlign: 'center' }}
                />
                <button style={styleForButtonsInGridPanel} onClick={() => setXGridCount(xGridCount + 1)}>+</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <label style={{ flex: 1, color: isDarkMode ? "white" : "black", fontSize: "12px"}}>Number of Y {type} Grids:</label>
                <button style={styleForButtonsInGridPanel} onClick={() => setYGridCount(Math.max(1, yGridCount - 1))}>-</button>
                <input
                    type="number"
                    value={yGridCount}
                    onChange={(e) => setYGridCount(Number(e.target.value))}
                    style={{ ...styleForButtonsInGridPanel, width: '50px', textAlign: 'center' }}
                />
                <button style={styleForButtonsInGridPanel} onClick={() => setYGridCount(yGridCount + 1)}>+</button>
            </div>
        </>
    );
};

export default GridProperties;
