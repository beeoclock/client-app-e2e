import {TestCaseEnum} from "../../../fixtures/enum/TestCaseEnum";
import {ServiceEnum} from "../../../support/beeoclock/common/enum/ServiceEnum";
import {PanelLoginPageElement} from "../../../support/beeoclock/page-element/configuration/login/PanelLoginPageElement";
import {PanelLoginPage} from "../../../support/beeoclock/page-element/configuration/login/page-element/PanelLoginPage";
import {ClientPropertiesEnum} from "../../../support/beeoclock/common/enum/ClientPropertiesEnum";
import {BusinessNameEnum} from "../../../support/beeoclock/page-element/common/enum/BusinessNameEnum";
import {OrderApi} from "../../../support/beeoclock/backend/panel/order/OrderApi";
import {QueryAssertion} from "../../../support/beeoclock/common/assertion/QueryAssertion";
import {CalendarPages} from "../../../support/beeoclock/page-element/configuration/tab/calendar/CalendarPages";
import {SpecialistNameEnum} from "../../../support/beeoclock/page-element/common/enum/SpecialistNameEnum";
import {
    CalendarTableTimeEnum
} from "../../../support/beeoclock/page-element/configuration/tab/calendar/calendar-table/enum/CalendarTableTimeEnum";
import {
    BreakScienceGivenTimePage
} from "../../../support/beeoclock/page-element/configuration/right-panel/break/navigation/BreakScienceGivenTimePage";
import {RightPanelPages} from "../../../support/beeoclock/page-element/configuration/right-panel/RightPanelPages";

describe('panel new customer order service', () => {

    it('test panel new customer order service', function () {

        cy.intercept('GET', '**/*').as('getAll');
        cy.visit(ServiceEnum.CLIENT_PANEL, {
            failOnStatusCode: false,
            onBeforeLoad: (win) => {
                win.localStorage.setItem('language', 'pl');
            }
        });

        cy.wait('@getAll', {timeout: 30000});

        cy.log('login');
        PanelLoginPageElement.EmailInput.getElement();
        PanelLoginPage.typeEmail(ClientPropertiesEnum.LOGIN);
        PanelLoginPage.typePassword(ClientPropertiesEnum.PASSWORD);
        PanelLoginPage.clickLoginButton();
        PanelLoginPage.selectGivenBusiness(BusinessNameEnum.HAIRCUT_AND_BARBER);

        cy.get('@token').then(token => {
            cy.log('token: ' + token);
        });

        cy.log('assert login url');
        QueryAssertion.verifyCorrectUrl('/event/calendar-with-specialists');

        CalendarPages.CalendarNavigationPage
            .verifyCurrenDate()
            .clickNextDayArrow()
            .verifyNextDayDate();
        CalendarPages.CalendarTablePage
            .clickOnGivenAndHour(SpecialistNameEnum.ZALEWSKI, CalendarTableTimeEnum.Hour_12)
        RightPanelPages.BreakScienceGivenTimePage
            .verifySelectedNextDayTimeLabel(CalendarTableTimeEnum.Hour_12)
            .clickBreakRange('30')

        // .selectSpecificService(testData.service)
        // .verifySelectedService(testData.service)
    })
});