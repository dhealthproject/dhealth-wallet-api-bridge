/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// internal dependencies
import { NodeType, getNodeTypesFromRoles } from '../models/NodeType';
import { NetworkIdentifier } from '../models/NetworkIdentifier';
import { NetworkService } from '../services/NetworkService';

/**
 * Model for network node information.
 * @type {NodeModel}
 */
export class NodeModel {
  constructor(
    public readonly host: string,
    public readonly friendlyName: string,
    public readonly networkIdentifier: NetworkIdentifier,
    public publicKey?: string,
    public nodePublicKey?: string,
    public version?: number,
    public roles?: NodeType[],
    public networkGenerationHashSeed?: string,
  ) {}

  /**
   * Returns the network descriptor, e.g. "mainnet:symbol.xym".
   *
   * @return {string}
   */
  get networkDescriptor(): string {
    if (!this.networkGenerationHashSeed || !this.networkGenerationHashSeed.length) {
      return 'Unknown'
    }

    const trusted = Object.keys(NetworkService.TRUSTED_NETWORKS).find(
      n => NetworkService.TRUSTED_NETWORKS[n] === this.networkGenerationHashSeed
    )

    return !!trusted ? trusted : 'Unknown'
  }

  /**
   * Returns the node's actual version, e.g. "1.0.0.0"
   *
   * @returns {string}
   */
  get semverVersion(): string {
    if (undefined === this.version) {
      'Unknown'
    } 

    const placeholderHex = '00000000'
    const hexNodeVersion = (placeholderHex + this.version.toString(16)).slice(-8)
    return hexNodeVersion.match(/.{1,2}/g)!
        .map((hex) => parseInt(hex, 16))
        .join('.')
  }

  /**
   * Factory to create a NodeModel instance from
   * its DTO representation.
   *
   * @see {NodeService.getNodePeers()}
   * @param     {any}   dto   The parsed JSON representation.
   * @returns   {NodeModel}
   */
  public static fromDTO(dto: any): NodeModel {
    return new NodeModel(
      'host' in dto ? dto['host'] : '',
      'friendlyName' in dto ? dto['friendlyName'] : '',
      'networkIdentifier' in dto ? dto['networkIdentifier'] : NetworkIdentifier.MAIN_NET,
      'publicKey' in dto ? dto['publicKey'] : undefined,
      'nodePublicKey' in dto ? dto['nodePublicKey'] : undefined,
      'version' in dto ? dto['version'] : undefined,
      'roles' in dto ? getNodeTypesFromRoles(dto['roles']) : undefined,
      'networkGenerationHashSeed' in dto ? dto['networkGenerationHashSeed'] : undefined,
    )
  }
};
