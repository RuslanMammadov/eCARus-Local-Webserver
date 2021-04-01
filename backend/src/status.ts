/*
 *   Actual status of auto.
 */

import CONSTANTS from './common-constants';

const { GANG, LIGHT, INDICATOR } = CONSTANTS;

declare interface Status {
  speed: number | undefined;
  charge: number | undefined;
  gang: number | undefined;
  light: number | undefined;
  interface: number | undefined;
  indicatorLeft: number | undefined;
  indicatorRight: number | undefined;

}
const status: Status = {
  speed: undefined,
  charge: undefined,
  gang: GANG.N,
  light: LIGHT.OFF,
  interface: undefined,
  indicatorLeft: INDICATOR.OFF,
  indicatorRight: INDICATOR.OFF,
};

export default status;
