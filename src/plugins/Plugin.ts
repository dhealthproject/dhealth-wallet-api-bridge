/**
 * This file is part of YourDLT Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
import { AppRoute } from "../router/AppRoute";
import { PluginBridge as Bridge } from "./PluginBridge";

export interface Plugin {
  /**
   * @description The entry point or main view component.
   */
  view: string;

  /**
   * @description The list of routes added by this plugin.
   */
  routes: AppRoute[];

  /**
   * @description The list of Vue components added by this plugin.
   */
  components: Bridge.ComponentsDictionary;

  /**
   * @description The list of storages added by this plugin.
   */
  storages: Bridge.PluginStorage[];

  /**
   * @description The list of settings added by this plugin.
   */
  settings: Bridge.PluginSetting[];

  /**
   * @description The list of permissions requested by this plugin.
   */
  permissions: Bridge.PluginPermission[];
}
