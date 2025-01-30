export class EditButton {

    public getElement(): any {
        return cy.get('app-event-v2-buttons-details')
            .find('edit-button-component')
            .scrollIntoView().should('be.visible')
    }
}