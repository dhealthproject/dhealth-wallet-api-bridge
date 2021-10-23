/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// internal dependencies
import { MosaicModel } from './MosaicModel';

/**
 * Model for account information.
 * @type {AccountModel}
 */
export class AccountModel {
  constructor(
    public readonly publicKey: string,
    public readonly importance: string,
    public readonly balances?: MosaicModel[],
  ) {}

  /**
   * Factory to create a AccountModel instance from
   * its DTO representation.
   *
   * @see {NodeService.getNodePeers()}
   * @param     {any}   dto   The parsed JSON representation.
   * @returns   {AccountModel}
   */
  public static fromDTO(dto: any): AccountModel {
    const data = dto['account'];
    const mosaics = data['mosaics'];
    return new AccountModel(
      'publicKey' in data ? data['publicKey'] : '',
      'importance' in data ? data['importance'] : '',
      mosaics.map(m => MosaicModel.fromDTO(m)),
    )
  }
};
