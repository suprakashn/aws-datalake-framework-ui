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
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import { openSnackbar, } from 'actions/notificationAction'
import { MECHANISM, INGESTION_PATTERN, DB_TYPE } from 'components/Constants/SourceSystemConstants'
import { sourceSystemFieldValue, closeSourceSystemSidebar, resetSourceSystemValues,
updateDataFlag, updateMode, updateAllSourceSystemValues} from 'actions/sourceSystemsAction'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ReplayIcon from '@material-ui/icons/Replay';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import defaultInstance from 'routes/defaultInstance';

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
        // alignItems: 'center',
        // flexWrap: 'wrap',
        color: 'black',
        textDecoration: "none",
        fontSize: "12px",
        marginLeft: 0,
        "&:hover": {
            // color: "#fffc"
        },
    },
    formControl: {
        margin: theme.spacing(1),
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
        minWidth: '7%',
        marginTop: '12px',
    },
}));

const CreateSourceSystem = (props) => {
    const classes = useStyles();
    const navigate =  useNavigate();
    const [error, setError] = useState({
        idError: false,
        nameError: false,
        descriptionError: false,
        mechanismError: false,
        dataOwnerError: false,
        supportContactError: false,
        bucketNameError: false,
        ingestionPatternError: false,
        dbHostError: false,
        dbTypeError: false,
        dbNameError: false,
        dbPortError: false,
        dbSchemaError: false,
        dbUsernameError: false,
        dbPassError: false
    })

    const handleValueChange = (field, errorField, value) => {
        props.sourceSystemFieldValue(field, value);
        setError({
            ...error,
            [errorField]: value.trim().length > 0 ? false : true
        })
    }

    const handleSourceChange = (field, errorField, value) => {
        if (value.length <= 25) {
            props.sourceSystemFieldValue(field, value);
        }
        setError({
            ...error,
            [errorField]: value.trim().length > 0 && value.trim().length <= 25 ? false : true
        })
    }

    const handleIngestionPattern = (field, errorField, value) => {
        props.updateAllSourceSystemValues({ ...props.fieldValues,  db_hostname: '',db_type: '',db_name: '', db_port: '', db_schema: '', db_username: '', db_pass: '', });
        handleValueChange(field, errorField, value)
    }

    const handleReset = () => {
        props.resetSourceSystemValues();
        setError({
            idError: false,
            nameError: false,
            descriptionError: false,
            mechanismError: false,
            dataOwnerError: false,
            supportContactError: false,
            bucketNameError: false,
            ingestionPatternError: false,
            dbHostError: false,
            dbTypeError: false,
            dbNameError: false,
            dbPortError: false,
            dbSchemaError: false,
            dbUsernameError: false,
            dbPassError: false
        })
    }

    const handleCancel = () => {
        props.updateMode('');
        props.resetSourceSystemValues();
        if(props.dataFlag){
            props.updateDataFlag(false);
        }   
        navigate("/source-systems");
    }

    const validate = () => {
        let errorObj = {}
        errorObj = {
            ...error,
            nameError: props.fieldValues.src_sys_nm.trim() ? false : true,
            mechanismError: props.fieldValues.mechanism.trim() ? false : true,
            dataOwnerError: props.fieldValues.data_owner.trim() ? false : true,
            ingestionPatternError: props.fieldValues.ingstn_pattern.trim() ? false : true,
            dbHostError: props.fieldValues.ingstn_pattern === 'database' ? (props.fieldValues.db_hostname.trim() ? false : true) : false,
            dbTypeError: props.fieldValues.ingstn_pattern === 'database' ? (props.fieldValues.db_type.trim() ? false : true) : false,
            dbNameError: props.fieldValues.ingstn_pattern === 'database' ? (props.fieldValues.db_name.trim() ? false : true) : false,
            dbPortError: props.fieldValues.ingstn_pattern === 'database' ? (props.fieldValues.db_port.trim() ? false : true) : false,
            dbUsernameError: props.fieldValues.ingstn_pattern === 'database' ? (props.fieldValues.db_username.trim() ? false : true) : false,
            dbPassError: (props.mode ==='create' || props.mode ==='clone') && props.fieldValues.ingstn_pattern === 'database' ? (props.fieldValues.db_pass.trim() ? false : true) : false
        }
        setError(errorObj);
        console.log("error obj",errorObj)
        return Object.values(errorObj).filter(item => item === true).length;
    }

    const handleCreate = () => {
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
                "db_port": props.fieldValues.ingstn_pattern==='database' ? props.fieldValues.db_port : null,
                "db_pass": props.fieldValues.db_pass
            }
        }
        defaultInstance.post('sourcesystem/create?tasktype=create', payload)
            .then((response) => {
                console.log("response", response)
            })
            .catch((error) => {
                console.log("error", error)
            })
    }

    const handleEdit = () => {
        let payload = {
            "src_config":
            {
                "src_sys_id": props.fieldValues.src_sys_id,
                "update_data": {
                    "src_sys_nm": props.fieldValues.src_sys_nm,
                    "src_sys_desc": props.fieldValues.src_sys_desc,
                    "mechanism": props.fieldValues.mechanism,
                    "data_owner": props.fieldValues.data_owner,
                    "support_cntct": props.fieldValues.support_cntct
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
                    "db_port": props.fieldValues.db_port,
                   // "db_pass": props.fieldValues.db_pass
                }
            }
        }
        defaultInstance.post('sourcesystem/update', payload)
            .then((response) => {
                console.log("response", response)
            })
            .catch((error) => {
                console.log("error", error)
            })
    }
    const handleSave = () => {
        let errorLength = validate();
        if (errorLength) {
            props.openSnackbar({ variant: 'error', message: 'Enter all mandatory fields with valid data!' });
        } else {
            if (props.mode === 'create' || props.mode === 'clone') {
                handleCreate();
            }
            if (props.mode === 'edit') {
                handleEdit();
            }
            props.updateMode('');
            props.resetSourceSystemValues();
            props.updateDataFlag(true);
            navigate("/source-systems");
        }
        console.log("inside handle save", props.fieldValues)
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <div style={{display:'flex'}} onClick={()=>props.updateDataFlag(false)}>
            <Link to="/source-systems" className={classes.link}>
                <ArrowBackIosIcon fontSize='small' />
                <span>Back</span>
            </Link></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1%' }}>
                <span style={{ fontWeight: 'bold', fontSize: '16px' }}> {props.mode === 'edit' ? 'Edit Source System' : 'New Source System'} </span>
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
                            {props.mode !== 'create' && props.mode !== 'clone' &&
                                <FormControl className={classes.formControl}>
                                    <div > Source System Id </div>
                                    <TextField
                                        disabled={props.mode !== 'create'}
                                        margin='dense'
                                        variant='outlined'
                                        value={props.fieldValues.src_sys_id}
                                        id="id_label"
                                        onChange={(event) => handleValueChange('src_sys_id', 'idError', event.target.value)}
                                    />
                                </FormControl>}
                            <FormControl className={classes.formControl}>
                                <div > Source System Name*</div>
                                <TextField
                                    error={error.nameError}
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.src_sys_nm}
                                    id="name_label"
                                    onChange={(event) => handleSourceChange('src_sys_nm', 'nameError', event.target.value)}
                                />
                                <FormHelperText>{error.nameError ? <span style={{ color: 'red' }}>Reached maximum limit of 25 characters</span> : ''}</FormHelperText>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div > Source System Description </div>
                                <TextField
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.src_sys_desc}
                                    id="description_label"
                                    onChange={(event) => handleValueChange('src_sys_desc', 'descriptionError', event.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div style={{ marginBottom: '3%' }}>Mechanism*</div>
                                <Select
                                    error={error.mechanismError}
                                    margin="dense"
                                    variant="outlined"
                                    id="mechanism_value"
                                    value={props.fieldValues.mechanism}
                                    onChange={(event) => handleValueChange('mechanism', 'mechanismError', event.target.value)}
                                >
                                    <MenuItem value="">
                                        <em>Select mechanism</em>
                                    </MenuItem>
                                    {MECHANISM.map(item => {
                                        return <MenuItem key={item.value} value={item.value} >{item.name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div > Data Owner* </div>
                                <TextField
                                    error={error.dataOwnerError}
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.data_owner}
                                    id="dataOwner_label"
                                    onChange={(event) => handleValueChange('data_owner', 'dataOwnerError', event.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div >Support Contact  </div>
                                <TextField
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.support_cntct}
                                    id="supportContact_label"
                                    onChange={(event) => handleValueChange('support_cntct', 'supportContactError', event.target.value)}
                                />
                            </FormControl>
                            {props.mode !== 'create' && props.mode !== 'clone' &&
                                <FormControl className={classes.formControl}>
                                    <div >Bucket Name </div>
                                    <TextField
                                        margin='dense'
                                        variant='outlined'
                                        value={props.fieldValues.bucket_name}
                                        id="bucketName_label"
                                        onChange={(event) => handleValueChange('bucket_name', 'bucketNameError', event.target.value)}
                                    />
                                </FormControl>}
                            <FormControl className={classes.formControl}>
                                <div style={{ marginBottom: '3%' }}>Ingestion Pattern*</div>
                                <Select
                                    error={error.ingestionPatternError}
                                    margin="dense"
                                    variant="outlined"
                                    id="pattern_value"
                                    value={props.fieldValues.ingstn_pattern}
                                    onChange={(event) => handleIngestionPattern('ingstn_pattern', 'ingestionPatternError', event.target.value)}
                                >
                                    <MenuItem value="">
                                        <em>Select ingestion pattern</em>
                                    </MenuItem>
                                    {INGESTION_PATTERN.map(item => {
                                        return <MenuItem key={item.value} value={item.value} >{item.name}</MenuItem>
                                    })}
                                </Select>
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
                                        error={error.dbHostError}
                                        disabled={props.fieldValues.ingstn_pattern !== 'database'}
                                        margin='dense'
                                        variant='outlined'
                                        value={props.fieldValues.db_hostname}
                                        id="host_label"
                                        onChange={(event) => handleValueChange('db_hostname', 'dbHostError', event.target.value)}
                                    />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <div style={{ marginBottom: '6px' }}>DB Type*</div>
                                    <Select
                                        error={error.dbTypeError}
                                        disabled={props.fieldValues.ingstn_pattern !== 'database'}
                                        margin='dense'
                                        variant='outlined'
                                        id="dbType_value"
                                        value={props.fieldValues.db_type}
                                        onChange={(event) => handleValueChange('db_type', 'dbTypeError', event.target.value)}
                                    >
                                        <MenuItem value="">
                                            <em>Select DB Type</em>
                                        </MenuItem>
                                        {DB_TYPE.map(item => {
                                            return <MenuItem key={item.value} value={item.value} >{item.name}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <div >DB Name*</div>
                                    <TextField
                                        error={error.dbNameError}
                                        disabled={props.fieldValues.ingstn_pattern !== 'database'}
                                        margin='dense'
                                        variant='outlined'
                                        value={props.fieldValues.db_name}
                                        id="dbName_label"
                                        onChange={(event) => handleValueChange('db_name', 'dbNameError', event.target.value)}
                                    />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <div >DB Port*</div>
                                    <TextField
                                        error={error.dbPortError}
                                        disabled={props.fieldValues.ingstn_pattern !== 'database'}
                                        margin='dense'
                                        variant='outlined'
                                        value={props.fieldValues.db_port}
                                        id="port_label"
                                        onChange={(event) => handleValueChange('db_port', 'dbPortError', event.target.value)}
                                    />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <div >DB Schema</div>
                                    <TextField
                                        disabled={props.fieldValues.ingstn_pattern !== 'database'}
                                        margin='dense'
                                        variant='outlined'
                                        value={props.fieldValues.db_schema}
                                        id="dbSchema_label"
                                        onChange={(event) => handleValueChange('db_schema', 'dbSchemaError', event.target.value)}
                                    />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <div >DB Username*</div>
                                    <TextField
                                        error={error.dbUsernameError}
                                        disabled={props.fieldValues.ingstn_pattern !== 'database'}
                                        margin='dense'
                                        variant='outlined'
                                        value={props.fieldValues.db_username}
                                        id="port_label"
                                        onChange={(event) => handleValueChange('db_username', 'dbUsernameError', event.target.value)}
                                    />
                                </FormControl>
                                {props.mode === 'create' &&
                                    <FormControl className={classes.formControl}>
                                        <div >DB Password*</div>
                                        <TextField
                                            error={error.dbPassError}
                                            disabled={props.fieldValues.ingstn_pattern !== 'database'}
                                            margin='dense'
                                            variant='outlined'
                                            value={props.fieldValues.db_pass}
                                            id="dbPass_label"
                                            onChange={(event) => handleValueChange('db_pass', 'dbPassError', event.target.value)}
                                        />
                                    </FormControl>}
                            </div>
                            {/* </div> */}
                        </div>}
                </div>
            </Paper>
            <Button className={classes.button} style={{ backgroundColor: '#00B1E8' }} onClick={handleSave}>Save</Button>
            <Button className={classes.button} style={{ backgroundColor: '#A3A3A390' }} onClick={handleCancel}>Cancel</Button>
        </div>

    );
}

const mapStateToProps = state => ({
    open: state.sourceSystemState.sidebar.sidebarFlag,
    fieldValues: state.sourceSystemState.sourceSystemValues,
    mode: state.sourceSystemState.updateMode.mode,
    dataFlag: state.sourceSystemState.updateDataFlag.dataFlag
})
const mapDispatchToProps = dispatch => bindActionCreators({
    openSnackbar,
    updateMode,
    updateDataFlag,
    sourceSystemFieldValue,
    closeSourceSystemSidebar,
    resetSourceSystemValues,
    updateAllSourceSystemValues
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateSourceSystem);