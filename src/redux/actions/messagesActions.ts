import { ActionCreator } from 'redux';
import {MessageType} from '../../type';

export enum messagesActionTypes {
	MESSAGE_LOAD = 'MESSAGE_LOAD',
    MESSAGE_SENT = 'MESSAGE_SENT',
    MESSAGE__ERROR = 'MESSAGE__ERROR',

}
export type loadMesType = {
	type: messagesActionTypes.MESSAGE_LOAD;
    data: MessageType;
};

export type sentMesType = {
    type: messagesActionTypes.MESSAGE_SENT;
    id: string;
};
export type errorMesType = {
    type: messagesActionTypes.MESSAGE__ERROR;
    id: string;
};

export type MessageActions = loadMesType | sentMesType | errorMesType;

export const loadMessageAction: ActionCreator<loadMesType> = (data: MessageType) => ({
	type: messagesActionTypes.MESSAGE_LOAD,
	data: data,
});
export const sentMessageAction: ActionCreator<sentMesType> = (id: string) => ({
	type: messagesActionTypes.MESSAGE_SENT,
	id: id,
});
export const errorMessageAction: ActionCreator<errorMesType> = (id: string) => ({
	type: messagesActionTypes.MESSAGE__ERROR,
	id: id,
});