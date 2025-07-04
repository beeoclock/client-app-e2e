import {DateUtils} from "../../../backend/Utils/DateUtils";
import {DevEntryPointEnum} from "../DevEntryPointEnum";

export class OrderInterceptionHelper {

    public static createServicePayment(): string {
        const createPayment = 'createPayment' + DateUtils.getCurrentTime();
        cy.intercept('POST', DevEntryPointEnum.API_ENTRY_POINT + '/payment').as(createPayment);
        return createPayment
    }

    public static createOrder(): string {
        const createOrder = 'createOrder' + DateUtils.getCurrentTime();
        cy.intercept('POST', DevEntryPointEnum.API_ENTRY_POINT + '/order').as(createOrder);
        return createOrder
    }

    public static getOrderPaged(): string {
        const getOrder = 'getOrder' + DateUtils.getCurrentTime();
        cy.intercept('GET', DevEntryPointEnum.API_ENTRY_POINT + '/order/paged?*').as(getOrder);
        return getOrder
    }

    public static getOrderById(id?: string): string {
        const getOrder = 'getOrder' + DateUtils.getCurrentTime();

        if (id) {
            cy.intercept('GET', DevEntryPointEnum.API_ENTRY_POINT + '/order/' + id).as(getOrder);
        } else {
            cy.intercept('GET', DevEntryPointEnum.API_ENTRY_POINT + '/order/*').as(getOrder);
        }
        return getOrder
    }
}