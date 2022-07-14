import { combineReducers } from "redux";
import * as Constants from 'components/Constants/Constants'

const initialSourceSystemValues = {
    src_sys_nm: '',
    src_sys_desc: '',
    mechanism: '',
    data_owner: '',
    support_cntct: '',
    ingstn_pattern: '',
    db_hostname: '',
    db_type: '',
    db_name: '',
    db_port: '',
    db_schema: '',
    db_username: '',
    db_pass: '',
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

const updateDataFlag = (state = { dataFlag : true }, action) => {
    switch (action.type) {
        case Constants.UPDATE_SS_TABLE_DATA:
            return {
                ...state, dataFlag: action.flag
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

const updateSourceSysTableData = (state = { data: [] }, action) => {
    switch (action.type) {
        case Constants.UPDATE_TABLE_DATA:
            return { ...state, data: action.data }
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
    sourceSystemValues,
    updateDataFlag,
    updateSourceSysTableData
})

export default sourceSystemsReducer;