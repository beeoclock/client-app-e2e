import {TariffsListPageElement} from "./TariffsListPageElement";

export class TariffsListPage {
    private tariffsComponent = TariffsListPageElement.TariffsComponent

    public verifyTariffsPrize(name: string, prize: string): TariffsListPage {
        this.tariffsComponent.getTariffsPrice(name)
            .invoke('prop', 'textContent')
            .then((textContent) => {
                const cleanedText = textContent.replace(/&nbsp;/g, '').replace(/\s+/g, ' ').trim();
                const cleanedPrize = prize.replace(/\s+/g, ' ').trim();
                expect(cleanedText).to.eq(cleanedPrize);
            });
        return this;
    }

    public verifyTariffsMember(name: string, member: string): TariffsListPage {

        this.tariffsComponent.getTariffsMemberCount(name)
            .contains('Członkowie ', member)

        this.tariffsComponent.getTariffsMemberCount(name)
            .find('.bi.bi-check-lg').should('be.visible')
        return this;
    }

    public verifyTariffFeature(name: string, feature: string): TariffsListPage {
        this.tariffsComponent.getTariffFeatures(name)
            .find('.bi.bi-check-lg').should('be.visible')

        this.tariffsComponent.getTariffFeatures(name)
            .contains('span', feature)
        return this;
    }

    public clickUpdateGivenSlot(name: string): TariffsListPage {
        this.tariffsComponent.getTariffsByName(name)
            .contains('button', 'Zaktualizuj do ' + name).should('be.visible')
            .click();
        return this
    }

    public verifyGivenSlotIsSelected(name: string): TariffsListPage {
        this.tariffsComponent.getTariffsByName(name)
            .contains('button', 'Wybrane').should('be.visible')
            .and('be.disabled')
            .and('have.css', 'color', 'rgb(163, 163, 163)')
        return this;
    }

    public verifyGivenSlotIsOpenToSelect(name: string): TariffsListPage {
        this.tariffsComponent.getTariffsByName(name)
            .contains('button', 'Zaktualizuj do ' + name).should('be.visible')
            .and('have.css', 'background-color', 'rgb(255, 212, 41)')
        return this;
    }
}