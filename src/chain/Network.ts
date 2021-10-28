/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// external dependencies
import { NetworkConfigurationDTO } from "symbol-openapi-typescript-fetch-client";

// internal dependencies
import { Filters } from "../utilities/Filters";
import { NetworkIdentifier } from "../types/NetworkIdentifier";

/**
 * Helper method to get a network property value, correctly
 * formatted depending on the key.
 *
 * @param   {number}  roles
 * @returns {NodeType[]}
 */
export const getNetworkProperty = (
  config: NetworkConfigurationDTO,
  property: string
): any => {
  // matches values to format
  switch (property) {
    case "currencyMosaicId":
    case "harvestingMosaicId":
      return Filters.replaceBy(config.chain[property], ["0x", "'"]);

    case "initialCurrencyAtomicUnits":
    case "maxMosaicAtomicUnits":
    case "totalChainImportance":
    case "minHarvesterBalance":
    case "maxHarvesterBalance":
    case "minVoterBalance":
    case "maxTransactionsPerBlock":
      return Filters.replaceBy(config.chain[property], ["'"]);

    case "blockTimeSmoothingFactor":
    case "importanceGrouping":
    case "importanceActivityPercentage":
    case "maxRollbackBlocks":
    case "maxDifficultyBlocks":
    case "defaultDynamicFeeMultiplier":
    case "votingSetGrouping":
    case "maxVotingKeysPerAccount":
    case "harvestBeneficiaryPercentage":
    case "maxVotingKeyLifetime":
    case "harvestNetworkPercentage":
      return parseInt(config.chain[property]);
  }

  // tries to find the property
  if (property in config) {
    return config[property];
  } else if (property in config.network) {
    return config.network[property];
  } else if (property in config.chain) {
    return config.chain[property];
  } else if (property in config.plugins) {
    return config.plugins[property];
  }

  // not found
  return undefined;
};

/**
 * Returns a NetworkIdentifier value from its
 * string representation.
 *
 * @param   {string}  identifier    e.g. "public", "public-test"
 * @returns {NetworkIdentifier}
 */
export const getNetworkIdentifier = (identifier: string): NetworkIdentifier => {
  if (identifier === "public") {
    return NetworkIdentifier.MAIN_NET;
  } else if (identifier === "public-test") {
    return NetworkIdentifier.TEST_NET;
  } else if (identifier === "private") {
    return NetworkIdentifier.PRIVATE;
  } else if (identifier === "private-test") {
    return NetworkIdentifier.PRIVATE_TEST;
  }

  throw new Error(`Unrecognized network identifier "${identifier}".`);
};
