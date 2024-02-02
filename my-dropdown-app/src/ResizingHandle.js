import React, { useEffect } from 'react';

const ResizingHandle = ({ panelRef, resizingRef, handleResize, resizeStyle, isRightPanel = false }) => {
    useEffect(() => {
        const startResizingGlobal = (e) => {
            if (panelRef.current) {
                const panelRect = panelRef.current.getBoundingClientRect();
                let closeToEdge = false;
                if (isRightPanel) {
                    // For right panel, check proximity to the left edge
                    closeToEdge = e.clientX > panelRect.left - 10 && e.clientX < panelRect.left + 10;
                } else {
                    // For left panel, check proximity to the right edge
                    closeToEdge = e.clientX > panelRect.right - 10 && e.clientX < panelRect.right + 10;
                }
                if (closeToEdge) {
                    resizingRef.current = true;
                }
            }
        };

        const stopResizingGlobal = () => {
            resizingRef.current = false;
        };

        document.addEventListener('mousedown', startResizingGlobal);
        document.addEventListener('mousemove', handleResize);
        document.addEventListener('mouseup', stopResizingGlobal);

        return () => {
            document.removeEventListener('mousedown', startResizingGlobal);
            document.removeEventListener('mousemove', handleResize);
            document.removeEventListener('mouseup', stopResizingGlobal);
        };
    }, [panelRef, resizingRef, handleResize]);

    return <div className={resizeStyle} onMouseDown={handleResize}></div>;
};

export default ResizingHandle;
