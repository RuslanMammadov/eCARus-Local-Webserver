/* eslint-disable @typescript-eslint/no-non-null-assertion */
/*
 *   Interface for MC (maincontroller).
 */
import dgram from 'dgram';
import INTERFACE_CONSTANTS from './mc-interface-constants';

const {
  PORT, IP, MC, MESSAGE_LENGHT, ID_START_BYTE, ID_LENGHT, ANTRIEB_FROM_MC, BMS_FROM_MC,
  RUNLEVEL_FROM_MC, LIGHT_FROM_MC, INTERFACE_FROM_MC, RUNLEVEL_TO_MC,
  LIGHT_TO_MC, MESSAGE_INTERVALL
} = INTERFACE_CONSTANTS;

import COMMON_CONSTANTS from '../common-constants';
const {
  RUNLEVEL, GANG, LIGHT, INDICATOR,
} = COMMON_CONSTANTS;

import status from '../status';
import FrontendMCAgent from '../frontend-mc-agent'

class MCInterface {
  frontendMCAgent: FrontendMCAgent | undefined;
  server: dgram.Socket;

  constructor() {
    this.server = dgram.createSocket('udp4');
  }

  /**
   * Set Frontend-MC Agent singleton before calling other methods!
   *
   * @param {FrontendMCAgent} frontendMCAgent
   * @memberof MCInterface
   */
  setFrontendMCAgent(frontendMCAgent: FrontendMCAgent): void {
    this.frontendMCAgent = frontendMCAgent;
  }

  /**
   * Initialize mc interface. Before calling this method, set frontend-MC Agent singleton!
   *
   * @memberof MCInterface
   */
  init(): void {
    this.server.on('error', (err) => {
      console.log(`server error:\n${err.stack}`);
      this.server.close();
    });

    this.server.on('message', (messageFromMC) => {
      this.processMessageFromMC(messageFromMC);
    });

    this.server.bind(PORT, IP);

    this.sendMessagesToMC(MESSAGE_INTERVALL);
  }

  processMessageFromMC(messageFromMC: Buffer): void {
    // console.time("MC");
    const id = messageFromMC.readUIntLE(ID_START_BYTE, ID_LENGHT);

    switch (id) {
      case ANTRIEB_FROM_MC.ID: // Antrieb = Drive. In eCARus we use word Antrieb, nobody understands word drive.
        this.processAntrieb(messageFromMC);
        break;
      case BMS_FROM_MC.ID: // Remember: BMS - Battery Managment System
        this.processBMS(messageFromMC);
        break;
      case RUNLEVEL_FROM_MC.ID:
        this.processRunLevel(messageFromMC);
        break;
      case LIGHT_FROM_MC.ID:
        this.processLightIndicatorOrInterface(messageFromMC);
        break;
      default:
        break;
    }
    // console.timeEnd("MC");
  }

  sendMessagesToMC(interval: number): void {
    setInterval(() => {
      // Commented out till light boards are ready
      // if (this.frontendMCAgent.desiredLight !== status.light) {
      // this.sendLightToMC(this.frontendMCAgent.desiredLight);
      // }
      if (this.frontendMCAgent!.desiredGang !== status.gang) {
        this.sendGangToMC(this.frontendMCAgent!.desiredGang);
      }
    }, interval);
  }

  sendLightToMC(value: number): void {
    const template = LIGHT_TO_MC.TEMPLATE;
    const valueForMC = LIGHT_TO_MC.VALUES_MAP.get(value);

    template.writeUIntBE(valueForMC, 0, 1);

    this.sendMessage(template);
  }

  sendGangToMC(value: number): void {
    const template = RUNLEVEL_TO_MC.TEMPLATE;
    const valueForMC = RUNLEVEL_TO_MC.VALUES_MAP.get(value);

    template.writeUIntBE(valueForMC, 0, 1);
    this.sendMessage(template);
  }

