/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// external dependencies
import { AccountDTO, Mosaic } from "symbol-openapi-typescript-fetch-client";
import { sha3_256 } from "js-sha3";
import RIPEMD160 from "ripemd160";
import * as base32 from "base32.js";

// internal dependencies
import { NetworkIdentifier } from "../types/NetworkIdentifier";

/**
 * Helper method to generate the address of an account
 * given its \a publicKey and a \a networkType network
 * identifier.
 *
 * @param   {string}              publicKey     The public key in hexadecimal format.
 * @param   {NetworkIdentifier}   networkType   The network identifier byte.
 * @returns {string}              The formatted base32 address.
 */
export const getAccountAddress = (
  publicKey: string,
  networkType: NetworkIdentifier = NetworkIdentifier.MAIN_NET
): string => {
  // formatting
  const uintNetwork = new Uint8Array(1);
  uintNetwork[0] = networkType;

  // (1) sha3-256 hash of public key
  // (2) ripeMD160 hash of public key hash
  const pubkeyHash = sha3_256(Buffer.from(publicKey, "hex"));
  const ripemdHash = new RIPEMD160()
    .update(Buffer.from(pubkeyHash, "hex"))
    .digest();

  // (3) concatenates (1) & (2)
  // 24 = ripemd160 + 1 + checksum
  const decodedAddr = Buffer.alloc(24);
  decodedAddr.set(uintNetwork, 0);
  decodedAddr.set(ripemdHash, 1);

  // (4) creates a checksum of 3 bytes
  // 21 = ripemd160 + 1
  const checksum = Buffer.from(sha3_256(decodedAddr.slice(0, 21)), "hex");

  // (5) appends the checksum to the address
  // 3 = checksum size ; 21 = ripemd160 + 1
  decodedAddr.set(checksum.slice(0, 3), 21);

  // (6) adds padding to address size
  // 39 = decoded address size
  const padded = Buffer.alloc(39 + 1);
  padded.set(decodedAddr);

  // (7) uses base32 encoding format
  return base32.encode(padded, { type: "rfc4648" }).substr(0, 39);
};

/**
 * Helper method to get the balance of an account for a specific
 * mosaic identifier.
 *
 * @param   {AccountDTO}  account
 * @param   {string}      mosaicId
 * @returns {Mosaic}
 */
export const getAccountBalance = (
  account: AccountDTO,
  mosaicId: string
): Mosaic => {
  if (!account.mosaics || !account.mosaics.length) {
    return { id: mosaicId, amount: "0" } as Mosaic;
  }

  const entry = account.mosaics.find((b) => b.id === mosaicId);

  if (undefined === entry) {
    return { id: mosaicId, amount: "0" } as Mosaic;
  }

  return entry;
};
