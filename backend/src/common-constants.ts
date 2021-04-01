/*
 *   Common constants.
 */
const CONSTANTS = {
  IS_TEST_ENV: process.env.NODE_ENV === "test",
  RUNLEVEL: {
    INIT: 0,
    N: 1,
    D: 2,
    R: 3,
    EMCY_SOFT: 4, // Ask MC people what does mean
    EMCY_HARD: 5,
    SHUTDOWN: 6,
    CHARGING: 7,
  },

  GANG: {
    N: 1,
    D: 2,
    R: 3,
  },

  LIGHT: {
    OFF: 0,
    ABBLENDLICHT: 1,
    FERNLICHT: 2,
    STANDLICHT: 3,
  },

  INDICATOR: {
    OFF: 0,
    ON: 1,
  },

  INTERFACE: {
    INTERFACE_1: 0,
    INTERFACE_2: 1,
  },
};

Object.freeze(CONSTANTS);

export default CONSTANTS;
