import { combineReducers } from "redux";
import sourceSystemsReducer from "reducers/sourceSystemsReducer";
import notificationReducer from "reducers/notificationReducer"

export default function rootReducer(history){
    const rootReducer = combineReducers({
        notificationState: notificationReducer,
        sourceSystemState: sourceSystemsReducer
    })
    return rootReducer;
};