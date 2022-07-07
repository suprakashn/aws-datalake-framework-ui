import { combineReducers } from "redux";
import sourceSystemsReducer from "reducers/sourceSystemsReducer";
import notificationReducer from "reducers/notificationReducer";
import dataAssetsReducer from "reducers/dataAssetsReducer";

export default function rootReducer(history){
    const rootReducer = combineReducers({
        notificationState: notificationReducer,
        sourceSystemState: sourceSystemsReducer,
        dataAssetState: dataAssetsReducer,
    })
    return rootReducer;
};