/*
 *   Interface for dashboard.
 */

import SocketIOInterface from './frontend-socket-io-interface';

class DashboardInterface extends SocketIOInterface {
  init(): void {
    this.socketIO.on('connection', (sessionSocket: SocketIO.Server) => {
      this.configureSendingSpeed(500, sessionSocket);
      this.configureSendingCharge(500, sessionSocket);
      this.configureSendingLight(500, sessionSocket);
      this.configureSendingIndicators(500, sessionSocket);
      this.configureSendingInterface(500, sessionSocket);
      this.configureSendingGang(500, sessionSocket);

      sessionSocket.on('disconnection', () => this.removeAllIntervals);
    });
  }
}

export default DashboardInterface;
