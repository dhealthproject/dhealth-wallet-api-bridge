/**
 * This file is part of YourDLT Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

// internal dependencies
import { PluginBridge } from "@/plugins/PluginBridge";

const localVue = createLocalVue();
localVue.use(Vuex);

const $fakeStore = new Vuex.Store({
    state: {
        testKey: true,
        testKey2: false,
    },
    mutations: {
        testKey: (state, val) => state.testKey = val,
        testKey2: (state, val) => state.testKey2 = val,
    },
    actions: {},
    getters: {
        testKey: (state: any) => state.testKey,
        testKey2: (state: any) => state.testKey2,
    },
});

describe('plugins/PluginBridge --->', () => {
    describe('StoreActionRequest() using Vuex.Store', () => {
        it('should use store instance given Vuex Store', () => {
            const request = PluginBridge.StoreActionRequest(
                'noPlugin',
                PluginBridge.PluginPermissionType.Getter,
                'testKey',
                undefined,
                $fakeStore,
            );

            expect(request).toEqual(true);
        });

        it('should use correct getter given Vuex Store', () => {
            const request = PluginBridge.StoreActionRequest(
                'noPlugin',
                PluginBridge.PluginPermissionType.Getter,
                'testKey2',
                undefined,
                $fakeStore,
            );

            expect(request).toEqual(false);
        });

        it('should mutate state given mutation call', () => {
            const request = PluginBridge.StoreActionRequest(
                'noPlugin',
                PluginBridge.PluginPermissionType.Mutation,
                'testKey2',
                123,
                $fakeStore,
            );

            expect($fakeStore.getters['testKey2']).toEqual(123);
        });
    });

    describe('StoreActionRequest() using electron.ipcRenderer', () => {
        beforeEach(() => {
            // mock electron ipcRenderer
            window['electron'] = {
                ipcRenderer: {
                    once: jest.fn(),
                    send: jest.fn(),
                }
            };
        });

        it('should use ipcRenderer instance given no Vuex Store', () => {
            const request = PluginBridge.StoreActionRequest(
                'noPlugin',
                PluginBridge.PluginPermissionType.Getter,
                'testKey',
                undefined,
            );

            expect(window['electron']['ipcRenderer'].once).toHaveBeenCalled();
            expect(window['electron']['ipcRenderer'].send).toHaveBeenCalledWith('onPluginActionRequest', JSON.stringify({
                plugin: 'noPlugin',
                type: PluginBridge.PluginPermissionType.Getter,
                action: 'testKey',
                args: undefined
            }));
        });
    });

    describe('AccountRequest()', () => {
        beforeEach(() => {
            // mock electron ipcRenderer
            window['electron'] = {
                ipcRenderer: {
                    once: jest.fn(),
                }
            };
        });

        it('should use ipcRenderer instance', () => {
            const request = PluginBridge.AccountRequest();
            expect(window['electron']['ipcRenderer'].once).toHaveBeenCalledTimes(1);
        });
    });
});
