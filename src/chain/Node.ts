/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
import { NetworkService } from "../services/NetworkService";
import { NodeType } from "../types/NodeType";

/**
 * Helper method to get the semver format of a node's version.
 *
 * @param   {number}  version
 * @returns {string}
 */
export const getNodeVersion = (version: number): string => {
  const placeholderHex = "00000000";
  const hexNodeVersion = (placeholderHex + version.toString(16)).slice(-8);
  return hexNodeVersion
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .join(".");
};

/**
 * Helper method to get a trusted network descriptor, e.g.
 * `mainnet:dhealth.dhp` or `testnet:dhealth.dhp`.
 *
 * @param   {string}  generationHash
 * @returns {string}
 */
export const getNodeNetwork = (generationHash: string): string => {
  const trusted = Object.keys(NetworkService.TRUSTED_NETWORKS).find(
    (n) => NetworkService.TRUSTED_NETWORKS[n] === generationHash
  );

  return !!trusted ? trusted : generationHash;
};

/**
 * Helper method to get the node types from "roles" bitmask value.
 *
 * @param   {number}  roles
 * @returns {NodeType[]}
 */
export const getNodeTypes = (roles: number): NodeType[] => {
  const values = [NodeType.PeerNode, NodeType.ApiNode, NodeType.VotingNode];

  const results = [];
  for (let i = 0; i < 3; i++) {
    if ((roles & values[i]) === values[i]) {
      results.push(values[i]);
    }
  }

  return results;
};
