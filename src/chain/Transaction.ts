/**
 * This file is part of YourDLT Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
export enum Transaction {
  /**
   * Transfer Transaction transaction type.
   * @type {number}
   */
  Transfer = 16724,

  /**
   * Register namespace transaction type.
   * @type {number}
   */
  NamespaceRegistration = 16718,

  /**
   * Address alias transaction type
   * @type {number}
   */
  AddressAlias = 16974,

  /**
   * Mosaic alias transaction type
   * @type {number}
   */
  MosaicAlias = 17230,

  /**
   * Mosaic definition transaction type.
   * @type {number}
   */
  MosaicDefinition = 16717,

  /**
   * Mosaic supply change transaction.
   * @type {number}
   */
  MosaicSupplyChange = 16973,

  /**
   * Modify multisig account transaction type.
   * @type {number}
   */
  MultisigAccountModification = 16725,

  /**
   * Aggregate complete transaction type.
   * @type {number}
   */
  AggregateComplete = 16705,

  /**
   * Aggregate bonded transaction type
   */
  AggregateBonded = 16961,

  /**
   * Lock transaction type
   * @type {number}
   */
  HashLock = 16712,

  /**
   * Secret Lock Transaction type
   * @type {number}
   */
  SecretLock = 16722,

  /**
   * Secret Proof transaction type
   * @type {number}
   */
  SecretProof = 16978,

  /**
   * Account restriction address transaction type
   * @type {number}
   */
  AccountAddressRestriction = 16720,

  /**
   * Account restriction mosaic transaction type
   * @type {number}
   */
  AccountMosaicRestriction = 16976,

  /**
   * Account restriction operation transaction type
   * @type {number}
   */
  AccountOperationRestriction = 17232,

  /**
   * Link account transaction type
   * @type {number}
   */
  AccountKeyLink = 16716,

  /**
   * Mosaic address restriction type
   * @type {number}
   */
  MosaicAddressRestriction = 16977,

  /**
   * Mosaic global restriction type
   * @type {number}
   */
  MosaicGlobalRestriction = 16721,

  /**
   * Account metadata transaction
   * @type {number}
   */
  AccountMetadata = 16708,

  /**
   * Mosaic metadata transaction
   * @type {number}
   */
  MosaicMetadata = 16964,

  /**
   * Namespace metadata transaction
   * @type {number}
   */
  NamespaceMetadata = 17220,

  /**
   * Link vrf key transaction
   * @type {number}
   */
  VrfKeyLink = 16963,

  /**
   * Link voting key transaction
   * @type {number}
   */
  VotingKeyLink = 16707,

  /**
   * Link node key transaction
   * @type {number}
   */
  NodeKeyLink = 16972,
}
