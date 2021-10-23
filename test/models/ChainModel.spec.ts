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
import { Filters } from '@/utilities/Filters';
import { ChainModel } from '@/models/ChainModel';
import { MockChainInfoDTO, MockNetworkPropertiesDTO } from '@/mocks/Chain';
import { MockBlockDTO } from '@/mocks/Block';

const mockDTO = MockChainInfoDTO;
const mockPropsDTO = MockNetworkPropertiesDTO;
const mockBlockDTO = MockBlockDTO;
const mockMosaicId = Filters.replaceBy(mockPropsDTO.chain.currencyMosaicId, ['0x', '\'']);

describe('models/ChainModel --->', () => {
  describe('constructor() ->', () => {
    it('should fill correct fields given DTO', () => {
      const chainInfo = new ChainModel(
        parseInt(mockDTO.height),
        parseInt(mockDTO.latestFinalizedBlock.height),
      );

      expect(chainInfo.height).toEqual(parseInt(mockDTO.height));
      expect(chainInfo.finalizedHeight).toEqual(parseInt(mockDTO.latestFinalizedBlock.height));
    });
  });

  describe('fromDTO() ->', () => {
    it('should fill correct fields given filled DTO', () => {
      const chainInfo = ChainModel.fromDTO(mockDTO);

      expect(chainInfo.height).toEqual(parseInt(mockDTO.height));
      expect(chainInfo.finalizedHeight).toEqual(parseInt(mockDTO.latestFinalizedBlock.height));
    });
  });

  describe('addNetworkProperties() ->', () => {
    it('should fill correct fields given filled DTO', () => {
      const chainInfo = ChainModel.fromDTO(mockDTO);
      chainInfo.addNetworkProperties(mockPropsDTO.chain);

      expect(chainInfo.enableVerifiableReceipts).toEqual(mockPropsDTO.chain.enableVerifiableReceipts);
      expect(chainInfo.enableVerifiableState).toEqual(mockPropsDTO.chain.enableVerifiableState);
      expect(chainInfo.currencyMosaicId).toEqual(mockMosaicId);
      expect(chainInfo.harvestingMosaicId).toEqual(mockMosaicId);
    });
  });

  describe('setLastBlock() ->', () => {
    it('should fill correct fields given filled DTO', () => {
      const chainInfo = ChainModel.fromDTO(mockDTO);
      chainInfo.setLastBlock(BlockModel.fromDTO(mockBlockDTO));

      expect(chainInfo.blockHash).toEqual(mockBlockDTO.meta.hash);
      expect(chainInfo.blockTimestamp).toEqual(mockBlockDTO.block.timestamp);
    });
  });
});
