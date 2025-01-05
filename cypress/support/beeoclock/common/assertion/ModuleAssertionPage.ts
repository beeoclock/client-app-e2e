import {QueryAssertion} from "./QueryAssertion";

export class ModuleAssertionPage {

    public static verifyCalendarTabModule(): ModuleAssertionPage {
        QueryAssertion.verifyCorrectUrl('/event/calendar-with-specialists');
        cy.get('app-event-calendar-with-specialists-page').should('be.visible')
        cy.get('app-calendar-with-specialists-widget-component').should('be.visible')
        cy.get('event-date-control-calendar-with-specialists-component').should('be.visible')
        return this
    }
}