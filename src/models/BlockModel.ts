/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
/**
 * Model for blocks information.
 * @type {BlockModel}
 */
export class BlockModel {
  constructor(
    public readonly timestamp: number,
    public readonly blockHash: string,
    public readonly previousBlockHash: string,
    public readonly generationHash: string,
    public readonly feeMultiplier: number,
    public readonly totalFee: number,
    public readonly totalTransactionsCount: number,
    public readonly stateHashSubCacheMerkleRoots: string[],
    public readonly size: number,
    public readonly signerPublicKey: string,
    public readonly signature: string,
    public readonly proofGamma: string,
    public readonly proofVerificationHash: string,
    public readonly proofScalar: string,
    public readonly transactionsHash: string,
    public readonly receiptsHash: string,
    public readonly stateHash: string,
    public readonly beneficiaryAddress: string,
  ) {}

  /**
   * Factory to create a BlockModel instance from
   * its DTO representation.
   *
   * @see {NodeService.getBlockInfo()}
   * @param     {any}   dto   The parsed JSON representation.
   * @returns   {BlockModel}
   */
  public static fromDTO(dto: any): BlockModel {
    const meta = dto['meta'];
    const data = dto['block'];
    return new BlockModel(
      'timestamp' in data ? data['timestamp'] : '',
      'hash' in meta ? meta['hash'] : '',
      'previousBlockHash' in data ? data['previousBlockHash'] : '',
      'generationHash' in meta ? meta['generationHash'] : '',
      'feeMultiplier' in data ? parseInt(data['feeMultiplier']) : 0,
      'totalFee' in meta ? parseInt(meta['totalFee']) : 0,
      'totalTransactionsCount' in meta ? parseInt(meta['totalTransactionsCount']) : 0,
      'stateHashSubCacheMerkleRoots' in meta ? meta['stateHashSubCacheMerkleRoots'] : '',
      'size' in data ? parseInt(data['size']) : 0,
      'signerPublicKey' in data ? data['signerPublicKey'] : '',
      'signature' in data ? data['signature'] : '',
      'proofGamma' in data ? data['proofGamma'] : '',
      'proofVerificationHash' in data ? data['proofVerificationHash'] : '',
      'proofScalar' in data ? data['proofScalar'] : '',
      'transactionsHash' in data ? data['transactionsHash'] : '',
      'receiptsHash' in data ? data['receiptsHash'] : '',
      'stateHash' in data ? data['stateHash'] : '',
      'beneficiaryAddress' in data ? data['beneficiaryAddress'] : '',
    )
  }
};
