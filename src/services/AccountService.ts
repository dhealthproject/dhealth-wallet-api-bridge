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
  AccountInfoDTO,
  AccountInfoDTOFromJSON,
} from "symbol-openapi-typescript-fetch-client";

// internal dependencies
import { HttpService } from "./HttpService";

/**
 * Account service to handle remote calls
 * @export
 * @class {AccountService}
 */
export class AccountService extends HttpService {
  constructor() {
    super();
  }

  /**
   * Connects to a node by \a nodeUrl and requests
   * account information using endpoint `/accounts/X`.
   *
   * @param   {string}  nodeUrl     The URL of the node.
   * @param   {string}  accountId   Address or public key.
   * @returns {Promise<GenericDTOModel>}  Parsed JSON response as an object.
   */
  public getAccountInfo(
    nodeUrl: string,
    accountId: string
  ): Promise<AccountInfoDTO> {
    return new Promise((resolve) => {
      this.__callAPI(
        "get",
        nodeUrl,
        "/accounts/" + accountId
      ).then((rawInfo: any) => resolve(AccountInfoDTOFromJSON(rawInfo)));
    });
  }

  /**
   * Connects to a node by \a nodeUrl and requests
   * accounts information using endpoint `/accounts`.
   *
   * @param   {string}  nodeUrl     The URL of the node.
   * @param   {string}  accountIds  Addresses or public keys.
   * @returns {Promise<GenericDTOModel>}  Parsed JSON response as an object.
   */
  public getAccountsInfo(
    nodeUrl: string,
    accountIds: string[],
    idTypes: "publicKeys" | "addresses" = "publicKeys"
  ): Promise<AccountInfoDTO[]> {
    const opts = {};
    opts[idTypes] = accountIds;
    return new Promise((resolve) => {
      this.__callAPI(
        "post",
        nodeUrl,
        "/accounts",
        opts
      ).then((rawAccounts: any) =>
        resolve(rawAccounts.map((a) => AccountInfoDTOFromJSON(a)))
      );
    });
  }
}
