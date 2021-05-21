/**
 * This file is part of YourDLT Wallet API Bridge shared under AGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     AGPL-3.0
 */
/**
 * Metadata added to Vue Router routes
 * @interface RouteMeta
 */
export interface RouteMeta {
    /**
     * Authentication required
     * @type {boolean}
     */
    protected: boolean;
    /**
     * Localized route name shown in the view
     * @type {string}
     */
    title?: string;
    clickable?: boolean;
    isLedger?: boolean;
    icon?: unknown;
    active?: boolean;
    nextPage?: string;
    hideFromMenu?: boolean;
}
