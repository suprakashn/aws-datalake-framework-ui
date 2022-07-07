import { combineReducers } from "redux";
import sourceSystemsReducer from "reducers/sourceSystemsReducer";
import notificationReducer from "reducers/notificationReducer"
import lakeDestinationsReducer from "./lakeDestinationsReducer";

export default function rootReducer(history){
    const rootReducer = combineReducers({
        notificationState: notificationReducer,
        sourceSystemState: sourceSystemsReducer,
        lakeDestinationState: lakeDestinationsReducer
    })
    return rootReducer;
};