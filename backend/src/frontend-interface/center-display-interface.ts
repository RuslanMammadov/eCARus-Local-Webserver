/* eslint-disable @typescript-eslint/no-non-null-assertion */
/*
 *   Interface for Center Display. 
 */
import SocketIOInterface from './frontend-socket-io-interface';
import FRONTEND_CONSTANTS from './frontend-socket-io-constants';
import FrontendMCAgent from '../frontend-mc-agent';

const { LIGHT, GANG } = FRONTEND_CONSTANTS;

class CenterDisplay extends SocketIOInterface {
  frontendMCAgent: FrontendMCAgent | undefined;

  /**
   * Set Frontend-MC Agent singleton before calling other methods!
   *
   * @param {FrontendMCAgent} frontendMCAgent
   * @memberof CenterDisplay
   */
  setFrontendMCAgent(frontendMCAgent: FrontendMCAgent): void {
    this.frontendMCAgent = frontendMCAgent;
  }
  /**
   * Initialize Center Display Interface. Set Frontend-MC Agent singleton before calling this method!
   *
   * @memberof CenterDisplay
   */
  init(): void {
    this.socketIO.on('connection', (sessionSocket: SocketIO.Server) => {
      this.configureSendingSpeed(500, sessionSocket);
      this.configureSendingCharge(500, sessionSocket);
      this.configureSendingLight(500, sessionSocket);
      this.configureSendingIndicators(500, sessionSocket);
      this.configureSendingInterface(500, sessionSocket);
      this.configureSendingGang(500, sessionSocket);

      this.configureProcessingMessagesFromFrontend(sessionSocket);

      sessionSocket.on('disconnection', () => this.removeAllIntervals);
    });
  }

  configureProcessingMessagesFromFrontend(sessionSocket: SocketIO.Server): void {
    this.configureProcessingLight(sessionSocket);
    this.configureProcessingGang(sessionSocket);
  }

  configureProcessingLight(sessionSocket: SocketIO.Server): void {
    const messages = LIGHT.FROM_FRONTEND;
    messages.forEach((message) => {
      sessionSocket.on(message.EVENT, (isOn: number) => {
        const desiredValue = isOn ? message.VALUE_ON : LIGHT.OFF;
        this.frontendMCAgent!.sendLightToMC(desiredValue);
      });
    });
  }

  configureProcessingGang(sessionSocket: SocketIO.Server): void {
    const messages = GANG.FROM_FRONTEND;
    messages.forEach((message) => {
      sessionSocket.on(message.EVENT, (isOn: number) => {
        const desiredValue = isOn ? message.VALUE_ON : GANG.N; // N is default value
        this.frontendMCAgent!.sendGangToMC(desiredValue);
      });
    });
  }
}

export default CenterDisplay;
