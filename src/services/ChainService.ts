/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// external dependencies
import {
  BlockInfoDTO,
  BlockInfoDTOFromJSON,
  ChainInfoDTO,
  ChainInfoDTOFromJSON,
  NetworkConfigurationDTO,
  NetworkConfigurationDTOFromJSON,
} from "symbol-openapi-typescript-fetch-client";

// internal dependencies
import { HttpService } from "./HttpService";

/**
 * Mixin that combines chain, config and blocks information.
 *
 * @type {NetworkInfoMixin}
 */
export type NetworkInfoMixin = {
  chain: ChainInfoDTO;
  config: NetworkConfigurationDTO;
  block: BlockInfoDTO;
};

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
   * @returns {Promise<ChainInfoDTO>}  Parsed JSON response as an object.
   */
  public getChainInfo(nodeUrl: string): Promise<ChainInfoDTO> {
    return new Promise((resolve) => {
      this.__callAPI("get", nodeUrl, "/chain/info").then((rawInfo: any) =>
        resolve(ChainInfoDTOFromJSON(rawInfo))
      );
    });
  }

  /**
   * Connects to a node by \a nodeUrl and requests
   * network properties using endpoint `/network/properties`.
   *
   * @param   {string}  nodeUrl     The URL of the node.
   * @returns {Promise<NetworkConfigurationDTO>}  Parsed JSON response as an object.
   */
  public getNetworkConfiguration(
    nodeUrl: string
  ): Promise<NetworkConfigurationDTO> {
    return new Promise((resolve) => {
      this.__callAPI(
        "get",
        nodeUrl,
        "/network/properties"
      ).then((rawInfo: any) =>
        resolve(NetworkConfigurationDTOFromJSON(rawInfo))
      );
    });
  }

  /**
   * Connects to a node by \a nodeUrl and requests
   * a block information using endpoint `/blocks/X`.
   *
   * @param   {string}  nodeUrl     The URL of the node.
   * @returns {Promise<BlockInfoDTO>}  Parsed JSON response as an object.
   */
  public getBlockInfo(
    nodeUrl: string,
    block: string | number
  ): Promise<BlockInfoDTO> {
    return new Promise((resolve) => {
      this.__callAPI("get", nodeUrl, "/blocks/" + block).then((rawInfo: any) =>
        resolve(BlockInfoDTOFromJSON(rawInfo))
      );
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
  public async getNetworkInfo(nodeUrl: string): Promise<NetworkInfoMixin> {
    // fetches information from network
    const chainInfo = await this.getChainInfo(nodeUrl);
    const networkConfig = await this.getNetworkConfiguration(nodeUrl);
    const lastBlock = await this.getBlockInfo(nodeUrl, chainInfo.height);

    return {
      chain: chainInfo,
      config: networkConfig,
      block: lastBlock,
    };
  }
}
