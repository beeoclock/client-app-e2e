export class LandingHeaderComponent {

    private getElement(): any {
        return cy.get('#header')
            .scrollIntoView().should('be.visible')
    }

    public getLogo(): any {
        return this.getElement().find('img').first()
    }

    public getLogoText(): any {
        return this.getElement().find('img').last()
    }
}