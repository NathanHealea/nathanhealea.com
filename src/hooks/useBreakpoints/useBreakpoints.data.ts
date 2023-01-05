import { BreakpointEnum } from './useBreakpoints.enums';
import { Breakpoints as BreakpointTypes } from './useBreakpoints.types';

export const Breakpoints = {
  [BreakpointEnum.Sm]: 640,
  [BreakpointEnum.Md]: 768,
  [BreakpointEnum.Lg]: 1024,
  [BreakpointEnum.Xl]: 1280,
  [BreakpointEnum['2xl']]: 1536,
};
