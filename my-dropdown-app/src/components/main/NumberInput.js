import React from "react";

const NumberInput = (props) => {
    const { label, value, onChange, isDarkMode, disabled, style} = props;
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            // Update the value when Enter key is pressed
            e.preventDefault(); // Prevent default form submission behavior
            e.target.blur(); // Remove focus from the input field
        }
    };
    return (
        <div style={{ marginBottom: "10px" }}>
            <label
                style={{
                    color: isDarkMode ? "white" : "black",
                    fontSize: 12,
                    display: "block",
                }}
            >
                {label}
                <input
                    style={{...style}}
                    type="text"
                    disabled={disabled}
                    onKeyDown={handleKeyDown}
                    value={value}
                    onChange={onChange}
                />
            </label>
        </div>
    );
};

export default NumberInput;
