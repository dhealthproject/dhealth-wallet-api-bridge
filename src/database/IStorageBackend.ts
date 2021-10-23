/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
export interface IStorageBackend {
  /**
   * The number of available entries
   * @var {number}
   */
  length: number;

  /**
   * Getter for value with \a key
   * @param {string} key
   * @return {string|null}
   */
  getItem(key: string): string | null;

  /**
   * Setter for \a key with \a value
   * @param {string} key
   * @param {any} value
   */
  setItem(key: string, value: string): void;

  /**
   * Deletes the value for the given key
   * @param {string} key
   */
  removeItem(key: string): void;
}
