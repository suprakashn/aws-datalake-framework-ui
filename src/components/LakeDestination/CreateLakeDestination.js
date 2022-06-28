import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link, useNavigate } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import { lakeDestinationFieldValue, resetLakeDestinationValues } from 'actions/lakeDestinationsAction'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ReplayIcon from '@material-ui/icons/Replay';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { openSnackbar } from './../../actions/notificationAction';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(7),
        marginTop: theme.spacing(2)
    },
    paper: {
        width: '100%',
        height: '100%',
        borderRadius: 0,
        position: 'relative',
        margin: theme.spacing(1),
        marginLeft: 0
    },
    link: {
        cursor: 'pointer',
        display: 'flex',
        color: 'black',
        textDecoration: "none",
        fontSize: "12px",
        marginLeft: 0,
    },
    formControl: {
        minWidth: 250,
        margin: '0px 3% 1% 0px',
        fontSize: 13,
        wordBreak: 'break-word',
        maxWidth: 250
    },
    button: {
        float: 'right',
        margin: '1vh',
        color: 'white',
        minWidth:'7%',
        marginTop: '12px',
    },
}));

const CreateLakeDestination = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [error, setError] = useState({});
    
    const handleValueChange = (event) => {
        const {id, value} = event.target;

        props.lakeDestinationFieldValue(id, value);
        setError({
            ...error,
            [id]: validate(id, value)
        });
        console.log(error);
    }

    const validate= (field, value) => {
        // Required Check
        let error = "";
        const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        switch(field){            
            case 'domain':
            case 'subdomain':
                error = value?.trim().length > 0 ? "" : "Required field";    
                error = error || (value?.trim().length <= 25 ? "" : "Reached maximum limit of 25 characters");                
                break;
            case 'data_owner':
                error = value?.trim().length > 0 ? "" : "Required field";    
                error = error || (value?.trim().length <= 40 ? "" : "Reached maximum limit of 40 characters");                
                break;
            case 'support_cntct':
                error = value?.trim().length > 0 ? "" : "Required field";    
                error = error || (emailRegx.test(value) ? "" : "Invalid email");
                break;
            
            default: error = "";
        }
        return error;
    }

    const handleReset = () => {
        props.resetLakeDestinationValues();
        setError({});
    }

    const handleCancel = () => {
        handleReset();
        navigate(-1)
    }

    const handleSave = (e) => {
        // ToDo
        e.preventDefault();
        let errorList = {};
        let isFormValid = true;

        // Get all errors by iterating HTML collection
        Array.from(e.target?.elements)
        .filter(e => e.tagName === 'INPUT')
        .forEach(e => {            
            errorList[e.id] = validate(e.id, e.value); 
            isFormValid = isFormValid && !Boolean(errorList[e.id]);
        });

        setError({
            ...error,
            ...errorList
        });

        if (isFormValid) {
            props.resetLakeDestinationValues();
            navigate(-1);
        } else {
            props.openSnackbar({ variant: 'error', message: 'Enter all mandatory fields with valid data!' });
        }
    }

    return (
        <form className={classes.root} onSubmit={handleSave}>
            <CssBaseline />
            <Link to="/lake-destinations" className={classes.link}>
                <ArrowBackIosIcon fontSize='small' />
                <span>Back</span>
            </Link>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1%' }}>
                <span style={{ fontWeight: 'bold', fontSize:'16px' }}>  {props.mode === 'edit' ? 'Edit' : 'New'} Destination </span>
                <div className={classes.link} onClick={handleReset}>
                    <ReplayIcon fontSize='small' />
                    <span>Reset</span>
                </div>
            </div>
            <Paper className={classes.paper} elevation={3}>
                <div style={{ padding: '3%' }}>
                    <div>
                        <div style={{ fontWeight: 'bold', marginBottom: '2%' }}>Target System Attributes</div>
                        <div>
                            {props.mode !== "create" && props.mode !== 'clone' &&
                            <FormControl className={classes.formControl}>
                                <div> Target Id </div>
                                <TextField
                                    disabled={props.mode === "edit"}
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.target_id}
                                    id="target_id"
                                    onChange={handleValueChange}
                                />
                            </FormControl>
                            }
                            <FormControl className={classes.formControl}>
                                <div> Domain*</div>
                                <TextField
                                    margin='dense'
                                    variant='outlined'
                                    error={Boolean(error.domain)}
                                    helperText={error.domain}
                                    value={props.fieldValues.domain}
                                    id="domain"
                                    onChange={handleValueChange}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div> Sub Domain* </div>
                                <TextField
                                    margin='dense'
                                    variant='outlined'
                                    error={Boolean(error.subdomain)}
                                    helperText={error.subdomain}
                                    value={props.fieldValues.subdomain}
                                    id="subdomain"
                                    onChange={handleValueChange}
                                />
                            </FormControl>
                            {props.mode !== "create" && 
                            <FormControl className={classes.formControl}>
                                <div> Bucket Name </div>
                                <TextField
                                    margin='dense'
                                    variant='outlined'
                                    disabled={props.mode === "edit"}
                                    value={props.fieldValues.bucket_name}
                                    id="bucket_name"
                                    onChange={handleValueChange}
                                />
                            </FormControl>
                            }
                            <FormControl className={classes.formControl}>
                                <div > Data Owner* </div>
                                <TextField
                                    margin='dense'
                                    variant='outlined'
                                    error={Boolean(error.data_owner)}
                                    helperText={error.data_owner}
                                    value={props.fieldValues.data_owner}
                                    id="data_owner"
                                    onChange={handleValueChange}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div>Support Contact* </div>
                                <TextField
                                    margin='dense'
                                    variant='outlined'
                                    error={Boolean(error.support_cntct)}
                                    helperText={error.support_cntct}
                                    value={props.fieldValues.support_cntct}
                                    id="support_cntct"
                                    onChange={handleValueChange}
                                />
                            </FormControl>
                        </div>
                    </div>
                </div>
            </Paper>
            <Button  type='submit' className={classes.button} style={{backgroundColor: '#00B1E8'}}>Save</Button>
            <Button className={classes.button} style={{backgroundColor:'#A3A3A390'}} onClick={handleCancel}>Cancel</Button>
        </form>

    );
}

const mapStateToProps = state => ({
    fieldValues: state.lakeDestinationState.lakeDestinationValues,
    mode: state.lakeDestinationState.updateMode.mode
})

const mapDispatchToProps = dispatch => bindActionCreators({
    lakeDestinationFieldValue,
    resetLakeDestinationValues,
    openSnackbar
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateLakeDestination);