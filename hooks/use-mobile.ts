"use client";

import { useEffect, useState } from "react";

// This hook detects if the viewport is mobile-sized
export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkIfMobile();

        // Add event listener
        window.addEventListener("resize", checkIfMobile);

        // Clean up
        return () => {
            window.removeEventListener("resize", checkIfMobile);
        };
    }, []);

    return isMobile;
}
