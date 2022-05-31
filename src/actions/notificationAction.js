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