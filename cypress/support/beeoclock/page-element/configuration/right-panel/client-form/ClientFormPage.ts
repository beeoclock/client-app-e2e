import {CustomerInput} from "./page-element/CustomerInput";
import {CommonPropertiesEnum} from "../../../common/enum/CommonPropertiesEnum";
import {ClientDescriptionInput} from "./page-element/ClientDescriptionInput";
import {SaveButton} from "../../../common/common-element/element/SaveButton";
import {ClientPhoneInput} from "./page-element/ClientPhoneInput";
import {LeftMenuPage} from "../../left-menu/LeftMenuPage";
import {ClientsApiInterceptionHelper} from "support/beeoclock/common/Interception/clients/ClientsApiInterceptionHelper";
import {ApiInterceptionHelper} from "support/beeoclock/common/Interception/ApiInterceptionHelper";

export class ClientFormPage {

    public typeGivenCustomerInput(label: CommonPropertiesEnum, value: string): ClientFormPage {
        if (value) {
            CustomerInput.getElement(label)
                .click()
                .type(value)
                .then((): void => {
                    this.verifyGivenCustomerInput(label, value)
                })
        }
        return this
    }

    public typeGivenCustomerPhone(value: string): ClientFormPage {
        if (value) {
            ClientPhoneInput.getInput()
                .click()
                .type(value)
        }
        return this
    }

    public typeClientDescription(description: string): ClientFormPage {
        if (description) {
            ClientDescriptionInput.getElement()
                .click()
                .type(description).then((): void => {
                this.verifyClientDescription(description)
            })
        }
        return this;
    }

    public verifyGivenCustomerInput(label: CommonPropertiesEnum, value: string): ClientFormPage {
        CustomerInput.getElement(label).should('have.value', value)
        return this
    }

    public verifyClientDescription(description: string): ClientFormPage {
        ClientDescriptionInput.getElement().should('have.value', description)
        return this
    }

    public clickSaveButton(): ClientFormPage {
        LeftMenuPage.assertIsSynchronized()
        const createCustomer: string = ClientsApiInterceptionHelper.createCustomer()
        SaveButton.getElement()
            .click()
        ApiInterceptionHelper.waitFor201Alias(createCustomer)
        cy.get('.toast-container').find('button')
            .click()
        LeftMenuPage.assertIsSynchronizationExecuted()
        LeftMenuPage.assertIsSynchronized(true)
        return this;
    }
}