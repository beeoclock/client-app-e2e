import {RightPanelServicesPageElement} from "./RightPanelServicesPageElement";
import {ApiInterceptionHelper} from "../../../../../common/Interception/ApiInterceptionHelper";

export class RightPanelServicesPage {

    public clickAddOrderButton(): RightPanelServicesPage {
        RightPanelServicesPageElement.AddOrderButton.getElement()
            .click()
        return this
    }

    public clickAddServiceButton(): RightPanelServicesPage {
        RightPanelServicesPageElement.AddServiceButton.getElement()
            .click()
        return this
    }

    public clickSelectServiceButton(): RightPanelServicesPage {
        const getService = ApiInterceptionHelper.getService()
        RightPanelServicesPageElement.SelectServiceButton.getElement()
            .click()
        ApiInterceptionHelper.waitForAlias(getService)
        return this
    }

    public selectSpecificService(service: string): RightPanelServicesPage {
        RightPanelServicesPageElement.SelectSpecificServiceCheckbox.getElement(service)
            .click()
        return this;
    }

    public verifySelectedService(service: string): RightPanelServicesPage {
        RightPanelServicesPageElement.SelectedServiceElement.getElement()
            .should('have.prop', 'innerText').and('include', service + '\n' + 'PL')
        return this;
    }

    public openSelectTime(): RightPanelServicesPage {
        cy.get('app-duration-chip-component').scrollIntoView().should('be.visible').click()
        cy.wait(1000)
        return this;
    }

    public selectHour(hour?: string): RightPanelServicesPage {
        if (hour == '2') {
            cy.get('.ion-delegate-host > .ng-untouched')
                .find('ion-picker-column').last().prev()
                .find('ion-picker-column-option').eq(0).scrollIntoView().click()
            cy.wait(1000)
        } else {}
        return this;
    }

    public selectMinute(minute?: string): RightPanelServicesPage {
        if (minute == '2') {
            cy.get('.ion-delegate-host > .ng-untouched')
                .find('ion-picker-column').last()
                .find('ion-picker-column-option').eq(0).scrollIntoView().click()
        }
        if (minute == '30') {
            cy.get('#ion-overlay-4 > .ion-delegate-host > .ng-untouched')
                .find('ion-picker-column').last()
                .find('ion-picker-column-option').eq(28).scrollIntoView().click()
            // cy.wait(1000)
        } else {}
        return this;
    }

    public clickSubmitSelectedTime(): RightPanelServicesPage {
        cy.wait(1500)
        RightPanelServicesPageElement.SubmitButton.getElement()
            .click()
        return this;
    }

    public selectPriceOfService(price: string): RightPanelServicesPage {
        RightPanelServicesPageElement.OpenPriceInputElement.getElement()
            .click()
        this.typePrice(price)
        cy.get('[id^="ion-overlay-"]').last().click()
        return this;
    }

    public selectSpecialist(specialist: string): RightPanelServicesPage {
        RightPanelServicesPageElement.SelectSpecialist.getElement(specialist)
        return this;
    }

    public typeOrderDate(date: string): RightPanelServicesPage {
        const input = RightPanelServicesPageElement.OrderDateInput.getElement()
            .click().then(() => {
                input.type(date, {force: true})
            })
        return this;
    }

    public typePublicNoteInput(publicNote: string): RightPanelServicesPage {
        RightPanelServicesPageElement.PublicNoteInput.getElement()
            .type(publicNote)
        return this;
    }

    public clickAddButton(): RightPanelServicesPage {
        RightPanelServicesPageElement.AddButton.getElement()
            .click()
        return this;
    }

    private typePrice(price: string): RightPanelServicesPage {
        RightPanelServicesPageElement.OrderPriceInput.getElement()
            .clear()
            .type(price)
        return this;
    }
}
