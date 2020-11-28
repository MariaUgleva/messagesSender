import {combineReducers } from 'redux';
import messagesReducer from './messagesReducer';
import {ReduxMessageType} from '../../type';


export type AppState = {
    mesages: Array<ReduxMessageType>
  };
const createRootReducer  = combineReducers<AppState>({
    mesages: messagesReducer
});

export default createRootReducer;