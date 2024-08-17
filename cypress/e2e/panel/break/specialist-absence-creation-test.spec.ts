import {ServiceEnum} from "../../../support/beeoclock/common/enum/ServiceEnum";
import {PanelLoginPageElement} from "../../../support/beeoclock/page-element/configuration/login/PanelLoginPageElement";
import {PanelLoginPage} from "../../../support/beeoclock/page-element/configuration/login/page-element/PanelLoginPage";
import {ClientPropertiesEnum} from "../../../support/beeoclock/common/enum/ClientPropertiesEnum";
import {BusinessNameEnum} from "../../../support/beeoclock/page-element/common/enum/BusinessNameEnum";
import {QueryAssertion} from "../../../support/beeoclock/common/assertion/QueryAssertion";
import {CalendarPages} from "../../../support/beeoclock/page-element/configuration/tab/calendar/CalendarPages";
import {SpecialistNameEnum} from "../../../support/beeoclock/page-element/common/enum/SpecialistNameEnum";
import {
    CalendarTableTimeEnum
} from "../../../support/beeoclock/page-element/configuration/tab/calendar/calendar-table/enum/CalendarTableTimeEnum";
import {RightPanelPages} from "../../../support/beeoclock/page-element/configuration/right-panel/RightPanelPages";
import {DateUtils} from "../../../support/beeoclock/backend/Utils/DateUtils";
import {LeftMenuPage} from "../../../support/beeoclock/page-element/configuration/left-menu/LeftMenuPage";
import {TabNameEnum} from "../../../support/beeoclock/page-element/configuration/left-menu/enum/TabNameEnum";
import {AbsencePages} from "../../../support/beeoclock/page-element/configuration/tab/absence/AbsencePages";
import {
    AbsenceActionEnum
} from "../../../support/beeoclock/page-element/configuration/tab/absence/absence-action/enum/AbsenceActionEnum";
import {TestCaseEnum} from "../../../fixtures/enum/TestCaseEnum";
import {
    PanelOrderVariousOptionDataProvider
} from "../../../fixtures/panel/various-option/PanelOrderVariousOptionDataProvider";
import {PanelAbsenceCreationDataProvider} from "../../../fixtures/panel/absence/PanelAbsenceCreationDataProvider";

describe('specialist absence creation test', () => {

    it('test panel absence creation service', function () {
        const testCases = [
            TestCaseEnum.CASE_1,
            TestCaseEnum.CASE_2
        ];


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

        testCases.forEach(testCase => {
            const testData = PanelAbsenceCreationDataProvider.getTestData(testCase);

            cy.log(`add absence on calendar panel for ${testCase}`)
            CalendarPages.CalendarTablePage
                .clickOnGivenAndHour(testData.specialist, testData.time);
            RightPanelPages.BreakScienceGivenTimePage
                .verifySelectedNextDayTimeLabel(testData.selectedTime)
                .clickBreakRange(testData.absenceRange)
            RightPanelPages.AbsencePage
                .verifyAbsenceFromDate(testData.absenceFromDate)
                .verifyAbsenceFromTime(testData.absenceFromTime)
                .verifyAbsenceToDate(testData.absenceToDate)
                .verifyAbsenceToTime(testData.absenceToTime)
                .typeAbsenceNote(testData.absenceNote)
                .clickSaveButton()

            CalendarPages.CalendarTablePage
                .assertAbsenceOnTable(testData.assertTableAbsence)

            LeftMenuPage.clickOnGivenTab(TabNameEnum.ABSENCE)

            AbsencePages.AbsenceActionPage
                .clickActionButton()
                .clickGivenAction(AbsenceActionEnum.DEACTIVATE)
                .clickGivenAction(AbsenceActionEnum.DELETE)

            LeftMenuPage.clickOnGivenTab(TabNameEnum.CALENDAR)
        })
    })
});