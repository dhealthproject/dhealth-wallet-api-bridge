/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// external dependencies
const axios = require('axios').default;

// internal dependencies
import { HttpService } from './HttpService';
import { BlockModel } from '../models/BlockModel';
import { ChainModel } from '../models/ChainModel';
import { NetworkModel } from '../models/NetworkModel';

/**
 * Chain service to handle remote calls 
 * @export
 * @class {ChainService}
 */
export class ChainService extends HttpService {
  constructor() {
    super();
  }

  /**
   * Connects to a node by \a nodeUrl and requests
   * blockchain information using endpoint `/chain/info`.
   *
   * @param   {string}  nodeUrl     The URL of the node.
   * @returns {Promise<NodeModel>}  Parsed JSON response as an object.
   */
  public getChainInfo(
    nodeUrl: string,
  ): Promise<ChainModel> {
    return new Promise((resolve) => {
      this.__callAPI('get', nodeUrl, '/chain/info').then(
        (rawInfo: any) => {
          return resolve(ChainModel.fromDTO(rawInfo));
        });
    });
  }

  /**
   * Connects to a node by \a nodeUrl and requests
   * network properties using endpoint `/network/properties`.
   *
   * @param   {string}  nodeUrl     The URL of the node.
   * @returns {Promise<NodeModel>}  Parsed JSON response as an object.
   */
  public getNetworkProperties(
    nodeUrl: string,
  ): Promise<NetworkModel> {
    return new Promise((resolve) => {
      this.__callAPI('get', nodeUrl, '/network/properties').then(
        (rawInfo: any) => {
          return resolve(rawInfo);
        });
    });
  }

  /**
   * Connects to a node by \a nodeUrl and requests
   * a block information using endpoint `/blocks/X`.
   *
   * @param   {string}  nodeUrl     The URL of the node.
   * @returns {Promise<BlockModel>}  Parsed JSON response as an object.
   */
  public getBlockInfo(
    nodeUrl: string,
    block: number,
  ): Promise<BlockModel> {
    return new Promise((resolve) => {
      this.__callAPI('get', nodeUrl, '/blocks/' + block).then(
        (blockInfo: any) => {
          return resolve(BlockModel.fromDTO(blockInfo));
        });
    });
  }

  /**
   * Connects to a node by \a nodeUrl and requests
   * network properties using endpoint `/network/properties`
   * and blockchain information using endpoint `/chain/info`.
   *
   * @param   {string}  nodeUrl     The URL of the node.
   * @returns {Promise<NodeModel>}  Parsed JSON response as an object.
   */
  public async getNetworkInfo(
    nodeUrl: string,
  ): Promise<{chain: ChainModel, network: NetworkModel}> {

    // fetches information from network
    const chainInfo = await this.getChainInfo(nodeUrl);
    const networkProps = await this.getNetworkProperties(nodeUrl);
    const lastBlock = await this.getBlockInfo(nodeUrl, chainInfo.height);

    // merges properties into models
    const networkModel = NetworkModel.fromDTO(networkProps['network']);
    chainInfo.addNetworkProperties(networkProps['chain']);
    chainInfo.setLastBlock(lastBlock);

    return {
      chain: chainInfo,
      network: networkModel,
    }
  }
}
