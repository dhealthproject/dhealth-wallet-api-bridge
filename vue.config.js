/**
 * This file is part of YourDLT Wallet API Bridge shared under AGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
 module.exports = {
  css: { extract: false },
  configureWebpack: {
    // No need for splitting
    optimization: {
      splitChunks: false
    }
  }
}
