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
      );

      expect(acct.publicKey).toEqual(mockDTO.account.publicKey);
      expect(acct.importance).toEqual(mockDTO.account.importance);
      expect(acct.balances).toBeDefined();
      expect(acct.balances.length).toEqual(1);
      expect(acct.balances[0].mosaicId).toEqual(mockDTO.account.mosaics[0].id);
    });
  });

  describe('fromDTO() ->', () => {
    it('should fill correct fields given filled DTO', () => {
      const acct = AccountModel.fromDTO(mockDTO);

      expect(acct.publicKey).toEqual(mockDTO.account.publicKey);
      expect(acct.importance).toEqual(mockDTO.account.importance);
      expect(acct.balances).toBeDefined();
      expect(acct.balances.length).toEqual(1);
    });
  });
});
