// ColorPickerComponent.jsx
import React, { useState, useEffect, useRef } from 'react';
import { SketchPicker } from 'react-color';

const ColorPickerComponent = ({ color, setColor, isDarkMode }) => {
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef(null);
    const buttonRef = useRef(null);

    const handleClickOutside = (event) => {
        if (
            pickerRef.current &&
            !pickerRef.current.contains(event.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target)
        ) {
            setShowPicker(false);
        }
    };

    useEffect(() => {
        if (showPicker) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPicker]);

    const handleButtonClick = () => {
        setShowPicker(!showPicker);
        // Delay event listener registration to allow button click event to complete
        setTimeout(() => {
            document.addEventListener('mousedown', handleClickOutside);
        }, 0);
    };

    return (
        <div style={{ display: 'inline-block', position: 'relative' }}>
            <button
                ref={buttonRef}
                onClick={handleButtonClick}
                style={{
                    width: '50px',
                    height: '20px',
                    backgroundColor: color,
                    border: "1px solid #a37d36"
                }}
            />
            {showPicker && (
                <div ref={pickerRef} style={{ position: 'absolute', zIndex: 1 }}>
                    <SketchPicker
                        color={color}
                        onChange={(color) => setColor(color.hex)} // Notify parent about color change
                        styles={{
                            default: {
                                picker: {
                                    backgroundColor: isDarkMode ? "#2e2d2d" : "white",
                                    border: "1px solid #a37d36"
                                }
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default ColorPickerComponent;