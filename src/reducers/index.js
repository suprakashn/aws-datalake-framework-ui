import { combineReducers } from "redux";
// import manageTaskReducer from "reducers/manageTaskReducer";
import notificationReducer from "reducers/notificationReducer"
// import authenticationReducer from "reducers/authenticationReducer";
// import dataQualityReducer from "reducers/dataQualityReducer";

export default function rootReducer(history){
    const rootReducer = combineReducers({
        // authenticationState: authenticationReducer,
        // manageTaskState: manageTaskReducer,
        notificationState: notificationReducer,
        // dataQualityState: dataQualityReducer
    })
    return rootReducer;
};