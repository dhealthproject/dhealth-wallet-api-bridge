/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
export const MockChainInfoDTO = {
  "scoreHigh": "2",
  "scoreLow": "17447114223282642544",
  "height": "598600",
  "latestFinalizedBlock": {
    "finalizationEpoch": 417,
    "finalizationPoint": 48,
    "height": "598580",
    "hash": "43C4CAFD681B6DA6447D1755C4D39745230C6A73168431FEF06AB773A9BC057B"
  }
};

export const MockNetworkPropertiesDTO = {
  "network": {
    "identifier": "public",
    "nemesisSignerPublicKey": "907B74B4EAA4F8DA48162B624C933FD1F3F51714A6EE8A78BB1713F5D6959E0A",
    "nodeEqualityStrategy": "host",
    "generationHashSeed": "ED5761EA890A096C50D3F50B7C2F0CCB4B84AFC9EA870F381E84DDE36D04EF16",
    "epochAdjustment": "1616978397s"
  },
  "chain": {
    "enableVerifiableState": true,
    "enableVerifiableReceipts": true,
    "currencyMosaicId": "0x39E0'C49F'A322'A459",
    "harvestingMosaicId": "0x39E0'C49F'A322'A459",
    "blockGenerationTargetTime": "30s",
    "blockTimeSmoothingFactor": "3000",
    "importanceGrouping": "720",
    "importanceActivityPercentage": "5",
    "maxRollbackBlocks": "0",
    "maxDifficultyBlocks": "60",
    "defaultDynamicFeeMultiplier": "100",
    "maxTransactionLifetime": "6h",
    "maxBlockFutureTime": "300ms",
    "initialCurrencyAtomicUnits": "1'000'000'000'000'000",
    "maxMosaicAtomicUnits": "9'000'000'000'000'000",
    "totalChainImportance": "1'000'000'000'000'000",
    "minHarvesterBalance": "2'000'000'000",
    "maxHarvesterBalance": "20'000'000'000'000",
    "minVoterBalance": "2'000'000'000'000",
    "votingSetGrouping": "1440",
    "maxVotingKeysPerAccount": "3",
    "minVotingKeyLifetime": "112",
    "maxVotingKeyLifetime": "360",
    "harvestBeneficiaryPercentage": "10",
    "harvestNetworkPercentage": "5",
    "harvestNetworkFeeSinkAddress": "NCOMSWYJ5E6WRQV7GBLHCIITDAVDZQ5HEMYJV6I",
    "maxTransactionsPerBlock": "6'000"
  },
  "plugins": {
    "accountlink": {
      "dummy": "to trigger plugin load"
    },
    "aggregate": {
      "maxTransactionsPerAggregate": "100",
      "maxCosignaturesPerAggregate": "25",
      "enableStrictCosignatureCheck": false,
      "enableBondedAggregateSupport": true,
      "maxBondedTransactionLifetime": "48h"
    },
    "lockhash": {
      "lockedFundsPerAggregate": "10'000'000",
      "maxHashLockDuration": "2d"
    },
    "locksecret": {
      "maxSecretLockDuration": "365d",
      "minProofSize": "0",
      "maxProofSize": "1024"
    },
    "metadata": {
      "maxValueSize": "1024"
    },
    "mosaic": {
      "maxMosaicsPerAccount": "1'000",
      "maxMosaicDuration": "3650d",
      "maxMosaicDivisibility": "6",
      "mosaicRentalFeeSinkAddress": "NCOMSWYJ5E6WRQV7GBLHCIITDAVDZQ5HEMYJV6I",
      "mosaicRentalFee": "500"
    },
    "multisig": {
      "maxMultisigDepth": "3",
      "maxCosignatoriesPerAccount": "25",
      "maxCosignedAccountsPerAccount": "25"
    },
    "namespace": {
      "maxNameSize": "64",
      "maxChildNamespaces": "100",
      "maxNamespaceDepth": "3",
      "minNamespaceDuration": "3650d",
      "maxNamespaceDuration": "3650d",
      "namespaceGracePeriodDuration": "365d",
      "reservedRootNamespaceNames": "xem, nem, user, account, org, com, biz, net, edu, mil, gov, info, symbl, symbol, xym, dhealth, dhp",
      "namespaceRentalFeeSinkAddress": "NCOMSWYJ5E6WRQV7GBLHCIITDAVDZQ5HEMYJV6I",
      "rootNamespaceRentalFeePerBlock": "1000000",
      "childNamespaceRentalFee": "100"
    },
    "restrictionaccount": {
      "maxAccountRestrictionValues": "100"
    },
    "restrictionmosaic": {
      "maxMosaicRestrictionValues": "20"
    },
    "transfer": {
      "maxMessageSize": "1024"
    }
  }
};
