import { Reducer } from "redux";
import {
  messagesActionTypes,
  MessageActions,
} from "../actions/messagesActions";
import { ReduxMessageType } from "../../type";

const initialState: Array<ReduxMessageType> = [];

const messagesReducer: Reducer<Array<ReduxMessageType>, MessageActions> = (
  state: Array<ReduxMessageType> = initialState,
  action
) => {
  switch (action.type) {
    case messagesActionTypes.MESSAGE_LOAD:
      if (action.data.recipientEmail && action.data.senderEmail) {
        return [...state, { status: "В очереди", data: action.data }];
      }
      return state;
    case messagesActionTypes.MESSAGE_SENT: {
      const newState = [...state];
      const index = newState.findIndex((item) => item.data.id === action.id);
      if (index !== -1) {
        newState[index].status = "Отправлено";
        return [...newState];
      }
      return state;
    }
    case messagesActionTypes.MESSAGE__ERROR: {
      const newState = [...state];
      const index = newState.findIndex((item) => item.data.id === action.id);
      if (index !== -1) {
        newState[index].status = "Ошибка";
        return [...newState];
      }
      return state;
    }
    default:
      return state;
  }
};
export default messagesReducer;
