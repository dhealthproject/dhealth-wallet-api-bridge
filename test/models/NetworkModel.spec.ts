/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// internal dependencies
import { NetworkIdentifier, getIdentifierFromString } from '@/models/NetworkIdentifier';
import { NetworkModel } from '@/models/NetworkModel';
import { MockNetworkPropertiesDTO } from '@/mocks/Chain';

const mockDTO = MockNetworkPropertiesDTO;

describe('models/NetworkModel --->', () => {
  describe('constructor() ->', () => {
    it('should fill correct fields given DTO', () => {
      const network = new NetworkModel(
        getIdentifierFromString(mockDTO.network.identifier),
        mockDTO.network.nemesisSignerPublicKey,
        mockDTO.network.nodeEqualityStrategy,
        mockDTO.network.generationHashSeed,
        parseInt(mockDTO.network.epochAdjustment.replace(/s$/, '')),
      );

      expect(network.identifier).toEqual(NetworkIdentifier.MAIN_NET);
      expect(network.generationHashSeed).toEqual(mockDTO.network.generationHashSeed);
      expect(network.nemesisSignerPublicKey).toEqual(mockDTO.network.nemesisSignerPublicKey);
    });
  });

  describe('fromDTO() ->', () => {
    it('should fill correct fields given filled DTO', () => {
      const network = NetworkModel.fromDTO(mockDTO.network);

      expect(network.identifier).toEqual(NetworkIdentifier.MAIN_NET);
      expect(network.generationHashSeed).toEqual(mockDTO.network.generationHashSeed);
      expect(network.nemesisSignerPublicKey).toEqual(mockDTO.network.nemesisSignerPublicKey);
    });
  });
});
