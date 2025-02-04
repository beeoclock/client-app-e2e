import {RightPanelServicesPageElement} from "../RightPanelServicesPageElement";
import {CustomerApiInterceptionHelper} from "../../../../../../common/Interception/customer/CustomerApiInterceptionHelper";
import {ApiInterceptionHelper} from "../../../../../../common/Interception/ApiInterceptionHelper";
import { NotificationsPage } from "support/beeoclock/page-element/configuration/notiifcations/NotificationsPage";

export class CustomerPage {

    //new customer
    public typeCustomerName(name: string): CustomerPage {
        RightPanelServicesPageElement.NameInput.getElement()
            .type(name)
        return this;
    }

    public typeCustomerLastName(lastName: string): CustomerPage {
        RightPanelServicesPageElement.LastNameInput.getElement()
            .type(lastName)
        return this;
    }

    public typeCustomerEmail(email: string): CustomerPage {
        RightPanelServicesPageElement.EmailInput.getElement()
            .type(email)
        return this;
    }

    public typeCustomerPhone(phone: string): CustomerPage {
        RightPanelServicesPageElement.PhoneInput.getElement()
            .type(phone)
        return this;
    }

    public clickConfirmButton(sendEmail: boolean = false): CustomerPage {
        RightPanelServicesPageElement.ConfirmButton.getElement()
            .click({force: true}).then(() => {
                if (sendEmail) {
                    NotificationsPage.handleEmailNotificationsToggle(sendEmail)
                }
        })
        return this;
    }

    //existing customer

    public searchExistingCustomer(customer: string): CustomerPage {
        const getCustomer = CustomerApiInterceptionHelper.getCustomer()
        RightPanelServicesPageElement.ExistingCustomerInput.getElement()
            .type(customer)
            // .type('{enter}')
        ApiInterceptionHelper.waitForAlias(getCustomer)
        return this;
    }

    public selectGivenCustomer(customer: string): CustomerPage {
        RightPanelServicesPageElement.CustomerOption.getElement(customer)
            .click();
        return this;
    }
}