import React, { useState } from 'react';
import ColorPickerComponent from './ColorPickerComponent'; // Ensure you have this component or use a library like 'react-color'

const GridProperties = ({ isDarkMode }) => {
    const [xMajorGridColor, setXMajorGridColor] = useState('#000000');
    const [yMajorGridColor, setYMajorGridColor] = useState('#000000');
    const [xMajorGridWidth, setXMajorGridWidth] = useState(1);
    const [yMajorGridWidth, setYMajorGridWidth] = useState(1);
    const [xMajorGridCount, setXMajorGridCount] = useState(5);
    const [yMajorGridCount, setYMajorGridCount] = useState(5);

    const handleGridWidthChange = (setter, value) => {
        setter(Math.max(1, value));
    };

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
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={`${process.env.PUBLIC_URL}/grid1.png`} alt="Grid Style 1" style={{ width: '50px', height: '50px' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={`${process.env.PUBLIC_URL}/grid2.png`} alt="Grid Style 2" style={{ width: '50px', height: '50px' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={`${process.env.PUBLIC_URL}/grid3.png`} alt="Grid Style 3" style={{ width: '50px', height: '50px' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={`${process.env.PUBLIC_URL}/grid4.png`} alt="Grid Style 4" style={{ width: '50px', height: '50px' }} />
                </div>
            </div>
            <div>
                <label style={{color: isDarkMode ? "white" : "black", fontSize: "12px"}}>
                    X Major Grid Color:
                    <ColorPickerComponent color={xMajorGridColor} setColor={setXMajorGridColor} isDarkMode={isDarkMode} />
                </label>
            </div>
            <div>
                <label style={{color: isDarkMode ? "white" : "black", fontSize: "12px"}}>
                    Y Major Grid Color:
                    <ColorPickerComponent color={yMajorGridColor} setColor={setYMajorGridColor} isDarkMode={isDarkMode} />
                </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <label style={{ flex: 1, color: isDarkMode ? "white" : "black", fontSize: "12px"}}>X Major Grid Width:</label>
                <button style={styleForButtonsInGridPanel} onClick={() => handleGridWidthChange(setXMajorGridWidth, xMajorGridWidth - 1)}>-</button>
                <input
                    type="number"
                    value={xMajorGridWidth}
                    onChange={(e) => setXMajorGridWidth(Number(e.target.value))}
                    style={{ ...styleForButtonsInGridPanel, width: '50px', textAlign: 'center' }}
                />
                <button style={styleForButtonsInGridPanel} onClick={() => handleGridWidthChange(setXMajorGridWidth, xMajorGridWidth + 1)}>+</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <label style={{ flex: 1, color: isDarkMode ? "white" : "black", fontSize: "12px"}}>Y Major Grid Width:</label>
                <button style={styleForButtonsInGridPanel} onClick={() => handleGridWidthChange(setYMajorGridWidth, yMajorGridWidth - 1)}>-</button>
                <input
                    type="number"
                    value={yMajorGridWidth}
                    onChange={(e) => setYMajorGridWidth(Number(e.target.value))}
                    style={{ ...styleForButtonsInGridPanel, width: '50px', textAlign: 'center' }}
                />
                <button style={styleForButtonsInGridPanel} onClick={() => handleGridWidthChange(setYMajorGridWidth, yMajorGridWidth + 1)}>+</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <label style={{ flex: 1, color: isDarkMode ? "white" : "black", fontSize: "12px"}}>Number of X Major Grids:</label>
                <button style={styleForButtonsInGridPanel} onClick={() => setXMajorGridCount(Math.max(1, xMajorGridCount - 1))}>-</button>
                <input
                    type="number"
                    value={xMajorGridCount}
                    onChange={(e) => setXMajorGridCount(Number(e.target.value))}
                    style={{ ...styleForButtonsInGridPanel, width: '50px', textAlign: 'center' }}
                />
                <button style={styleForButtonsInGridPanel} onClick={() => setXMajorGridCount(xMajorGridCount + 1)}>+</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <label style={{ flex: 1, color: isDarkMode ? "white" : "black", fontSize: "12px"}}>Number of Y Major Grids:</label>
                <button style={styleForButtonsInGridPanel} onClick={() => setYMajorGridCount(Math.max(1, yMajorGridCount - 1))}>-</button>
                <input
                    type="number"
                    value={yMajorGridCount}
                    onChange={(e) => setYMajorGridCount(Number(e.target.value))}
                    style={{ ...styleForButtonsInGridPanel, width: '50px', textAlign: 'center' }}
                />
                <button style={styleForButtonsInGridPanel} onClick={() => setYMajorGridCount(yMajorGridCount + 1)}>+</button>
            </div>
        </>
    );
};

export default GridProperties;
