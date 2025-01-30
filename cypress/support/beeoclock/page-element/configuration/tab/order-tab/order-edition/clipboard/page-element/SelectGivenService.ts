export class SelectGivenService {

    public getElement(service: string): any {
        return cy.get('bee-card').contains(service)
            .scrollIntoView().should('be.visible')

    }
}