import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Close from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { MECHANISM, INGESTION_PATTERN, DB_TYPE } from 'components/Constants/SourceSystemConstants'
import { sourceSystemFieldValue, closeSourceSystemSidebar } from 'actions/sourceSystemsAction'
import { BorderBottom } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
    margin: 15,
    fontSize: 14,
    wordBreak: 'break-word',
    maxWidth: 240
  },
  button: {
    position: 'absolute',
    top: 3,
    left: 4,
    // backgroundColor: '#49494a',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#F7901D',
      color: 'white',
    }
  },
}));

const ViewSourceSystem = (props) => {
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

  return (
    <Dialog classes={{ paper: classes.customWidth }} open={props.open}>
      <DialogTitle >
        {props.mode === 'view' && <> {props.fieldValues.src_sys_id ? <div>ID: <span style={{ fontWeight: 'bold' }}> {props.fieldValues.src_sys_id}</span></div> : ''} </>}
        <Tooltip title="close">
          <Close style={{ position: 'absolute', top: 24, right: 17, cursor: 'pointer', color: '#F7901D' }} onClick={() => props.closeSourceSystemSidebar()} />
        </Tooltip>
      </DialogTitle>
      <DialogContent>
        <div>
          <Tabs>
            <TabList style={{ display: 'flex', margin: 0, border: 'none' }}>
              <Tab style={{
                fontWeight: tabIndex === 0 ? 'bold' : '',
                border: 'none',
                borderBottom: tabIndex === 0 ? '10px solid #F7901D' : ''
              }} onClick={() => setTabIndex(0)}><span>Source system Attributes</span></Tab>
              <Tab style={{
                fontWeight: tabIndex === 1 ? 'bold' : '',
                margin: ' 0 20px',
                border: 'none',
                borderBottom: tabIndex === 1 ? '10px solid #F7901D' : ''
              }} onClick={() => setTabIndex(1)}><span>Database Properties</span></Tab>
              {/* <Tab style={{
            fontWeight: tabIndex === 2 ? 'bold' : '',
            margin: ' 0 20px',
            border: 'none',
            borderBottom: tabIndex === 2 ? '10px solid #F7901D' : ''
          }} onClick={() => setTabIndex(2)}><span>Streaming Data Properties</span></Tab> */}
            </TabList>
            <TabPanel>
              <div style={{ border: '1px solid #CBCBCB' }}>
                <div style={{ marginLeft: '3%', paddingTop: 10 }}>
                  <div>
                    <FormControl className={classes.formControl}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        Source System Id
                      </div>
                      <div>{props.fieldValues.src_sys_id}</div>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        Source System Name
                      </div>
                      <div>{props.fieldValues.src_sys_nm}</div>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl className={classes.formControl}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        Source System Description
                      </div>
                      {/* <div>{props.fieldValues.src_sys_desc}</div> */}
                      <div>
                        n publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
                      </div>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        Mechanism
                      </div>
                      <div>{props.fieldValues.mechanism}</div>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl className={classes.formControl}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        Data Owner
                      </div>
                      <div>{props.fieldValues.data_owner}</div>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        Support Contact
                      </div>
                      <div>{props.fieldValues.support_cntct}</div>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl className={classes.formControl}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        Bucket Name
                      </div>
                      <div>{props.fieldValues.bucket_name}</div>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        Ingestion Pattern
                      </div>
                      <div>{props.fieldValues.ingstn_pattern}</div>
                    </FormControl>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div style={{ border: '1px solid #CBCBCB' }}>
                <div style={{ marginLeft: '3%', paddingTop: 10 }}>
                  <div>
                    <FormControl className={classes.formControl}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        DB Host
                      </div>
                      <div>{props.fieldValues.db_hostname}</div>

                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        DB Type
                      </div>
                      <div>{props.fieldValues.db_type}</div>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl className={classes.formControl}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        DB Name
                      </div>
                      <div>{props.fieldValues.db_name}</div>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        DB Port
                      </div>
                      <div>{props.fieldValues.db_port}</div>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl className={classes.formControl}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        DB Schema
                      </div>
                      <div>{props.fieldValues.db_schema}</div>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        DB Username
                      </div>
                      <div>{props.fieldValues.db_username}</div>

                    </FormControl>
                  </div>
                </div>
              </div>
            </TabPanel>
          </Tabs>
          {/* <div style={{ marginLeft: '3%' }}>
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
                    {props.mode !== 'create' &&
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
            {props.fieldValues.ingstn_pattern === 'database' && <div style={{ marginTop: 10 }}>
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
                                value={props.fieldValues.db_name}
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
            </div>} */}
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus >
          Close
        </Button>
        <Button>Edit</Button>
      </DialogActions>
    </Dialog>
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
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ViewSourceSystem);