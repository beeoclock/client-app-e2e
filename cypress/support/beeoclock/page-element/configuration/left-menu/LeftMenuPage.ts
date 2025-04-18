import {LeftMenuPageElement} from "./LeftMenuPageElement";
import {ApiInterceptionHelper} from "../../../common/Interception/ApiInterceptionHelper";
import {TabNameEnum} from "./enum/TabNameEnum";
import {ServiceApiInterceptionHelper} from "../../../common/Interception/service/ServiceApiInterceptionHelper";
import {CustomerApiInterceptionHelper} from "../../../common/Interception/customer/CustomerApiInterceptionHelper";
import {MemberApiInterceptionHelper} from "../../../common/Interception/member/MemberApiInterceptionHelper";
import {PaymentApiInterceptionHelper} from "../../../common/Interception/payment/PaymentApiInterceptionHelper";
import {TariffsApiInterceptionHelper} from "../../../common/Interception/tariffs/TariffsApiInterceptionHelper";
import { ClientsApiInterceptionHelper } from "support/beeoclock/common/Interception/clients/ClientsApiInterceptionHelper";

export class LeftMenuPage {

    public static clickOnGivenTab(tab: string, waitForSynchronize: boolean = true): LeftMenuPage {
        LeftMenuPageElement.TabElement.getElement(tab)
            .click()
        if (tab == TabNameEnum.ORDER) {
        }
        if (tab == TabNameEnum.CALENDAR) {
        }
        if (tab == TabNameEnum.ABSENCE) {
            cy.get('absence-desktop-layout-list-component')
            cy.get('app-absence-filter-component')
            cy.get('app-table-ngx-datatable-smart-component')
        }
        if (tab == TabNameEnum.CLIENTS) {
            this.clickClientTab()
        }
        if (tab == TabNameEnum.TARIFFS) {
            cy.get('tariff-plan-page')
            cy.get('main-tariff-plan-smart-component')
            cy.get('#tariffs')
        }
        if(tab == TabNameEnum.VISITS) {
            cy.get('order-service-table-list-component')
        }
        if (waitForSynchronize) {
            LeftMenuPage.assertIsSynchronized(true)
        }
        return this;
    }

    private static clickAbsenceTab(): LeftMenuPage {
        const getAbsence = ApiInterceptionHelper.getAbsence()
        LeftMenuPageElement.TabElement.getElement(TabNameEnum.ABSENCE)
            .click()
        ApiInterceptionHelper.waitForAlias(getAbsence)
        return this;
    }

    public static clickClientTab(): LeftMenuPage {
        const getCustomers: string = ClientsApiInterceptionHelper.getCustomers()
        LeftMenuPageElement.TabElement.getElement(TabNameEnum.CLIENTS)
            .click()
        ApiInterceptionHelper.waitForQueryAliasWithAssert(getCustomers)
        cy.get('customer-desktop-layout-list-component').should('be.visible')
        cy.get('customer-table-list-component').should('be.visible')
        return this;
    }

    public static clickServiceTab(): LeftMenuPage {
        LeftMenuPageElement.TabElement.getElement(TabNameEnum.SERVICE)
            .click()
        cy.get('service-desktop-layout-list-component').should('be.visible')
        cy.get('service-table-list-component').should('be.visible')
        return this;
    }

    public static clickMembersTab(): LeftMenuPage {
        LeftMenuPageElement.TabElement.getElement(TabNameEnum.MEMBERS)
            .click()
        cy.get('member-table-list-component').should('be.visible')
        cy.get('app-list-member-page').should('be.visible')
        return this;
    }

    public static clickPaymentsTab(): LeftMenuPage {
        LeftMenuPageElement.TabElement.getElement(TabNameEnum.PAYMENTS)
            .click()
        cy.get('payment-table-list-component').should('be.visible')
        cy.get('payment-filter-component').should('be.visible')
        return this;
    }

    public static synchronizeWithInterception(): LeftMenuPage {
        cy.wrap(null).then(() => {
            cy.log('wait until synchronization is done');
            this.assertIsSynchronized(true)
        }).then((): void => {
            cy.log('handle synchronization');
            const getAbsence: string = ApiInterceptionHelper.getAbsence()
            const getCustomer: string = CustomerApiInterceptionHelper.getCustomer()
            const getMember: string= MemberApiInterceptionHelper.getMember()
            const getOrder: string = ApiInterceptionHelper.getOrder()
            const getServices: string = ServiceApiInterceptionHelper.getServices()
            const getPayment: string = PaymentApiInterceptionHelper.getPayment()
            const getBusinessProfile: string = ApiInterceptionHelper.getBusinessProfile()
            const getTariffs: string = TariffsApiInterceptionHelper.getTariffs()
            const getTenantTariffs: string = TariffsApiInterceptionHelper.getTenantTariffs()

            LeftMenuPageElement.SynchronizingComponent.getElement().click().then(() => {
                cy.log('Waiting for synchronization requests to complete...');
                ApiInterceptionHelper.waitForAliases([getAbsence, getMember, getOrder, getServices,
                    getPayment, getBusinessProfile, getCustomer, getTariffs, getTenantTariffs]);
            })
        })

        this.assertIsSynchronized(true)
        cy.wait(1000)
        return this;
    }

    public static handleSynchronization(): LeftMenuPage {
        LeftMenuPageElement.SynchronizingComponent.getElement()
            .click();
        cy.log('Waiting for synchronization requests to complete...');
        return this
    }

    public static assertIsSynchronized(isSynchronized: boolean = true): LeftMenuPage {
        const expectedText = isSynchronized ? 'Zsynchronizowano' : 'Synchronizacja w toku…';

        LeftMenuPageElement.SynchronizingComponent.getElement()
            .find('.text-xs', { timeout: 70000 })
            .should('contain.text', expectedText);
        cy.wait(500) //wait for all request be compiled
        return this;
    }

    public static assertIsSynchronizationExecuted(): LeftMenuPage {
        const expectedText = 'Synchronizacja w toku…';

        LeftMenuPageElement.SynchronizingComponent.getElement()
            .find('.text-xs',{ timeout: 10000 })
            .should('contain.text', expectedText);
        return this;
    }

}