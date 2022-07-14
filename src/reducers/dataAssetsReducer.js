import { combineReducers } from "redux";
import * as Constants from 'components/Constants/Constants'

const intialDataAttributes = {
    "asset_id": "",
    "src_sys_id": "",
    "target_id": "",
    "file_header": true,
    "multipartition": false,
    "file_type": "",
    "asset_nm": "",
    "trigger_file_pattern": "",
    "file_delim": ",",
    "file_encryption_ind": false,
    "asset_owner": "",
    "support_cntct": "",
    "rs_load_ind": false,
}
const initialIngestionAttributes = {
    "src_table_name":"",
    "src_sql_query": "",
    "ingstn_src_path": "",
    "trigger_mechanism": "",
    "frequency": "",
}
 const initialColumnAttributes = {
    "col_id"   : "",
    "col_nm" : "",
    "tgt_col_nm" : "",
    "tgt_data_type" : "",
    "col_desc" : "",
    "data_classification" : "",
    "col_length" : "",
    "req_tokenization" : false,
    "pk_ind" : false,
    "data_type" : "",
    //"modified_ts" : null
 }

const dialogue = (state = { flag: false }, action) => {
    switch (action.type) {
        case Constants.OPEN_DA_DIALOGUE:
            return {
                ...state, flag: true
            }
        case Constants.CLOSE_DA_DIALOGUE:
            return {
                ...state, flag: false
            }
        default:
            return { ...state }
    }
}

const updateDataFlag = (state = { dataFlag: true }, action) => {
    switch (action.type) {
        case Constants.UPDATE_DA_TABLE_FLAG:
            return {
                ...state, dataFlag: action.flag
            }
        default:
            return { ...state }
    }
}

const updateMode = (state = { mode: '' }, action) => {
    switch (action.type) {
        case Constants.UPDATE_DA_MODE:
            return { ...state, mode: action.mode }
        default:
            return { ...state }
    }
}

const updateDataAssetTableData = (state = { data: [] }, action) => {
    switch (action.type) {
        case Constants.UPDATE_DA_TABLE_DATA:
            return { ...state, data: action.data }
        default:
            return { ...state }
    }
}

const dataAssetValues = (state = {...intialDataAttributes, ...initialIngestionAttributes}, action) => {
    switch (action.type) {
        case Constants.UPDATE_DATA_ASSET_FIELD_VALUE:
            return { ...state, [action.payload.field]: action.payload.value };
        case Constants.UPDATE_ALL_DATA_ASSET_FIELD_VALUES:
            return { ...state, ...action.row }
        case Constants.RESET_DATA_ASSET_FIELD_VALUES:
            return {...intialDataAttributes, ...initialIngestionAttributes};
        default:
            return { ...state }
    }
}

const dataAssetsReducer = combineReducers({
    dialogue,
    updateMode,
    dataAssetValues,
    updateDataFlag,
    updateDataAssetTableData
})

export default dataAssetsReducer;