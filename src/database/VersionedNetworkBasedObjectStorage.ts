/**
 * This file is part of YourDLT Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
import { INetworkBasedStorage } from "./INetworkBasedStorage";
import { NetworkBasedObjectStorage } from "./NetworkBasedObjectStorage";
import { Migration, VersionedObjectStorage } from "./VersionedObjectStorage";
import { NetworkBasedModel } from "./NetworkBasedModel";

/**
 * A storage that wraps the stored model with a {version: n, data:T} object and it handles the migration from old
 * version to new versions.
 *
 */
export class VersionedNetworkBasedObjectStorage<E>
  extends NetworkBasedObjectStorage<E>
  implements INetworkBasedStorage<E> {
  constructor(storageKey: string, migrations: Migration[] = []) {
    super(
      new VersionedObjectStorage<NetworkBasedModel<E>>({
        storageKey: storageKey,
        migrations: migrations,
      })
    );
  }
}
