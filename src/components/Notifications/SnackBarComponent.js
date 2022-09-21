import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { closeSnackbar } from 'actions/notificationAction';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const SnackbarComponent = (props) => {
    return <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={props.open}
        onClose={props.closeSnackbar}
        autoHideDuration={6000}
    >
        <Alert severity={props.info.variant} variant="filled">{props.info.message}</Alert>
    </Snackbar>
}

const mapStateToProps = state => ({
    open: state.notificationState.openSnackbar.open,
    info: state.notificationState.openSnackbar.info,
})
const mapDispatchToProps = dispatch => bindActionCreators({
    closeSnackbar
},dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(SnackbarComponent);