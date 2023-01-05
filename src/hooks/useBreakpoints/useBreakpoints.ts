import { Breakpoints as BreakpointsData } from './useBreakpoints.data';
import { BreakpointEnum } from './useBreakpoints.enums';
import {
  Breakpoints as BreakpointsType,
  WindowDimensions as WindowDimensionsType,
} from './useBreakpoints.types';
import { useCallback, useEffect, useState } from 'react';

interface useBreakpointsProps {}

const useBreakpoints = () => {
  const hasWindow = typeof window !== 'undefined';

  /**
   * Gets the window height and width.
   * @returns {WindowDimensions} - Current height and width of the window.
   */
  const getWindowDimensions = useCallback((): WindowDimensionsType => {
    const height = hasWindow ? window.innerHeight : null;
    const width = hasWindow ? window.innerWidth : null;
    return {
      width,
      height,
    };
  }, [hasWindow]);

  /**
   * Return an new object of default breakpoint properties
   * @returns {Breakpoints} object with default breakpoints sets
   */
  const getDefaultBreakpoints = (): BreakpointsType => {
    return {
      isPhone: false,
      isTablet: false,
      isLaptop: false,
      isDesktop: false,
    } as BreakpointsType;
  };

  const getBreakpoints = useCallback(
    (windowDimensions: WindowDimensionsType): BreakpointsType => {
      let breakpoints: BreakpointsType = getDefaultBreakpoints();

      if (
        windowDimensions.width == undefined ||
        windowDimensions.width === null
      ) {
        return breakpoints;
      } else if (windowDimensions.width < BreakpointsData[BreakpointEnum.Sm]) {
        /**
         * Check for Phone size screens.
         */
        breakpoints = getDefaultBreakpoints();
        breakpoints.isPhone = true;
      } else if (
        /**
         * Check for Tablet size screens.
         */
        BreakpointsData[BreakpointEnum.Sm] <= windowDimensions.width &&
        windowDimensions.width < BreakpointsData[BreakpointEnum.Md]
      ) {
        breakpoints = getDefaultBreakpoints();
        breakpoints.isTablet = true;
      } else if (
        /**
         * Check for Laptop size screens.
         */
        BreakpointsData[BreakpointEnum.Md] <= windowDimensions.width &&
        windowDimensions.width < BreakpointsData[BreakpointEnum.Xl]
      ) {
        breakpoints = getDefaultBreakpoints();
        breakpoints.isLaptop = true;
      } else if (
        /**
         * Check for Desktop size screens.
         */
        BreakpointsData[BreakpointEnum.Xl] <= windowDimensions.width
      ) {
        breakpoints = getDefaultBreakpoints();
        breakpoints.isDesktop = true;
      }

      return breakpoints;
    },
    []
  );

  const [windowDimensions, setWindowDimensions] =
    useState<WindowDimensionsType>(getWindowDimensions());
  const [breakpoints, setBreakpoints] = useState<BreakpointsType>(
    getBreakpoints(windowDimensions)
  );

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        const windowDimensions = getWindowDimensions();
        setBreakpoints(getBreakpoints(windowDimensions));
        setWindowDimensions(windowDimensions);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow, getWindowDimensions, getBreakpoints]);

  return {
    ...windowDimensions,
    ...breakpoints,
  };
};

export default useBreakpoints;
