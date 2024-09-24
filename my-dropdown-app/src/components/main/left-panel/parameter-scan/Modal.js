import React from 'react';
import './Modal.css'; // Ensure this CSS file is included

const Modal = ({ show, onClose, content, isDarkMode }) => {
    if (!show) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(content).then(() => {
            alert('Copied to clipboard!');
        }).catch((error) => {
            console.error('Copy failed', error);
        });
    };

    const generalStyle = (isDarkMode, darkBackground, lightBackGround, darkBorder, lightBorder) => ({
        backgroundColor: isDarkMode ? darkBackground : lightBackGround,
        color: isDarkMode ? "white" : "black",
        border: isDarkMode ? `1px solid ${darkBorder}` : `1px solid ${lightBorder}`,
    });

    return (
        <div className="modal-overlay">
            <div className={`modal-content ${isDarkMode ? "custom-scrollbar-sliders-dark-mode" : "custom-scrollbar-light-mode"}`}
                 style={generalStyle(isDarkMode, "#2e2d2d", "white", "gray", "black")}>
                <div className="modal-body">
                    <pre>{content}</pre> {/* Display content with preformatted text */}
                </div>
                <div className="modal-footer" style={generalStyle(isDarkMode, "#2e2d2d", "white", "gray", "black")}>
                    <button className="copy-button" style={generalStyle(isDarkMode, "black", "white", "gray", "black")} onClick={handleCopy}>Copy</button>
                    <button className="close-button" style={generalStyle(isDarkMode, "black", "white", "gray", "black")} onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
