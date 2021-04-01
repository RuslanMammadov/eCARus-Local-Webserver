/*
 *   Agent betwenn Frontend and MC: it passes on messages from frontend to MC.
 */

import CONSTANTS from './common-constants';
import MCInterface from './mc-interface/mc-interface';

const { GANG, LIGHT } = CONSTANTS;

class FrontendMCAgent {
  mcInterface: MCInterface;
  desiredLight: number;
  desiredGang: number;

  /**
   * Creates an instance of FrontendMCAgent.
   *
   * @param {MCInterface} mcInterface singleton
   * @memberof FrontendMCAgent
   */
  constructor(mcInterface: MCInterface) {
    this.mcInterface = mcInterface;

    this.desiredLight = LIGHT.OFF;
    this.desiredGang = GANG.N;
  }

  sendLightToMC(value: number): void {
    this.desiredLight = value;
    this.mcInterface.sendLightToMC(value);
  }

  sendGangToMC(value: number): void {
    this.desiredGang = value;
    this.mcInterface.sendGangToMC(value);
  }
}

export default FrontendMCAgent;
