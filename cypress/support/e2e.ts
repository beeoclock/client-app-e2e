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
require('cypress-xpath');

// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-file-upload';

before(() => {
    clearAllData();
});

function clearAllData() {
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.window().then((win) => {
        if (win.caches) {
            win.caches.keys().then((cacheNames) => {
                cacheNames.forEach((cacheName) => {
                    win.caches.delete(cacheName);
                });
            });
        }
        win.sessionStorage.clear();
    });
}