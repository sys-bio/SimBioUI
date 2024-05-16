import React from "react";

const NumberInput = (props) => {
    const { label, value, onChange, isDarkMode, disabled} = props;
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
                    style={{
                        backgroundColor: isDarkMode ? "black" : "#c4c2c2",
                        color: isDarkMode ? "white" : "black",
                        border: isDarkMode ? "1px solid gray" : "1px solid black",
                        borderRadius: "4px",
                        width: "60px",
                        fontSize: 12,
                    }}
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
