/*
 *   Superclass for middle display and dashboard interfaces.
 */
import status from '../status';
import FRONTEND_CONSTANTS from './frontend-socket-io-constants';

const {
  SPEED, CHARGE, LIGHT, INDICATOR_LEFT, INDICATOR_RIGHT, GANG, INTERFACE,
} = FRONTEND_CONSTANTS;

class SocketIOInterfaceImpl {
  socketIO: SocketIO.Server;
  intervalNumbers: NodeJS.Timeout[];

  constructor(socketIO: SocketIO.Server) {
    this.socketIO = socketIO;
    this.intervalNumbers = [];
  }

  configureSendingSpeed(interval: number, sessionSocket: SocketIO.Server): void {
    const intervalNumber = setInterval(() => {
      if (status.speed !== undefined) {
        sessionSocket.emit(SPEED.EVENT_TO_FRONTEND, status.speed);
      }
    }, interval);
    this.intervalNumbers.push(intervalNumber);
  }

  configureSendingCharge(interval: number, sessionSocket: SocketIO.Server): void {
    const intervalNumber = setInterval(() => {
      if (status.charge !== undefined) {
        sessionSocket.emit(CHARGE.EVENT_TO_FRONTEND, status.charge);
      }
    }, interval);
    this.intervalNumbers.push(intervalNumber);
  }

  configureSendingLight(interval: number, sessionSocket: SocketIO.Server): void {
    const intervalNumber = setInterval(() => {
      if (status.light !== undefined) {
        sessionSocket.emit(LIGHT.EVENT_TO_FRONTEND, status.light);
      }
    }, interval);
    this.intervalNumbers.push(intervalNumber);
  }

  configureSendingIndicators(interval: number, sessionSocket: SocketIO.Server): void {
    const intervalNumber = setInterval(() => {
      if (status.indicatorLeft !== undefined) {
        sessionSocket.emit(INDICATOR_RIGHT.EVENT_TO_FRONTEND, status.indicatorLeft);
      }
      if (status.indicatorRight !== undefined) {
        sessionSocket.emit(INDICATOR_LEFT.EVENT_TO_FRONTEND, status.indicatorRight);
      }
    }, interval);
    this.intervalNumbers.push(intervalNumber);
  }

  configureSendingGang(interval: number, sessionSocket: SocketIO.Server): void {
    const intervalNumber = setInterval(() => {
      if (status.gang !== undefined) {
        sessionSocket.emit(GANG.EVENT_TO_FRONTEND, status.gang);
      }
    }, interval);
    this.intervalNumbers.push(intervalNumber);
  }

  configureSendingInterface(interval: number, sessionSocket: SocketIO.Server): void {
    const intervalNumber = setInterval(() => {
      if (status.interface !== undefined) {
        sessionSocket.emit(INTERFACE.EVENT_TO_FRONTEND, status.interface);
      }
    }, interval);
    this.intervalNumbers.push(intervalNumber);
  }

  removeAllIntervals(): void {
    this.intervalNumbers.forEach(((intervalNumber) => clearInterval(intervalNumber)));
  }
}

export default SocketIOInterfaceImpl;