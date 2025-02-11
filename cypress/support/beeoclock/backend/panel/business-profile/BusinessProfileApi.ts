import {EntryPointEnum} from "../../../common/Interception/EntryPointEnum";
import {BackendCommonEnum} from "../../../../../../jest/models/customer/enum/BackendCommonEnum";
import {HTTPStatusCodeType} from "../../../../../../jest/models/customer/enum/HTTPStatusCodeType";

export class BusinessProfileApi {

    public static getBusinessProfileDetails(expectedCode: HTTPStatusCodeType, tokenId: string, options: Partial<Cypress.RequestOptions>): any {
        const url = EntryPointEnum.API_ENTRY_POINT + `/business-profile`;
        return cy.request({
            method: 'GET',
            url: url,
            headers: {
                'X-Business-Tenant-Id': BackendCommonEnum.X_Business_Tenant_Id
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