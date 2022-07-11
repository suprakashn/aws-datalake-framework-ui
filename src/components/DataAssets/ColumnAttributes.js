import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link, useNavigate } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import { openSnackbar, } from 'actions/notificationAction'
import { BOOLEAN_VALUES, FILE_TYPE, TARGET_DATA_TYPE, DATA_CLASSIFICATION } from 'components/Constants/DataAssetsConstants'
import {
    dataAssetFieldValue, closeDataAssetDialogue, resetDataAssetValues,
    updateDataFlag, updateMode, updateAllDataAssetValues
} from 'actions/dataAssetActions'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ReplayIcon from '@material-ui/icons/Replay';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import defaultInstance from 'routes/defaultInstance';
import cron from 'cron-validate';
import { Tooltip, Fab } from '@material-ui/core';
import AddSharpIcon from '@material-ui/icons/AddSharp';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        //width: '100%',
        margin: theme.spacing(7),
        marginTop: theme.spacing(2)
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: "bold",
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

const ColumnAttributes = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [sourceSysData, setSourceSysData] = useState([]);
    const [disableButton, setDisableButton] = useState(false);
    const [cronValue, setCronValue] = useState('');
    const [errorValue, setErrorValue] = useState('');
    const [error, setError] = useState({})

    useEffect(() => {
        getSourceSystemData();
        // getTargetSystemData();
    }, [])

    const getSourceSystemData = () => {
        defaultInstance.post('/source_system/read?tasktype=read', { "fetch_limit": 'all', "src_config": { "src_sys_id": null } })
            .then(response => {
                setSourceSysData(response.data.body.src_info);
                console.log("response", response)
            })
            .catch(error => {
                console.log("error", error)
                setSourceSysData([]);
            })
    }

    const handleMaxCharacter = (field, errorField, value, number) => {
        if (value.length <= number) {
            props.dataAssetFieldValue(field, value);
        }
        setError({
            ...error,
            [errorField]: value.trim().length > 0 && value.trim().length <= number ? false : true
        })
    }

    const handleValueChange = (field, errorField, value) => {
        if (field === 'frequency') {
            setCronValue(value)
            if (cron(value).isValid()) {
                setError({ ...error, [errorField]: false });
                setErrorValue('');
                props.dataAssetFieldValue(field, value);
            } else {
                props.dataAssetFieldValue(field, '')
                setError({
                    ...error,
                    [errorField]: true
                })
                setErrorValue(cron(value).getError());
            }
        } else {
            props.dataAssetFieldValue(field, value);
            setError({
                ...error,
                [errorField]: value.toString().trim().length > 0 ? false : true
            })
        }

    }

    const handleReset = () => {
        props.resetDataAssetValues();
        setDisableButton(false);
        setError({})
    }

    const handleCancel = () => {
        props.updateMode('');
        props.resetDataAssetValues();
        props.closeDataAssetDialogue();
        navigate("/data-assets");
    }

    const validate = () => {
        let errorObj = {}
        errorObj = {
            ...error,
            sourceSysIDError: props.fieldValues.src_sys_id.length > 0 ? false : true,
            targetIDError: props.fieldValues.target_id.length > 0 ? false : true,
            fileTypeError: props.fieldValues.file_type.length > 0 ? false : true,
            assetNameError: props.fieldValues.asset_nm.trim() ? false : true,
            triggerFilePtrnError: props.fieldValues.trigger_file_pattern.trim() ? false : true,
            fileDelimiterError: props.fieldValues.file_delim.trim() ? false : true,
            assetOwnerError: props.fieldValues.asset_owner.trim() ? false : true,
            supportContactError: props.fieldValues.support_cntct.trim() ? false : true,
            sourceTableNameError: props.fieldValues.src_table_name.trim() ? false : true,
            sourceSqlQueryError: props.fieldValues.src_sql_query.trim() ? false : true,
            ingestionSourcePathError: props.fieldValues.ingstn_src_path.trim() ? false : true,
            triggerMechanismError: props.fieldValues.trigger_mechanism.trim() ? false : true,
            crontabError: props.fieldValues.frequency.length ? error.crontabError : true,
        }
        setError(errorObj);
        console.log("error obj", errorObj)
        return Object.values(errorObj).filter(item => item === true).length;
    }

    const handleCreate = () => {
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
        defaultInstance.post('source_system/create?tasktype=create', payload)
            .then((response) => {
                console.log("response", response)
                props.updateMode('');
                props.resetDataAssetValues();
                props.closeDataAssetDialogue();
                props.updateDataFlag(true);
                navigate("/source-systems");
            })
            .catch((error) => {
                props.openSnackbar({ variant: 'error', message: `Failed to create source system ID: ${props.fieldValues.src_sys_id}!` });
                setDisableButton(false);
            })
    }

    const handleEdit = () => {
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
                    "db_port": props.fieldValues.ingstn_pattern === 'database' ? props.fieldValues.db_port : 0,
                    // "db_pass": props.fieldValues.db_pass
                }
            }
        }
        defaultInstance.post('source_system/update', payload)
            .then((response) => {
                console.log("response", response)
                props.updateMode('');
                props.resetDataAssetValues();
                props.closeDataAssetDialogue();
                props.updateDataFlag(true);
                navigate("/source-systems");
            })
            .catch((error) => {
                console.log("error", error)
                props.openSnackbar({ variant: 'error', message: `Encounterd error while editing source system ID: ${props.fieldValues.src_sys_id}!` });
                setDisableButton(false);
            })
    }
    const handleSave = () => {
        let errorLength = validate();
        if (errorLength) {
            props.openSnackbar({ variant: 'error', message: 'Enter all mandatory fields with valid data!' });
        } else {
            // if (props.mode === 'create' || props.mode === 'clone') {
            //     handleCreate();
            // }
            // if (props.mode === 'edit') {
            //     handleEdit();
            // }
            console.log("inside else save", props.fieldValues)
        }
        console.log("inside handle save", props.fieldValues)
    }

    const handleBack = () => {
        props.closeDataAssetDialogue();
    }

    return (
        <div className={classes.root}>
            <div >
                <Accordion style={{ margin: "1% 0" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Column Attributes</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div style={{ padding: "0 2%" }}>
                            <FormControl className={classes.formControl}>
                                <div > ID* </div>
                                <TextField
                                    disabled={true}
                                    margin='dense'
                                    variant='outlined'
                                    value={1}
                                    id="col_id"
                                    onChange={(event) => handleValueChange('col_id', 'colIDError', event.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div >Name*</div>
                                <TextField
                                    error={error.colNameError}
                                    disabled={disableButton}
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.col_nm}
                                    id="col_nm"
                                    onChange={(event) => handleMaxCharacter('col_nm', 'colNameError', event.target.value, 30)}
                                />
                                <FormHelperText>{error.colNameError ? <span style={{ color: 'red' }}>Reached maximum limit of 30 characters</span> : ''}</FormHelperText>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div >Target column name</div>
                                <TextField
                                    error={error.targetColumnNameError}
                                    disabled={disableButton}
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.tgt_col_nm}
                                    id="tgt_col_nm"
                                    onChange={(event) => handleMaxCharacter('tgt_col_nm', 'targetColumnNameError', event.target.value, 30)}
                                />
                                <FormHelperText>{error.targetColumnNameError ? <span style={{ color: 'red' }}>Reached maximum limit of 30 characters</span> : ''}</FormHelperText>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div style={{ marginBottom: '3%' }}>Target Data Type*</div>
                                <Select
                                    error={error.targetDataTypeError}
                                    disabled={disableButton}
                                    margin="dense"
                                    variant="outlined"
                                    id="tgt_data_type"
                                    value={props.fieldValues.tgt_data_type}
                                    onChange={(event) => handleValueChange('tgt_data_type', 'targetDataTypeError', event.target.value)}
                                >
                                    <MenuItem value="">
                                        <em>Select target data type</em>
                                    </MenuItem>
                                    {TARGET_DATA_TYPE.map(item => {
                                        return <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div > Description* </div>
                                <TextField
                                    error={error.colDescriptionError}
                                    disabled={disableButton}
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.col_desc}
                                    id="col_desc"
                                    onChange={(event) => handleValueChange('col_desc', 'colDescriptionError', event.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div style={{ marginBottom: '3%' }}>Data Classification*</div>
                                <Select
                                    error={error.dataClassificationError}
                                    disabled={disableButton}
                                    margin="dense"
                                    variant="outlined"
                                    id="data_classification"
                                    value={props.fieldValues.data_classification}
                                    onChange={(event) => handleValueChange('data_classification', 'dataClassificationError', event.target.value)}
                                >
                                    {DATA_CLASSIFICATION.map(item => {
                                        return <MenuItem key={item.value} value={item.value} >{item.name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div > Trigger file pattern</div>
                                <TextField
                                    type={"number"}
                                    error={error.columnLengthError}
                                    disabled={disableButton}
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.col_length}
                                    id="col_length"
                                    onChange={(event) => handleValueChange('data_classification', 'dataClassificationError', event.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div style={{ marginBottom: '3%' }}> Enable Tokenization</div>
                                <Select
                                    error={error.tokenizationError}
                                    disabled={disableButton}
                                    margin="dense"
                                    variant="outlined"
                                    id="req_tokenization"
                                    value={props.fieldValues.req_tokenization}
                                    onChange={(event) => handleValueChange('req_tokenization', 'tokenizationError', event.target.value)}
                                >
                                    {BOOLEAN_VALUES.map(item => {
                                        return <MenuItem key={item.value} value={item.value} >{item.name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div style={{ marginBottom: '3%' }}>Primary key Indicator</div>
                                <Select
                                    error={error.primaryKeyIndicatorError}
                                    disabled={disableButton}
                                    margin="dense"
                                    variant="outlined"
                                    id="pk_ind"
                                    value={props.fieldValues.pk_ind}
                                    onChange={(event) => handleValueChange('pk_ind', 'primaryKeyIndicatorError', event.target.value)}
                                >
                                    {BOOLEAN_VALUES.map(item => {
                                        return <MenuItem key={item.value} value={item.value} >{item.name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div style={{ marginBottom: '3%' }}>Data Type*</div>
                                <Select
                                    error={error.dataTypeError}
                                    disabled={disableButton}
                                    margin="dense"
                                    variant="outlined"
                                    id="data_type"
                                    value={props.fieldValues.data_type}
                                    onChange={(event) => handleValueChange('data_type', 'dataTypeError', event.target.value)}
                                >
                                    <MenuItem value="">
                                        <em>Select data type</em>
                                    </MenuItem>
                                    {TARGET_DATA_TYPE.map(item => {
                                        return <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            {props.mode === 'view' &&
                                <FormControl className={classes.formControl}>
                                    <div >Last Modified On</div>
                                    <TextField
                                        disabled={disableButton}
                                        margin='dense'
                                        variant='outlined'
                                        value={props.fieldValues.modified_ts}
                                        id="modified_ts"
                                        onChange={(event) => handleValueChange('modified_ts', 'modifiedtimeStampError', event.target.value)}
                                    />
                                </FormControl>}
                            <Tooltip title="Add new column" placement='top'>
                                <Fab size="large" color="primary" style={{ float: "right", margin: "1% 4% 0 0" }} >
                                    <AddSharpIcon style={{ color: 'white' }} />
                                </Fab>
                            </Tooltip>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>

    );
}

const mapStateToProps = state => ({
    open: state.dataAssetState.dialogue.flag,
    fieldValues: state.dataAssetState.dataAssetValues,
    mode: state.dataAssetState.updateMode.mode,
    dataFlag: state.dataAssetState.updateDataFlag.dataFlag
})
const mapDispatchToProps = dispatch => bindActionCreators({
    openSnackbar,
    updateMode,
    updateDataFlag,
    dataAssetFieldValue,
    closeDataAssetDialogue,
    resetDataAssetValues,
    updateAllDataAssetValues
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ColumnAttributes);