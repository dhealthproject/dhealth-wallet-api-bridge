/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// internal dependencies
import { LocalStorageBackend } from "@/database/LocalStorageBackend";

describe('database/LocalStorageBackend --->', () => {
    let localStorage = window['localStorage'],
        backend = new LocalStorageBackend();

    beforeEach(() => {
        localStorage.clear();
    });

    describe('get length', () => {
        it('should return 0 given empty localStorage', () => {
            const len = backend.length;
            expect(len).toEqual(0);
        });

        it('should return correct size given multiple items', () => {
            backend.setItem('test', 'value');
            backend.setItem('test2', 'value2');
            backend.setItem('test3', 'value3');
            const len = backend.length;
            expect(len).toEqual(3);
        });

        it('should return correct size given multiple items after removal', () => {
            backend.setItem('test', 'value');
            backend.setItem('test2', 'value2');
            backend.setItem('test3', 'value3');
            backend.removeItem('test2');
            backend.removeItem('test3');
            const len = backend.length;
            expect(len).toEqual(1);
        });
    });

    describe('isAvailable()', () => {
        it('should return true given empty localStorage', () => {
            expect(backend.isAvailable()).toEqual(true);
        });
    });

    describe('setItem()', () => {
        it('should set item on localStorage instance', () => {
            backend.setItem('test', 'value');
            expect(localStorage.getItem('test')).toEqual('value');
        });

        it('should set multiple items on localStorage instance', () => {
            backend.setItem('test', 'value');
            backend.setItem('test2', 'value2');
            backend.setItem('test3', 'value3');
            expect(localStorage.getItem('test')).toEqual('value');
            expect(localStorage.getItem('test2')).toEqual('value2');
            expect(localStorage.getItem('test3')).toEqual('value3');
        });
    });

    describe('getItem()', () => {
        it('should get item from localStorage instance', () => {
            localStorage.setItem('test', 'value');
            const item = backend.getItem('test');
            expect(item).toEqual('value');
        });

        it('should get correct item from localStorage instance', () => {
            localStorage.setItem('test', 'value');
            localStorage.setItem('test2', 'value2');
            const item1 = backend.getItem('test');
            const item2 = backend.getItem('test2');
            expect(item1).toEqual('value');
            expect(item2).toEqual('value2');
        });
    });

    describe('removeItem()', () => {
        it('should remove item from localStorage instance', () => {
            localStorage.setItem('test', 'value');
            backend.removeItem('test');
            expect(localStorage.getItem('test')).toBeNull();
        });
    });
});
