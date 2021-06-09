/**
 * This file is part of YourDLT Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
/**
 * Generic interface for simple stored objects.
 */
export interface IStorage<E> {
  /**
   * @return the stored value or undefined
   */
  get(): E | undefined;

  /**
   * Stores the provided value.
   * @param value to be stored
   */
  set(value: E): void;

  /**
   * Deletes the stored value.
   */
  remove(): void;
}
