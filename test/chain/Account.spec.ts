/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// internal dependencies
import { getAccountAddress, getAccountBalance } from '@/chain/Account';
import { NetworkIdentifier } from '@/types/NetworkIdentifier';
import { MockAccountInfoDTO } from '@/mocks/Account';

const mockDTO = MockAccountInfoDTO;

describe('chain/Account --->', () => {
  describe('getAccountBalance() ->', () => {
    it('should return empty balance given no mosaics', () => {
      const balance = getAccountBalance(mockDTO.account, 'UnsetMosaicId');

      expect(balance.id).toEqual('UnsetMosaicId');
      expect(balance.amount).toEqual('0');
    });

    it('should return correct balance given mosaics', () => {
      const balance = getAccountBalance(mockDTO.account, '39E0C49FA322A459');

      expect(balance.id).toEqual('39E0C49FA322A459');
      expect(balance.amount).toEqual(mockDTO.account.mosaics[0].amount);
    });
  });

  describe('getAccountAddress() ->', () => {
    it('should prepend correct network identifier byte', () => {
      const mainnet = getAccountAddress(mockDTO.account.publicKey, NetworkIdentifier.MAIN_NET);
      const testnet = getAccountAddress(mockDTO.account.publicKey, NetworkIdentifier.TEST_NET);

      expect(mainnet.substr(0, 1)).toEqual('N');
      expect(testnet.substr(0, 1)).toEqual('T');
    });

    it('should generate correct address format given account public key', () => {
      const address1 = getAccountAddress(mockDTO.account.publicKey, NetworkIdentifier.MAIN_NET);
      expect(address1.length).toEqual(39);
      expect(address1).toEqual('NCN7AFWFM2G73LDDEHRSW5XPMIDINAQ4KGBQY4A');
    });

    it('should generate correct address format given linked public key', () => {
      const address1 = getAccountAddress(mockDTO.account.supplementalPublicKeys.node.publicKey, NetworkIdentifier.MAIN_NET);
      expect(address1.length).toEqual(39);
      expect(address1).toEqual('NASK44OA5WFFOELHJTUK4ZQ7RTHNYBZJUT6QR6Q');
    });
  });
});
