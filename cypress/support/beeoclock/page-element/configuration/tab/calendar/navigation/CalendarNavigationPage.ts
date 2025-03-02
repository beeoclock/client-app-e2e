import {CalendarNavigationPageElement} from "./CalendarNavigationPageElement";
import {DateUtils} from "../../../../../backend/Utils/DateUtils";
import {ApiInterceptionHelper} from "../../../../../common/Interception/ApiInterceptionHelper";

export class CalendarNavigationPage {

    public verifyCurrenDate(): CalendarNavigationPage {
        cy.document().its('readyState').should('equal', 'complete')
        cy.wait(1000)
        CalendarNavigationPageElement.DateInformationLabel.getElement()
            .invoke('prop', 'outerText').then(outerText => {
            expect(outerText).to.contain("Dziś\n" + DateUtils.getCurrentDateFormatted())
        })
        return this
    }

    public clickNextDayArrow(): CalendarNavigationPage {
        // const getOrder: string = ApiInterceptionHelper.getOrder()
        CalendarNavigationPageElement.NextDayArrow.getElement()
            .click()
        // cy.wait('@' + getOrder).then((interception) => {
        //     const requestUrl: URL = new URL(interception.request.url);
        //
        //     const start: string = requestUrl.searchParams.get('start');
        //     const end: string = requestUrl.searchParams.get('end');
        //
        //     expect(start).to.equal(DateUtils.getStartOfTomorrowUTC());
        //     expect(end).to.equal(DateUtils.getEndOfTomorrowUTC());
        // });
        return this;
    }

    public clickPreviousDayArrow(): CalendarNavigationPage {
        // const getOrder: string = ApiInterceptionHelper.getOrder()
        CalendarNavigationPageElement.PreviousDayArrow.getElement()
        //     .click()
        // cy.wait('@' + getOrder)
        return this;
    }

    public verifyNextDayDate(): CalendarNavigationPage {
        CalendarNavigationPageElement.DateInformationLabel.getElement()
            .invoke('prop', 'outerText').then(outerText => {
            expect(outerText).to.contain("Jutro\n" + DateUtils.getCurrentDatePlusGivenDay(1, "YYYY-MM-DD"));
        })
        return this;
    }
}