export class OpenPriceInputElement {
    public getElement(): any {
        return cy.get('app-price-chip-component')
            .find('button')
            .scrollIntoView().should('be.visible')
    }
}