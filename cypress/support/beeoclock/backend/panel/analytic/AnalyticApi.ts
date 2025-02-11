import {DateUtils} from "../../Utils/DateUtils";
import {BackendCommonEnum} from "../../../../../../jest/models/customer/enum/BackendCommonEnum";
import {HTTPStatusCodeType} from "../../../../../../jest/models/customer/enum/HTTPStatusCodeType";

export class AnalyticApi {
    private static BASE_URL = "https://api-dev.beeoclock.com/analytic/api/v1/report";

    static getDateRangeReport(expectedCode: HTTPStatusCodeType, tokenId: string, options: Partial<Cypress.RequestOptions>): any {
        const startDateTime = DateUtils.getStartOfTodayUTC();
        const endDateTime = DateUtils.getEndOfTodayUTC();

        const url = `${this.BASE_URL}/date-range-report?startDateTime=${(startDateTime)}&endDateTime=${(endDateTime)}`;

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
