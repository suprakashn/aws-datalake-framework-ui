import { combineReducers } from "redux";
import * as Constants from 'components/Constants/Constants'

const initialSourceSystemValues = {
    src_sys_id: '',
    src_sys_nm: '',
    src_sys_desc: '',
    mechanism: '',
    data_owner: '',
    support_cntct: '',
    bucket_name: '',
    ingstn_pattern: '',
}
const sidebar = (state = { sidebarFlag: false }, action) => {
    switch (action.type) {
        case Constants.OPEN_SIDEBAR:
            return {
                ...state, sidebarFlag: true
            }
        case Constants.CLOSE_SIDEBAR:
            return {
                ...state, sidebarFlag: false
            }
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

const sourceSystemValues = (state = initialSourceSystemValues, action) => {
    switch (action.type) {
        case Constants.UPDATE_SOURCE_SYSTEM_FIELD_VALUE:
            return { ...state, [action.payload.field]: action.payload.value };
        case Constants.UPDATE_ALL_SOURCE_SYSTEM_FIELD_VALUES:
            return { ...state, ...action.row }
        case Constants.RESET_SOURCE_SYSTEM_FIELD_VALUES:
            return { ...initialSourceSystemValues };
        default:
            return { ...state }
    }
}

const sourceSystemsReducer = combineReducers({
    sidebar,
    updateMode,
    sourceSystemValues
})

export default sourceSystemsReducer;