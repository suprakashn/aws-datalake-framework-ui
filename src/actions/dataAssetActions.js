import * as constants from 'components/Constants/Constants';

export const openDataAssetDialogue = () => dispatch => {
    dispatch({
        type: constants.OPEN_DA_DIALOGUE,
    })
}

export const closeDataAssetDialogue = () => dispatch => {
    dispatch({
        type: constants.CLOSE_DA_DIALOGUE,
    })
}

export const updateMode = (mode) => dispatch => {
    dispatch({
        type: constants.UPDATE_DA_MODE,
        mode: mode
    })
}

export const dataAssetFieldValue = (field,value) => dispatch => {
    dispatch({
        type: constants.UPDATE_DATA_ASSET_FIELD_VALUE,
        payload: {
            field,
            value
        }
    })
}

export const updateAllDataAssetValues = (row) => dispatch => {
    dispatch({
        type: constants.UPDATE_ALL_DATA_ASSET_FIELD_VALUES,
        row : row,
    })
}

export const resetDataAssetValues = () => dispatch => {
    dispatch({
        type: constants.RESET_DATA_ASSET_FIELD_VALUES,
    })
}

export const updateDataFlag = (flag) => dispatch => {
    dispatch({
        type: constants.UPDATE_DA_TABLE_FLAG,
        flag: flag,
    })
}

export const updateDataAssetTableData = (data) => dispatch => {
    dispatch({
        type: constants.UPDATE_DA_TABLE_DATA,
        data: data
    })
}
