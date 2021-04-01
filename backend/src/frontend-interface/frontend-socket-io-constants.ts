/*
 *   Constants of Frontend - Backend protocol.
 */
import CONSTANTS from '../common-constants';

const { LIGHT, GANG } = CONSTANTS;

const FRONTEND_CONSTANTS = {
  SPEED: {
    EVENT_TO_FRONTEND: 'dataSpeed',
  },

  CHARGE: {
    EVENT_TO_FRONTEND: 'dataBattery',
  },

  LIGHT: {
    EVENT_TO_FRONTEND: 'dataLights',
    OFF: LIGHT.OFF, // default value if button is off
    FROM_FRONTEND: [{
      EVENT: 'clickedFernlicht',
      VALUE_ON: LIGHT.FERNLICHT,
    },
    {
      EVENT: 'clickedAbblendlicht',
      VALUE_ON: LIGHT.ABBLENDLICHT,
    },
    {
      EVENT: 'clickedStandlicht',
      VALUE_ON: LIGHT.STANDLICHT,
    }],
  },

  INDICATOR_LEFT: {
    EVENT_TO_FRONTEND: 'dataLflash',
  },

  INDICATOR_RIGHT: {
    EVENT_TO_FRONTEND: 'dataRflash',
  },

  INTERFACE: {
    EVENT_TO_FRONTEND: 'dataTouch',
  },

  GANG: {
    EVENT_TO_FRONTEND: 'dataGang',
    N: GANG.N, // default value if button is off
    FROM_FRONTEND: [{
      EVENT: 'clickedR',
      VALUE_ON: GANG.R,
    },
    {
      EVENT: 'clickedN',
      VALUE_ON: GANG.N,
    },
    {
      EVENT: 'clickedD',
      VALUE_ON: GANG.D,
    }],
  },
};

Object.freeze(FRONTEND_CONSTANTS);

export default FRONTEND_CONSTANTS;
