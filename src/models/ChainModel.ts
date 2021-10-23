/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
import { BlockModel } from './BlockModel'
import { Filters } from '../utilities/Filters'

/**
 * Model for network blockchain information.
 * @type {NodeModel}
 */
export class ChainModel {
  constructor(
    /**
     * chain
     */
    public readonly height: number,
    public readonly finalizedHeight: number,
    /**
     * network.chain
     */
    public enableVerifiableState?: boolean,
    public enableVerifiableReceipts?: boolean,
    public currencyMosaicId?: string,
    public harvestingMosaicId?: string,
    public blockGenerationTargetTime?: string,
    public blockTimeSmoothingFactor?: number,
    public importanceGrouping?: number,
    public importanceActivityPercentage?: number,
    public maxRollbackBlocks?: number,
    public maxDifficultyBlocks?: number,
    public defaultDynamicFeeMultiplier?: number,
    public maxTransactionLifetime?: string,
    public maxBlockFutureTime?: string,
    public initialCurrencyAtomicUnits?: string,
    public maxMosaicAtomicUnits?: string,
    public totalChainImportance?: string,
    public minHarvesterBalance?: number,
    public maxHarvesterBalance?: number,
    public minVoterBalance?: number,
    public votingSetGrouping?: number,
    public maxVotingKeysPerAccount?: number,
    public minVotingKeyLifetime?: number,
    public maxVotingKeyLifetime?: number,
    public harvestBeneficiaryPercentage?: number,
    public harvestNetworkPercentage?: number,
    public harvestNetworkFeeSinkAddress?: string,
    public maxTransactionsPerBlock?: number,
    /**
     * last block info
     */
    public blockTimestamp?: number,
    public blockHash?: string,
    public previousHash?: string,
    public lastGenerationHash?: string,
    public lastHarvesterPubKey?: string,
    public votingBalance?: number,
  ) {}

  /**
   * Fills the missing values using a network properties
   * DTO object from `/network/properties`'s chain object.
   *
   * @see {NodeService.getChainInfo()}
   * @param     {any}   dto 
   * @returns   {ChainModel}
   */
  public addNetworkProperties(dto: any): ChainModel {
    this.enableVerifiableState = dto['enableVerifiableState'];
    this.enableVerifiableReceipts = dto['enableVerifiableReceipts'];
    this.currencyMosaicId = Filters.replaceBy(dto['currencyMosaicId'], ['0x', '\'']);
    this.harvestingMosaicId = Filters.replaceBy(dto['harvestingMosaicId'], ['0x', '\'']);
    this.blockGenerationTargetTime = dto['blockGenerationTargetTime'];
    this.blockTimeSmoothingFactor = parseInt(dto['blockTimeSmoothingFactor']);
    this.importanceGrouping = parseInt(dto['importanceGrouping']);
    this.importanceActivityPercentage = parseInt(dto['importanceActivityPercentage']);
    this.maxRollbackBlocks = parseInt(dto['maxRollbackBlocks']);
    this.maxDifficultyBlocks = parseInt(dto['maxDifficultyBlocks']);
    this.defaultDynamicFeeMultiplier = parseInt(dto['defaultDynamicFeeMultiplier']);
    this.maxBlockFutureTime = dto['maxBlockFutureTime'];
    this.initialCurrencyAtomicUnits = dto['initialCurrencyAtomicUnits'];
    this.maxMosaicAtomicUnits = dto['maxMosaicAtomicUnits'];
    this.totalChainImportance = dto['totalChainImportance'];
    this.minHarvesterBalance = parseInt(Filters.replaceBy(dto['minHarvesterBalance'], ['\''])) / Math.pow(10, 6);
    this.maxHarvesterBalance = parseInt(Filters.replaceBy(dto['maxHarvesterBalance'], ['\''])) / Math.pow(10, 6);
    this.minVoterBalance = parseInt(Filters.replaceBy(dto['minVoterBalance'], ['\''])) / Math.pow(10, 6);
    this.votingSetGrouping = parseInt(dto['votingSetGrouping']);
    this.maxVotingKeysPerAccount = parseInt(dto['maxVotingKeysPerAccount']);
    this.harvestBeneficiaryPercentage = parseInt(dto['harvestBeneficiaryPercentage']);
    this.maxVotingKeyLifetime = parseInt(dto['maxVotingKeyLifetime']);
    this.harvestNetworkPercentage = parseInt(dto['harvestNetworkPercentage']);
    this.harvestNetworkFeeSinkAddress = dto['harvestNetworkFeeSinkAddress'];
    this.maxTransactionsPerBlock = parseInt(Filters.replaceBy(dto['maxTransactionsPerBlock'], ['\'']));

    return this;
  }

  /**
   * Fills the missing values using a last block
   * DTO object from `/blocks/X`.
   *
   * @see {NodeService.getChainInfo()}
   * @param     {any}   dto 
   * @returns   {ChainModel}
   */
  public setLastBlock(block: BlockModel): ChainModel {
    this.blockTimestamp = block.timestamp;
    this.blockHash = block.blockHash;
    this.previousHash = block.previousBlockHash;
    this.lastGenerationHash = block.generationHash;
    this.lastHarvesterPubKey = block.signerPublicKey;

    return this;
  }

  /**
   * Factory to create a ChainModel instance from
   * its DTO representation.
   *
   * @see {NodeService.getChainInfo()}
   * @param     {any}   dto   The parsed JSON representation.
   * @returns   {ChainModel}
   */
  public static fromDTO(dto: any): ChainModel {
    return new ChainModel(
      'height' in dto ? parseInt(dto['height']) : 0,
      'latestFinalizedBlock' in dto && 'height' in dto['latestFinalizedBlock'] ? parseInt(dto['latestFinalizedBlock']['height']) : 0,
    )
  }
};
