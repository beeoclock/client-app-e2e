export class SearchInput {

    public static getInput(): any {
        return cy.get('utility-search-input-component')
            .find('input')
            .scrollIntoView().should('be.visible')
    }

    public static getSearchButton(): any {
        return cy.get('utility-search-input-component')
            .find('[name="bootstrapSearch"]')
    }
}