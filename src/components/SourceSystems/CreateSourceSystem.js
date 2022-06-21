import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import { MECHANISM, INGESTION_PATTERN, DB_TYPE } from 'components/Constants/SourceSystemConstants'
import { sourceSystemFieldValue, closeSourceSystemSidebar, resetSourceSystemValues } from 'actions/sourceSystemsAction'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ReplayIcon from '@material-ui/icons/Replay';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
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
        margin: '0px 4% 1% 0px',
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
        // '&:hover': {
        //    backgroundColor: '#F7901D',
        //    color: 'white',
        // }
    },
}));

const CreateSourceSystem = (props) => {
    const classes = useStyles();
    const [tabIndex, setTabIndex] = useState(0);
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

    const handleReset = () => {
        props.resetSourceSystemValues();
    }

    const handleCancel = () => {
        props.resetSourceSystemValues();
        props.closeSourceSystemSidebar();
        console.log(props)
        // props.setOpenCreateScreen(false);
    }
    const handleSave = () => {
        console.log("inside handle save",props.fieldValues)
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Link to="/source-systems" className={classes.link}>
                <ArrowBackIosIcon fontSize='small' />
                <span>Back</span>
            </Link>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1%' }}>
                <span style={{ fontWeight: 'bold', fontSize:'16px' }}>  New Source System </span>
                <div className={classes.link} onClick={handleReset}>
                    <ReplayIcon fontSize='small' />
                    <span>Reset</span>
                </div>
            </div>
            <Paper className={classes.paper}>
                <div style={{ padding: '3%' }}>
                    <div>
                        <div style={{ fontWeight: 'bold', marginBottom: '2%' }}>Source System Attributes</div>
                        <div>
                            <FormControl className={classes.formControl}>
                                <div > Source System Id </div>
                                <TextField
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.src_sys_id}
                                    id="id_label"
                                    onChange={(event) => handleValueChange('src_sys_id', 'idError', event.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div > Source System Name</div>
                                <TextField
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.src_sys_nm}
                                    id="name_label"
                                    onChange={(event) => handleValueChange('src_sys_nm', 'nameError', event.target.value)}
                                />
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
                                <div style={{ marginBottom: '5px' }}>Mechanism</div>
                                <Select
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
                                <div > Data Owner </div>
                                <TextField
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
                            <FormControl className={classes.formControl}>
                                <div >Bucket Name </div>
                                <TextField
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.bucket_name}
                                    id="bucketName_label"
                                    onChange={(event) => handleValueChange('bucket_name', 'bucketNameError', event.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div style={{ marginBottom: '5px' }}>Ingestion Pattern</div>
                                <Select
                                    margin="dense"
                                    variant="outlined"
                                    id="pattern_value"
                                    value={props.fieldValues.ingstn_pattern}
                                    onChange={(event) => handleValueChange('ingstn_pattern', 'ingestionPatternError', event.target.value)}
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
                    <div>
                        <div style={{ fontWeight: 'bold', margin: '2% 0px 2% 0px' }}>Database Attributes</div>
                        <div>
                            <FormControl className={classes.formControl}>
                                <div >DB Host</div>
                                <TextField
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.db_hostname}
                                    id="host_label"
                                    onChange={(event) => handleValueChange('db_hostname', 'dbHostError', event.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div style={{ marginBottom: '5px' }}>DB Type</div>
                                <Select
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
                                <div >DB Name</div>
                                <TextField
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.db_name}
                                    id="dbName_label"
                                    onChange={(event) => handleValueChange('db_name', 'dbNameError', event.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div >DB Port</div>
                                <TextField
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
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.db_schema}
                                    id="dbSchema_label"
                                    onChange={(event) => handleValueChange('db_schema', 'dbSchemaError', event.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div >DB Username</div>
                                <TextField
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.db_username}
                                    id="port_label"
                                    onChange={(event) => handleValueChange('db_username', 'dbUsernameError', event.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div >DB Password</div>
                                <TextField
                                    margin='dense'
                                    variant='outlined'
                                    value={props.fieldValues.db_pass}
                                    id="dbPass_label"
                                    onChange={(event) => handleValueChange('db_pass', 'dbPassError', event.target.value)}
                                />
                            </FormControl>
                        </div>
                    </div>
                </div>
            </Paper>
            <Button className={classes.button} style={{backgroundColor: '#00B1E8'}} onClick={handleSave}>Save</Button>
            <Button className={classes.button} style={{backgroundColor:'#A3A3A390'}} onClick={handleCancel}>Cancel</Button>
        </div>

    );
}

const mapStateToProps = state => ({
    open: state.sourceSystemState.sidebar.sidebarFlag,
    fieldValues: state.sourceSystemState.sourceSystemValues,
    mode: state.sourceSystemState.updateMode.mode,

})
const mapDispatchToProps = dispatch => bindActionCreators({
    sourceSystemFieldValue,
    closeSourceSystemSidebar,
    resetSourceSystemValues
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateSourceSystem);