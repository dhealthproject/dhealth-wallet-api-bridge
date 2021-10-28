/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// internal dependencies
import { getNodeVersion, getNodeNetwork, getNodeTypes } from '@/chain/Node';
import { NodeType } from '@/types/NodeType';
import { MockNodeInfoDTO } from '@/mocks/Node';

const mockDTO = MockNodeInfoDTO;

describe('chain/Node --->', () => {
  describe('getNodeVersion() ->', () => {
    it('should return correct version', () => {
      const version = getNodeVersion(mockDTO.version);
      expect(version).toEqual('1.0.0.0');
    });

    it('should return correct modified version', () => {
      const version = getNodeVersion(16777728);
      expect(version).toEqual('1.0.2.0');
    });
  });

  describe('getNodeNetwork() ->', () => {
    it('should return correct descriptor', () => {
      const descriptor = getNodeNetwork(mockDTO.networkGenerationHashSeed);
      expect(descriptor).toEqual('mainnet:dhealth.dhp');
    });
  })

  describe('getNodeTypes() ->', () => {
    it('should return correct full node types', () => {
      const types = getNodeTypes(mockDTO.roles);
      expect(types).toBeDefined();
      expect(types.length).toEqual(3);
      expect(types).toContain(NodeType.ApiNode);
      expect(types).toContain(NodeType.PeerNode);
      expect(types).toContain(NodeType.VotingNode);
    });

    it('should return correct peer node type', () => {
      const types = getNodeTypes(1); // Peer-only
      expect(types).toBeDefined();
      expect(types.length).toEqual(1);
      expect(types).toContain(NodeType.PeerNode);
    });

    it('should return correct api node type', () => {
      const types = getNodeTypes(2); // Api-only
      expect(types).toBeDefined();
      expect(types.length).toEqual(1);
      expect(types).toContain(NodeType.ApiNode);
    });

    it('should return correct voting node type', () => {
      const types = getNodeTypes(4); // Voting-only
      expect(types).toBeDefined();
      expect(types.length).toEqual(1);
      expect(types).toContain(NodeType.VotingNode);
    });

    it('should return correct peer+api node type', () => {
      const types = getNodeTypes(3); // Peer+Api
      expect(types).toBeDefined();
      expect(types.length).toEqual(2);
      expect(types).toContain(NodeType.PeerNode);
      expect(types).toContain(NodeType.ApiNode);
    });
  })
});
