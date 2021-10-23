/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
/**
 * Storage
 */
export interface INetworkBasedStorage<E> {
  /**
   * it gets the stored value for the specific generation hash.
   *
   * @param generationHash the generation hash
   * @return the stored value for the provided network hash or undefined
   */
  get(generationHash: string): E | undefined;

  /**
   * It gets the latest stored entry according to the timestamp.
   * @return the entry if available.
   */
  getLatest(): E | undefined;

  /**
   * Stores the value for the provided generation hash.
   *
   * @param generationHash the generation hash
   * @param value to be stored
   */
  set(generationHash: string, value: E): void;

  /**
   * Deletes the stored value for the given generation hash
   * @param generationHash the generation hash.
   */
  remove(generationHash: string): void;
}
