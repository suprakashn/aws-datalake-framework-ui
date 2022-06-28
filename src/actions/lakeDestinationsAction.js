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

export const updateAllLakeDestinationValues = (row) => dispatch => {
    dispatch({
        type: constants.UPDATE_ALL_LAKE_DESTINATION_FIELD_VALUES,
        row : row,
    })
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