import {DateUtils} from "../../../backend/Utils/DateUtils";
import {EntryPointEnum} from "../EntryPointEnum";

export class ClientsApiInterceptionHelper {

    public static getCustomers(): string {
        const getCustomers = 'getCustomers' + DateUtils.getCurrentTime();
        cy.intercept('GET', EntryPointEnum.API_ENTRY_POINT + '/customer/paged?*').as(getCustomers);
        return getCustomers
    }

    public static createCustomer(): string {
        const createCustomer = 'createCustomer' + DateUtils.getCurrentTime();
        cy.intercept('POST', EntryPointEnum.API_ENTRY_POINT + '/customer').as(createCustomer);
        return createCustomer
    }

    public static deactivateCustomer(): string {
        const deactivateCustomer = 'deactivateCustomer' + DateUtils.getCurrentTime();
        cy.intercept('PATCH', EntryPointEnum.API_ENTRY_POINT + '/customer/*/archive').as(deactivateCustomer);
        return deactivateCustomer
    }

    public static deleteCustomer(): string {
        const deleteCustomer = 'deleteCustomer' + DateUtils.getCurrentTime();
        cy.intercept('DELETE', EntryPointEnum.API_ENTRY_POINT + '/customer/*').as(deleteCustomer);
        return deleteCustomer
    }

}