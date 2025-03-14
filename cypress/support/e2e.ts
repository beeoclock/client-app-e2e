// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
import {AuthApi} from "./beeoclock/backend/auth/AuthApi";
// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-file-upload';
import {BackendCommonEnum} from "./beeoclock/backend/enum/BackendCommonEnum";

require('cypress-xpath');

/**
 * clear all storage and assign to global env valid token before any test
 */
before(() => {
    clearAllData();
    // deleteIndexDb();
    Cypress.on('uncaught:exception', (err) => {
        console.warn('Ignorowany błąd:', err.message);
        return false;
    });

    AuthApi.getToken().then(token => {
        Cypress.env('token', token);
    })
});

function deleteIndexDb() {
    indexedDB.deleteDatabase(BackendCommonEnum.X_Business_Tenant_Id + '-order');
    indexedDB.deleteDatabase(BackendCommonEnum.X_Business_Tenant_Id + '-absence');
}

function clearAllData() {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();
}