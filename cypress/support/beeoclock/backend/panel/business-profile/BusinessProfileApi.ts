import {EntryPointEnum} from "../../../common/Interception/EntryPointEnum";
import {BackendCommonEnum} from "../../enum/BackendCommonEnum";
import {HTTPStatusCodeType} from "../../enum/HTTPStatusCodeType";
import {EnvEnum} from "../../../common/enum/EnvEnum";

export class BusinessProfileApi {
    private static token = Cypress.env('token');

    public static getBusinessProfileDetails(expectedCode: HTTPStatusCodeType, tokenId: string, options: Partial<Cypress.RequestOptions>): any {
        const url = EntryPointEnum.API_ENTRY_POINT + `/business-profile`;
        return cy.request({
            method: 'GET',
            url: EntryPointEnum.API_ENTRY_POINT + `/business-profile`,
            headers: {
                'X-Business-Tenant-Id': BackendCommonEnum.X_Business_Tenant_Id,
                'Authorization': `Bearer ${tokenId}`,
                'x-github-action': EnvEnum.X_GITHUB_ACTION
            },
            auth: {
                bearer: tokenId
            },
            ...options
        }).then(response => {
            expect(response.status).to.equal(expectedCode);
            return response.body
        });
    }
}