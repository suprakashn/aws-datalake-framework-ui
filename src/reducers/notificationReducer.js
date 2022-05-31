import { combineReducers } from "redux";

const openSnackbar = (state = { open: false, info:{variant:'',message: ''} }, action) => {
    switch (action.type) {
        case 'OPEN_SNACKBAR':
            return {
                ...state, 
                open: true,
                info: action.payload
            }
        case 'CLOSE_SNACKBAR':
            return {
                ...state, 
                open: false,
                info: action.payload
            }
        default:
            return { ...state }
    }
}

const notificationReducer = combineReducers({
    openSnackbar
})

export default notificationReducer;