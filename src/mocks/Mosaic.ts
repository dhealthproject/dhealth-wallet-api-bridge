/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// external dependencies
import {
  Mosaic,
  MosaicFromJSON,
  MosaicInfoDTO,
  MosaicInfoDTOFromJSON,
} from "symbol-openapi-typescript-fetch-client";

export const MockBalanceDTO: Mosaic = MosaicFromJSON({
  id: "39E0C49FA322A459",
  amount: "2510908000",
});

export const MockMosaicInfoDTO: MosaicInfoDTO = MosaicInfoDTOFromJSON({
  mosaic: {
    version: 1,
    id: "39E0C49FA322A459",
    supply: "1239466400000000",
    startHeight: "1",
    ownerAddress: "68CEF127D7E57F5CA854A6437DA69D80DE87054711918858",
    revision: 1,
    flags: 2,
    divisibility: 6,
    duration: "0",
  },
  id: "60613E35366FC300848ABA08",
});
