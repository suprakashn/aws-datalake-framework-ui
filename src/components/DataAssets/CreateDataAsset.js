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
import ColumnAttributes from 'components/DataAssets/ColumnAttributes';

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

const CreateDataAsset = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [sourceSysData, setSourceSysData] = useState([]);
    const [disableButton, setDisableButton] = useState(false);
    const [cronValue, setCronValue] = useState('');
    const [errorValue, setErrorValue] = useState('');
    const [error, setError] = useState({
        // assetIDError: false,
        // sourceSysIDError: false,
        // targetIDError: false,
        // fileHeaderError: false,
        // multiPartitionError: false,
        // fileTypeError: false,
        // assetNameError: false,
        // triggerFilePtrnError: false,
        // fileDelimterError: false,
        // fileEncryptIndError: false,
        // assetOwnerError: false,
        // supportContactError: false,
        // rsLoadError: false
    })

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
            let dqRules = props.fieldValues['modified_ts']
            console.log('DQ Rules in Array form', dqRules?.split('\n').filter(v => v?.trim().length > 0))
            console.log("inside else save", props.fieldValues)
        }
        console.log("inside handle save", props.fieldValues)
    }

    const handleBack = () => {
        props.closeDataAssetDialogue();
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <div style={{ display: 'flex' }} onClick={handleBack}>
                <Link to="/data-assets" className={classes.link}>
                    <ArrowBackIosIcon fontSize='small' />
                    <span>Back</span>
                </Link></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1%' }}>
                <span style={{ fontWeight: 'bold', fontSize: '16px' }}> {props.mode === 'edit' ? 'Edit Data Asset' : 'New Data Asset'} </span>
                <div className={classes.link} onClick={handleReset}>
                    <ReplayIcon fontSize='small' />
                    <span>Reset</span>
                </div>
            </div>
            <div >
                <Accordion style={{ margin: "1% 0" }} defaultExpanded={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Asset Attributes</Typography>
                        {/* <div style={{ fontWeight: 'bold', marginBottom: '2%' }}>Asset Attributes</div> */}
                    </AccordionSummary>
                    <AccordionDetails>
                        <div style={{ padding: "0 2%" }}>
                            {props.mode !== 'create' && props.mode !== 'clone' &&
                                <FormControl className={classes.formControl}>
                                    <div > ID* </div>
                                    <TextField
                                        disabled={props.mode !== 'create' || disableButton}
                                        margin='dense'
                                        variant='outlined'
                                        value={props.fieldValues.asset_id}
                                        id="id_label"
                                        onChange={(event) => handleValueChange('asset_id', 'assetIDError', event.target.value)}
                                    />
                                </FormControl>}
                            <FormControl className={classes.formControl}>
                                <div style={{ marginBottom: '3%' }}>Source system ID*</div>
                                <Select
                                    error={error.sourceSysIDError}
                                    disabled={disableButton}
                                    margin="dense"
                                    variant="outlined"
                                    id="src_sys_id"
                                    value={props.fieldValues.src_sys_id}
                                    onChange={(event) => handleValueChange('src_sys_id', 'sourceSysIDError', event.target.value)}
                                >
                                    <MenuItem value="">
                                        <em>Select source system ID</em>
                                    </MenuItem>
                                    {sourceSysData.map(item => {
                                        return <MenuItem key={item.src_sys_id} value={item.src_sys_id}>{item.src_sys_id}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div style={{ marginBottom: '3%' }}>Target ID*</div>
                                <Select
                                    error={error.targetIDError}
                                    disabled={disableButton}
                                    margin="dense"
                                    variant="outlined"
                                    id="target_id"
                                    value={props.fieldValues.target_id}
                                    onChange={(event) => handleValueChange('target_id', 'targetIDError', event.target.value)}
                                >
                                    <MenuItem value="">
                                        <em>Select target ID</em>
                                    </MenuItem>
                                    {sourceSysData.map(item => {
                                        return <MenuItem key={item.src_sys_id} value={item.src_sys_id}>{item.src_sys_id}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div style={{ marginBottom: '3%' }}>Header*</div>
                                <Select
                                    error={error.fileHeaderError}
                                    disabled={disableButton}
                                    margin="dense"
                                    variant="outlined"
                                    id="file_header"
                                    value={props.fieldValues.file_header}
                                    onChange={(event) => handleValueChange('file_header', 'fileHeaderError', event.target.value)}
                                >
                                    {BOOLEAN_VALUES.map(item => {
                                        return <MenuItem key={item.value} value={item.value} >{item.name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div style={{ marginBottom: '3%' }}>Multi-part file*</div>
                                <Select
                                    error={error.targetError}
                                    disabled={disableButton}
                                    margin="dense"
                                    variant="outlined"
                                    id="multipartition"
                                    value={props.fieldValues.multipartition}
                                    onChange={(event) => handleValueChange('multipartition', 'multiPartitionError', event.target.value)}
                                >
                                    {BOOLEAN_VALUES.map(item => {
                                        return <MenuItem key={item.value} value={item.value} >{item.name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div style={{ marginBottom: '3%' }}>File type*</div>
                                <Select
                                    error={error.fileTypeError}
                                    disabled={disableButton}
                                    margin="dense"
                                    variant="outlined"
                                    id="file_type"
                                    value={props.fieldValues.file_type}
                                    onChange={(event) => handleValueChange('file_type', 'fileTypeError', event.target.value)}
                                >
                                    <MenuItem value="">
                                        <em>Select file type</em>
                                    </MenuItem>
                                    {FILE_TYPE.map(item => {
                                        return <MenuItem key={item.value} value={item.value} >{item.name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div >Name*</div>
                                <TextField
                                    error={error.assetNameError}
                                    disabled={disableButton}
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.asset_nm}
                                    id="asset_nm"
                                    onChange={(event) => handleMaxCharacter('asset_nm', 'assetNameError', event.target.value, 25)}
                                />
                                <FormHelperText>{error.assetNameError ? <span style={{ color: 'red' }}>Reached maximum limit of 25 characters</span> : ''}</FormHelperText>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div > Trigger file pattern</div>
                                <TextField
                                    error={error.triggerFilePtrnError}
                                    disabled={disableButton}
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.trigger_file_pattern}
                                    id="trigger_file_pattern"
                                    onChange={(event) => handleMaxCharacter('trigger_file_pattern', 'triggerFilePtrnError', event.target.value, 10)}
                                />
                                <FormHelperText>{error.triggerFilePtrnError ? <span style={{ color: 'red' }}>Reached maximum limit of 10 characters</span> : ''}</FormHelperText>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div > Delimiter*</div>
                                <TextField
                                    error={error.fileDelimiterError}
                                    disabled={disableButton}
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.file_delim}
                                    id="file_delim"
                                    onChange={(event) => handleMaxCharacter('file_delim', 'fileDelimiterError', event.target.value, 1)}
                                />
                                <FormHelperText>{error.fileDelimiterError ? <span style={{ color: 'red' }}>Only a single character is allowed</span> : ''}</FormHelperText>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div style={{ marginBottom: '3%' }}> Enable file encryption*</div>
                                <Select
                                    error={error.fileEncryptIndError}
                                    disabled={disableButton}
                                    margin="dense"
                                    variant="outlined"
                                    id="file_encryption_ind"
                                    value={props.fieldValues.file_encryption_ind}
                                    onChange={(event) => handleValueChange('file_encryption_ind', 'fileEncryptIndError', event.target.value)}
                                >

                                    {BOOLEAN_VALUES.map(item => {
                                        return <MenuItem key={item.value} value={item.value} >{item.name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div > Asset Owner* </div>
                                <TextField
                                    error={error.assetOwnerError}
                                    disabled={disableButton}
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.asset_owner}
                                    id="asset_owner"
                                    onChange={(event) => handleValueChange('asset_owner', 'assetOwnerError', event.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div >Support contact*</div>
                                <TextField
                                    disabled={disableButton}
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.support_cntct}
                                    id="support_cntct"
                                    onChange={(event) => handleValueChange('support_cntct', 'supportContactError', event.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div style={{ marginBottom: '3%' }}>Enable Redshift stage load*</div>
                                <Select
                                    error={error.rsLoadError}
                                    disabled={disableButton}
                                    margin="dense"
                                    variant="outlined"
                                    id="rs_load_ind"
                                    value={props.fieldValues.rs_load_ind}
                                    onChange={(event) => handleValueChange('rs_load_ind', 'rsLoadError', event.target.value)}
                                >
                                    {BOOLEAN_VALUES.map(item => {
                                        return <MenuItem key={item.value} value={item.value} >{item.name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion style={{ margin: "1% 0" }} defaultExpanded={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Ingestion Attributes</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div style={{ padding: "0 2%" }}>
                            <FormControl className={classes.formControl}>
                                <div > Source Table Name</div>
                                <TextField
                                    error={error.sourceTableNameError}
                                    disabled={disableButton}
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.src_table_name}
                                    id="src_table_name"
                                    onChange={(event) => handleValueChange('src_table_name', 'sourceTableNameError', event.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div > Source SQL Query </div>
                                <TextField
                                    error={error.sourceSqlQueryError}
                                    disabled={disableButton}
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.src_sql_query}
                                    id="src_sql_query"
                                    onChange={(event) => handleValueChange('src_sql_query', 'sourceSqlQueryError', event.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div > Ingestion Source Path </div>
                                <TextField
                                    error={error.ingestionSourcePathError}
                                    disabled={disableButton}
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.ingstn_src_path}
                                    id="ingstn_src_path"
                                    onChange={(event) => handleValueChange('ingstn_src_path', 'ingestionSourcePathError', event.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div style={{ marginBottom: '3%' }}>Trigger Mechanism</div>
                                <Select
                                    error={error.triggerMechanismError}
                                    disabled={disableButton}
                                    margin="dense"
                                    variant="outlined"
                                    id="trigger_mechanism"
                                    value={props.fieldValues.trigger_mechanism}
                                    onChange={(event) => handleValueChange('trigger_mechanism', 'triggerMechanismError', event.target.value)}
                                >
                                    {BOOLEAN_VALUES.map(item => {
                                        return <MenuItem key={item.value} value={item.value} >{item.name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <Tooltip title="This is a cron tab. Enter digits separated by space. Example: * * * * *" placement='top'>
                                <FormControl className={classes.formControl}>
                                    <div style={{ marginBottom: '3%' }}>Frequency</div>
                                    <TextField
                                        error={error.crontabError}
                                        disabled={disableButton}
                                        margin='dense'
                                        variant='outlined'
                                        id="frequency"
                                        helperText={error.crontabError ? <span style={{ color: 'red' }}>{errorValue}</span> : ''}
                                        value={props.mode === 'create' ? cronValue : props.fieldValues.cron_tab}
                                        onChange={(event) => handleValueChange('frequency', 'crontabError', event.target.value)}
                                    />
                                </FormControl>
                            </Tooltip>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion style={{ margin: "1% 0" }} defaultExpanded={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Column Attributes</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ColumnAttributes />
                    </AccordionDetails>
                </Accordion>
                <Accordion style={{ margin: "1% 0" }} defaultExpanded={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>DQ Rules Attributes</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControl className={classes.formControl}>
                            <div >DQ Rules</div>
                            <TextField
                                disabled={disableButton}
                                margin='dense'
                                multiline
                                maxRows={15}
                                variant='outlined'
                                value={props.fieldValues.modified_ts}
                                id="modified_ts"
                                onChange={(event) => handleValueChange('modified_ts', 'modifiedtimeStampError', event.target.value)}
                            />
                        </FormControl>
                    </AccordionDetails>
                </Accordion>
            </div>

            <Button disabled={disableButton} className={classes.button} style={{ backgroundColor: '#00B1E8' }} onClick={handleSave}>Save</Button>
            <Button disabled={disableButton} className={classes.button} style={{ backgroundColor: '#A3A3A390' }} onClick={handleCancel}>Cancel</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateDataAsset);