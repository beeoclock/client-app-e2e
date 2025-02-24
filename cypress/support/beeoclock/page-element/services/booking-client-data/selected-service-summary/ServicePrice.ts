export class ServicePrice {
    public getElement(price: string): any {
        return cy.get('.shrink > .flex > :nth-child(1)').contains(price)
            .should('be.visible')
            .scrollIntoView()
    }
}