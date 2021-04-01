/* eslint-disable @typescript-eslint/no-use-before-define */
/*
 *   Constants of MC - Backend protocol.
 */
import CONSTANTS from '../common-constants';
const {
  IS_TEST_ENV, RUNLEVEL, LIGHT, INTERFACE,
} = CONSTANTS;

const MESSAGE_LENGHT = 11;
const ID_START_BYTE = 8;
const ID_LENGHT = 2;
const DLC_BYTE = MESSAGE_LENGHT - 1; // Last byte, DLC means data lenght in message

const interfaceValuesMapFromMC = new Map();
interfaceValuesMapFromMC.set(32, INTERFACE.INTERFACE_1);
interfaceValuesMapFromMC.set(16, INTERFACE.INTERFACE_2);

const runlevelValuesMapToMC = new Map();
runlevelValuesMapToMC.set(RUNLEVEL.N, 0);
runlevelValuesMapToMC.set(RUNLEVEL.R, 1);
runlevelValuesMapToMC.set(RUNLEVEL.D, 2);

const lightValuesMapToMC = new Map();
lightValuesMapToMC.set(LIGHT.OFF, 0);
lightValuesMapToMC.set(LIGHT.STANDLICHT, 2);
lightValuesMapToMC.set(LIGHT.ABBLENDLICHT, 4);
lightValuesMapToMC.set(LIGHT.FERNLICHT, 8);


const MC_INTERFACE_CONSTANTS = {
  IP: IS_TEST_ENV ? "localhost" : "192.168.1.129",
  PORT: 8888,

  MC: {
    IP: IS_TEST_ENV ? "localhost" : "192.168.1.108",
    PORT: 7777,
    PORT_FROM_MC: 6666, // not used, but for the case somebody will forget
  },

  MESSAGE_INTERVALL: IS_TEST_ENV ? 3000 : 500,

  MESSAGE_LENGHT,
  ID_START_BYTE,
  ID_LENGHT,

  ANTRIEB_FROM_MC: {
    ID: 0x93,
    WHEEL_DIAMETER: 1 / Math.PI, // in km, actually now equal to 1 / PI for debugging
  },

  BMS_FROM_MC: {
    ID: 0x94,
  },

  RUNLEVEL_FROM_MC: {
    ID: 0x97,
  },

  LIGHT_FROM_MC: {
    ID: 0x92,
    VALUES_MAP: lightValuesMapToMC,
  },

  INDICATOR_FROM_MC: {
    ID: 0x92,
  },

  INTERFACE_FROM_MC: {
    ID: 0x92,
    VALUES_MAP: interfaceValuesMapFromMC,
  },

  RUNLEVEL_TO_MC: {
    ID: 0x87,
    TEMPLATE: Buffer.alloc(MESSAGE_LENGHT, 0),
    VALUES_MAP: runlevelValuesMapToMC,
  },

  LIGHT_TO_MC: {
    ID: 0x83,
    TEMPLATE: Buffer.alloc(MESSAGE_LENGHT, 0),
    VALUES_MAP: lightValuesMapToMC,
  },
};

addIDAndDLCToBuffer(MC_INTERFACE_CONSTANTS.LIGHT_TO_MC.TEMPLATE, MC_INTERFACE_CONSTANTS.LIGHT_TO_MC.ID, 1);
addIDAndDLCToBuffer(MC_INTERFACE_CONSTANTS.RUNLEVEL_TO_MC.TEMPLATE, MC_INTERFACE_CONSTANTS.RUNLEVEL_TO_MC.ID, 1);

/**
 * Writes ID in Buffer.
 *
 * @param {Buffer} buffer
 * @param {number} id
 * @param {number} dataLength
 */
function addIDAndDLCToBuffer(buffer: Buffer, id: number, dataLength: number): void {
  buffer.writeUIntLE(id, ID_START_BYTE, ID_LENGHT);
  buffer.writeUIntBE(dataLength, DLC_BYTE, 1);
}

Object.freeze(MC_INTERFACE_CONSTANTS);
export default MC_INTERFACE_CONSTANTS;
