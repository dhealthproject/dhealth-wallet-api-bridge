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
  BlockInfoDTO,
  BlockInfoDTOFromJSON,
} from "symbol-openapi-typescript-fetch-client";

export const MockBlockInfoDTO: BlockInfoDTO = BlockInfoDTOFromJSON({
  meta: {
    hash: "5352C1AE7BDA5BD5ADDB2906D058833F7D31BD0284C0B2CA485E5E2E7F914B54",
    generationHash:
      "F6EA5783105DCD7B12657D1E47C6F504BAFE6EE232179757257595AC7929E695",
    totalFee: "0",
    totalTransactionsCount: 0,
    stateHashSubCacheMerkleRoots: [
      "D089216D6667261D230998E09B39DFF184B1C3B0511E559B751C74F3816049CB",
      "026683317F30771E7CCE5A04AE59F4339D2FDEBD72516E54361C97DD8CF278EB",
      "38FF06F84D6D6CE2E3DC735B21BCE2F1AE7F7F25C69CFE62AF087B605ABD6F0F",
      "ADEA1DFC9444874871FB78C8C400C9F31B65C64F4064C8F5B7CF93ABEEBD9846",
      "0000000000000000000000000000000000000000000000000000000000000000",
      "0000000000000000000000000000000000000000000000000000000000000000",
      "0000000000000000000000000000000000000000000000000000000000000000",
      "0000000000000000000000000000000000000000000000000000000000000000",
      "0CFBF4327A2B2EFC53F1A4CDDFF4500CFAABD29C847884766CFE67F78E6270D1",
    ],
    transactionsCount: 0,
    statementsCount: 1,
  },
  block: {
    size: 376,
    signature:
      "26A60490000F60BDCC080AFEF00A2DFF9EEC266E633F116E53BCBBBBCA032BD51EA744F10CB2776617A3794D2EF110253F8DCF6EDE5B57101C741A2EFB2AF208",
    signerPublicKey:
      "6B5C2A0CF5591E3AB0BB29B6CF4EEC3A4AA80BCA8B0A17B9E51F830FC4103C4A",
    version: 1,
    network: 104,
    type: 33091,
    height: "290888",
    timestamp: "8735025953",
    difficulty: "83238788763560",
    proofGamma:
      "BD5BBAC12D96E80CB1F33BD726F541F048AAC2E7C7B914670E7A2D9C9B4FDC83",
    proofVerificationHash: "75D55356FFCC4821836ABC54D9451678",
    proofScalar:
      "54F23278A1A8372952E71D1FC0F1A3B88F0A05F3FF269DE53751F5DC5C68190D",
    previousBlockHash:
      "25C2E378B4B152F22668613D920316A52E66B2627AA3BEB74C624418D8838A04",
    transactionsHash:
      "0000000000000000000000000000000000000000000000000000000000000000",
    receiptsHash:
      "A4AF727EAE775C78D5F015E3A12EECCCFAA8E5BA00D2A4E0FE990ACFFFF7F61E",
    stateHash:
      "28AAA53732FF1DE1E751ECBB4765DDBBE894DC03F2322574ACD9DE5B22FA4716",
    beneficiaryAddress: "689CC95B09E93D68C2BF3056712113182A3CC3A723309AF9",
    feeMultiplier: 0,
  },
  id: "60E66B0F6D6DB0735E216C8F",
});
