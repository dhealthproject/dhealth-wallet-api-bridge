/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
import { IStorage } from "./IStorage";
import { VersionedModel } from "./VersionedModel";
import { SimpleObjectStorage } from "./SimpleObjectStorage";

/**
 * The operation to migrate the data.
 */
export interface Migration {
  readonly description: string;

  migrate(from: any): any;
}

/**
 * A storage that wraps the stored model with a {version: n, data:T} object and it handles the migration from old
 * version to new versions.
 *
 */
export class VersionedObjectStorage<E> implements IStorage<E> {
  private readonly delegate: IStorage<VersionedModel<E>>;

  private readonly currentVersion: number;

  constructor({
    delegate,
    storageKey,
    migrations = [],
  }: {
    delegate?: IStorage<VersionedModel<E>>;
    storageKey?: string;
    migrations?: Migration[];
  }) {
    if (!delegate && !storageKey) {
      throw new Error("delegate or storage key must be provided!");
    }
    this.delegate =
      delegate || new SimpleObjectStorage<VersionedModel<E>>(storageKey);
    this.currentVersion = migrations.length + 1;
    const versioned = this.delegate.get();
    if (!versioned || versioned.version == this.currentVersion) {
      return;
    }
    if (versioned.version > this.currentVersion) {
      throw new Error(
        `Current data version is ${versioned.version} but higher version is ${this.currentVersion}`
      );
    }
    const value = migrations
      .slice(versioned.version - 1)
      .reduce((toMigrateData, migration) => {
        if (toMigrateData === undefined) {
          console.log(
            `data to migrate is undefined, ignoring migration ${migration.description}`
          );
          return undefined;
        }
        console.log(`Applying migration ${migration.description}`);
        return migration.migrate(toMigrateData);
      }, versioned.data);
    if (value === undefined) {
      this.remove();
    } else {
      this.set(value);
    }
  }

  get(): E | undefined {
    const versioned = this.delegate.get();
    return (versioned && versioned.data) || undefined;
  }

  remove(): void {
    this.delegate.remove();
  }

  set(value: E): void {
    this.delegate.set(new VersionedModel<E>(this.currentVersion, value));
  }

  getVersion(): E | number {
    const versioned = this.delegate.get();
    return (versioned && versioned.version) || undefined;
  }
}
