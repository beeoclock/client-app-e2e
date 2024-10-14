import {RightPanelPages} from "../../../../support/beeoclock/page-element/configuration/right-panel/RightPanelPages";
import {CalendarPages} from "../../../../support/beeoclock/page-element/configuration/tab/calendar/CalendarPages";
import {TestCaseEnum} from "../../../../fixtures/enum/TestCaseEnum";
import {PanelOrderCreationDataProvider} from "../../../../fixtures/panel/order/PanelOrderCreationDataProvider";
import {OrderApi} from "../../../../support/beeoclock/backend/panel/order/OrderApi";
import {ModuleAssertionPage} from "../../../../support/beeoclock/common/assertion/ModuleAssertionPage";
import {LeftMenuPage} from "support/beeoclock/page-element/configuration/left-menu/LeftMenuPage";
import {TabNameEnum} from "support/beeoclock/page-element/configuration/left-menu/enum/TabNameEnum";
import {OrderActionsEnum} from "support/beeoclock/page-element/configuration/tab/order-tab/actions/enum/OrderActionsEnum";
import {OrderTabPages} from "support/beeoclock/page-element/configuration/tab/order-tab/OrderTabPages";

describe('panel - order service', () => {

    before('clear environment', () => {
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
        cy.clearAllCookies()
    })

    it('test panel order service', function () {
        const testCases = [
            TestCaseEnum.CASE_1,
            TestCaseEnum.CASE_2,
            TestCaseEnum.CASE_3,
            TestCaseEnum.CASE_4
        ];

        cy.loginOnPanel()

        cy.log('get token')
        cy.get('@token').then(token => {
            cy.log('token: ' + token);

            cy.log('delete orders before test')
            OrderApi.deleteAllOrders()
        })

        cy.log('verify calendar tab component');
        ModuleAssertionPage.verifyCalendarTabModule()

        testCases.forEach(testCase => {
            const testData = PanelOrderCreationDataProvider.getTestData(testCase);

            cy.log(`add order on calendar panel for ${testCase}`)
            CalendarPages.CalendarTablePage
                .clickOnGivenAndHour(testData.specialist, testData.time)
            RightPanelPages.RightPanelServicesPage
                .clickAddOrderButton()
                .clickAddServiceButton()
                .selectSpecificService(testData.service)
                .verifySelectedService(testData.service)
                .openSelectTime()
                .selectHour(testData.hour)
                .selectMinute(testData.minute)
                .clickSubmitSelectedTime()
                .selectPriceOfService(testData.price)
                .selectSpecialist(testData.specialistFirstName)
            RightPanelPages.SummaryAndPaymentServicePage
                .verifyOrderService(testData.summary)
                .verifyOrderSpecialist(testData.specialistFirstName)
                .verifyOrderCustomer('Anonimowy')
                .selectPaymentMethod(testData.paymentMethod)
                .selectPaymentStatus(testData.PaymentStatus)
                .typeBusinessNote(testData.businessNote)
                .clickSaveButton()

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