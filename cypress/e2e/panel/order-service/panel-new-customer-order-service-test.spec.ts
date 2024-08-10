import {ServiceEnum} from "../../../support/beeoclock/common/enum/ServiceEnum";
import {QueryAssertion} from "../../../support/beeoclock/common/assertion/QueryAssertion";
import {PanelLoginPage} from "../../../support/beeoclock/page-element/configuration/login/page-element/PanelLoginPage";
import {ClientPropertiesEnum} from "../../../support/beeoclock/common/enum/ClientPropertiesEnum";
import {PanelLoginPageElement} from "../../../support/beeoclock/page-element/configuration/login/PanelLoginPageElement";
import {SpecialistNameEnum} from "../../../support/beeoclock/page-element/common/enum/SpecialistNameEnum";
import {CalendarPages} from "../../../support/beeoclock/page-element/configuration/tab/calendar/CalendarPages";
import {BusinessNameEnum} from "../../../support/beeoclock/page-element/common/enum/BusinessNameEnum";
import {RightPanelPages} from "../../../support/beeoclock/page-element/configuration/right-panel/RightPanelPages";
import {
    CustomerTypeEnum
} from "../../../support/beeoclock/page-element/configuration/right-panel/oder-form/service/enum/CustomerTypeEnum";
import {TestCaseEnum} from "../../../fixtures/enum/TestCaseEnum";
import {
    PanelOrderVariousOptionDataProvider
} from "../../../fixtures/panel/various-option/PanelOrderVariousOptionDataProvider";
import {LeftMenuPage} from "../../../support/beeoclock/page-element/configuration/left-menu/LeftMenuPage";
import {TabNameEnum} from "../../../support/beeoclock/page-element/configuration/left-menu/enum/TabNameEnum";
import {OrderTabPages} from "../../../support/beeoclock/page-element/configuration/tab/order-tab/OrderTabPages";
import {
    OrderActionsEnum
} from "../../../support/beeoclock/page-element/configuration/tab/order-tab/actions/enum/OrderActionsEnum";

describe('panel new customer order service', () => {

    it('test panel new customer order service', function () {
        const testCases = [
            TestCaseEnum.CASE_1,
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

        testCases.forEach(testCase => {
            const testData = PanelOrderVariousOptionDataProvider.getTestData(testCase);

            cy.log(`add order on calendar panel for ${testCase}`)
            CalendarPages.CalendarTablePage
                .clickOnGivenAndHour(testData.specialist, testData.time)
            RightPanelPages.RightPanelServicesPage
                .clickAddOrderButton()
                .clickAddServiceButton()

                .selectSpecificService(testData.service)
                .verifySelectedService(testData.service)

                .clickOpenCustomerPopover()
                .selectSpecificCustomerType(CustomerTypeEnum.NEW);
            RightPanelPages.CustomerPage
                .typeCustomerName(testData.firstName)
                .typeCustomerLastName(testData.lastName)
                .typeCustomerEmail(testData.email)
                .typeCustomerPhone(testData.phone)
                .clickConfirmButton();
            RightPanelPages.RightPanelServicesPage
                .selectPriceOfService('200')
                .selectSpecialist(SpecialistNameEnum.ZALEWSKI_FIRST_NAME);
            RightPanelPages.SummaryAndPaymentServicePage
                .verifyOrderService(testData.summary)
                .verifyOrderSpecialist(testData.specialistFirstName)
                .verifyOrderCustomer(testData.firstName)
                .selectPaymentMethod(testData.paymentMethod)
                .selectPaymentStatus(testData.PaymentStatus)
                .typeBusinessNote(testData.businessNote)
                .clickSaveButton();

            cy.get('@orderId').then((orderId) => {
                cy.log('Order ID is: ' + orderId);
                let oderID: string = orderId.toString()

                cy.log('verify its order on table');
                CalendarPages.CalendarTablePage
                    .findAndVerifyOrderTableElement(testData.specialistFirstName, testData.specialistLastName)

                    .verifyTimeOrderOnTable(testData.specialistFirstName, testData.specialistLastName, testData.assertTime);

                cy.log('click, delete and verify deletion on table');
                LeftMenuPage.clickOnGivenTab(TabNameEnum.ORDER);
                OrderTabPages.OrderActionTable
                    .clickActionButton(oderID)
                    .clickSpecificAction(OrderActionsEnum.DELETE)
                    .verifyOrderWithGivenIdNotExist(oderID)

                cy.log('create next order');
                LeftMenuPage.clickOnGivenTab(TabNameEnum.CALENDAR)

            });
        });
    });
});