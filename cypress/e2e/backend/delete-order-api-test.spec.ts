import {ServiceEnum} from "../../support/beeoclock/common/enum/ServiceEnum";
import {PanelLoginPageElement} from "../../support/beeoclock/page-element/configuration/login/PanelLoginPageElement";
import {PanelLoginPage} from "../../support/beeoclock/page-element/configuration/login/page-element/PanelLoginPage";
import {ClientPropertiesEnum} from "../../support/beeoclock/common/enum/ClientPropertiesEnum";
import {BusinessNameEnum} from "../../support/beeoclock/page-element/common/enum/BusinessNameEnum";
import {OrderApi} from "../../support/beeoclock/backend/panel/order/OrderApi";

describe("delete all order's by api", (): void => {

    before('clear environment', () => {
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
        cy.clearAllCookies()
    })

    it('should delete all order by api', function () {
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
        PanelLoginPage.selectGivenBusinessAndStoreToken(BusinessNameEnum.HAIRCUT_AND_BARBER);

        cy.get('@token').then(token => {
            cy.log('token: ' + token);

            cy.log('delete orders with assertion that its status equal deleted')
          OrderApi.deleteAllOrders()
        });
    });
});