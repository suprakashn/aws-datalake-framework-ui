import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link, useNavigate } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import { openSnackbar, openSideBar} from 'actions/notificationAction'
import { MECHANISM, INGESTION_PATTERN, DB_TYPE } from 'components/Constants/SourceSystemConstants'
import {
    sourceSystemFieldValue, closeSourceSystemDialog, resetSourceSystemValues,
    updateDataFlag, updateMode, updateAllSourceSystemValues
} from 'actions/sourceSystemsAction'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ReplayIcon from '@material-ui/icons/Replay';
import { TextField, CircularProgress, FormHelperText, Tooltip } from '@material-ui/core';
import { Button } from '@material-ui/core';
import defaultInstance from 'routes/defaultInstance';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import IconButton from "@material-ui/core/IconButton";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import { InputAdornment } from '@material-ui/core';


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
        minWidth: 250,
        margin: '0px 3% 1% 0px',
        fontSize: 13,
        wordBreak: 'break-word',
        maxWidth: 250
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

const CreateSourceSystem = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [disableButton, setDisableButton] = useState(false);
    const [error, setError] = useState({})
    const [saving, setSavingFlag] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleValueChange = (event) => {
        var { id, value, name } = event.target;
        id = id || name;
        props.sourceSystemFieldValue(id, value);
        setError({
            ...error,
            [id]: validate(id, value)
        });
    }

    const validate = (field, value) => {
        // Required Check
        let error = "";
        const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const passwordRegx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        const portRegx = /^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/gi;


        switch (field) {
            case 'src_sys_nm':
            case 'mechanism':
                error = value?.trim().length > 0 ? "" : "Required field";
                error = error || (value?.trim().length <= 25 ? "" : "Reached maximum limit of 25 characters");
                break;
            case 'data_owner':
            case 'ingstn_pattern':
                error = value?.trim().length > 0 ? "" : "Required field";
                error = error || (value?.trim().length <= 40 ? "" : "Reached maximum limit of 40 characters");
                break;
            case 'src_sys_desc':
                error = error || (value?.trim().length <= 400 ? "" : "Reached maximum limit of 400 characters");
                break;
            case 'support_cntct':
                error = value?.trim().length > 0 ? "" : "Required field";
                error = error || (emailRegx.test(value) ? "" : "Invalid email");
                break;
            default: ;
        }

        if (props.fieldValues.ingstn_pattern === 'database') {
            switch (field) {
                case 'db_name':
                    error = value?.trim().length > 0 ? "" : "Required field";
                    error = error || (value?.trim().length <= 25 ? "" : "Reached maximum limit of 25 characters");
                    break;
                case 'db_schema':
                    error = error || (value?.trim().length <= 25 ? "" : "Reached maximum limit of 25 characters");
                    break;
                case 'db_port':
                    error = value?.trim().length > 0 ? "" : "Required field";
                    error = error || (portRegx.test(value) ? "" : "Invalid Port");
                    break;
                case 'db_pass':
                    error = value?.trim().length > 0 ? "" : "Required field";
                    error = error || (passwordRegx.test(value) ? "" : "Weak Password");
                    break;
                case 'db_type':
                case 'db_username':
                    error = value?.trim().length > 0 ? "" : "Required field";
                    error = error || (value?.trim().length <= 40 ? "" : "Reached maximum limit of 40 characters");
                    break;
                case 'db_hostname':
                    error = value?.trim().length > 0 ? "" : "Required field";
                    error = error || (value?.trim().length <= 100 ? "" : "Reached maximum limit of 100 characters");
                    break;
                default: ;
            }
        }
        return error;
    }

    const handleIngestionPattern = (event) => {
        props.updateAllSourceSystemValues({ ...props.fieldValues, db_hostname: '', db_type: '', db_name: '', db_port: '', db_schema: '', db_username: '', db_pass: '', });
        handleValueChange(event)
    }

    const handleReset = () => {
        props.resetSourceSystemValues();
        setError({})
    }

    const handleCancel = () => {
        props.updateMode('');
        props.resetSourceSystemValues();
        props.closeSourceSystemDialog();
        navigate("/source-systems");
    }

    const handleCreate = async () => {
        setDisableButton(true);
        let payload = {
            "src_config":
            {
                "src_sys_nm": props.fieldValues.src_sys_nm,
                "src_sys_desc": props.fieldValues.src_sys_desc,
                "mechanism": props.fieldValues.mechanism,
                "data_owner": props.fieldValues.data_owner,
                "support_cntct": props.fieldValues.support_cntct
            },
            "ingestion_config":
            {
                "ingstn_pattern": props.fieldValues.ingstn_pattern,
                "db_type": props.fieldValues.db_type,
                "db_hostname": props.fieldValues.db_hostname,
                "db_username": props.fieldValues.db_username,
                "db_schema": props.fieldValues.db_schema,
                "db_name": props.fieldValues.db_name,
                "db_port": props.fieldValues.ingstn_pattern === 'database' ? props.fieldValues.db_port : 0,
                "db_pass": props.fieldValues.db_pass
            }
        }

        try {
            const response = await defaultInstance.post('source_system/create?tasktype=create', payload)
            if (response.data.responseStatus) {
                props.openSnackbar({ variant: 'success', message: `${response.data.responseMessage}` });
                props.updateDataFlag(true);
            } else {
                props.openSnackbar({ variant: 'error', message: `${response.data.responseMessage}` });
            }
            props.updateMode('');
            props.resetSourceSystemValues();
            props.closeSourceSystemDialog();
            navigate("/source-systems");
        }
        catch (error) {
            console.log(error);
            props.openSnackbar({ variant: 'error', message: `Failed to create source system ID: ${props.fieldValues.src_sys_id}!` });
            setDisableButton(false);
        }
    }

    const handleEdit = async () => {
        setDisableButton(true);
        let payload = {
            "src_config":
            {
                "src_sys_id": props.fieldValues.src_sys_id,
                "update_data": {
                    "src_sys_nm": props.fieldValues.src_sys_nm,
                    "src_sys_desc": props.fieldValues.src_sys_desc,
                    "mechanism": props.fieldValues.mechanism,
                    "data_owner": props.fieldValues.data_owner,
                    "support_cntct": props.fieldValues.support_cntct,
                }
            },
            "ingestion_config":
            {
                "src_sys_id": props.fieldValues.src_sys_id,
                "update_data": {
                    "ingstn_pattern": props.fieldValues.ingstn_pattern,
                    "db_type": props.fieldValues.db_type,
                    "db_hostname": props.fieldValues.db_hostname,
                    "db_username": props.fieldValues.db_username,
                    "db_schema": props.fieldValues.db_schema,
                    "db_name": props.fieldValues.db_name,
                    "db_port": props.fieldValues.ingstn_pattern === 'database' ? props.fieldValues.db_port : 0,
                    // "db_pass": props.fieldValues.db_pass
                }
            }
        }

        try {
            const response = await defaultInstance.post('source_system/update', payload);
            if (response.data.responseStatus) {
                props.openSnackbar({ variant: 'success', message: `${response.data.responseMessage}` });
                props.updateDataFlag(true);
            } else {
                props.openSnackbar({ variant: 'error', message: `${response.data.responseMessage}` });
            }
            props.updateMode('');
            props.resetSourceSystemValues();
            props.closeSourceSystemDialog();
            navigate("/source-systems");
        } catch (error) {
            console.log("error", error)
            props.openSnackbar({ variant: 'error', message: `Failed to update source system ID: ${props.fieldValues.src_sys_id}!` });
            setDisableButton(false);
        }
    }

    const handleSave = async (e) => {
        e.preventDefault();
        let errorList = {};
        let isFormValid = true;

        // Get all errors by iterating HTML collection
        Array.from(e.target?.elements)
            .filter(e => e.tagName === 'INPUT' || e.tagName === 'SELECT')
            .forEach(e => {
                e.id = e.id || e.name;
                errorList[e.id] = validate(e.id, e.value);
                isFormValid = isFormValid && !Boolean(errorList[e.id]);
            });

        setError({
            ...error,
            ...errorList
        });

        if (isFormValid) {
            setSavingFlag(true);
            if (props.mode === 'create' || props.mode === 'clone') {
                await handleCreate();
            }
            if (props.mode === 'edit') {
                await handleEdit();
            }
            setSavingFlag(false);

        } else {
            props.openSnackbar({ variant: 'error', message: 'Enter all mandatory fields with valid data!' });
        }
    }

    const handleBack = () => {
        //  props.updateDataFlag(false);
        props.closeSourceSystemDialog();
    }

    return (
        <form className={classes.root} onSubmit={handleSave}>        
            <CssBaseline />
            <div style={{ display: 'flex' }} onClick={handleBack}>
                <Link to="/source-systems" className={classes.link}>
                    <ArrowBackIosIcon fontSize='small' />
                    <span>Back</span>
                </Link>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1%' }}>
                <div className='page-header' style={{ paddingBottom: '10px' }}>
                    <h2>{props.mode === 'edit' ? 'Edit Source System' : 'New Source System'}</h2>
                    <span className="info" onClick={() => props.openSideBar({ heading: 'Create Source System', content: 'Create Source System Content' })}>Info</span>
                </div>
                <div className={classes.link} onClick={handleReset}>
                    <ReplayIcon fontSize='small' />
                    <span>Reset</span>
                </div>
            </div>
            <Paper className={classes.paper} elevation={3}>
                <div style={{ padding: '3%' }}>
                    <div>
                        <div style={{ fontWeight: 'bold', marginBottom: '2%' }}>Source System Attributes</div>
                        <div>
                            {props.mode === 'edit' &&
                                <FormControl className={classes.formControl}>
                                    <div> Source System Id </div>
                                    <TextField
                                        disabled={'true'}
                                        margin='dense'
                                        variant='outlined'
                                        value={props.fieldValues.src_sys_id}
                                        id="src_sys_id"
                                        onChange={(event) => handleValueChange(event)}
                                    />
                                </FormControl>}
                            <FormControl className={classes.formControl}>
                                <div> Source System Name*</div>
                                <TextField
                                    disabled={disableButton}
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.src_sys_nm}
                                    error={Boolean(error.src_sys_nm)}
                                    helperText={error.src_sys_nm}
                                    id="src_sys_nm"
                                    onChange={(event) => handleValueChange(event)}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div > Source System Description </div>
                                <TextField
                                    disabled={disableButton}
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.src_sys_desc}
                                    error={Boolean(error.src_sys_desc)}
                                    helperText={error.src_sys_desc}
                                    id="src_sys_desc"
                                    onChange={(event) => handleValueChange(event)}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div style={{ marginBottom: '3%' }}>Mechanism*</div>
                                <Select
                                    disabled={disableButton}
                                    margin="dense"
                                    variant="outlined"
                                    id="mechanism"
                                    name="mechanism"
                                    value={props.fieldValues.mechanism}
                                    error={Boolean(error.mechanism)}
                                    //helperText={error.mechanism} 
                                    onChange={(event) => handleValueChange(event)}
                                >
                                    <MenuItem value="">
                                        <em>Select mechanism</em>
                                    </MenuItem>
                                    {MECHANISM.map(item => {
                                        return <MenuItem key={item.value} value={item.value} >{item.name}</MenuItem>
                                    })}
                                </Select>
                                <FormHelperText style={{ color: 'red' }}>{error.mechanism}</FormHelperText>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div > Data Owner* </div>
                                <TextField
                                    disabled={disableButton}
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.data_owner}
                                    id="data_owner"
                                    error={Boolean(error.data_owner)}
                                    helperText={error.data_owner}
                                    onChange={(event) => handleValueChange(event)}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div >Support Contact* </div>
                                <TextField
                                    disabled={disableButton}
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.support_cntct}
                                    id="support_cntct"
                                    error={Boolean(error.support_cntct)}
                                    helperText={error.support_cntct}
                                    onChange={(event) => handleValueChange(event)}
                                />
                            </FormControl>
                            {props.mode === 'edit' &&
                                <FormControl className={classes.formControl}>
                                    <div >Bucket Name </div>
                                    <TextField
                                        disabled={'true'}
                                        margin='dense'
                                        variant='outlined'
                                        value={props.fieldValues.bucket_name}
                                        id="bucket_name"
                                        error={Boolean(error.bucket_name)}
                                        helperText={error.bucket_name}
                                        onChange={(event) => handleValueChange(event)}
                                    />
                                </FormControl>}
                            <FormControl className={classes.formControl}>
                                <div style={{ marginBottom: '3%' }}>Ingestion Pattern*</div>
                                <Select
                                    disabled={disableButton}
                                    margin="dense"
                                    variant="outlined"
                                    id="ingstn_pattern"
                                    name="ingstn_pattern"
                                    error={Boolean(error.ingstn_pattern)}
                                    //helperText={error.ingstn_pattern} 
                                    value={props.fieldValues.ingstn_pattern}
                                    onChange={(event) => handleIngestionPattern(event)}
                                >
                                    <MenuItem value="">
                                        <em>Select ingestion pattern</em>
                                    </MenuItem>
                                    {INGESTION_PATTERN.map(item => {
                                        return <MenuItem key={item.value} value={item.value} >{item.name}</MenuItem>
                                    })}
                                </Select>
                                <FormHelperText style={{ color: 'red' }}>{error.ingstn_pattern}</FormHelperText>
                            </FormControl>
                        </div>
                    </div>
                    {props.fieldValues.ingstn_pattern === 'database' &&
                        <div>
                            <div style={{ fontWeight: 'bold', margin: '2% 0px 2% 0px' }}>Database Attributes</div>
                            <div>
                                <FormControl className={classes.formControl}>
                                    <div >DB Host*</div>
                                    <TextField
                                        disabled={disableButton}
                                        margin='dense'
                                        variant='outlined'
                                        value={props.fieldValues.db_hostname}
                                        id="db_hostname"
                                        error={Boolean(error.db_hostname)}
                                        helperText={error.db_hostname}
                                        onChange={(event) => handleValueChange(event)}
                                    />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <div style={{ marginBottom: '6px' }}>DB Type*</div>
                                    <Select
                                        disabled={disableButton}
                                        margin='dense'
                                        variant='outlined'
                                        id="db_type"
                                        name="db_type"
                                        error={Boolean(error.db_type)}
                                        //helperText={error.db_type} 
                                        value={props.fieldValues.db_type}
                                        onChange={(event) => handleValueChange(event)}
                                    >
                                        <MenuItem value="">
                                            <em>Select DB Type</em>
                                        </MenuItem>
                                        {DB_TYPE.map(item => {
                                            return <MenuItem key={item.value} value={item.value} >{item.name}</MenuItem>
                                        })}
                                    </Select>
                                    <FormHelperText style={{ color: 'red' }}>{error.db_type}</FormHelperText>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <div >DB Name*</div>
                                    <TextField
                                        disabled={disableButton}
                                        margin='dense'
                                        variant='outlined'
                                        value={props.fieldValues.db_name}
                                        id="db_name"
                                        error={Boolean(error.db_name)}
                                        helperText={error.db_name}
                                        onChange={(event) => handleValueChange(event)}
                                    />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <div >DB Port*</div>
                                    <TextField
                                        disabled={disableButton}
                                        margin='dense'
                                        variant='outlined'
                                        value={props.fieldValues.db_port}
                                        id="db_port"
                                        error={Boolean(error.db_port)}
                                        helperText={error.db_port}
                                        onChange={(event) => handleValueChange(event)}
                                    />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <div >DB Schema</div>
                                    <TextField
                                        disabled={disableButton}
                                        margin='dense'
                                        variant='outlined'
                                        value={props.fieldValues.db_schema}
                                        id="db_schema"
                                        error={Boolean(error.db_schema)}
                                        helperText={error.db_schema}
                                        onChange={(event) => handleValueChange(event)}
                                    />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <div >DB Username*</div>
                                    <TextField
                                        disabled={disableButton}
                                        margin='dense'
                                        variant='outlined'
                                        value={props.fieldValues.db_username}
                                        id="db_username"
                                        error={Boolean(error.db_username)}
                                        helperText={error.db_username}
                                        onChange={(event) => handleValueChange(event)}
                                    />
                                </FormControl>
                                {props.mode === 'create' &&
                                    <FormControl className={classes.formControl}>
                                        <Tooltip open={error.db_pass === 'Weak Password'} placement="top-start" title="Password should be 8 to 16 characters long and contains atleast one digit and one special charater(!@#$%^&*)">
                                            <div >DB Password*</div>
                                        </Tooltip>
                                        <TextField
                                            disabled={disableButton}
                                            type= {showPassword ? 'text' : 'password'}
                                            margin='dense'
                                            variant='outlined'
                                            value={props.fieldValues.db_pass}
                                            id="db_pass"
                                            error={Boolean(error.db_pass)}
                                            helperText={error.db_pass}
                                            onChange={(event) => handleValueChange(event)}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => setShowPassword(!showPassword)}
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>)
                                            }}
                                        />
                                    </FormControl>}
                            </div>
                            {/* </div> */}
                        </div>}
                </div>
            </Paper>
            <Button type='submit' disabled={saving} className={classes.button} >
                {saving && <>Saving <CircularProgress size={16} style={{ marginLeft: '10px', color: 'white' }} /></>}
                {!saving && 'Save'}
            </Button>
            <Button className={classes.button} disabled={saving} style={{ backgroundColor: '#A3A3A390' }} onClick={handleCancel}>Cancel</Button>
        </form>

    );
}

const mapStateToProps = state => ({
    open: state.sourceSystemState.dialog.dialogFlag,
    fieldValues: state.sourceSystemState.sourceSystemValues,
    mode: state.sourceSystemState.updateMode.mode,
    dataFlag: state.sourceSystemState.updateDataFlag.dataFlag
})
const mapDispatchToProps = dispatch => bindActionCreators({
    openSnackbar,
    updateMode,
    updateDataFlag,
    sourceSystemFieldValue,
    closeSourceSystemDialog,
    resetSourceSystemValues,
    updateAllSourceSystemValues,
    openSideBar
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateSourceSystem);