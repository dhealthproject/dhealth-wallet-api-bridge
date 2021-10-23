/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
import { sha3_512 } from "js-sha3";

// internal dependencies
import { IStorageBackend } from "./IStorageBackend";
import { LocalStorageBackend } from "./LocalStorageBackend";
import { ObjectStorageBackend } from "./ObjectStorageBackend";
import { IStorage } from "./IStorage";
import * as Utilities from "../utilities/Utilities";

/**
 * A super simple object storage that keeps one object in a local storage table.
 *
 * This object is generic, you can type it with the class of object that it's going to be stored.
 * The object could be a simple object, an array or a Map/Record with key->value.
 *
 */
export class SimpleObjectStorage<E> implements IStorage<E> {
  /**
   * The Storage backend, if localStorage is not available the storage will be in memory.
   */

  public constructor(
    private readonly storageKey: string,
    private readonly storageBackend: IStorageBackend = !!localStorage
      ? new LocalStorageBackend()
      : new ObjectStorageBackend()
  ) {}

  /**
   * @return the stored value or undefined
   */
  public get(): E | undefined {
    const item = this.storageBackend.getItem(this.storageKey);
    return item ? JSON.parse(item) : undefined;
  }

  /**
   * Stores the provided value.
   * @param value to be stored
   */
  public set(value: E): void {
    this.storageBackend.setItem(this.storageKey, JSON.stringify(value));
  }

  /**
   * Deletes the stored value.
   */
  public remove(): void {
    this.storageBackend.removeItem(this.storageKey);
  }

  /**
   * Helper that generates an identifier base on the object value
   *
   * @param object the object used feed the generator.
   */
  public static generateIdentifier(
    object: object | undefined = undefined
  ): string {
    const raw = {
      ...{
        time: new Date().valueOf(),
        seed: Utilities.randomBytes(8),
      },
      ...(object || {}),
    };

    const json = JSON.stringify(raw);

    // hash hexadecimal format
    return sha3_512(Utilities.utf8ToHex(json));
  }
}
