/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// internal dependencies
import { NodeType, getNodeTypesFromRoles } from '@/models/NodeType';
import { NodeModel } from '@/models/NodeModel';
import { MockNodeInfoDTO } from '@/mocks/Node';

const mockDTO = MockNodeInfoDTO;

describe('models/NodeModel --->', () => {
  describe('constructor() ->', () => {
    it('should fill correct fields given DTO', () => {
      const nodeInfo = new NodeModel(
        mockDTO.host,
        mockDTO.friendlyName,
        mockDTO.networkIdentifier,
        mockDTO.publicKey,
        mockDTO.nodePublicKey,
        mockDTO.version,
        getNodeTypesFromRoles(mockDTO.roles),
        mockDTO.networkGenerationHashSeed,
      );

      expect(nodeInfo.host).toEqual(mockDTO.host);
      expect(nodeInfo.friendlyName).toEqual(mockDTO.friendlyName);
      expect(nodeInfo.networkIdentifier).toEqual(mockDTO.networkIdentifier);
      expect(nodeInfo.publicKey).toEqual(mockDTO.publicKey);
      expect(nodeInfo.nodePublicKey).toEqual(mockDTO.nodePublicKey);
      expect(nodeInfo.version).toEqual(mockDTO.version);
    });
  });

  describe('fromDTO() ->', () => {
    it('should fill correct fields given filled DTO', () => {
      const nodeInfo = NodeModel.fromDTO(mockDTO);

      expect(nodeInfo.host).toEqual(mockDTO.host);
      expect(nodeInfo.friendlyName).toEqual(mockDTO.friendlyName);
      expect(nodeInfo.networkIdentifier).toEqual(mockDTO.networkIdentifier);
      expect(nodeInfo.publicKey).toEqual(mockDTO.publicKey);
      expect(nodeInfo.nodePublicKey).toEqual(mockDTO.nodePublicKey);
      expect(nodeInfo.version).toEqual(mockDTO.version);
    });
  });

  describe('networkDescriptor() ->', () => {
    it('should return correct descriptor', () => {
      const nodeInfo = NodeModel.fromDTO(mockDTO);
      const descriptor = nodeInfo.networkDescriptor;

      expect(descriptor).toEqual('mainnet:dhealth.dhp');
    });
  });

  describe('semverVersion() ->', () => {
    it('should return correct version', () => {
      const nodeInfo = NodeModel.fromDTO(mockDTO);
      const version = nodeInfo.semverVersion;

      expect(version).toEqual('1.0.0.0');
    });

    it('should return correct modified version', () => {
      const nodeInfo = NodeModel.fromDTO({
        ...mockDTO,
        version: 16777728,
      });
      const version = nodeInfo.semverVersion;

      expect(version).toEqual('1.0.2.0');
    });
  });

});
