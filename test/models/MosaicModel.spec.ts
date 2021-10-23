/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// internal dependencies
import { MosaicModel } from '@/models/MosaicModel';
import { MockBalanceDTO } from '@/mocks/Mosaic';

const mockDTO = MockBalanceDTO;

describe('models/MosaicModel --->', () => {
  describe('constructor() ->', () => {
    it('should fill correct fields given DTO', () => {
      const mosaic = new MosaicModel(
        mockDTO.id,
        mockDTO.amount,
      );

      expect(mosaic.mosaicId).toEqual(mockDTO.id);
      expect(mosaic.amount).toEqual(mockDTO.amount);
    });

    it('should fill name given known mosaic', () => {
      const mosaic = new MosaicModel(
        mockDTO.id,
        mockDTO.amount,
      );

      expect(mosaic.mosaicId).toEqual(mockDTO.id);
      expect(mosaic.amount).toEqual(mockDTO.amount);
      expect(mosaic.name).toEqual('dhealth.dhp');
    });
  });

  describe('fromDTO() ->', () => {
    it('should fill correct fields given filled DTO', () => {
      const mosaic = MosaicModel.fromDTO(mockDTO);

      expect(mosaic.mosaicId).toEqual(mockDTO.id);
      expect(mosaic.amount).toEqual(mockDTO.amount);
      expect(mosaic.name).toEqual('dhealth.dhp');
    });
  });
});
