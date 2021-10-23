/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// internal dependencies
import { BlockModel } from '@/models/BlockModel';
import { MockBlockDTO } from '@/mocks/Block';

const mockDTO = MockBlockDTO;

describe('models/BlockModel --->', () => {
  describe('constructor() ->', () => {
    it('should fill correct fields given DTO', () => {
      const block = new BlockModel(
        parseInt(mockDTO.block.timestamp),
        mockDTO.meta.hash,
        mockDTO.block.previousBlockHash,
        mockDTO.meta.generationHash,
        mockDTO.block.feeMultiplier,
        parseInt(mockDTO.meta.totalFee),
        mockDTO.meta.totalTransactionsCount,
        mockDTO.meta.stateHashSubCacheMerkleRoots,
        mockDTO.block.size,
        mockDTO.block.signerPublicKey,
        mockDTO.block.signature,
        mockDTO.block.proofGamma,
        mockDTO.block.proofVerificationHash,
        mockDTO.block.proofScalar,
        mockDTO.block.transactionsHash,
        mockDTO.block.receiptsHash,
        mockDTO.block.stateHash,
        mockDTO.block.beneficiaryAddress
      );

      expect(block.blockHash).toEqual(mockDTO.meta.hash);
      expect(block.previousBlockHash).toEqual(mockDTO.block.previousBlockHash);
    });
  });

  describe('fromDTO() ->', () => {
    it('should fill correct fields given filled DTO', () => {
      const block = BlockModel.fromDTO(mockDTO);

      expect(block.blockHash).toEqual(mockDTO.meta.hash);
      expect(block.previousBlockHash).toEqual(mockDTO.block.previousBlockHash);
    });
  });
});
