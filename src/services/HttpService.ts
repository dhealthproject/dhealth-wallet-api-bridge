/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// external dependencies
const axios = require('axios').default;

/**
 * Service that abstracts out calls to HTTP/JSON APIs.
 * @export
 * @class {HttpService}
 */
export abstract class HttpService {

  /**
   * Wraps a network node URL and fixes protocol
   * and port. Compatible with HTTPS coupled to
   * port 3001 (dHealth Testnet).
   *
   * @param   {string}  nodeUrl 
   * @returns {string}
   */
  protected wrapURL(
    nodeUrl: string
  ): string {
    // fixes missing scheme
    let fixedUrl = -1 === nodeUrl.indexOf('://') ? 'http://' + nodeUrl : nodeUrl;

    let port = '3000';
    if (0 === nodeUrl.indexOf('https://')) {
      port = '3001';
    }

    // fixes missing port
    fixedUrl = !fixedUrl.match(/https?:\/\/[^:]+:([0-9]+)\/?$/)
      ? fixedUrl + ':' + port // default adds :3000 / https adds :3001
      : fixedUrl;

    return fixedUrl;
  }

  /**
   * Wraps an API call and resolves a **parsed**
   * JSON representation.
   *
   * @param   {string}  method  An HTTP method (get, post, delete).
   * @param   {string}  url     An endpoint's full URL representation.
   * @returns {Promise<any>}    A **parsed** JSON representation (Object).
   */
  protected __callAPI(
    method: string,
    url: string,
    endpoint: string,
    params: any = {},
  ): Promise<any> {
    return new Promise((resolve) => {
      const endpointUrl = this.wrapURL(url) + `/${endpoint.replace(/^\//, '')}`;
      axios[method](endpointUrl, params).then(
        (res) => resolve(res.data)
      );
    });
  }
}
