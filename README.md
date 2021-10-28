
<p align="center"><img src="https://dhealth.network/wp-content/uploads/2021/01/dHealth-Network-Logo-color-change.png"></p>

# dHealth Wallet API Bridge

[![npm-badge][npm-badge]][npm-url]
[![dl-badge][dl-badge]][npm-url]
[![License](https://img.shields.io/badge/License-LGPL%203.0%20only-blue.svg)](https://opensource.org/licenses/LGPL-3.0)

dHealth Wallet API Bridge is a Typescript SDK/API to permit the development of *plugins* for [dHealth Wallet][parent-url]. This bridge exports important classes such as `AppRoute` and is also used internally by the software itself.

- [Modules](#modules)
- [Licensing](#license)

## Modules

Following modules are defined and exported with this library:

| Class | Description |
| --- | --- |
| `AppRoute` | Interface that describes an application *route* using `vue-router`. This class also adds meta data fields to routes. |
| `RouteMeta` | Interface that describes meta data related to application routes. |
| `PluginBridge` | Namespace that describes the necessary types for bridging processes between your component(s) and the wallet. This namespace includes type definitions for `PluginSetting`, `PluginPermission`, `PluginStorage` and for `Component`s definitions. |
| `Transaction` | Enumeration that contains all Symbol transaction types (shim for SDK). |
| `ChainService` | Repository implementation for HTTP calls to /chain/ and /network/ API routes. |
| `AccountService` | Repositoriy implementation for HTTP calls to /accounts/ API routes. |
| `NodeService` | Repository implementation for HTTP calls to /node/ API routes. |

### Helpers

Following helpers are defined and exported with this library:

| Helper | Description |
| --- | --- |
| `getAccountAddress()` | Helper function to generate a formatted address by public key. |
| `getAccountBalance()` | Helper function to extract mosaic amounts. |
| `getNodeVersion()` | Transformer for semantic versioning of a node's version field. |

## License

Copyright 2021-present [Grégory Saive for dHealth Network][ref-ltd], All rights reserved.

Licensed under the [LGPL v3.0](LICENSE)

This project is sponsored by [UBC Digital Magazine][mag-url].

[ref-ltd]: https://dhealth.network
[mag-url]: https://ubc.digital
[parent-url]: https://github.com/dhealthproject/dhealth-wallet
[npm-url]: https://www.npmjs.com/package/@dhealth/wallet-api-bridge
[npm-badge]: https://img.shields.io/npm/v/@dhealth/wallet-api-bridge
[dl-badge]: https://img.shields.io/npm/dt/@dhealth/wallet-api-bridge
