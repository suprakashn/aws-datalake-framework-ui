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
import { sourceSystemFieldValue, closeSourceSystemDialog, updateAllSourceSystemValues, updateMode, updateDataFlag } from 'actions/sourceSystemsAction'
import { openSnackbar } from 'actions/notificationAction';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles((theme) => ({
  dialogCustomizedWidth: {
    'max-width': '65%',
    'min-height': '450px'
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
  "tabHeader": {
    listStyleType: 'none',
    marginRight: '20px',
    paddingBottom: '8px',
    cursor: 'pointer',
    '&:focus:after': {
      display: 'none'
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
    navigate("./edit")
  }

  const handleDelete = async () => {
    try {
      setDeletingFlag(true);
      const response = await defaultInstance.post('source_system/delete?tasktype=delete', { "src_config": { "src_sys_id": props.fieldValues.src_sys_id } })
      props.closeSourceSystemDialog();
      setDeletingFlag(false);
      if (response.data.responseStatus) {
        props.updateDataFlag(true);
        props.openSnackbar({ variant: 'success', message: `${response.data.responseMessage}` });
      } else {
        props.openSnackbar({ variant: 'error', message: `${response.data.responseMessage}` });
      }
      navigate("/source-systems");
    }
    catch (error) {
      console.log("error", error);
      setDeletingFlag(false);
      props.openSnackbar({ variant: 'error', message: `Failed to delete the source system!` });
    }

  }

  const handleClose = () => {
    setTabIndex(0);
    props.updateMode('');
    props.closeSourceSystemDialog();
  }

  return (
    
    <Dialog open={props.open} fullWidth classes={{ paperFullWidth: classes.dialogCustomizedWidth }}>
      <DialogTitle >
        {props.fieldValues.src_sys_id ? <div>Source System ID : <span style={{ fontWeight: 'bold' }}> {props.fieldValues.src_sys_id}</span></div> : ''}
        <Tooltip title="close">
          <Close style={{ position: 'absolute', top: 24, right: 17, cursor: 'pointer', color: '#F7901D' }} onClick={handleClose} />
        </Tooltip>
      </DialogTitle>
      <DialogContent>
        <div>
          <Tabs>
            <TabList style={{ display: 'flex', margin: 0, border: 'none' }}>
              <Tab className={classes.tabHeader} style={{
                fontWeight: tabIndex === 0 ? 'bold' : '',
                border: 'none',
                borderBottom: tabIndex === 0 ? '5px solid #F7901D' : ''
              }} onClick={() => setTabIndex(0)}><span>Source system Attributes</span></Tab>
              {props.fieldValues.ingstn_pattern === 'database' &&
                <Tab className={classes.tabHeader} style={{
                  fontWeight: tabIndex === 1 ? 'bold' : '',
                  //margin: ' 0 20px',
                  border: 'none',
                  borderBottom: tabIndex === 1 ? '5px solid #F7901D' : ''
                }} onClick={() => setTabIndex(1)}><span>Database Properties</span></Tab>
              }
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
            {props.fieldValues.ingstn_pattern === 'database' &&
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
            }
          </Tabs>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={deleting} className={classes.button} style={{ backgroundColor: '#A3A3A390' }} > Close </Button>
        {props.mode === 'view' && <Button onClick={handleEdit} className={classes.button}>Edit</Button>}
        {props.mode === 'delete' &&
          <Button onClick={handleDelete} disabled={deleting} className={classes.button} >
            {deleting && <>Deleting <CircularProgress size={16} style={{ marginLeft: '10px', color: 'white' }} /></>}
            {!deleting && 'Delete'}
          </Button>
        }
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = state => ({
  open: state.sourceSystemState.dialog.dialogFlag,
  fieldValues: state.sourceSystemState.sourceSystemValues,
  mode: state.sourceSystemState.updateMode.mode,

})
const mapDispatchToProps = dispatch => bindActionCreators({
  updateMode,
  updateAllSourceSystemValues,
  sourceSystemFieldValue,
  closeSourceSystemDialog,
  updateDataFlag,
  openSnackbar,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ViewSourceSystem);