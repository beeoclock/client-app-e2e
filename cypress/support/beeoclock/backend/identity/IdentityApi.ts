import {HTTPStatusCodeType} from "../../../../../jest/models/enum/HTTPStatusCodeType";
import {BackendCommonEnum} from "../../../../../jest/models/enum/BackendCommonEnum";

export class IdentityApi {

    public static getBusinessIdentity(expectedCode: HTTPStatusCodeType, tokenId: string, options: Partial<Cypress.RequestOptions>): any {

        const url = 'https://api-dev.beeoclock.com/identity/api/v1/member-context/related?orderBy=createdAt&orderDir=asc&page=1&pageSize=20';
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