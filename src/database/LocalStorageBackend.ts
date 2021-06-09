/**
 * This file is part of YourDLT Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// internal dependencies
import { IStorageBackend } from "./IStorageBackend";

export class LocalStorageBackend implements IStorageBackend {
  /**
   * The number of available entries
   * @var {number}
   */
  public get length(): number {
    return !!localStorage ? localStorage.length : 0;
  }

  /**
   * Returns true if localStorage backend is available
   * @return {boolean}
   */
  public isAvailable(): boolean {
    return !!localStorage;
  }

  /**
   * Getter for value with \a key
   * @param {string} key
   * @return {any}
   */
  public getItem(key: string): string | undefined {
    return this.isAvailable() ? localStorage.getItem(key) : undefined;
  }

  /**
   * Setter for \a key with \a value
   * @param {string} key
   * @param {any} value
   */
  public setItem(key: string, value: string): void {
    if (this.isAvailable()) {
      localStorage.setItem(key, value);
    }
  }

  /**
   * Deletes the value for the given key
   * @param {string} key
   */
  public removeItem(key: string): void {
    if (this.isAvailable()) {
      localStorage.removeItem(key);
    }
  }
}
