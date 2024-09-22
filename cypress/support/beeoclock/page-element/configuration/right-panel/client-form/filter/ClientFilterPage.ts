import {SearchInput} from "support/beeoclock/page-element/common/common-element/element/SearchInput";
import {CustomerApiInterceptionHelper} from "../../../../../common/Interception/customer/CustomerApiInterceptionHelper";
import {ApiInterceptionHelper} from "../../../../../common/Interception/ApiInterceptionHelper";

export class ClientFilterPage {

    public typeSearchValue(value: string): ClientFilterPage {
        const getCustomer = CustomerApiInterceptionHelper.getCustomer(value)
        SearchInput.getElement()
            .type(value).then(() => {
            ApiInterceptionHelper.waitForAlias(getCustomer)
        })
        return this
    }
}