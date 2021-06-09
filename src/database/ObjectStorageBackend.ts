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

export class ObjectStorageBackend<T> implements IStorageBackend {
  /**
   * Construct an object storage backend
   * @param backend
   */
  public constructor(protected readonly backend: Record<string, string> = {}) {}

  /**
   * The number of available entries
   * @var {number}
   */
  public get length(): number {
    return Object.keys(this.backend).length;
  }

  /**
   * Always returns true for "backend as an object"
   * @return {boolean}
   */
  public isAvailable(): boolean {
    return true;
  }

  /**
   * Getter for value with \a key
   * @param {string} key
   * @return {any}
   */
  public getItem(key: string): string | null {
    if (!this.backend || !this.backend[key]) {
      return null;
    }

    return this.backend[key];
  }

  /**
   * Setter for \a key with \a value
   * @param {string} key
   * @param {any} value
   */
  public setItem(key: string, value: string): void {
    this.backend[key] = value;
  }

  /**
   * Deletes the value for the given key
   * @param {string} key
   */
  public removeItem(key: string): void {
    delete this.backend[key];
  }
}
