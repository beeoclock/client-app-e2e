import {ServiceEnum} from "../../../support/beeoclock/common/enum/ServiceEnum";
import {QueryAssertion} from "../../../support/beeoclock/common/assertion/QueryAssertion";
import {PanelLoginPage} from "../../../support/beeoclock/page-element/configuration/login/page-element/PanelLoginPage";
import {ClientPropertiesEnum} from "../../../support/beeoclock/common/enum/ClientPropertiesEnum";
import {PanelLoginPageElement} from "../../../support/beeoclock/page-element/configuration/login/PanelLoginPageElement";
import {RightPanelPages} from "../../../support/beeoclock/page-element/configuration/right-panel/RightPanelPages";
import {DateUtils} from "../../../support/beeoclock/backend/Utils/DateUtils";

describe('panel - order service', () => {
    let nextDayData = DateUtils.getCurrentDatePlusDays(1)
    const timeString = "08:30";
    const datetimeInput = DateUtils.convertDateToDatetimeInput(nextDayData, timeString);
    const dateOrderSummary: string = DateUtils.convertDatetimeToCustomFormat(datetimeInput)

    it('test panel  order service',  function () {
        cy.intercept('GET', '**/*').as('getAll');
        cy.visit(ServiceEnum.CLIENT_PANEL, { failOnStatusCode: false });
        cy.wait('@getAll', { timeout: 30000 });


        PanelLoginPageElement.EmailInput.getElement()

        PanelLoginPage.typeEmail(ClientPropertiesEnum.LOGIN)
        PanelLoginPage.typePassword(ClientPropertiesEnum.PASSWORD)
        PanelLoginPage.clickLoginButton()

        QueryAssertion.verifyCorrectUrl('/event/calendar-with-specialists')

        RightPanelPages.RightPanelNavigationPage
            .clickOpenRightPanel()
        RightPanelPages.RightPanelServicesPage
            .clickAddServiceButton()
            .clickSelectServiceButton()
            .selectSpecificService('Strzyżenie Brody')
            .verifySelectedService('Strzyżenie Brody', 'Samo Strzyżenie Brody')
            .selectOrderTime('1 godz, 30 min')
            .selectPriceOfService('40')
            .selectSpecialist('Zalewski')
            .typeOrderDate(datetimeInput)
            .typePublicNoteInput('usuń mnie')
            .addButton()
        RightPanelPages.SummaryAndPaymentServicePage
            // .verifyOrderPrice('40,00 zł')TODO BUG
            .verifyOrderTime('1 godz, 30 min')
            .verifyOrderDate(dateOrderSummary)
            .verifyOrderService('Strzyżenie Brody')
            .verifyOrderSpecialist('Tomasz Zalewski')
            .verifyOrderCustomer('Anonimowy')
            .selectPaymentMethod('Karta')
    })

    after('clear storage', () => {
        cy.clearAllLocalStorage()
        cy.clearAllCookies()
    })
})