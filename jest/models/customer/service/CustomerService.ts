import {CustomerTypeEnum} from "../enum/CustomerTypeEnum";
import {generateCustomer} from "../factory/customer-factory";
import {Customer} from "../interface/ICustomer";
import {StateHistoryEnum} from "../../state-history/enum/StateHistoryEnum";
import axios from "axios";
import {BackendCommonEnum} from "../../enum/BackendCommonEnum";

export class CustomerService {

    createCustomer(): Customer {
        return generateCustomer();
    }

    hasState(customer: Customer, state: StateHistoryEnum): boolean {
        return customer.state === state;
    }

    isCustomerType(customer: Customer, customerType: CustomerTypeEnum): boolean {
        return customer.customerType === customerType;
    }

    hasStateHistory(customer: Customer, state: StateHistoryEnum): boolean {
        return customer.stateHistory.some(stateHistory => stateHistory.state === state);
    }

    isValidEmail(customer: Customer): boolean {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(customer.email);
    }

    isValidPhone(customer: Customer): boolean {
        const phoneRegex = /^\+?\d{1,4}?[\s.-]?\(?\d{1,3}?\)?[\s.-]?\d{1,4}[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/;
        return phoneRegex.test(customer.phone);
    }

    async createCustomerAPI(customer: Customer): Promise<Customer> {
        try {
            const headers = BackendCommonEnum.X_Business_Tenant_Id
            const response = await axios.post(`${BackendCommonEnum.API_ENTRY_POINT}/customer`, customer);
            return response.data;
        } catch (error) {
            console.error('Error creating customer:', error);
            throw error;
        }
    }

    async getCustomerById(customerId: string): Promise<Customer> {
        try {
            const response = await axios.get(`${BackendCommonEnum.API_ENTRY_POINT}/${customerId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching customer:', error);
            throw error;
        }
    }

    async doesCustomerExist(customerId: string): Promise<boolean> {
        try {
            const response = await axios.get(`${BackendCommonEnum.API_ENTRY_POINT}/${customerId}`);
            return response.status === 200;
        } catch (error) {
            return false;
        }
    }
}
