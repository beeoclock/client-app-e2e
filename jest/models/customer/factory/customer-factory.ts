import { faker } from '@faker-js/faker';
import { Customer } from '../interface/ICustomer';
import { CustomerTypeEnum } from '../enum/CustomerTypeEnum';
import {NumericUtils} from "../../../utils/NumericUtils";


export const generateCustomer = (): Customer => ({
    _version: '1',
    _id: NumericUtils.generateObjectId(),
    stateHistory: [
        {
            state: 'active',
            setAt: faker.date.past().toISOString(),
        },
    ],
    state: 'active',
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    object: 'CustomerDto',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: faker.phone.number('+## ##########'),
    email: faker.internet.email(),
    note: faker.lorem.sentence(),
    customerType: faker.helpers.arrayElement(Object.values(CustomerTypeEnum)),
});
