import React, { useState } from 'react';

function DraggableLegend({ data, selectedOptions,colors }) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [dragging, setDragging] = useState(false);
  const [relPos, setRelPos] = useState({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    setRelPos({
      x: e.pageX - position.x,
      y: e.pageY - position.y
    });
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  const onMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.pageX - relPos.x,
        y: e.pageY - relPos.y
      });
    }
  };

  // Generate legend items based on plot data
  if (data.columns.length !== 0) {
      const legendItems = data.titles.map((title, index) => {
        if (selectedOptions[title]) {
          const color = colors[index % colors.length]
          return (
            <div key={index} style={{ fontSize: '12px', color: '#333', padding: '5px', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '30px', height: '2px', backgroundColor: color, marginRight: '7px' }}></div>
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
        backgroundColor: 'white',
        border: '1px solid #ccc',
        padding: '10px',
        cursor: 'move'
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {legendItems}
    </div>
  );
  }
}
export default DraggableLegend;