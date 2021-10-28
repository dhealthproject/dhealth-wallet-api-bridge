/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
/**
 * Types of network nodes
 * @export
 * @type {NodeType}
 */
export enum NodeType {
  PeerNode = 1,
  ApiNode = 2,
  VotingNode = 4,
  IPv4Node = 64,
  IPv6Node = 128,
}
