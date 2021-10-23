/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// internal dependencies
import { AccountModel } from '@/models/AccountModel';
import { MosaicModel } from '@/models/MosaicModel';
import { MockAccountDTO } from '@/mocks/Account';

const mockDTO = MockAccountDTO;

describe('models/AccountModel --->', () => {
  describe('constructor() ->', () => {
    it('should fill correct fields given DTO', () => {
      const acct = new AccountModel(
        mockDTO.account.publicKey,
        mockDTO.account.importance,
        [],
      );
      expect(acct.publicKey).toEqual(mockDTO.account.publicKey);
      expect(acct.importance).toEqual(mockDTO.account.importance);
      expect(acct.balances).toBeDefined();
      expect(acct.balances.length).toEqual(0);
    });

    it('should fill mosaics given balances', () => {
      const acct = new AccountModel(
        mockDTO.account.publicKey,
        mockDTO.account.importance,
        mockDTO.account.mosaics.map(m => MosaicModel.fromDTO(m)),
        undefined,
        mockDTO.account.accountType,
        mockDTO.account.supplementalPublicKeys.linked.publicKey,
        mockDTO.account.supplementalPublicKeys.node.publicKey,
        mockDTO.account.supplementalPublicKeys.vrf.publicKey
      );

      expect(acct.publicKey).toEqual(mockDTO.account.publicKey);
      expect(acct.importance).toEqual(mockDTO.account.importance);
      expect(acct.balances).toBeDefined();
      expect(acct.balances.length).toEqual(1);
      expect(acct.balances[0].mosaicId).toEqual(mockDTO.account.mosaics[0].id);
      expect(acct.accountType).toEqual(mockDTO.account.accountType);
      expect(acct.remotePublicKey).toEqual(mockDTO.account.supplementalPublicKeys.linked.publicKey);
      expect(acct.nodePublicKey).toEqual(mockDTO.account.supplementalPublicKeys.node.publicKey);
      expect(acct.vrfPublicKey).toEqual(mockDTO.account.supplementalPublicKeys.vrf.publicKey);
    });
  });

  describe('fromDTO() ->', () => {
    it('should fill correct fields given filled DTO', () => {
      const acct = AccountModel.fromDTO(mockDTO);

      expect(acct.publicKey).toEqual(mockDTO.account.publicKey);
      expect(acct.importance).toEqual(mockDTO.account.importance);
      expect(acct.balances).toBeDefined();
      expect(acct.balances.length).toEqual(1);
      expect(acct.accountType).toEqual(mockDTO.account.accountType);
      expect(acct.remotePublicKey).toEqual(mockDTO.account.supplementalPublicKeys.linked.publicKey);
      expect(acct.nodePublicKey).toEqual(mockDTO.account.supplementalPublicKeys.node.publicKey);
      expect(acct.vrfPublicKey).toEqual(mockDTO.account.supplementalPublicKeys.vrf.publicKey);
    });
  });

  describe('getBalanceOf() ->', () => {
    it('should return empty balance given no mosaics', () => {
      const acct = AccountModel.fromDTO(mockDTO);
      const balance = acct.getBalanceOf('UnsetMosaicId');

      expect(balance.mosaicId).toEqual('UnsetMosaicId');
      expect(balance.amount).toEqual('0');
    });

    it('should return correct balance given mosaics', () => {
      const acct = AccountModel.fromDTO(mockDTO);
      const balance = acct.getBalanceOf('39E0C49FA322A459');

      expect(balance.mosaicId).toEqual('39E0C49FA322A459');
      expect(balance.amount).toEqual(mockDTO.account.mosaics[0].amount);
    });
  });
});
