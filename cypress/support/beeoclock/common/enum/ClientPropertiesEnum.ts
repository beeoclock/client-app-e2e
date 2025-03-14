require('dotenv').config();

export const ClientPropertiesEnum = {
    LOGIN: Cypress.env('LOGIN'),
    PASSWORD: Cypress.env('PASSWORD'),
    API_KEY: Cypress.env('API_KEY')
};
