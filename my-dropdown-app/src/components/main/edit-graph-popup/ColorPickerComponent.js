import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

const ColorPickerComponent = ({
    color,
    setColor,
    isDarkMode
 }) => {
    const [showPicker, setShowPicker] = useState(false);
    return (
        <div style={{ display: 'inline-block', position: 'relative' }}>
            <button onClick={() => setShowPicker(!showPicker)} style={{ width: '50px', height: '20px', backgroundColor: color, border: "1px solid #a37d36" }}>
            </button>
            {showPicker && (
                <div style={{ position: 'absolute', zIndex: 1 }}>
                    <SketchPicker
                        color={color}
                        onChangeComplete={(color) => {
                        setColor(color.hex);
                    }}
                        styles={{ default: { picker: { backgroundColor: isDarkMode ? "#2e2d2d" : "white", border: "1px solid #a37d36" } } }}
                    />
                </div>
            )}
        </div>
    );
}

export default ColorPickerComponent;
