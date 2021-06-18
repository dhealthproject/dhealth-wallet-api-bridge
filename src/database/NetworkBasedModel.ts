/**
 * This file is part of YourDLT Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
import { NetworkBasedEntryModel } from "./NetworkBasedEntryModel";

/**
 * A model that store some generic value based on the generation hash.
 */
export type NetworkBasedModel<E> = Record<string, NetworkBasedEntryModel<E>>;
