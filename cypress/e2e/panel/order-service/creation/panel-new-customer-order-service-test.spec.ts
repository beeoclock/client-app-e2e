import {SpecialistNameEnum} from "../../../../support/beeoclock/page-element/common/enum/SpecialistNameEnum";
import {CalendarPages} from "../../../../support/beeoclock/page-element/configuration/tab/calendar/CalendarPages";
import {RightPanelPages} from "../../../../support/beeoclock/page-element/configuration/right-panel/RightPanelPages";
import {
    CustomerTypeEnum
} from "../../../../support/beeoclock/page-element/configuration/right-panel/oder-form/service/enum/CustomerTypeEnum";
import {TestCaseEnum} from "../../../../fixtures/enum/TestCaseEnum";
import {
    PanelOrderVariousOptionDataProvider
} from "../../../../fixtures/panel/various-option/PanelOrderVariousOptionDataProvider";
import {OrderApi} from "../../../../support/beeoclock/backend/panel/order/OrderApi";
import {ModuleAssertionPage} from "../../../../support/beeoclock/common/assertion/ModuleAssertionPage";
import {LeftMenuPage} from "support/beeoclock/page-element/configuration/left-menu/LeftMenuPage";
import {TabNameEnum} from "support/beeoclock/page-element/configuration/left-menu/enum/TabNameEnum";
import {
    OrderActionsEnum
} from "support/beeoclock/page-element/configuration/tab/order-tab/actions/enum/OrderActionsEnum";
import {OrderTabPages} from "support/beeoclock/page-element/configuration/tab/order-tab/OrderTabPages";

describe('panel new customer order service', () => {

    before('clear environment', () => {
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
        cy.clearAllCookies()
    })

    it('test panel new customer order service', function () {
        const testCases = [
            TestCaseEnum.CASE_1,
        ];

        cy.loginOnPanel()

        cy.log('get token')
        cy.get('@token').then(token => {
            cy.log('token: ' + token);

            cy.log('delete orders before test')
            OrderApi.deleteAllCurrentOrders()

            cy.log('verify calendar tab component');
            ModuleAssertionPage.verifyCalendarTabModule()

            testCases.forEach(testCase => {
                const testData = PanelOrderVariousOptionDataProvider.getTestData(testCase);

                cy.log('CASE - 1')
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
                    .selectPriceOfService(testData.price)
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

                    // cy.log('TEMP - delete order by api')
                    // OrderApi.deleteOrderWithGivenId(oderID)

                    cy.log('click, delete and verify deletion on table');
                    LeftMenuPage.clickOnGivenTab(TabNameEnum.ORDER);
                    cy.reload()
                    OrderTabPages.OrderActionTable
                        .clickActionButton(oderID)
                        .clickSpecificAction(OrderActionsEnum.DELETE)
                        .verifyOrderWithGivenIdNotExist(oderID)
                })

                cy.log('CASE - 2')
                cy.log('create next order');
                LeftMenuPage.clickOnGivenTab(TabNameEnum.CALENDAR)

                cy.log('create new order for previously created customer')
                CalendarPages.CalendarNavigationPage
                    .verifyCurrenDate()
                    .clickNextDayArrow()
                    .verifyNextDayDate();

                CalendarPages.CalendarTablePage
                    .clickOnGivenAndHour(testData.nextSpecialist, testData.time)
                RightPanelPages.RightPanelServicesPage
                    .clickAddOrderButton()
                    .clickAddServiceButton()

                    .selectSpecificService(testData.nextService)
                    .verifySelectedService(testData.nextService)

                    .clickOpenCustomerPopover()
                    .selectSpecificCustomerType(CustomerTypeEnum.CLIENT);

                RightPanelPages.CustomerPage
                    .searchExistingCustomer(testData.firstName)

                cy.log('selectGivenCustomer')
                RightPanelPages.CustomerPage
                    .selectGivenCustomer(testData.firstName + ' ' + testData.lastName)
                    .clickConfirmButton();

                RightPanelPages.RightPanelServicesPage
                    .selectPriceOfService(testData.nextPrice)
                RightPanelPages.SummaryAndPaymentServicePage
                    .verifyOrderService(testData.nextSummary)
                    .verifyOrderSpecialist(testData.nextSpecialistLastName)
                    .verifyOrderCustomer(testData.firstName)
                    .selectPaymentMethod(testData.nextPaymentMethod)
                    .selectPaymentStatus(testData.nextPaymentStatus)
                    .typeBusinessNote(testData.businessNote)
                    .clickSaveButton();

                cy.get('@orderId').then((orderId) => {
                    cy.log('Order ID is: ' + orderId);
                    let orderID: string = orderId.toString()

                    cy.log('verify its order on table');
                    CalendarPages.CalendarTablePage
                        .findAndVerifyOrderTableElement(testData.nextSpecialistLastName, testData.nextSpecialistLastName)
                        .verifyTimeOrderOnTable(testData.nextSpecialistLastName, testData.nextSpecialistLastName, testData.nextAssertTime);

                    cy.log('click, delete and verify deletion on table');
                    LeftMenuPage.clickOnGivenTab(TabNameEnum.ORDER);
                    OrderTabPages.OrderActionTable
                        .clickActionButton(orderID)
                        .clickSpecificAction(OrderActionsEnum.DELETE)
                        .verifyOrderWithGivenIdNotExist(orderID)

                    cy.log('create next order');
                    LeftMenuPage.clickOnGivenTab(TabNameEnum.CALENDAR)
                });
            });
        })
    })
})