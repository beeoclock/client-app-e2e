import {StripePageElement} from "./StripePageElement";
import {Assertions} from "../../../common/assertions/Assertions";

export class StripePage {
    private inputs = StripePageElement.StripeInputComponent;

    public assertInputElement(): StripePage {
        this.inputs.getStripeEmailInput()
            .invoke('prop', 'innerText').then((innerText: string): void => {
            expect(innerText).to.include("Email\ne2e.testing@dev.beeoclock.com")
        })
        return this;
    }

    public assertOrderSummary(tariffName: string): StripePage {
        cy.get('[data-testid="product-summary-name"]').should('have.text', 'Subscribe to ' + tariffName)
        cy.get('.ProductSummary-amountsContainer.false')
            .invoke('prop', 'innerText').then((innerText: string): void => {
            if (tariffName === 'Basic') {
                expect(innerText.trim().replace(/\s+/g, ' '))
                    .to.contain('PLN 59.00 per month Basic plan for small teams (PL).');
            }
        })
        return this
    }

    public typeCardValue(cardValue: string): StripePage {
        this.inputs.getCardNumberInput().type(cardValue)
        return this
    }

    public typeCardExpiration(expiration: string): StripePage {
        this.inputs.getCardExpiration().type(expiration)
        return this
    }

    public typeCardCVV(cvv: string): StripePage {
        this.inputs.getCardCVV().type(cvv)
        return this
    }

    public typeCardBillingName(billingName: string): StripePage {
        this.inputs.getCardBillingName().type(billingName)
        return this
    }

    public clickSubmitButton(): StripePage {
        StripePageElement.SubmitButton.getElement()
            .click();
        return this;
    }

    public assertAmount(amount: string): StripePage {
        const element: Cypress.Chainable = StripePageElement.StripeSummary.getElement()
        Assertions.assertTrimmedProperties(element, 'innerText', amount)
        return this;
    }
}