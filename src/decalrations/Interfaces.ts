import { ActionTypes } from "./enums";

export interface IHistoryAction {
    name: string;
    id: string;
    time: string;
    actionType: ActionTypes;
}

export interface IState {
    actions: IHistoryAction[];
}

export interface IElement {
    id: string;
    name: string;
    items?: IElement[];
    matchCount?: number;
}