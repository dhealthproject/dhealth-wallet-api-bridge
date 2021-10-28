/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
/**
 * List of trusted [known] mosaic identifiers.
 * @var {[id: string]: string}
 */
export const KNOWN_MOSAICS: { [id: string]: string } = {
  "39E0C49FA322A459": "dhealth.dhp",
  "5A4935C1D66E6AC4": "dhealth.dhp (Test)",
  "6BED913FA20223F8": "symbol.xym",
};

/**
 * Helper method to get the name of a mosaic on the network.
 *
 * @param   {string}  mosaicId
 * @returns {string}
 */
export const getMosaicName = (mosaicId: string): string => {
  if (mosaicId in KNOWN_MOSAICS) {
    return KNOWN_MOSAICS[mosaicId];
  }

  //XXX potential network request to /mosaic/names

  return mosaicId;
};
