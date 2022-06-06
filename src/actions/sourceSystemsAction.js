import * as constants from 'components/Constants/Constants';

export const openSourceSystemSidebar = () => dispatch => {
    dispatch({
        type: constants.OPEN_SIDEBAR,
    })
}

export const closeSourceSystemSidebar = () => dispatch => {
    dispatch({
        type: constants.CLOSE_SIDEBAR,
    })
}

export const updateMode = (mode) => dispatch => {
    dispatch({
        type: constants.UPDATE_MODE,
        mode: mode
    })
}

export const sourceSystemFieldValue = (field,value) => dispatch => {
    dispatch({
        type: constants.UPDATE_SOURCE_SYSTEM_FIELD_VALUE,
        payload: {
            field,
            value
        }
    })
}

export const updateAllSourceSystemValues = (row) => dispatch => {
    dispatch({
        type: constants.UPDATE_ALL_SOURCE_SYSTEM_FIELD_VALUES,
        row : row,
    })
}

export const resetSourceSystemValues = () => dispatch => {
    dispatch({
        type: constants.RESET_SOURCE_SYSTEM_FIELD_VALUES,
    })
}