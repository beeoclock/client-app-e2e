import {ServicesPages} from "../../../support/beeoclock/page-element/services/ServicesPages";
import {DateUtils} from "../../../support/beeoclock/backend/Utils/DateUtils";

describe("Client app health check test", () => {
    const danishAddress = 'https://beeoclock.com/da/barbershop_brooklyn'
    const englishAddress = 'https://beeoclock.com/en/barbershop_brooklyn'
    const taiwanAddress = 'https://beeoclock.com/tw/barbershop_brooklyn'

    const danishTabName = 'Detaljer og'
    const englishTabName = 'Details'
    const clientName = 'Barbershop Brooklyn'

    const emptyDomain = 'https://dev.beeoclock.com/pl'
    const businessHeader = 'Rejestrowanie klientów online - automatyzacja biznesu!'

    before('clear', () => {
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
    })

    it('test 1 assert corrected danish page', function () {
        cy.visit(danishAddress)

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
        assertDetailsTab(danishTabName)
    });

    it('test 2 assert corrected english page', function () {
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

    it('test 3 assert corrected lang on the unsupported language', function () {
        cy.visit(taiwanAddress);

        cy.document().then((doc) => {
            const langAttribute = doc.documentElement.getAttribute('lang');
            expect(langAttribute).to.equal('en-US');
        });
    });

    it('test 4 assert correct redirect', function () {
        cy.visit(emptyDomain)
        let description = ' Bee O\'clock to usługa online umożliwiająca wygodne umawianie spotkań z klientami. Nie trać klientów: daj im możliwość umówienia się na spotkanie w dowolnym momencie. Zautomatyzuj swój biznes - zarządzaj spotkaniami, klientami, płatnościami i pracownikami łatwo i wydajnie dzięki Bee O\'clock. '

        cy.document().then((doc) => {
            const langAttribute = doc.documentElement.getAttribute('lang');
            expect(langAttribute).to.equal('pl');
        });

        assertUrl('https://biz.dev.beeoclock.com/pl')
        verifyPlRedirectPage()
        cy.get('h1').should('contain.text', businessHeader);
        cy.contains('p', description)
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
        const getGivenClient = 'getGivenClient' + DateUtils.getCurrentTime()
        cy.intercept('GET', 'https://api.beeoclock.com/client/api/v1/client/barbershop_brooklyn/specialist/paged?orderBy=createdAt&orderDir=desc&page=1&pageSize=100').as(getGivenClient);
        cy.wait('@' + getGivenClient);
    }

    function verifyPlRedirectPage() {
        cy.get('.object-cover')
            .should('have.prop', 'src', 'https://biz.dev.beeoclock.com/assets/iPad_Air_calenadr-with-specialist.png')
    }
});