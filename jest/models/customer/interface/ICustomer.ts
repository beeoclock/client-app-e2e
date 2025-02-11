import {CustomerTypeEnum} from "../enum/CustomerTypeEnum";
import {StateHistoryEnum} from "../../state-history/enum/StateHistoryEnum";
import {IStateHistory} from "../../state-history/IStateHistory";

export interface Customer {
    object: 'CustomerDto';
    _id: string;
    stateHistory: IStateHistory[]
    _version: string;
    state: StateHistoryEnum
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    note?: string;
    customerType: CustomerTypeEnum
}