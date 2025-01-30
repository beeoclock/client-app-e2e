export class SelectServiceLink {

    public getElement(): any {
        return cy.get('#open-service-list-to-select-service')
            .scrollIntoView()
    }
}