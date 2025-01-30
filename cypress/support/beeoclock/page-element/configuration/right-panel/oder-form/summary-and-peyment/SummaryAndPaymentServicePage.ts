import {SummaryAndPaymentServicePageElement} from "./SummaryAndPaymentServicePageElement";
import {ApiInterceptionHelper} from "../../../../../common/Interception/ApiInterceptionHelper";

export class SummaryAndPaymentServicePage {

    public verifyOrderPrice(price: string): SummaryAndPaymentServicePage {
        SummaryAndPaymentServicePageElement.OrderSummaryPriceElement.getElement()
            .invoke('prop', 'outerText')
            .then((text) => {
                const normalizedText = text.replace(/\s/g, '');
                const normalizedPrice = price.replace(/\s/g, '');
                expect(normalizedText).to.include(normalizedPrice);
            });
        return this;
    }

    public verifyOrderTime(price: string): SummaryAndPaymentServicePage {
        SummaryAndPaymentServicePageElement.OrderSummaryTimeElement.getElement()
            .invoke('prop', 'outerText')
            .then((text) => {
                const normalizedText = text.replace(/\s/g, '');
                const normalizedPrice = price.replace(/\s/g, '');
                expect(normalizedText).to.include(normalizedPrice);
            });
        return this;
    }

    public verifyOrderDate(date: string): SummaryAndPaymentServicePage {
        SummaryAndPaymentServicePageElement.OrderSummaryDateElement.getElement()
            .invoke('prop', 'outerText')
            .then((text) => {
                const normalizedText = text.replace(/\s/g, '');
                const normalizedPrice = date.replace(/\s/g, '');
                expect(normalizedText).to.include(normalizedPrice);
            });
        return this;
    }

    public verifyOrderService(service: string): SummaryAndPaymentServicePage {
        SummaryAndPaymentServicePageElement.OrderSummarySelectedServiceElement.getElement()
            .invoke('prop', 'outerText')
            .then((text) => {
                const cleanedText = text.replace(/\s+/g, ' ').trim();
                const cleanedService = service.replace(/\s+/g, ' ').trim();
                expect(cleanedText).to.include(cleanedService);
            });
        return this;
    }

    public verifyOrderSpecialist(specialist: string): SummaryAndPaymentServicePage {
        SummaryAndPaymentServicePageElement.OrderSummarySpecialistElement.getElement()
            .invoke('prop', 'textContent')
            .then((text) => {
                expect(text).to.include(specialist);
            });
        return this;
    }

    public verifyOrderCustomer(customer: string): SummaryAndPaymentServicePage {
        SummaryAndPaymentServicePageElement.OrderCustomerSummaryElement.getElement()
            .invoke('prop', 'textContent')
            .then((text) => {
                expect(text).to.include(customer);
            });
        return this;
    }

    public selectPaymentMethod(method: string): SummaryAndPaymentServicePage {
        SummaryAndPaymentServicePageElement.PaymentMethodSelector.getElement()
            .click().then(() => {
            SummaryAndPaymentServicePageElement.SelectPaymentMethodElement.getElement(method)
                .click()
        })
        return this;
    }

    public selectPaymentStatus(status: string): SummaryAndPaymentServicePage {
        SummaryAndPaymentServicePageElement.PaymentStatusSelector.getElement()
            .click().then(() => {
            SummaryAndPaymentServicePageElement.SelectPaymentStatusElement.getElement(status)
                .click()
        })
        return this;
    }

    public typeBusinessNote(businessNote: string): SummaryAndPaymentServicePage {
        SummaryAndPaymentServicePageElement.BusinessNoteInputElement.getElement()
            .type(businessNote)
        return this;
    }

    public clickSaveButton(): SummaryAndPaymentServicePage {
        const createOrder = ApiInterceptionHelper.createOrder()
        const createPayment = ApiInterceptionHelper.createServicePayment()
        SummaryAndPaymentServicePageElement.SaveButton.getElement().click()

        cy.wait('@' + createOrder).then((interception) => {
            const responseBody = interception.response.body;

            const orderId = responseBody.services[0].orderAppointmentDetails.specialists[0].member._id;
            cy.wrap(orderId).as('orderId');
        })

        ApiInterceptionHelper.waitFor201Alias(createPayment)
        return this;
    }

}
