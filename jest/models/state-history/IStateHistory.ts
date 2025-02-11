import { StateHistoryEnum } from "./enum/StateHistoryEnum";

export interface IStateHistory {
    state: StateHistoryEnum
    setAt: string;
}