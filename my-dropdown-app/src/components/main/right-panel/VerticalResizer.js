import React, { useRef } from 'react';
import './VerticalResizer.css'; // We'll create this CSS file

const VerticalResizer = ({ onResizeStart }) => {
  const resizerRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    onResizeStart(e);
  };

  return (
    <div
      ref={resizerRef}
      className="vertical-resizer"
      onMouseDown={handleMouseDown}
    ></div>
  );
};

export default VerticalResizer;
