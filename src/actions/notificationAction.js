import { CLOSE_SIDEBAR, OPEN_SIDEBAR } from "components/Constants/Constants";

export const openSnackbar= (info) => dispatch => {
    console.log("info",info)
    dispatch({
        type: 'OPEN_SNACKBAR',
        payload: info
    })
}

export const closeSnackbar= () => dispatch => {
    dispatch({
        type: 'CLOSE_SNACKBAR',
        payload: {variant:'',message:''}
    })
}

export const openSideBar= (info) => dispatch => {
    console.log("info",info)
    dispatch({
        type: OPEN_SIDEBAR,
        payload: info
    })
}

export const closeSideBar= () => dispatch => {
    dispatch({
        type: CLOSE_SIDEBAR
    })
}