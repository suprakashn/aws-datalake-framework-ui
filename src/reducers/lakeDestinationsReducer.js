import * as Constants from 'components/Constants/Constants';
import { combineReducers } from "redux";

const initialLakeDestinationValues = {
    domain: '',
    subdomain: '',
    data_owner: '',
    support_cntct: '',
    rs_load_ind: false    
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

const updateFetchDataFlag = (state = { dataFlag : true }, action) => {
    switch (action.type) {
        case Constants.UPDATE_LAKE_DESTINATION_TABLE_FETCH_DATA_FLAG:
            return {
                ...state, dataFlag: action.flag
            }
        default:
            return { ...state }
    }
}

const updateLakeDestinationTableData = (state = { data: [] }, action) => {
    switch (action.type) {
        case Constants.UPDATE_LAKE_DESTINATION_TABLE_DATA:
            return { ...state, data: action.data }
        default:
            return { ...state }
    }
}

const lakeDestinationsReducer = combineReducers({
    updateMode,
    lakeDestinationValues,
    updateLakeDestinationTableData,
    updateFetchDataFlag
})

export default lakeDestinationsReducer;