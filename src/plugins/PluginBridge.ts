/**
 * This file is part of YourDLT Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
import Vue, { ComponentOptions, AsyncComponent } from "vue";

export namespace PluginBridge {
  /**
   * @type {ScalarValueType}
   * @description This type is used internally to describe scalar
   * values and arrays of scalar values.
   */
  export type ScalarValueType =
    | string
    | boolean
    | number
    | string[]
    | boolean[]
    | number[]
    | undefined;

  /**
   * @type {Dictionary}
   * @description This type describes a generic dictionary of
   * objects of generic type T.
   */
  export type Dictionary<T> = { [key: string]: T };

  /**
   * @type {Component}
   * @description This type describes a Vue component.
   */
  export type Component = ComponentOptions<Vue> | typeof Vue | AsyncComponent;

  /**
   * @type {ComponentsDictionary}
   * @description This type describes a dictionary that contains
   * Vue components.
   */
  export type ComponentsDictionary = Dictionary<Component>;

  /**
   * @enum {PluginInstallStatus}
   * @description This type describes the installation status of
   * a plugin. Source code of the plugins is only interpreted at
   * enablement of plugins.
   */
  export enum PluginInstallStatus {
    Installed = "installed",
    Enabled = "enabled",
    Disabled = "disabled",
    Uninstalled = "uninstalled",
  }

  /**
   * @type {PackageAuthor}
   * @description This type is used internally to describe plugin
   * authors as formatted inside `package.json` files.
   */
  export type PackageAuthor = {
    name?: string;
    email?: string;
    url?: string;
  };

  /**
   * @type {PackageRepository}
   * @description This type is used internally to describe plugin
   * source code repositories as formatted inside `package.json`
   * files.
   */
  export type PackageRepository = {
    type?: string;
    url?: string;
  };

  /**
   * @type {PackageDependencies}
   * @description This type is used internally to describe plugin
   * dependencies as formatted inside `package.json` files.
   */
  export type PackageDependencies = {
    [npmModule: string]: string;
  };

  /**
   * @type {PluginSetting}
   * @description This type describes custom plugin settings that
   * are added when a plugin is enabled.
   */
  export type PluginSetting = {
    [name: string]: ScalarValueType;
  };

  /**
   * @enum {PluginPermissionType}
   * @description This type describes the type of permission that
   * is requested with a {PluginPermissions} entry. Permissions can
   * be related to Vuex store getter, actions and mutations but also
   * to in-app settings or plugin settings.
   */
  export enum PluginPermissionType {
    Getter = "getter",
    Action = "action",
    Mutation = "mutation",
    Setting = "setting",
  }

  /**
   * @type {PluginPermission}
   * @description This type describe a plugin permission request with
   * a `name` and `type` which is related to a `target` field and has
   * a `description` for developers to provide more information about
   * the intended *use* of the target object/entity/routine.
   */
  export type PluginPermission = {
    name: string;
    type: PluginPermissionType;
    target: string;
    description: string;
  };

  /**
   * @type {PluginStorage}
   * @description This type describe a plugin storage (database table).
   * Plugins can define custom database tables by extending the class
   * {VersionedObjectStorage}.
   */
  export type PluginStorage = {
    storageKey: string;
    primaryKey: string;
    description: string;
  };

  /**
   * @function {StoreActionRequest()}
   * @description This function tries to dispatch a Vuex Store action
   * \a target using \a $store if provided and using the IPC renderer
   * otherwise by sending an `onPluginActionRequest` event.
   *
   * @param   {string}      target    The Vuex store namespaced action name.
   * @param   {any}         args      (Optional) The action arguments.
   * @param   {Vuex.Store}  $store    (Optional) The Vuex store instance.
   * @returns {any}                   The resulting store action response.
   * @throws  {Error} On undefined store instance.
   */
  export const StoreActionRequest = (
    plugin: string,
    type: PluginPermissionType,
    target: string,
    args: any = undefined,
    $store: any = undefined
  ): any => {
    // explicit store prevails (using potential "in-plugin" vuex store)
    if (!!$store && "dispatch" in $store && "getters" in $store) {
      if (type === PluginPermissionType.Getter) {
        return $store.getters[target];
      } else if (type === PluginPermissionType.Action) {
        return $store.dispatch(target, args);
      } else if (type === PluginPermissionType.Mutation) {
        return $store.commit(target, args);
      }

      throw new Error(
        `PluginBridge is unable to handle ${type.toString()} requests.`
      );
    }
    // IPC synchronous communication
    else if (!!window && "electron" in window) {
      return new Promise((resolve, reject) => {
        // used as a marker to cancel timeout
        let resolved = undefined;

        // Callback handler for response resolver
        let onResponseResolver = (event, data) => {
          // console.log(
          //   `[DEBUG][PluginBridge.ts] received onPluginActionResponse with ${data} from renderer process`
          // );
          window["electron"]["ipcRenderer"].removeListener(
            "onPluginActionResponse",
            onResponseResolver,
          );

          resolved = true;
          resolve(JSON.parse(!!data && data.length ? data : "{}"));
        };

        // Listen for App to Plugin communication (RESPONSE)
        window["electron"]["ipcRenderer"].once(
          "onPluginActionResponse",
          onResponseResolver
        );

        // Trigger Plugin to App communication (REQUEST)
        window["electron"]["ipcRenderer"].send(
          "onPluginActionRequest",
          JSON.stringify({
            plugin,
            type,
            action: target,
            args: args,
          })
        );

        // registers a timeout handler after 10 seconds
        setTimeout(() => {
          if (!!resolved) {
            return true;
          }

          return reject(
            `PluginBridge is unable to provide a response for action '${target}'. Listener timed out (10 seconds)`
          );
        }, 10000);
      });
    }

    // Unable to dispatch action
    throw new Error(`PluginBridge is unable to dispatch action '${target}'`);
  };
}
