import {SelectTimePageElement} from "./SelectTimePageElement";

export class SelectTimePage {

    public selectSpecificTime(time: string): SelectTimePage {
        SelectTimePageElement.SelectSpecificTime.getElement(time)
            .click();
        return this;
    }

    public assertSpecificTime(time: string): SelectTimePage {
        SelectTimePageElement.SelectSpecificTime.getElement(time)
        return this;
    }

    public verifySelectedTime(time: string): SelectTimePage {
        SelectTimePageElement.SelectedDayAssert.getElement(time)
            .should('have.class', 'bg-yellow-400').and('not.have.class', 'bg-gray-800')
        return this;
    }

    public verifyGivenSlotNotExist(time: string): SelectTimePage {
        SelectTimePageElement.SelectSpecificTime.getNotExistingElement(time)
        return this
    }

    public clickBackByButton(): SelectTimePage {
        const element = cy.get('utility-header-component').find('.bi.bi-x-lg').scrollIntoView().should('be.visible')
        element.click();
        return this
    }
}