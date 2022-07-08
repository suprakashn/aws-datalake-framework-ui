import * as constants from 'components/Constants/Constants';

export const lakeDestinationFieldValue = (field,value) => dispatch => {
    dispatch({
        type: constants.UPDATE_LAKE_DESTINATION_FIELD_VALUE,
        payload: {
            field,
            value
        }
    })
}

export const updateAllLakeDestinationValues = (data) => dispatch => {    
    dispatch({
        type: constants.UPDATE_ALL_LAKE_DESTINATION_FIELD_VALUES,
        row: data,
    });
}

export const resetLakeDestinationValues = () => dispatch => {
    dispatch({
        type: constants.RESET_LAKE_DESTINATION_FIELD_VALUES,
    })
}

export const updateMode = (mode) => dispatch => {
    dispatch({
        type: constants.UPDATE_MODE,
        mode: mode
    })
}

export const updateFetchDataFlag = (flag) => dispatch => {
    dispatch({
        type: constants.UPDATE_LAKE_DESTINATION_TABLE_FETCH_DATA_FLAG,
        flag: flag,
    })
}

export const updateLakeDestinationTableData = (data) => dispatch => {
    dispatch({
        type: constants.UPDATE_LAKE_DESTINATION_TABLE_DATA,
        data: data
    })
}
