export class SelectSpecificHour {
    public getElement(): any {
        return cy.get('.ion-delegate-host.popover-viewport')
            .find('ion-datetime').shadow()
            .find('ion-picker-column').first()
        // .find('ion-picker-column-option')
        // .filter((index, element): void => {
        //     const innerText = Cypress.$(element).prop('textContent').trim();
        //     return innerText === hourText;
        // }).scrollIntoView({offset: {top: 100, left: 0}})
        // .scrollIntoView({})
        // .shadow()
        // .find('button')
    }
}