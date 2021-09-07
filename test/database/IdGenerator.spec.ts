/**
 * This file is part of YourDLT Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// internal dependencies
import { DEFAULT_ID_LENGTH, RandomIdGenerator, DeterministicIdGenerator } from "@/database/IdGenerator";

describe('database/IdGenerator --->', () => {
    describe('RandomIdGenerator ->', () => {
        it('should generate identifier with default size given no size', () => {
            const id = RandomIdGenerator();
            expect(id.length).toEqual(DEFAULT_ID_LENGTH);
        });

        it('should generate identifier with correct size given valid size', () => {
            const size = 4;
            const id = RandomIdGenerator(size);
            expect(id.length).toEqual(size);
        });

        it('should generate different identifiers with correct size', () => {
            const size = 8;
            const id1 = RandomIdGenerator(size);
            const id2 = RandomIdGenerator(size);
            expect(id1.length).toEqual(size);
            expect(id2.length).toEqual(size);

            // should not be equal, should not be identical
            expect(id1 == id2).toEqual(false);
            expect(id1 === id2).toEqual(false);
        });
    });

    describe('DeterministicIdGenerator ->', () => {
        let instance;
        beforeEach(() => {
            instance = {
                key: 'value',
                name: 'Field',
            };
        });

        it('should generate identifier with correct size', () => {
            const payload = DeterministicIdGenerator(instance);
            expect(payload.identifier.length).toEqual(128);
        });

        it('should generate correct identifier for instance given seed', () => {
            const payload1 = DeterministicIdGenerator(instance);
            const payload2 = DeterministicIdGenerator(instance, payload1.seed);
            expect(payload1.identifier.length).toEqual(128);
            expect(payload2.identifier.length).toEqual(128);

            // should not be equal, should not be identical
            expect(payload1.identifier == payload2.identifier).toEqual(true);
            expect(payload1.identifier === payload2.identifier).toEqual(true);
        });

        it('should generate different identifier for instance given random seeds', () => {
            const payload1 = DeterministicIdGenerator(instance);
            const payload2 = DeterministicIdGenerator(instance);
            expect(payload1.identifier.length).toEqual(128);
            expect(payload2.identifier.length).toEqual(128);

            // should not be equal, should not be identical
            expect(payload1.identifier == payload2.identifier).toEqual(false);
            expect(payload1.identifier === payload2.identifier).toEqual(false);
        });

        it('should generate different identifier for instance given different seeds', () => {
            const payload1 = DeterministicIdGenerator(instance, '1234567890');
            const payload2 = DeterministicIdGenerator(instance, '0987654321');
            expect(payload1.identifier.length).toEqual(128);
            expect(payload2.identifier.length).toEqual(128);

            // should not be equal, should not be identical
            expect(payload1.identifier == payload2.identifier).toEqual(false);
            expect(payload1.identifier === payload2.identifier).toEqual(false);
        });

        it('should generate identical identifier for instance given same seed twice', () => {
            const payload1 = DeterministicIdGenerator(instance, '1234567890');
            const payload2 = DeterministicIdGenerator(instance, '1234567890');
            expect(payload1.identifier.length).toEqual(128);
            expect(payload2.identifier.length).toEqual(128);

            // should not be equal, should not be identical
            expect(payload1.identifier == payload2.identifier).toEqual(true);
            expect(payload1.identifier === payload2.identifier).toEqual(true);
        });
    });
});
