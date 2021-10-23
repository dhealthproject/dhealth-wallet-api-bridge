/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
/**
 * Network identifiers
 * @export
 * @type {NetworkIdentifier}
 */
export enum NetworkIdentifier {
  MAIN_NET = 0x68,
  /**
   * Test net network
   * @type {number}
   */
  TEST_NET = 0x98,
  /**
   * Private net network
   * @type {number}
   */
  PRIVATE = 0x78,
  /**
   * Private test net network
   * @type {number}
   */
  PRIVATE_TEST = 0xa8,
};

/**
 * Returns a NetworkIdentifier value from its
 * string representation.
 *
 * @param   {string}  identifier    e.g. "public", "public-test"
 * @returns {NetworkIdentifier}
 */
export const getIdentifierFromString = (identifier: string): NetworkIdentifier => {
  if (identifier === 'public') {
    return NetworkIdentifier.MAIN_NET;
  }
  else if (identifier === 'public-test') {
    return NetworkIdentifier.TEST_NET;
  }
  else if (identifier === 'private') {
    return NetworkIdentifier.PRIVATE;
  }
  else if (identifier === 'private-test') {
    return NetworkIdentifier.PRIVATE_TEST;
  }
}
