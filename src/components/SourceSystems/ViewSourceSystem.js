import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Close from '@material-ui/icons/Close';
import { Button, CircularProgress } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Tooltip from '@material-ui/core/Tooltip';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import defaultInstance from 'routes/defaultInstance';
import { sourceSystemFieldValue, closeSourceSystemSidebar, updateAllSourceSystemValues, updateMode, updateDataFlag } from 'actions/sourceSystemsAction'

const useStyles = makeStyles((theme) => ({
  dialogCustomizedWidth: {
    'max-width': '65%'
  },
  formControl: {
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
  primaryBtn: {
    background: '#00B1E8',
    '&:disabled': {
        background: '#ccc',
        color: 'white',
    },
    '&:hover': {
      background: '#0192bf',
    }
  }
}));

const ViewSourceSystem = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [deleting, setDeletingFlag] = useState(false);

  const handleEdit = () => {
    props.updateMode('edit');
    props.updateAllSourceSystemValues({ ...props.selectedRow })
    navigate("/create-source-system")
  }

  const handleDelete = async () => {
    try {
      setDeletingFlag(true);
      const requestData = {
        src_config: {
          src_sys_id: props.fieldValues.src_sys_id
        }
      }
      const response = await defaultInstance.post('sourcesystem/delete?tasktype=delete', requestData)
      setDeletingFlag(false);
      props.openSnackbar({ variant: 'success', message: 'Successfully Deleted' });
      props.updateFetchDataFlag(true);
    }
    catch (ex) {
      console.log(ex);
      setDeletingFlag(false);
      props.openSnackbar({ variant: 'error', message: 'Error occurred while deleting' });
    }
    props.updateMode('');
  }

  const handleClose = () => {
    setTabIndex(0);
    props.closeSourceSystemSidebar();
  }

  return (
    <Dialog open={props.open} fullWidth classes={{ paperFullWidth: classes.dialogCustomizedWidth }}>
      <DialogTitle >
        {props.mode === 'view' && <> {props.fieldValues.src_sys_id ? <div style={{ fontWeight: 'bold' }}>View ID: <span > {props.fieldValues.src_sys_id}</span></div> : ''} </>}
        {props.mode === 'delete' && <> {props.fieldValues.src_sys_id ? <div style={{ fontWeight: 'bold' }}>Delete ID: <span > {props.fieldValues.src_sys_id}</span></div> : ''} </>}
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
              }} onClick={() => setTabIndex(0)}><span>Source system Attributes</span></Tab>
              <Tab style={{
                fontWeight: tabIndex === 1 ? 'bold' : '',
                //margin: ' 0 20px',
                border: 'none',
                borderBottom: tabIndex === 1 ? '10px solid #F7901D' : ''
              }} onClick={() => setTabIndex(1)}><span>Database Properties</span></Tab>
            </TabList>
            <TabPanel>
              <div style={{ border: '1px solid #CBCBCB' }}>
                <div style={{ marginLeft: '3%', paddingTop: 10 }}>
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

                  <FormControl className={classes.formControl}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                      Source System Description
                    </div>
                    <div>{props.fieldValues.src_sys_desc}</div>
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
        {props.mode === 'delete' &&
          <Button onClick={handleDelete} disabled={deleting} className={[classes.button, classes.primaryBtn].join(' ')} >
            {deleting && <>Deleting <CircularProgress size={16} style={{ marginLeft: '10px', color: 'white' }} /></>}
            {!deleting && 'Delete'}
          </Button>
        }
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
  updateMode,
  updateAllSourceSystemValues,
  sourceSystemFieldValue,
  closeSourceSystemSidebar,
  updateDataFlag
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ViewSourceSystem);