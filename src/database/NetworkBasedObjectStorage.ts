/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
import { NetworkBasedModel } from "./NetworkBasedModel";
import { NetworkBasedEntryModel } from "./NetworkBasedEntryModel";
import { IStorage } from "./IStorage";

/**
 * A storage save the data per generation hash
 */
export class NetworkBasedObjectStorage<E> {
  /**
   * @param delegate the delegate that will store the data that stores the generation model.
   */
  public constructor(
    private readonly delegate: IStorage<NetworkBasedModel<E>>
  ) {}

  /**
   * it gets the stored value for the specific generation hash.
   *
   * @param generationHash the generation hash
   * @return the stored value for the provided network hash or undefined
   */
  public get(generationHash: string): E | undefined {
    if (!generationHash) {
      return undefined;
    }
    const map = this.delegate.get() || {};
    return (map[generationHash] && map[generationHash].data) || undefined;
  }

  /**
   * It gets the latest stored entry according to the timestamp.
   * @return the entry if available.
   */
  public getLatest(): E | undefined {
    const map = this.delegate.get() || {};
    const latest = Object.values(map).reduce(
      (prev, current) =>
        prev && prev.timestamp > current.timestamp ? prev : current,
      undefined
    );
    return (latest && latest.data) || undefined;
  }

  /**
   * Stores the value for the provided generation hash.
   *
   * @param generationHash the generation hash
   * @param value to be stored
   */
  public set(generationHash: string, value: E): void {
    if (!generationHash) {
      throw Error("Generation hash must be provided!");
    }
    const map = this.delegate.get() || {};
    map[generationHash] = new NetworkBasedEntryModel(generationHash, value);
    this.delegate.set(map);
  }

  /**
   * Deletes the stored value for the given generation hash
   * @param generationHash the generation hash.
   */
  public remove(generationHash: string): void {
    const map = this.delegate.get() || {};
    delete map[generationHash];
    this.delegate.set(map);
  }
}
