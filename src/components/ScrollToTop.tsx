import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

// This component resets the page scroll to the top of the page every time the route changes

const ScrollToTop: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
};

export default ScrollToTop;
