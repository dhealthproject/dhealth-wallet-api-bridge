
<p align="center"><img src="https://yourdlt.tools/logo-yourdlt-192x192.png" width="250"></p>

# YourDLT Wallet API Bridge

[![npm-badge][npm-badge]][npm-url]
[![dl-badge][dl-badge]][npm-url]
[![License](https://img.shields.io/badge/License-LGPL%203.0%20only-blue.svg)](https://opensource.org/licenses/LGPL-3.0)

YourDLT Wallet API Bridge is a Typescript SDK/API to permit the development of *plugins* for [YourDLT Wallet][parent-url]. This bridge exports important classes such as `AppRoute` and is also used internally by the software itself.

- [Modules](#modules)
- [Sponsor Us](#sponsor-us)
- [Disclaimer](#disclaimer)
- [Licensing](#license)

## Modules

Following modules are defined and exported with this library:

| Class | Description |
| --- | --- |
| `AppRoute` | Interface that describes an application *route* using `vue-router`. This class also adds meta data fields to routes. |
| `RouteMeta` | Interface that describes meta data related to application routes. |
| `PluginBridge` | Namespace that describes the necessary types for bridging processes between your component(s) and the wallet. This namespace includes type definitions for `PluginSetting`, `PluginPermission`, `PluginStorage` and for `Component`s definitions. |
| `Transaction` | Enumeration that contains all Symbol transaction types (shim for SDK). |

## Sponsor us

| Platform | Sponsor Link |
| --- | --- |
| Paypal | [https://paypal.me/usingblockchainltd](https://paypal.me/usingblockchainltd) |
| Patreon | [https://patreon.com/usingblockchainltd](https://patreon.com/usingblockchainltd) |
| Github | [https://github.com/sponsors/UsingBlockchain](https://github.com/sponsors/UsingBlockchain) |
| :coffee: :coffee: :coffee: | [https://www.buymeacoffee.com/UBCDigital](https://www.buymeacoffee.com/UBCDigital) |

This project is sponsored by [UBC Digital Magazine][mag-url].

## Disclaimer

  *The author of this package cannot be held responsible for any loss of money or any malintentioned usage forms of this package. Please use this package with caution.*

  *Our software contains links to the websites of third parties (“external links”). As the content of these websites is not under our control, we cannot assume any liability for such external content. In all cases, the provider of information of the linked websites is liable for the content and accuracy of the information provided. At the point in time when the links were placed, no infringements of the law were recognisable to us..*

## License

Copyright 2021-present [Using Blockchain Ltd][ref-ltd], All rights reserved.

Licensed under the [LGPL v3.0](LICENSE)

[ref-ltd]: https://using-blockchain.org
[mag-url]: https://ubc.digital
[parent-url]: https://github.com/UsingBlockchain/yourdlt-wallet
[npm-url]: https://www.npmjs.com/package/@yourdlt/wallet-api-bridge
[npm-badge]: https://img.shields.io/npm/v/@yourdlt/wallet-api-bridge
[dl-badge]: https://img.shields.io/npm/dt/@yourdlt/wallet-api-bridge
