/*
 *   The main express server where everything starts, initializes every interface we need.
 */
import http from 'http';
import express from 'express';
import socketIO from 'socket.io';

import DashboardInterface from './frontend-interface/dashboard-interface';
import CenterDisplayInterface from './frontend-interface/center-display-interface';
import MCInterface from './mc-interface/mc-interface';
import FrontendMCAgent from './frontend-mc-agent';

class App {
  static init(): void {
    const mcInterface = new MCInterface();
    const frontendMCAgent = new FrontendMCAgent(mcInterface);

    mcInterface.setFrontendMCAgent(frontendMCAgent);
    mcInterface.init();

    const app = express();

    const dashboardHTTPServer = new http.Server(app);
    const dashboardSocket = socketIO(dashboardHTTPServer);

    const dashboardInterface = new DashboardInterface(dashboardSocket);
    dashboardInterface.init();
    dashboardHTTPServer.listen(5000, () => {
      console.log(`Dashboard Interface is Listening on port: 5000`);
    });

    const middleDisplayHTTPServer = new http.Server(app);
    const middleDisplaySocket = socketIO(middleDisplayHTTPServer);

    const middleDisplayInterface = new CenterDisplayInterface(middleDisplaySocket);
    middleDisplayInterface.setFrontendMCAgent(frontendMCAgent);
    middleDisplayInterface.init();
    middleDisplayHTTPServer.listen(5001, () => {
      console.log(`Middle Display Interface is Listening on port: 5001`);
    });
  }
}

App.init();
