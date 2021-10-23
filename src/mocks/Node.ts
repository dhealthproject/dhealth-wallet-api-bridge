/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
export const MockNodeInfoDTO = {
  "version": 16777216,
  "publicKey": "5172C98BD61DF32F447C501DE8090A9D7096F9E71975D788D67F7A82B8C04EFA",
  "networkGenerationHashSeed": "ED5761EA890A096C50D3F50B7C2F0CCB4B84AFC9EA870F381E84DDE36D04EF16",
  "roles": 7,
  "port": 7900,
  "networkIdentifier": 104,
  "host": "dual-01.dhealth.cloud",
  "friendlyName": "dhealth-dual-01",
  "nodePublicKey": "1448AE052B6D032B0CF4DC2B53B98C7A03FF2A4EF3781C9137F9857FD2D28E72"
};

export const MockNodePeersDTO = [
  {
    "version": 16777216,
    "publicKey": "C52004D159F747655B98E77181D4B39222AA596F3F27700A3E5F371996576F49",
    "networkGenerationHashSeed": "ED5761EA890A096C50D3F50B7C2F0CCB4B84AFC9EA870F381E84DDE36D04EF16",
    "roles": 3,
    "port": 7900,
    "networkIdentifier": 104,
    "host": "dhealth.roche.com",
    "friendlyName": "dhealth.roche.com"
  },
  {
    "version": 16777216,
    "publicKey": "482C346C1D99901654B38A45D2E48A102EEC311B6C6A3A5A21923DA013944A65",
    "networkGenerationHashSeed": "ED5761EA890A096C50D3F50B7C2F0CCB4B84AFC9EA870F381E84DDE36D04EF16",
    "roles": 7,
    "port": 7900,
    "networkIdentifier": 104,
    "host": "dhealth-02.symbol.ninja",
    "friendlyName": "nYnja-002"
  },
  {
    "version": 16777216,
    "publicKey": "3EB09E62CDDF9A48ADB9B576A5378E64AB012F39E8C53F7B04A447C0858B8B6F",
    "networkGenerationHashSeed": "ED5761EA890A096C50D3F50B7C2F0CCB4B84AFC9EA870F381E84DDE36D04EF16",
    "roles": 4,
    "port": 7900,
    "networkIdentifier": 104,
    "host": "voter-02.dhealth.cloud",
    "friendlyName": "dhealth-voter-02"
  }
];

export const MockNodeHealthDTO = {
  "status": {
    "apiNode": "up",
    "db": "up"
  }
};
