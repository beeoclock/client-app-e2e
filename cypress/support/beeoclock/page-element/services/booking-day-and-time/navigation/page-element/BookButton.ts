export class BookButton {
    public getElement(): any {
        return cy.contains('button', 'Następny krok')
            .should('be.visible')
            .scrollIntoView()
    }
}