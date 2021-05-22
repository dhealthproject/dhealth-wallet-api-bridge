/**
 * This file is part of YourDLT Wallet API Bridge shared under AGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     AGPL-3.0
 */
import Vue from 'vue';

/// region interfaces
export { RouteMeta } from './router/RouteMeta'
export { AppRoute } from './router/AppRoute'
/// end-region interfaces

/// region plugin bus (events propagated on parallel thread)
/**
 * This bus can channel any event. The software application
 * makes use of this bus to propagate the `onPluginsReady`
 * event.
 *
 * This bus is intentionally *shared* as to provide with an
 * extensible and common event stream for all plugins of the
 * software application.
 *
 * @type {Vue}
 */
 export const $pluginBus = new Vue();
 /// end-region event bus