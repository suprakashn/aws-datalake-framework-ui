import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link , useNavigate} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Close from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Tooltip from '@material-ui/core/Tooltip';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import defaultInstance from 'routes/defaultInstance';
import { closeDataAssetDialogue, updateAllDataAssetValues, updateMode, updateDataFlag } from 'actions/dataAssetActions'

const useStyles = makeStyles((theme) => ({
  dialogCustomizedWidth: {
    'max-width': '65%'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '25%',
    margin: 15,
    fontSize: 14,
    wordBreak: 'break-word',
    maxWidth: '28%'
  },
  button: {
    float: 'right',
    margin: '1vh',
    color: 'white',
    minWidth: '7%',
    marginTop: '12px',
},
}));

const ViewDataAsset = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
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

  const handleEdit = () => {
    props.updateMode('edit');
    props.updateAllDataAssetValues({ ...props.selectedRow })
    navigate("/data-assets/create-data-asset")
  }

  const handleDelete = () => {
    defaultInstance.post('source_system/delete?tasktype=delete', {"src_config":{"src_sys_id": props.fieldValues.src_sys_id} })
            .then((response) => {
                console.log("response", response)
            })
            .catch((error) => {
                console.log("error", error)
            })
            props.closeDataAssetDialogue();
            props.updateDataFlag(true);
            navigate("/data-assets");
  }

  const handleClose = () => {
    setTabIndex(0);
    props.closeDataAssetDialogue();
  }

  return (
    <Dialog open={props.open} fullWidth classes={{ paperFullWidth: classes.dialogCustomizedWidth }}>
      <DialogTitle >
        {props.fieldValues.src_sys_id ? <div >Data Asset ID : <span style={{ fontWeight: 'bold' }}> {props.fieldValues.src_sys_id}</span></div> : ''}
        <Tooltip title="close">
          <Close style={{ position: 'absolute', top: 24, right: 17, cursor: 'pointer', color: '#F7901D' }} onClick={handleClose} />
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
              }} onClick={() => setTabIndex(0)}><span>Asset Attributes</span></Tab>
              <Tab style={{
                fontWeight: tabIndex === 1 ? 'bold' : '',
                //margin: ' 0 20px',
                border: 'none',
                borderBottom: tabIndex === 1 ? '10px solid #F7901D' : ''
              }} onClick={() => setTabIndex(1)}><span>Ingestion Attributes</span></Tab>
            </TabList>
            <TabPanel>
              <div style={{ border: '1px solid #CBCBCB' }}>
                <div style={{ marginLeft: '3%', paddingTop: 10 }}>
                <FormControl className={classes.formControl}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                      Asset Id
                    </div>
                    <div>{props.fieldValues.asset_id}</div>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                      Source System Id
                    </div>
                    <div>{props.fieldValues.src_sys_id}</div>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                      Target ID
                    </div>
                    <div>{props.fieldValues.target_id}</div>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                      File Header
                    </div>
                    <div>{props.fieldValues.file_header}</div>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                      Mechanism
                    </div>
                    <div>{props.fieldValues.mechanism}</div>
                  </FormControl>

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
            </TabPanel>
            <TabPanel>
              <div style={{ border: '1px solid #CBCBCB' }}>
                <div style={{ marginLeft: '3%', paddingTop: 10 }}>
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
            </TabPanel>
          </Tabs>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} className={classes.button} style={{ backgroundColor: '#A3A3A390' }} > Close </Button>
        {props.mode === 'view' && <Button onClick={handleEdit} className={classes.button} style={{ backgroundColor: '#00B1E8' }} >Edit</Button>}
        {props.mode === 'delete' && <Button onClick={handleDelete} className={classes.button} style={{ backgroundColor: '#00B1E8' }} >Delete</Button>}
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = state => ({
  open: state.dataAssetState.dialogue.flag,
  fieldValues: state.dataAssetState.dataAssetValues,
  mode: state.dataAssetState.updateMode.mode,
  dataFlag: state.dataAssetState.updateDataFlag.dataFlag

})
const mapDispatchToProps = dispatch => bindActionCreators({
  updateMode,
  updateDataFlag,
  closeDataAssetDialogue,
  updateMode,
  updateAllDataAssetValues,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ViewDataAsset);