import { combineReducers } from "redux";
import * as Constants from 'components/Constants/Constants'

const initialLakeDestinationValues = {
    domain: '',
    subdomain: '',
    data_owner: '',
    support_cntct: ''    
}

const lakeDestinationValues = (state = initialLakeDestinationValues, action) => {
    switch (action.type) {
        case Constants.UPDATE_LAKE_DESTINATION_FIELD_VALUE:
            return { ...state, [action.payload.field]: action.payload.value };
        case Constants.UPDATE_ALL_LAKE_DESTINATION_FIELD_VALUES:
            return { ...state, ...action.row }        
        case Constants.RESET_LAKE_DESTINATION_FIELD_VALUES:
            return {
                ...state, ...initialLakeDestinationValues
            };
        default:
            return { ...state }
    }
}

const updateMode = (state = { mode: '' }, action) => {
    switch (action.type) {
        case Constants.UPDATE_MODE:
            return { ...state, mode: action.mode }
        default:
            return { ...state }
    }
}

const lakeDestinationsReducer = combineReducers({
    updateMode,
    lakeDestinationValues
})

export default lakeDestinationsReducer;