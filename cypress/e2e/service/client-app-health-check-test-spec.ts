import {ServicesPages} from "../../support/beeoclock/page-element/services/ServicesPages";
import {DateUtils} from "../../support/beeoclock/backend/Utils/DateUtils";
import {faker} from "@faker-js/faker";

describe("Client app health check test", () => {
    const danishAddress = 'https://beeoclock.com/da/barbershop_brooklyn'
    const englishAddress = 'https://beeoclock.com/en/barbershop_brooklyn'
    const taiwanAddress = 'https://beeoclock.com/tw/barbershop_brooklyn'

    // const danishAddress = 'https://beeoclock--pr120-develop-j2tplmgj.web.app/da/barbershop_brooklyn'
    // const englishAddress = 'https://beeoclock--pr120-develop-j2tplmgj.web.app/en/barbershop_brooklyn'
    // const taiwanAddress = 'https://beeoclock--pr120-develop-j2tplmgj.web.app/tw/barbershop_brooklyn'

    const danishTabName = 'Detaljer og'
    const englishTabName = 'Details'
    const clientName = 'Barbershop Brooklyn'

    it('assert corrected danish page', function () {
        cy.visit(danishAddress);
        assertApiResponse()

        cy.document().then((doc) => {
            const langAttribute = doc.documentElement.getAttribute('lang');
            expect(langAttribute).to.equal('da');
        });
        ServicesPages.BookingSelectServicePage
            .verifyCorrectForm()
            .verifyGivenHrefAddress('Sankt Mathias Gade, 72, Viborg, Denmark, 8800')
        assertLogo()
        assertBusinessName()
        assertUrl(danishAddress)
        assertDetailsTab(danishTabName)//TODO ask
    });

    it('assert corrected english page', function () {
        cy.visit(englishAddress);
        assertApiResponse()

        cy.document().then((doc) => {
            const langAttribute = doc.documentElement.getAttribute('lang');
            expect(langAttribute).to.equal('en');
        });
        ServicesPages.BookingSelectServicePage
            .verifyCorrectForm()
            .verifyGivenHrefAddress('Sankt Mathias Gade, 72, Viborg, Denmark, 8800')
        assertLogo()
        assertBusinessName()
        assertUrl(englishAddress)
        assertDetailsTab(englishTabName)
    });

    it('assert corrected lang on the unsupported language', function () {
        cy.visit(taiwanAddress);

        cy.document().then((doc) => {
            const langAttribute = doc.documentElement.getAttribute('lang');
            expect(langAttribute).to.equal('en-US');
        });
    });

    function assertLogo() {
        cy.get('img').should('have.attr', 'src', 'https://storage.googleapis.com/bee-o-clock.appspot.com/media/65e6179d5b1828e7e9a05c53/profile/gallery/6606ed352ffe20d94e1baffd/original.jpeg?updatedAt=2024-03-29T16:32:53.856Z');
    }

    function assertBusinessName() {
        cy.get('h1').should('contain.text', clientName);
    }

    function assertUrl(address: string) {
        cy.url().should('include', address)
    }

    function assertDetailsTab(tabName: string) {
        const detailsTab = cy.get('.flex.justify-start').find('.me-2').last()
        detailsTab.should('contain.text', tabName);
    }

    function assertApiResponse() {
        const getGivenClient = 'getGivenClient' + DateUtils.getCurrentTime() + faker.finance.creditCardCVV()
        cy.intercept('GET', 'https://api.beeoclock.com/client/api/v1/client/barbershop_brooklyn').as(getGivenClient);
        cy.wait(`@${getGivenClient}`);
    }
});