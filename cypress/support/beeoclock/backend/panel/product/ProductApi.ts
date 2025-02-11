import {EntryPointEnum} from "../../../common/Interception/EntryPointEnum";
import {BackendCommonEnum} from "../../../../../../jest/models/enum/BackendCommonEnum";
import {HTTPStatusCodeType} from "../../../../../../jest/models/enum/HTTPStatusCodeType";

export class ProductApi {

    public static createProductTag(tag: any, token: string): any {
        return cy.request({
            method: 'POST',
            url: EntryPointEnum.API_ENTRY_POINT + '/product-tag',
            headers: {
                'X-Business-Tenant-Id': BackendCommonEnum.X_Business_Tenant_Id
            },
            body: tag,
            auth: {
                bearer: token
            }
        }).then(response => {
            expect(response.status).to.equal(HTTPStatusCodeType.Created);
            return response.body;
        })
    }

    public static deleteProductTag(id: string, token: string): any {
        return cy.request({
            method: 'DELETE',
            url: EntryPointEnum.API_ENTRY_POINT + '/product-tag/' + id,
            headers: {
                'X-Business-Tenant-Id': BackendCommonEnum.X_Business_Tenant_Id
            },
            auth: {
                bearer: token
            }
        }).then(response => {
            expect(response.status).to.equal(HTTPStatusCodeType.OK);
            return response.body;
        })
    }

    public static getProductTag(token: string): any {
        return cy.request({
            method: 'GET',
            url: EntryPointEnum.API_ENTRY_POINT +
                '/product-tag/paged?orderBy=name&orderDir=asc&page=1&pageSize=20&updatedSince=2022-02-02T00%3A00%3A00Z&active=1',
            headers: {
                'X-Business-Tenant-Id': BackendCommonEnum.X_Business_Tenant_Id
            },
            auth: {
                bearer: token
            }
        }).then(response => {
            expect(response.status).to.equal(200);
            if (Array.isArray(response.body.items) && response.body.items.length > 0) {
                const orderIds = response.body.items.map((order: any) => order._id);
                cy.log('tags ids:', orderIds.join(', '));
                return cy.wrap(orderIds);
            } else {
                cy.log('No tags found');
                return cy.wrap([]);
            }
        });
    }

    public static deleteAllTags(token: string): void {
        this.getProductTag(token).then(tags => {
            if (tags.length === 0) {
                cy.log("No tags to delete");
                return;
            }
            cy.wrap(null).then(() => {
                return tags.reduce((prev, tagId) => {
                    return prev.then(() => this.deleteProductTag(tagId, token));
                }, Cypress.Promise.resolve());
            });
        });
    }


}