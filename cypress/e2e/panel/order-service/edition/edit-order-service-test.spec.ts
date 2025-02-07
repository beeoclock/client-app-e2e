import {TestCaseEnum} from "fixtures/enum/TestCaseEnum"
import {PanelOrderVariousOptionDataProvider} from "fixtures/panel/various-option/PanelOrderVariousOptionDataProvider"
import {OrderApi} from "support/beeoclock/backend/panel/order/OrderApi"
import {ModuleAssertionPage} from "support/beeoclock/common/assertion/ModuleAssertionPage"
import {SpecialistNameEnum} from "support/beeoclock/page-element/common/enum/SpecialistNameEnum"
import {LeftMenuPage} from "support/beeoclock/page-element/configuration/left-menu/LeftMenuPage"
import {TabNameEnum} from "support/beeoclock/page-element/configuration/left-menu/enum/TabNameEnum"
import {RightPanelPages} from "support/beeoclock/page-element/configuration/right-panel/RightPanelPages"
import {CustomerTypeEnum} from "support/beeoclock/page-element/configuration/right-panel/oder-form/service/enum/CustomerTypeEnum"
import {CalendarPages} from "support/beeoclock/page-element/configuration/tab/calendar/CalendarPages"
import {OrderTabPages} from "support/beeoclock/page-element/configuration/tab/order-tab/OrderTabPages"
import {NotificationsPage} from "../../../../support/beeoclock/page-element/configuration/notiifcations/NotificationsPage";

describe('panel new customer order service', () => {
    const testCases = [
        TestCaseEnum.CASE_1,
    ];
    let orderID: string

    before('clear environment', () => {
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
        cy.clearAllCookies()
    })

    it('test edition of the service on the order module', function () {
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
                    .selectSpecificService(testData.service)
                    .verifySelectedService('1', testData.price, testData.duration)

                    .clickOpenCustomerPopover()
                    .selectSpecificCustomerType(CustomerTypeEnum.NEW);
                RightPanelPages.CustomerPage
                    .typeCustomerName(testData.firstName)
                    .typeCustomerLastName(testData.lastName)
                    .typeCustomerEmail(testData.email)
                    .typeCustomerPhone(testData.phone)
                    .clickConfirmButton();

                RightPanelPages.RightPanelServicesPage
                    .clickNextButton()
                    .selectPriceOfService(testData.updatedPrice)
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
                    orderID = orderId.toString()

                    cy.log('verify its order on table');
                    CalendarPages.CalendarTablePage
                        .findAndVerifyOrderTableElement(testData.specialistFirstName, testData.specialistLastName)
                        .verifyTimeOrderOnTable(testData.specialistFirstName, testData.specialistLastName, testData.assertTime);

                    cy.log('get order table module');
                    LeftMenuPage.clickOnGivenTab(TabNameEnum.ORDER);

                    cy.log('edit customer')
                    OrderTabPages.OrderEditionFormPage
                        .clickCustomerButton(orderID)
                    RightPanelPages.RightPanelServicesPage
                        .selectSpecificCustomerType(CustomerTypeEnum.CLIENT)

                    cy.log('selectGivenCustomer')
                    RightPanelPages.CustomerPage
                        .searchExistingCustomer('tester')
                        .selectGivenCustomer('tester' + ' ' + 'maila')
                        .clickConfirmButton();
                    NotificationsPage.clickConfirmButton()

                    cy.log('edit specialist')
                    OrderTabPages.OrderEditionFormPage
                        .verifyOrderSpecialist(orderID, SpecialistNameEnum.ZALEWSKI_FIRST_NAME)
                        .clickSpecialistButton(orderID)
                        .clickSelectSpecialist(SpecialistNameEnum.E2E_SINGLE_NAME)
                    NotificationsPage.clickEmailNotificationsToggle()
                    cy.wait(2000)
                    cy.log("EMAIL CONFIRMATION")
                    NotificationsPage.clickConfirmButton()

                    // OrderTabPages.OrderEditionFormPage
                    //     .verifyOrderSpecialist(orderID, SpecialistNameEnum.E2E_SINGLE_NAME)
                    //
                    // cy.log('order price edition')
                    // OrderTabPages.OrderEditionFormPage
                    //     .clickOrderPriceComponent(orderID)
                    // RightPanelPages.RightPanelServicesPage
                    //     .typePrice('500')
                    // OrderTabPages.OrderEditionFormPage
                    //     .assertPrice(orderID, '500,00 zł')
                })
            })
        })
    })


    it.skip('test edition of the service on the calendar module', function () {
        cy.loginOnPanel()

        cy.log('get token')
        cy.get('@token').then(token => {
            cy.log('token: ' + token);

            cy.log('verify calendar tab component');
            ModuleAssertionPage.verifyCalendarTabModule()

            testCases.forEach(testCase => {
                const testData = PanelOrderVariousOptionDataProvider.getTestData(testCase);

                cy.log('verify its order on table');
                CalendarPages.CalendarTablePage
                    .findAndVerifyOrderTableElement(testData.nextSpecialistLastName, testData.nextSpecialistLastName)
                    .verifyTimeOrderOnTable(testData.nextSpecialistLastName, testData.nextSpecialistLastName, '18:00-18:30MarthaD\'Amore-Simonise2e-strzyżenie')
                    .clickOrderTableElement(testData.nextSpecialistLastName, testData.nextSpecialistLastName)
                    // .clickOnGivenOrderByItsId(orderID)TODO JW
            })
        })
    })
})