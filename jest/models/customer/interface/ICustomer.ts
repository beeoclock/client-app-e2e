import { IStateHistory } from "../../state-history/IStateHistory";
import {CustomerTypeEnum} from "../enum/CustomerTypeEnum";

export interface Customer {
    _version: string;
    _id: string;
    stateHistory: IStateHistory[];
    state: 'active' | 'inactive' | 'blocked';
    createdAt: string;
    updatedAt: string;
    object: 'CustomerDto';
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    note?: string;
    customerType: CustomerTypeEnum
}