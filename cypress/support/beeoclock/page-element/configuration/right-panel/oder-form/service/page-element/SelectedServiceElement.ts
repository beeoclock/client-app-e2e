export class SelectedServiceElement {
    public getComponent(): any {
        return cy.get('whac-a-mole-container')
            .find('.leading-tight.flex.gap-4').first()
            .scrollIntoView().should('be.visible')
    }

    public getAmountOfSelectedService(): any {
        return this.getComponent().find('.flex.gap-1').first()
    }

    public getTotalPrice(): any {
        return this.getComponent().find('.text-nowrap.whitespace-nowrap').first()
    }

    public getTotalDuration(): any {
        return this.getComponent().find('.text-nowrap.whitespace-nowrap').last()
    }
}