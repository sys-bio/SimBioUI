import React, { useState, useEffect } from 'react';

function DraggableLegend({
    data,
    selectedOptions,
    colors, // colors is a map from title to color
    lineStyles, // lineStyles is a map from title to line style
    lineWidths, // lineWidths is a map from title to line width
    isLegendFrameBorderOn,
    legendFrameColor,
    legendFrameWidth,
    legendFrameGap,
    legendFrameLineLength,
    legendFrameInteriorColor,
    rightPanelWidth,
}) {
    const [position, setPosition] = useState({ x: rightPanelWidth - 200, y: 50 });
    const [dragging, setDragging] = useState(false);
    const [relPos, setRelPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Initialize the position based on rightPanelWidth when the component mounts
        setPosition({ x: rightPanelWidth - 200, y: 50 });
    }, [rightPanelWidth]);

    const onMouseDown = (e) => {
        e.preventDefault();
        setDragging(true);
        setRelPos({
            x: e.pageX - position.x,
            y: e.pageY - position.y,
        });
    };

    const onMouseUp = () => {
        setDragging(false);
    };

    const onMouseMove = (e) => {
        if (dragging) {
            setPosition({
                x: e.pageX - relPos.x,
                y: e.pageY - relPos.y,
            });
        }
    };

    // Define mapping from line styles to SVG stroke-dasharray values
    const dashArrayMap = {
        solid: '',
        dash: '5,5',
        dot: '2,2',
        dashdot: '5,5,2,5',
        longdash: '10,5',
        longdashdot: '10,5,2,5',
    };

    // Generate legend items based on plot data
    const legendItems = (data.titles || []).map((title, index) => {
        if (selectedOptions && selectedOptions[title]) {
            const color = colors[title]; // Correctly access color from the map
            const lineStyle = lineStyles[title] || 'solid';
            const lineWidth = lineWidths[title] || 2;
            const dashArray = dashArrayMap[lineStyle];

            return (
                <div
                    key={index}
                    style={{
                        fontSize: '12px',
                        color: '#333',
                        padding: '5px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <svg
                        width={legendFrameLineLength}
                        height="10"
                        style={{ marginRight: '7px' }}
                    >
                        <line
                            x1="0"
                            y1="5"
                            x2={legendFrameLineLength}
                            y2="5"
                            stroke={color}
                            strokeWidth={lineWidth}
                            strokeDasharray={dashArray}
                        />
                    </svg>
                    {title}
                </div>
            );
        }
        return null;
    });

    return (
        <div
            style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                backgroundColor: legendFrameInteriorColor,
                border: isLegendFrameBorderOn
                    ? `${legendFrameWidth}px solid ${legendFrameColor}`
                    : 'none',
                padding: `${legendFrameGap}px`,
                cursor: 'move',
            }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
        >
            {legendItems}
        </div>
    );
}

export default DraggableLegend;
