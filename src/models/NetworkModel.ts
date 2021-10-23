/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
import { NetworkIdentifier, getIdentifierFromString } from '../models/NetworkIdentifier';

/**
 * Model for network blockchain information.
 * @type {NetworkModel}
 */
 export class NetworkModel {
  constructor(
    public readonly identifier: NetworkIdentifier,
    public readonly nemesisSignerPublicKey: string,
    public readonly nodeEqualityStrategy: string,
    public readonly generationHashSeed: string,
    public readonly epochAdjustment: number,
  ) {}

  /**
   * Factory to create a NetworkModel instance from
   * its DTO representation.
   *
   * @see {NodeService.getNetworkProperties()}
   * @param     {any}   dto   The parsed JSON representation.
   * @returns   {NetworkModel}
   */
  public static fromDTO(dto: any): NetworkModel {
    return new NetworkModel(
      'identifier' in dto ? getIdentifierFromString(dto['identifier']) : NetworkIdentifier.MAIN_NET,
      'nemesisSignerPublicKey' in dto ? dto['nemesisSignerPublicKey'] : '',
      'nodeEqualityStrategy' in dto ? dto['nodeEqualityStrategy'] : '',
      'generationHashSeed' in dto ? dto['generationHashSeed'] : '',
      'epochAdjustment' in dto ? parseInt(dto['epochAdjustment'].replace(/s$/, '')) : 0
    )
  }
};
