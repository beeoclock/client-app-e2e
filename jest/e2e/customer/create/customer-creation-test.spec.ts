import {CustomerBuilder} from "../../../models/customer/builder/CustmerBuilder";
import {CustomerTypeEnum} from "../../../models/customer/enum/CustomerTypeEnum";
import {StateHistoryEnum} from "../../../models/state-history/enum/StateHistoryEnum";
import {CustomerService} from "../../../models/customer/service/CustomerService";

describe('CustomerBuilder', () => {
    it('should create a customer with default values', () => {
        // Given
        const customerService = new CustomerService();

        // When
        const customer = customerService.createCustomer();

        // Then
        expect(customer.firstName).to.equal(customer.firstName);
        expect(customer.lastName).to.be.ok; // używamy .to.be.ok zamiast toBeTruthy
        expect(customer.customerType).to.be.equal(CustomerTypeEnum.NEW);
        expect(customer.state).to.be.equal(StateHistoryEnum.ACTIVE);
        expect(customer.stateHistory.length).to.be.equal(1);
        expect(customer.stateHistory[0].state).to.be.equal(StateHistoryEnum.ACTIVE);
        expect(customer.email).to.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
        expect(customer.phone).to.be.ok;
        expect(customer._id).to.be.ok;
        expect(customer._version).to.be.equal('1');
        expect(customer.createdAt).to.be.ok;
        expect(customer.updatedAt).to.be.ok;
    });
});
