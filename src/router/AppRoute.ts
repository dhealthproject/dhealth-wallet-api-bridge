/**
 * This file is part of YourDLT Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// external dependencies
import Vue, { ComponentOptions, AsyncComponent } from "vue";
import RouteRecordPublic from "vue-router";

import { RouteMeta } from "./RouteMeta";

export type Component = ComponentOptions<Vue> | typeof Vue | AsyncComponent;
export type Dictionary<T> = { [key: string]: T };

/**
 * Vue Router route extension
 * @interface AppRoute
 * @extends {RouteRecordPublic}
 */
export interface AppRoute extends RouteRecordPublic {
  name: string;
  meta: RouteMeta;
  path: string;
  children?: AppRoute[];
  components: Dictionary<Component>;
  instances: Dictionary<Vue>;
  props:
    | boolean
    | Record<string, any>
    | Dictionary<boolean | Record<string, any>>;
}
