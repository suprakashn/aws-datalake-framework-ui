import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from '@material-ui/core/Paper';
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useNavigate } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import {
    lakeDestinationFieldValue, resetLakeDestinationValues, updateAllLakeDestinationValues,
    updateFetchDataFlag
} from 'actions/lakeDestinationsAction'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ReplayIcon from '@material-ui/icons/Replay';
import { CircularProgress, Switch, TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { openSnackbar ,openSideBar} from 'actions/notificationAction';
import defaultInstance from 'routes/defaultInstance';
import PageTitle from 'components/Common/PageTitle';

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
        '&:hover': {
            fontWeight: 'bold',
        },
    },
    formControl: {
        minWidth: 280,
        margin: '0px 3% 2% 0px',
        fontSize: 13,
        wordBreak: 'break-word',
        maxWidth: 280
    },
    button: {
        float: 'right',
        margin: '2vh',
        backgroundColor: 'black',
        color: '#F7901D',
        minWidth: '7%',
        marginTop: '12px',
        '&:hover': {
            fontWeight: '600',
            backgroundColor: 'black',
        },
        '&:disabled': {
            background: '#A3A3A390',
        },
    },
}));

const ThemeSwitch = withStyles({
    switchBase: {
      color: 'black',
      '&$checked': {
        color: '#F7901D',
      },
      '&$checked + $track': {
        backgroundColor: '#F7901D',
      },
    },
    checked: {},
    track: {},
  })(Switch);

const CreateLakeDestination = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [saving, setSavingFlag] = useState(false);

    const handleValueChange = (event) => {
        let { id, value, checked } = event.target;
        if (event.target.type === 'checkbox') {
            value = checked;
        }

        props.lakeDestinationFieldValue(id, value);
        setError({
            ...error,
            [id]: validate(id, value)
        });
    }

    const validate = (field, value) => {
        // Required Check
        let error = "";
        const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        switch (field) {
            case 'domain':
                error = value?.trim().length > 0 ? "" : "Required field";
                error = error || (value?.trim().length <= 25 ? "" : "Reached maximum limit of 25 characters");
                error = error || (!/\s+/.test(value) ? "" : "Space not allowed. Use underscore instead");
                break;
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

    const handleSave = async (e) => {
        e.preventDefault();
        let errorList = {};
        let isFormValid = true;

        // Get all errors by iterating HTML collection
        Array.from(e.target?.elements)
            .filter(e => e.tagName === 'INPUT' || e.tagName === 'CHECKBOX')
            .forEach(e => {
                errorList[e.id] = validate(e.id, e.value);
                isFormValid = isFormValid && !Boolean(errorList[e.id]);
            });

        setError({
            ...error,
            ...errorList
        });

        if (isFormValid) {
            setSavingFlag(true);
            await makeSaveRequest();
            setSavingFlag(false);
            props.resetLakeDestinationValues();
            navigate(-1);
        } else {
            props.openSnackbar({ variant: 'error', message: 'Enter all mandatory fields with valid data!' });
        }
    }

    const makeSaveRequest = async () => {
        let url, requestData;
        const dataToSave = {
            data_owner: props.fieldValues.data_owner,
            domain: props.fieldValues.domain,
            rs_load_ind: props.fieldValues.rs_load_ind,
            subdomain: props.fieldValues.subdomain,
            support_cntct: props.fieldValues.support_cntct
        }

        switch (props.mode) {
            case 'create':
            case 'clone':
                url = '/target_system/create';
                requestData = {
                    target_config: dataToSave
                }
                break;
            case 'edit':
                url = '/target_system/update';
                requestData = {
                    target_config: {
                        target_id: props.fieldValues.target_id,
                        update_data: dataToSave
                    }
                }
                break;
            default: throw (new Error("Invalid Mode"));
        }

        try {
            const response = await defaultInstance.post(url, requestData)
            if (response.data.responseStatus) {
                props.updateFetchDataFlag(true);
                props.openSnackbar({ variant: 'success', message: response.data.responseMessage });
            } else {
                let message = response.data.responseMessage || `Failed to create target system ID: ${props.fieldValues.target_id}!`
                props.openSnackbar({ variant: 'error', message });
            }
        }
        catch (er) {
            props.openSnackbar({ variant: 'error', message: `Failed to create target system ID: ${props.fieldValues.target_id}!` });
        }
    }

    return (
        <form className={classes.root} onSubmit={handleSave}>
            <CssBaseline />
            <PageTitle showInfo={() => props.openSideBar({ heading: 'Lake Destination', content: 'Targets are categories within the Data Lake to better organize the data as per enterprise needs. These are various domains/subdomains in which individual data assets are stored' })}>
                {props.mode === 'edit' ? 'Edit Target System ' : 'New Target System'}
            </PageTitle>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1%' }}>
                <Link to="/lake-destinations" className={classes.link}>
                    <ArrowBackIosIcon fontSize='small' />
                    <span>Back</span>
                </Link>
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
                            {props.mode === "edit" &&
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
                                    disabled={saving}
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
                                    disabled={saving}
                                    margin='dense'
                                    variant='outlined'
                                    error={Boolean(error.subdomain)}
                                    helperText={error.subdomain}
                                    value={props.fieldValues.subdomain}
                                    id="subdomain"
                                    onChange={handleValueChange}
                                />
                            </FormControl>
                            {props.mode === "edit" &&
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
                            <FormControl className={classes.formControl}style={{minWidth: '400px'}}>
                                <div>Support Contact* </div>
                                <TextField
                                    disabled={saving}
                                    margin='dense'
                                    variant='outlined'
                                    error={Boolean(error.support_cntct)}
                                    helperText={error.support_cntct}
                                    value={props.fieldValues.support_cntct}
                                    id="support_cntct"
                                    onChange={handleValueChange}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div > Data Owner* </div>
                                <TextField
                                    disabled={saving}
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
                                <div> Enable Redshift Stage Load </div>
                                <ThemeSwitch
                                    disabled={saving}
                                    name="rs_load_ind"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    margin='dense'
                                    variant='outlined'
                                    checked={Boolean(props.fieldValues.rs_load_ind)}
                                    id="rs_load_ind"
                                    onChange={handleValueChange}
                                />
                            </FormControl>
                        </div>
                    </div>
                </div>
            </Paper>
            <Button type='submit' disabled={saving} className={classes.button}  >
                {saving && <>Saving <CircularProgress size={16} style={{ marginLeft: '10px', color: 'white' }} /></>}
                {!saving && 'Save'}
            </Button>
            <Button className={classes.button} disabled={saving} style={{ backgroundColor: '#A3A3A390' }} onClick={handleCancel}>Cancel</Button>
        </form>

    );
}

const mapStateToProps = state => ({
    fieldValues: state.lakeDestinationState.lakeDestinationValues,
    mode: state.lakeDestinationState.updateMode.mode
})

const mapDispatchToProps = dispatch => bindActionCreators({
    lakeDestinationFieldValue,
    updateAllLakeDestinationValues,
    resetLakeDestinationValues,
    updateFetchDataFlag,
    openSnackbar,
    openSideBar
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateLakeDestination);