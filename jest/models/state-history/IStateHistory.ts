export interface IStateHistory {
    state: 'active' | 'inactive' | 'blocked';
    setAt: string;
}