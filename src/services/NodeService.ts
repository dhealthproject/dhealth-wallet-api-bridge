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
  NodeInfoDTO,
  NodeInfoDTOFromJSON,
} from "symbol-openapi-typescript-fetch-client";

// internal dependencies
import { HttpService } from "./HttpService";

/**
 * Node service to handle remote calls
 * @export
 * @class {NodeService}
 */
export class NodeService extends HttpService {
  constructor() {
    super();
  }

  /**
   * Connects to a node by \a nodeUrl and requests
   * node information using endpoint `/node/info`.
   *
   * @param   {string}  nodeUrl     The URL of the node.
   * @returns {Promise<NodeInfoDTO>}  Parsed JSON response as an object.
   */
  public getNodeInfo(nodeUrl: string): Promise<NodeInfoDTO> {
    return new Promise((resolve) => {
      this.__callAPI("get", nodeUrl, "/node/info").then((rawPeer: any) => {
        return resolve(NodeInfoDTOFromJSON(rawPeer));
      });
    });
  }

  /**
   * Connects to a node by \a nodeUrl and requests
   * node neighborhood using endpoint `/node/peers`.
   *
   * @param   {string}  nodeUrl       The URL of the node.
   * @returns {Promise<NodeInfoDTO[]>}  Parsed JSON response as an object.
   */
  public getNodePeers(nodeUrl: string): Promise<NodeInfoDTO[]> {
    return new Promise((resolve) => {
      this.__callAPI("get", nodeUrl, "/node/peers").then((rawPeers: any) => {
        return resolve(rawPeers.map((p) => NodeInfoDTOFromJSON(p)));
      });
    });
  }

  /**
   * Connects to a node by \a nodeUrl and requests
   * node health status using endpoint `/node/health`.
   *
   * @param   {string}  nodeUrl       The URL of the node.
   * @returns {Promise<{ apiNode: boolean, db: boolean }>}  Object with api and db keys (boolean values).
   */
  public getNodeHealth(
    nodeUrl: string
  ): Promise<{ apiNode: boolean; db: boolean }> {
    return new Promise((resolve) => {
      this.__callAPI("get", nodeUrl, "/node/health").then((rawStatus: any) => {
        return resolve({
          apiNode: rawStatus.status.apiNode === "up",
          db: rawStatus.status.db === "up",
        });
      });
    });
  }

  /**
   * Connects to a node by \a nodeUrl and requests
   * harvesters using endpoint `/node/health`.
   *
   * @param   {string}  nodeUrl       The URL of the node.
   * @returns {Promise<string[]>}  Object with api and db keys (boolean values).
   */
  public getHarvesters(nodeUrl: string): Promise<string[]> {
    return new Promise((resolve) => {
      this.__callAPI("get", nodeUrl, "/node/unlockedaccount").then(
        (rawData: any) => {
          return resolve(rawData.unlockedAccount);
        }
      );
    });
  }
}
