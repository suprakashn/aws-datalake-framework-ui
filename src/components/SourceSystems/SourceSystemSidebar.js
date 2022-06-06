import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import { MECHANISM, INGESTION_PATTERN, DB_TYPE } from 'components/Constants/SourceSystemConstants'
import { sourceSystemFieldValue } from 'actions/sourceSystemsAction'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 240,
        margin: 15,
        fontSize: 14
    },
}));

const SourceSystemSidebar = (props) => {
    const classes = useStyles();
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

    return (
        <div>
            {console.log("mode",props.mode)}
            <div style={{ backgroundColor: '#49494A', color: 'white', textAlign: 'center', padding: 10, fontWeight: 'bold', fontSize: 16 }}>
                <span>{`Source system Attributes`}</span>
            </div>
            <div style={{ marginLeft: '3%' }}>
                <div>
                    
                    <FormControl className={classes.formControl}>
                        <InputLabel id="id-label">{<span style={{ color: error.idError ? 'red' : '' }}>Source System Id</span>}</InputLabel>
                        <Input
                            disabled={props.mode !== 'create'}
                            value={props.fieldValues.src_sys_id}
                            id="id_label"
                            onChange={(event) => handleValueChange('src_sys_id', 'idError', event.target.value)}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="name-label">{<span style={{ color: error.nameError ? 'red' : '' }}>Source System Name</span>}</InputLabel>
                        <Input
                            value={props.fieldValues.src_sys_nm}
                            id="name_label"
                            onChange={(event) => handleValueChange('src_sys_nm', 'nameError', event.target.value)}
                        />
                    </FormControl>
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="description-label">{<span style={{ color: error.descriptionError ? 'red' : '' }}>Source System Description</span>}</InputLabel>
                        <Input
                            value={props.fieldValues.src_sys_desc}
                            id="description_label"
                            onChange={(event) => handleValueChange('src_sys_desc', 'descriptionError', event.target.value)}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="mechanismLabel">{<span style={{ color: error.mechanismError ? 'red' : '' }}>Mechanism</span>}</InputLabel>
                        <Select
                            labelId="mechanismLabel"
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
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="dataOwner-label">{<span style={{ color: error.dataOwnerError ? 'red' : '' }}>Data Owner</span>}</InputLabel>
                        <Input
                            value={props.fieldValues.data_owner}
                            id="dataOwner_label"
                            onChange={(event) => handleValueChange('data_owner', 'idError', event.target.value)}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="supportContact-label">{<span style={{ color: error.supportContactError ? 'red' : '' }}>Support Contact</span>}</InputLabel>
                        <Input
                            value={props.fieldValues.support_cntct}
                            id="supportContact_label"
                            onChange={(event) => handleValueChange('support_cntct', 'supportContactError', event.target.value)}
                        />
                    </FormControl>
                </div>
                <div>
                    {props.mode !=='create' && 
                    <FormControl className={classes.formControl}>
                        <InputLabel id="bucketName-label">{<span style={{ color: error.bucketNameError ? 'red' : '' }}>Bucket Name</span>}</InputLabel>
                        <Input
                            value={props.fieldValues.bucket_name}
                            id="bucketName_label"
                            onChange={(event) => handleValueChange('bucket_name', 'bucketNameError', event.target.value)}
                        />
                    </FormControl>}
                    <FormControl className={classes.formControl}>
                        <InputLabel id="patternLabel">{<span style={{ color: error.ingestionPatternError ? 'red' : '' }}>Ingestion Pattern</span>}</InputLabel>
                        <Select
                            labelId="patternLabel"
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
            {props.fieldValues.ingstn_pattern === 'database' && <div style={{marginTop: 10}}>
                <div style={{ backgroundColor: '#49494A', color: 'white', textAlign: 'center', padding: 10, fontWeight: 'bold', fontSize: 16 }}>
                    <span>{`Database Properties`}</span>
                </div>
                <div style={{ marginLeft: '3%' }}>
                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="host-label">{<span style={{ color: error.dbHostError ? 'red' : '' }}>DB Host</span>}</InputLabel>
                            <Input
                                value={props.fieldValues.db_hostname}
                                id="host_label"
                                onChange={(event) => handleValueChange('db_hostname', 'dbHostError', event.target.value)}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="dbTypeLabel">{<span style={{ color: error.dbTypeError ? 'red' : '' }}>DB Type</span>}</InputLabel>
                            <Select
                                labelId="dbTypeLabel"
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
                    </div>
                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="dbName-label">{<span style={{ color: error.dbNameError ? 'red' : '' }}>DB Name</span>}</InputLabel>
                            <Input
                                value={props.fieldValues.src_sys_id}
                                id="dbName_label"
                                onChange={(event) => handleValueChange('db_name', 'dbNameError', event.target.value)}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="port-label">{<span style={{ color: error.dbPortError ? 'red' : '' }}>DB Port</span>}</InputLabel>
                            <Input
                                value={props.fieldValues.db_port}
                                id="port_label"
                                onChange={(event) => handleValueChange('db_port', 'dbPortError', event.target.value)}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="dbSchema-label">{<span style={{ color: error.dbSchemaError ? 'red' : '' }}>DB Schema</span>}</InputLabel>
                            <Input
                                value={props.fieldValues.db_schema}
                                id="dbSchema_label"
                                onChange={(event) => handleValueChange('db_schema', 'dbSchemaError', event.target.value)}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="dbUsername-label">{<span style={{ color: error.dbUsernameError ? 'red' : '' }}>DB Username</span>}</InputLabel>
                            <Input
                                value={props.fieldValues.db_username}
                                id="dbUsername_label"
                                onChange={(event) => handleValueChange('db_username', 'dbUsernameError', event.target.value)}
                            />
                        </FormControl>
                    </div>
                    {props.mode === 'create' && 
                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="dbPass-label">{<span style={{ color: error.dbPassError ? 'red' : '' }}>DB Password</span>}</InputLabel>
                            <Input
                                value={props.fieldValues.db_pass}
                                id="dbPass_label"
                                onChange={(event) => handleValueChange('db_pass', 'dbPassError', event.target.value)}
                            />
                        </FormControl>
                    </div>}
                </div>
            </div>}
        </div>
    );
}

const mapStateToProps = state => ({
    fieldValues: state.sourceSystemState.sourceSystemValues,
    mode: state.sourceSystemState.updateMode.mode,

})
const mapDispatchToProps = dispatch => bindActionCreators({
    sourceSystemFieldValue
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SourceSystemSidebar);