import {DateUtils} from "../../backend/Utils/DateUtils";
import {EntryPointEnum} from "./EntryPointEnum";

export class ApiInterceptionHelper {

    public static waitForAlias(alias: string): void {
        cy.wait('@' + alias);
    }

    public static waitFor201Alias(alias: string): void {
        cy.wait('@' + alias).its('response.statusCode').should('eq', 201);
    }

    public static getService(): string {
        const alias = 'getAdditionalFields' + DateUtils.getCurrentTime();
        cy.intercept('GET', EntryPointEnum.API_ENTRY_POINT + '/service/paged?*').as(alias);
        return alias
    }

    public static createServicePayment(): string {
        const createPayment = 'createPayment' + DateUtils.getCurrentTime();
        cy.intercept('POST', EntryPointEnum.API_ENTRY_POINT + '/payment').as(createPayment);
        return createPayment
    }

    public static createOrder(): string {
        const createOrder = 'createOrder' + DateUtils.getCurrentTime();
        cy.intercept('POST', EntryPointEnum.API_ENTRY_POINT + '/order').as(createOrder);
        return createOrder
    }

    public static getOrder(): string {
        const getOrder = 'getOrder' + DateUtils.getCurrentTime();
        cy.intercept('GET', EntryPointEnum.API_ENTRY_POINT + '/order/paged?*').as(getOrder);
        return getOrder
    }

    public static deleteServices(): string {
        const deleteServices = 'deleteServices' + DateUtils.getCurrentTime();
        cy.intercept('DELETE', EntryPointEnum.API_ENTRY_POINT + '/order/*').as(deleteServices);
        return deleteServices
    }
}