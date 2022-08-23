import dataAssetsReducer from "reducers/dataAssetsReducer";
import notificationReducer from "reducers/notificationReducer";
import sourceSystemsReducer from "reducers/sourceSystemsReducer";
import { combineReducers } from "redux";
import lakeDestinationsReducer from "./lakeDestinationsReducer";

export default function rootReducer(history){
    const rootReducer = combineReducers({
        notificationState: notificationReducer,
        sourceSystemState: sourceSystemsReducer,
        dataAssetState: dataAssetsReducer,
        lakeDestinationState: lakeDestinationsReducer
    })
    return rootReducer;
};