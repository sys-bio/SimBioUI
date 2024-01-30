import React, { useState, useEffect, useRef, useCallback } from 'react';

const CustomScrollbar = ({ children }) => {
    const contentRef = useRef(null);
    const scrollTrackRef = useRef(null);
    const scrollThumbRef = useRef(null);
    const observer = useRef(null);
    const [thumbHeight, setThumbHeight] = useState(20);
    const [scrollStartPosition, setScrollStartPosition] = useState(null);
    const [initialScrollTop, setInitialScrollTop] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const handleResize = (ref, trackSize) => {
        const { clientHeight, scrollHeight } = ref;
        setThumbHeight(Math.max((clientHeight / scrollHeight) * trackSize, 20));
    };

    const handleThumbPosition = useCallback(() => {
        if (!contentRef.current || !scrollTrackRef.current || !scrollThumbRef.current) {
            return;
        }
        const { scrollTop: contentTop, scrollHeight: contentHeight } = contentRef.current;
        const { clientHeight: trackHeight } = scrollTrackRef.current;
        const thumb = scrollThumbRef.current;
        const newTop = (contentTop / contentHeight) * trackHeight;
        thumb.style.top = `${newTop}px`;
    }, []);


    const handleScrollButton = (direction) => {
        const { current } = contentRef;
        if (current) {
            const scrollAmount = direction === 'down' ? 200 : -200;
            current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        }
    };

    const handleTrackClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { current: trackCurrent } = scrollTrackRef;
        const { current: contentCurrent } = contentRef;
        if (trackCurrent && contentCurrent) {
            const { clientY } = e;
            const rect = trackCurrent.getBoundingClientRect();
            const trackTop = rect.top;
            const thumbOffset = -(thumbHeight / 2);
            const clickRatio = (clientY - trackTop + thumbOffset) / trackCurrent.clientHeight;
            const scrollAmount = Math.floor(clickRatio * contentCurrent.scrollHeight);
            contentCurrent.scrollTo({
                top: scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const handleThumbMousedown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setScrollStartPosition(e.clientY);
        if (contentRef.current) setInitialScrollTop(contentRef.current.scrollTop);
        setIsDragging(true);
    };

    const handleThumbMouseup = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isDragging) {
            setIsDragging(false);
        }
    };

    const handleThumbMousemove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isDragging) {
            const { scrollHeight: contentScrollHeight, offsetHeight: contentOffsetHeight } = contentRef.current;
            const deltaY = (e.clientY - scrollStartPosition) * (contentOffsetHeight / thumbHeight);
            const newScrollTop = Math.min(initialScrollTop + deltaY, contentScrollHeight - contentOffsetHeight);
            contentRef.current.scrollTop = newScrollTop;
        }
    };

    useEffect(() => {
        if (contentRef.current && scrollTrackRef.current) {
            const ref = contentRef.current;
            const { clientHeight: trackSize } = scrollTrackRef.current;
            observer.current = new ResizeObserver(() => {
                handleResize(ref, trackSize);
            });
            observer.current.observe(ref);
            ref.addEventListener('scroll', handleThumbPosition);
            return () => {
                observer.current?.unobserve(ref);
                ref.removeEventListener('scroll', handleThumbPosition);
            };
        }
    }, [handleThumbPosition]);

    useEffect(() => {
        document.addEventListener('mousemove', handleThumbMousemove);
        document.addEventListener('mouseup', handleThumbMouseup);
        document.addEventListener('mouseleave', handleThumbMouseup);
        return () => {
            document.removeEventListener('mousemove', handleThumbMousemove);
            document.removeEventListener('mouseup', handleThumbMouseup);
            document.removeEventListener('mouseleave', handleThumbMouseup);
        };
    }, [handleThumbMousemove, handleThumbMouseup]);

    return (
        <div className="custom-scrollbars__container">
            <div className="custom-scrollbars__content" ref={contentRef}>
                {children}
            </div>
            <div className="custom-scrollbars__scrollbar">
                <div className="custom-scrollbars__track-and-thumb">
                    <div
                        className="custom-scrollbars__track"
                        ref={scrollTrackRef}
                        onClick={handleTrackClick}
                        style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
                    ></div>
                    <div
                        className="custom-scrollbars__thumb"
                        ref={scrollThumbRef}
                        onMouseDown={handleThumbMousedown}
                        style={{
                            height: `${thumbHeight}px`,
                            cursor: isDragging ? 'grabbing' : 'grab',
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default CustomScrollbar;
