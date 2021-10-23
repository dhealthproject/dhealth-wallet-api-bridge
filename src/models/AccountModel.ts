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
    public readonly address?: string,
    public readonly accountType?: number,
    public readonly remotePublicKey?: string,
    public readonly nodePublicKey?: string,
    public readonly vrfPublicKey?: string,
  ) {}

  /**
   * Gets the balance of a mosaic by mosaic ID.
   *
   * @param   {string}  mosaicId 
   * @return  {MosaicModel}
   */
  public getBalanceOf(mosaicId: string): MosaicModel {
    if (!this.balances || !this.balances.length) {
      return new MosaicModel(mosaicId, '0');
    }

    const entry = this.balances.find(
      b => b.mosaicId === mosaicId
    )

    if (undefined === entry) {
      return new MosaicModel(mosaicId, '0');
    }

    return entry;
  }

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
      undefined,
      'accountType' in data ? data['accountType'] : '',
      'linked' in data['supplementalPublicKeys'] ? data['supplementalPublicKeys']['linked']['publicKey'] : '',
      'node' in data['supplementalPublicKeys'] ? data['supplementalPublicKeys']['node']['publicKey'] : '',
      'vrf' in data['supplementalPublicKeys'] ? data['supplementalPublicKeys']['vrf']['publicKey'] : '',
    )
  }
};