  /**
   *send UDP message
   *
   * @param {Buffer} buffer
   * @memberof socketUdp
   */
  sendMessage(buffer: Buffer): void {
    this.server.send(buffer, 0, MESSAGE_LENGHT * 8, MC.PORT, MC.IP);
  }

  /**
   * Processes speed data from MC
   *
   * @param {Buffer} messageFromMC
   * @memberof MCInterface
   */
  processAntrieb(messageFromMC: Buffer): void {
    const rotationSpeed = messageFromMC.readUIntBE(0, 2);
    status.speed = rotationSpeed * Math.PI * ANTRIEB_FROM_MC.WHEEL_DIAMETER;

    // console.log("Antrieb Temperature: " + messageFromMC.readUIntBE(2, 2));
    // console.log("Drehmoment: " + messageFromMC.readUIntBE(4, 2));
    // console.log("Leistung: " + messageFromMC.readUIntBE(6, 2));
  }

  processBMS(messageFromMC: Buffer): void {
    status.charge = messageFromMC.readUIntBE(0, 1);

    // console.log("Current: ", messageFromMC.readUIntBE(1, 2));
    // console.log("Voltage: ", messageFromMC.readUIntBE(3, 1));
    // console.log("Max cell voltage: ", messageFromMC.readUIntBE(4, 1));
    // console.log("BMS Tempretaure: ", messageFromMC.readUIntBE(5, 1));
  }

  processRunLevel(messageFromMC: Buffer): void {
    const runlevel = messageFromMC.readUIntBE(0, 1);
    switch (runlevel) {
      case RUNLEVEL.D:
        status.gang = GANG.D;
        break;
      case RUNLEVEL.R:
        status.gang = GANG.R;
        break;
      default:
        status.gang = GANG.N;
    }
  }

  processLightIndicatorOrInterface(messageFromMC: Buffer): void {
    const isInterfaceMessage = this.processInterface(messageFromMC);
    if (!isInterfaceMessage) {
      this.processLight(messageFromMC);
      this.processIndicator(messageFromMC);
    }
  }

  /**
   * Checks if it is interface message. If it is, then sets interface status and returns true.
   * If is is not, returns false.
   *
   * @param {Buffer} buffer
   * @returns {boolean} isInterfaceMessage
   * @memberof McInterface
   */
  processInterface(messageFromMC: Buffer): boolean {
    const messageValue = messageFromMC.readUIntBE(1, 1);
    const statusValue = INTERFACE_FROM_MC.VALUES_MAP.get(messageValue);
    if (statusValue === undefined) {
      return false;
    }
    status.interface = statusValue;
    return true;
  }

  processLight(messageFromMC: Buffer): void {
    const messageValue = messageFromMC.readUIntBE(0, 1);
    if (this.isBitSet(messageValue, 1)) {
      status.light = LIGHT.STANDLICHT;
    } else if (this.isBitSet(messageValue, 2)) {
      status.light = LIGHT.ABBLENDLICHT;
    } else if (this.isBitSet(messageValue, 3)) {
      status.light = LIGHT.FERNLICHT;
    } else {
      status.light = LIGHT.OFF;
    }
  }

  processIndicator(messageFromMC: Buffer): void {
    const messageValue = messageFromMC.readUIntBE(0, 1);
    if (this.isBitSet(messageValue, 6)) { // Warnlight
      status.indicatorLeft = INDICATOR.ON;
      status.indicatorRight = INDICATOR.ON;
    } else {
      status.indicatorLeft = this.isBitSet(messageValue, 4) ? INDICATOR.ON : INDICATOR.OFF;
      status.indicatorRight = this.isBitSet(messageValue, 5) ? INDICATOR.ON : INDICATOR.OFF;
    }
  }

  /**
   * Checks if the bit is set.
   *
   * @param {number} value
   * @param {number} numberOfBit starting with 0
   * @returns {boolean} isBitSet
   * @memberof MCInterface
   */
  isBitSet(value: number, numberOfBit: number): boolean {
    return ((value & (1 << numberOfBit)) !== 0);
  }
}

export default MCInterface;
