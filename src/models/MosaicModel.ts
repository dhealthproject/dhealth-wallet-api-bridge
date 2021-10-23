/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
/**
 * Model for mosaic (assets) information.
 * @type {MosaicModel}
 */
export class MosaicModel {

  /**
   * Registry of known mosaics.
   * @var {{[id: string]: string}}
   */
  public static readonly KNOWN_MOSAICS: {[id: string]: string} = {
    '39E0C49FA322A459': 'dhealth.dhp',
    '5A4935C1D66E6AC4': 'dhealth.dhp (Test)',
    '6BED913FA20223F8': 'symbol.xym',
  };

  constructor(
    public readonly mosaicId: string,
    public readonly amount: string,
    public readonly name?: string,
  ) {
    if (mosaicId in MosaicModel.KNOWN_MOSAICS) {
      this.name = MosaicModel.KNOWN_MOSAICS[mosaicId];
    }
  }

  /**
   * Factory to create a MosaicModel instance from
   * its DTO representation.
   *
   * @see {NodeService.getNodePeers()}
   * @param     {any}   dto   The parsed JSON representation.
   * @returns   {MosaicModel}
   */
  public static fromDTO(dto: any): MosaicModel {
    return new MosaicModel(
      'id' in dto ? dto['id'] : '',
      'amount' in dto ? dto['amount'] : '',
      dto['id'] in MosaicModel.KNOWN_MOSAICS ? MosaicModel.KNOWN_MOSAICS[dto['id']] : '',
    )
  }
};
