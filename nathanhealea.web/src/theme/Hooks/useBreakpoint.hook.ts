import { useState, useEffect } from 'react';

type breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

/**
 * Determines if the screen width is equal to or larger than the breakpoint
 * @param breakpoint to be compared against
 * @returns true: if breakpoint is smaller or equal to screen width
 */
export const up = (breakpoint: breakpoint, screenWidth: number = 0) => {
  if (screenWidth >= Breakpoints[breakpoint]) {
    return true;
  }

  return false;
};

/**
 * Determines if the screen width is smaller than the breakpoint
 * @param breakpoint to be compared against
 * @returns true: if the breakpoint is smaller than the screen width
 */
export const down = (breakpoint: breakpoint, screenWidth: number = 0) => {
  if (screenWidth < Breakpoints[breakpoint]) {
    return true;
  }

  return false;
};

/**
 * Determines fit he screen width in between the upper and lower bounds.
 *  - Uses @function up to check lower bounds
 *  - Uses @function down to check for upper bounds
 * @param lower Lower bounds breakpoint to be compared to the screen width
 * @param upper Upper bounds breakpoint to be compared to the screen width;
 * @returns
 */
export const between = (
  lower: breakpoint,
  upper: breakpoint,
  screenWidth: number
) => {
  if (up(lower, screenWidth) && down(upper, screenWidth)) {
    return true;
  }

  return false;
};

/**
 * Gets the current window inner height and width
 * @returns height and width of the current window size
 */
const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    height,
    width
  };
};

/**
 * Hook for determining if the window size is up, down, or between breakpoints.
 * @returns
 */
export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  /**
   * Sets the window Dimensions on window resize.
   */
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    ...windowDimensions
  };
};
