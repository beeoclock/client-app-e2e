import {TestCaseEnum} from "fixtures/enum/TestCaseEnum"
import {PanelOrderVariousOptionDataProvider} from "fixtures/panel/various-option/PanelOrderVariousOptionDataProvider"
import {OrderApi} from "support/beeoclock/backend/panel/order/OrderApi"
import {ModuleAssertionPage} from "support/beeoclock/common/assertion/ModuleAssertionPage"
import {SpecialistNameEnum} from "support/beeoclock/page-element/common/enum/SpecialistNameEnum"
import {RightPanelPages} from "support/beeoclock/page-element/configuration/right-panel/RightPanelPages"
import {
    CustomerTypeEnum
} from "support/beeoclock/page-element/configuration/right-panel/oder-form/service/enum/CustomerTypeEnum"
import {CalendarPages} from "support/beeoclock/page-element/configuration/tab/calendar/CalendarPages"
import {EmailService} from "../../../../support/beeoclock/notifications/EmailService";
import {IEmails} from "../../../../support/beeoclock/notifications/interface/IEmails";
import {AssertionsHelper} from "support/beeoclock/common/assertion/AssertionsHelper"
import {IEmailContent} from "support/beeoclock/notifications/interface/IEmailContent"
import {DateUtils} from "support/beeoclock/backend/Utils/DateUtils"
import { BackendCommonEnum } from "../../../../../jest/models/enum/BackendCommonEnum"

describe('panel new customer order service', () => {
    const testCases = [
        TestCaseEnum.CASE_1,
    ];
    let orderID: string
    let email: string
    let emailId: string
    let emailPassword: string

    before('clear environment and create temporary email', () => {
        setupAndCreateTemporaryEmail()
    });

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
                    .typeCustomerEmail(email)
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
                    .clickSaveButton(true);

                cy.get('@orderId').then((orderId) => {
                    cy.log('Order ID is: ' + orderId);
                    orderID = orderId.toString();

                    cy.log('get token');
                    cy.wrap(EmailService.login(email, emailPassword)).then((response: string) => {
                        cy.log('token: ', response);
                        cy.wrap(response).as('emailToken'); // token assigning
                        waitForEmail(response, testData.mailSubject) //dynamically wait for email
                    });

                    cy.log('assert email header');
                    cy.get('@emailToken').then((token) => {
                        cy.wrap(EmailService.getEmails(token.toString())).then((emails: IEmails[]) => {
                            cy.wrap(emails).each((email: IEmails, index) => {
                                cy.log(`Email #${index + 1}:`);
                                cy.log(`messageId: ${email.id}`);
                                expect(email.subject).to.include(testData.mailSubject);
                                expect(email.intro).to.include(testData.mailIntro);
                                cy.wrap(email.id.toString()).as('emailId'); // assigning emailId
                            });
                        });
                    });

                    cy.log('assert email content');
                    cy.get('@emailToken').then((token) => {
                        cy.get('@emailId').then((emailId) => {
                            cy.wrap(EmailService.getEmailContent(token.toString(), emailId.toString())).then((content: IEmailContent) => {
                                const emailText = AssertionsHelper.normalizeText(content.text);
                                expect(emailText).to.include(`WITAJ, ${testData.firstName.toUpperCase()}!`);
                                expect(emailText).to.include(`${testData.service} zostało zarezerwowane w Haircut&Barber w ${DateUtils.getTodayInPolishFormat()} o 18:00`);
                                expect(emailText).to.include(`Twój specjalista: ${SpecialistNameEnum.ZALEWSKI_FIRST_NAME} ${SpecialistNameEnum.ZALEWSKI_LAST_NAME}`);
                                expect(emailText).to.include(`https://dev.beeoclock.com/${BackendCommonEnum.X_Business_Tenant_Id}/order/${orderID}`);
                                expect(emailText).to.include(`support@beeoclock.com`);
                            });
                        });
                    });
                });
            });
        });
    });

    function setupAndCreateTemporaryEmail() {
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
        cy.clearAllCookies();

        cy.log('Creating temporary email account');
        cy.wrap(EmailService.createAccount()).then((response: { email: string, password: string }) => {
            email = response.email;
            emailPassword = response.password;

            cy.log(`Temporary email created: ${response.email}`);
        });
    }

    function waitForEmail(token: string, expectedSubject: string): any {
        let retries = 0;
        let maxRetries: number = 16;
        let interval: number = 500;

        const checkForEmail = () => {
            cy.wrap(EmailService.getEmails(token)).then((emails: IEmails[]) => {
                const emailFound = emails.find((email) => email.subject.includes(expectedSubject));

                if (emailFound) {
                    cy.log('Email found!');
                    cy.wrap(emailFound).as('email');
                } else if (retries < maxRetries) {
                    retries++;
                    cy.wait(interval);
                    cy.log('no email found interval: ' + retries + '/' + maxRetries)// Czekaj przez określony interwał
                    checkForEmail();
                } else {
                    throw new Error('No email found after maximum retries');
                }
            });
        };
        checkForEmail();
    }
})