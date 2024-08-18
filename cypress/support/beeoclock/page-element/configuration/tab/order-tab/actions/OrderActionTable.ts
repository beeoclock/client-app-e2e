import {OrderActionTableElement} from "./OrderActionTableElement";
import {OrderActionsEnum} from "./enum/OrderActionsEnum";
import {ApiInterceptionHelper} from "../../../../../common/Interception/ApiInterceptionHelper";

export class OrderActionTable {

    public clickActionButton(orderId: string): OrderActionTable {
        cy.wait(500)
        OrderActionTableElement.OrderActionButton.getElement(orderId)
            .click();
        return this;
    }

    public clickSpecificAction(action: string): OrderActionTable {
        cy.wait(700)
        const getOrder = ApiInterceptionHelper.getOrder()
        const deleteAction = ApiInterceptionHelper.deleteServices()
        OrderActionTableElement.OrderGivenActionButton.getElement(action).scrollIntoView()
            .click({force: true})
        if (action == OrderActionsEnum.DELETE) {
            ApiInterceptionHelper.waitForAlias(deleteAction)
        }
        ApiInterceptionHelper.waitForAlias(getOrder)
        return this;
    }

    public verifyOrderWithGivenIdNotExist(orderId: string): OrderActionTable {
        cy.get('order-list-of-card-collection-by-date-component')
            .find('app-card-item-order-component').contains(orderId)
            .should('not.exist')
        return this;
    }
}