import { CustomerTypeEnum } from "../enum/CustomerTypeEnum";
import { StateHistoryEnum } from "../../state-history/enum/StateHistoryEnum";
import { Customer } from "../interface/ICustomer";
import { IStateHistory } from "../../state-history/IStateHistory";
import { faker } from "@faker-js/faker";

export class CustomerBuilder {
    private customer: Customer;

    constructor() {
        this.customer = {
            object: "CustomerDto",
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            customerType: CustomerTypeEnum.NEW,
            state: StateHistoryEnum.ACTIVE,
            stateHistory: [{
                state: StateHistoryEnum.ACTIVE,
                setAt: new Date().toDateString()
            }],
            email: `${faker.name.firstName()}.${faker.name.lastName()}@example.com`,
            phone: faker.phone.number(),
            _version: '1',
            _id: faker.datatype.uuid(),
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        };
    }

    public setCustomerType(customerType: CustomerTypeEnum): CustomerBuilder {
        this.customer.customerType = customerType;
        return this;
    }

    public setState(state: StateHistoryEnum): CustomerBuilder {
        this.customer.state = state;
        return this;
    }

    public addStateHistory(state: StateHistoryEnum): CustomerBuilder {
        const stateHistoryItem: IStateHistory = {
            state,
            setAt: new Date().toDateString()
        };
        this.customer.stateHistory.push(stateHistoryItem);
        return this;
    }

    public setFirstName(firstName: string): CustomerBuilder {
        this.customer.firstName = firstName;
        return this;
    }

    public setLastName(lastName: string): CustomerBuilder {
        this.customer.lastName = lastName;
        return this;
    }

    public setEmail(email: string): CustomerBuilder {
        this.customer.email = email;
        return this;
    }

    public setPhone(phone: string): CustomerBuilder {
        this.customer.phone = phone;
        return this;
    }

    public build(): Customer {
        return this.customer;
    }
}
