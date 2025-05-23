export class TabElement {
    public getElement(tabName: string): any {
        return cy.get('utility-sidebar-menu-component', {includeShadowDom: false})
            .find('li').contains(tabName)
            .scrollIntoView().should('be.visible')
    }
}