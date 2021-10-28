/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// internal dependencies
import { getNetworkProperty, getNetworkIdentifier } from '@/chain/Network';
import { MockNetworkConfigurationDTO } from '@/mocks/Chain';
import { Filters } from '@/utilities/Filters';
import { NetworkIdentifier } from '@/types/NetworkIdentifier';

const mockDTO = MockNetworkConfigurationDTO;

describe('chain/Network --->', () => {
  describe('getNetworkProperty() ->', () => {
    it('should return undefined given unknown field', () => {
      const value = getNetworkProperty(mockDTO, 'unknownField');

      expect(value).toBeUndefined();
    });

    it('should return correct value given existing field', () => {
      const value = getNetworkProperty(mockDTO, 'generationHashSeed');
      expect(value).toEqual('ED5761EA890A096C50D3F50B7C2F0CCB4B84AFC9EA870F381E84DDE36D04EF16');
    });

    it('should return correctly formatted value given formatted field', () => {
      const minHarvesterBalance = getNetworkProperty(mockDTO, 'minHarvesterBalance');
      const totalChainImportance = getNetworkProperty(mockDTO, 'totalChainImportance');
      expect(minHarvesterBalance).toEqual(Filters.replaceBy(mockDTO.chain.minHarvesterBalance, ['\'']));
      expect(totalChainImportance).toEqual(Filters.replaceBy(mockDTO.chain.totalChainImportance, ['\'']));
    });
  });

  describe('getNetworkIdentifier() ->', () => {
    it('should return correct identifier given valid network type', () => {
      const identifier = getNetworkIdentifier('public');
      const identifier2 = getNetworkIdentifier('public-test');

      expect(identifier).toEqual(NetworkIdentifier.MAIN_NET);
      expect(identifier2).toEqual(NetworkIdentifier.TEST_NET);
    });

    it('should throw error given invalid network identifier', () => {
      expect(() => {
        const identifier = getNetworkIdentifier('invalidNetworkIdentifier');
      }).toThrow(new Error(`Unrecognized network identifier "invalidNetworkIdentifier".`));
    });
  })
});
