/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
/**
 * Internal function to generate up to 4 bytes randomly.
 *
 * @internal
 * @param    {number}   len
 * @returns  {string}
 */
const prngBytes = (len: number = 4): string =>
  Math.random()
    .toString(16)
    .substr(2, Math.ceil(len * 2));

/**
 * This function can be used to generate \a length number
 * of random bytes.
 *
 * @param   {number}    length
 * @returns {string}
 */
export const randomBytes = (length: number): string => {
  if (length <= 4) {
    return prngBytes(length);
  }

  const n = Math.ceil(length / 4);
  let o = "";
  for (let i = 0; i < n; i++) {
    o = o + prngBytes();
  }
  return o;
};

/**
 * This function can be used to convert \a str UTF-8 string
 * to its hexadecimal notation.
 *
 * @param   {string}    str
 * @returns {string}
 */
export const utf8ToHex = (str: string): string => {
  let hex = "";
  for (let i = 0; i < str.length; i++) {
    hex += "" + str.charCodeAt(i).toString(16);
  }
  return hex;
};
