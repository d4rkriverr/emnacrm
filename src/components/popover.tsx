/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";

const Popover = ({ children, content }: any) => {
    const [isVisible, setIsVisible] = useState(false); // Manages the visibility state of the popover
    const popoverRef = useRef(null); // Reference to the popover element
    const triggerRef = useRef(null); // Reference to the button element that triggers the popover

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (
                popoverRef.current &&
                !(popoverRef.current as any).contains(event.target) &&
                !(triggerRef.current as any).contains(event.target)
            ) {
                setIsVisible(false); // Close the popover if clicked outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block">
            <button
                ref={triggerRef}
                onClick={toggleVisibility}
                aria-haspopup="true"
                aria-expanded={isVisible}
                aria-controls="popover-content"
            >
                {children}
            </button>
            {isVisible && (
                <div
                    id="popover-content"
                    ref={popoverRef}
                    className="absolute top-full left-1/2 mt-2 bg-white border border-gray-700 rounded z-[10] whitespace-nowrap shadow-lg -translate-x-[90%] -translate-y-[10%]"
                    role="dialog"
                    aria-modal="true"
                >
                    {content}
                </div>
            )}
        </div>
    );
};

export default Popover;