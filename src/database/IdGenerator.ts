/**
 * This file is part of YourDLT Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
import { sha3_512 } from "js-sha3";

// internal dependencies
import { randomBytes, utf8ToHex } from "../utilities/Utilities";

/**
 * This function generates a random identifier, by default using
 * a length of 8 characters in hexadecimal format.
 *
 * @param   {number}  length
 * @returns {string}
 */
export const RandomIdGenerator = (length: number = 8): string => {
  const id = randomBytes(length);
  return sha3_512(utf8ToHex(id)).substr(0, length);
};

/**
 * This function generates a deterministic identifier by hashing
 * the input \a object using a 8-byte random seed,  the object's
 * JSON representation with SHA3-512 resulting in a 64-bytes hash.
 *
 * @param   {any}   object
 * @returns {string}
 */
export const DeterministicIdGenerator = (object: any): string => {
  const raw = {
    ...{
      time: new Date().valueOf(),
      seed: randomBytes(8),
    },
    ...(object || {}),
  };

  const json = JSON.stringify(raw);

  // hash hexadecimal format
  return sha3_512(utf8ToHex(json));
};
