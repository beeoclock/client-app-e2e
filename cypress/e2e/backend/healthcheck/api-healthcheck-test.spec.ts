import {BusinessProfileApi} from "../../../support/beeoclock/backend/panel/business-profile/BusinessProfileApi";
import {HTTPStatusCodeType} from "../../../support/beeoclock/backend/enum/HTTPStatusCodeType";
import {BackendCommonEnum} from "../../../support/beeoclock/backend/enum/BackendCommonEnum";
import {IdentityApi} from "../../../support/beeoclock/backend/identity/IdentityApi";
import {IdentityData} from "../../../support/beeoclock/backend/identity/enum/IdentityResponse";
import {AnalyticApi} from "../../../support/beeoclock/backend/panel/analytic/AnalyticApi";
import {ProductApi} from "../../../support/beeoclock/backend/panel/product/ProductApi";
import {ProductTagBuilder} from "../../../support/beeoclock/backend/panel/product/tag/ProductTagBuilder";
import {NumericUtils} from "../../../support/beeoclock/backend/Utils/NumericUtils";
import {faker} from "@faker-js/faker";
import {AuthApi} from "../../../support/beeoclock/backend/auth/AuthApi";

describe("panel api healthcheck", () => {
    let token: string

    before('get token', () => {
        AuthApi.getToken().then(bearer => {
            token = bearer
        })
    })

    it('get business profile and assert unauthorized response', function (): void {
        BusinessProfileApi.getBusinessProfileDetails(HTTPStatusCodeType.Unauthorized, BackendCommonEnum.INVALID_TOKEN, {
            failOnStatusCode: false
        });
    });

    it('get identity profile and assert expected response', function (): void {
        IdentityApi.getBusinessIdentity(HTTPStatusCodeType.OK_200, token, {}).then((response: Record<string, any>): void => {

            cy.log('AAAA', JSON.stringify(response));
            expect(response).to.have.property('items').that.is.an('array');
            expect(response.items).to.have.length(IdentityData.DATA.items.length);

            response.items.forEach((item, index) => {
                const expectedItem = IdentityData.DATA.items[index];

                expect(item.account).to.have.property('_id', expectedItem.account._id);
                expect(item.client).to.deep.equal(expectedItem.client);
                expect(item).to.have.property('stateHistory').that.is.an('array');

                item.stateHistory.forEach((history, historyIndex) => {
                    expect(history).to.have.property('state');
                    expect(history.state).to.equal(expectedItem.stateHistory[historyIndex].state);
                });
            });
        });
    });

    it.only('create product tag and delete', function (): void {
        let id: string = NumericUtils.generateObjectId()
        const tag = new ProductTagBuilder().setId(id).setName('TAG NO ' + faker.finance.pin(6)).build();
        ProductApi.requestTestHeader(tag, token)
        // ProductApi.createProductTag(tag, token).then(() => {
        //     ProductApi.deleteProductTag(id, token).then(() => {
        //         cy.log('product tag deleted');
        //     })
        // })
    });
});
