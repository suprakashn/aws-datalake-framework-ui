import { Button, CircularProgress, Switch } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Close from '@material-ui/icons/Close';
import { lakeDestinationFieldValue, updateAllLakeDestinationValues, updateFetchDataFlag, updateMode } from 'actions/lakeDestinationsAction';
import { openSnackbar } from 'actions/notificationAction';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { bindActionCreators } from 'redux';
import defaultInstance from 'routes/defaultInstance';

const useStyles = makeStyles((theme) => ({
  dialogCustomizedWidth: {
    'max-width': '65%'
  },
  formControl: {
    minWidth: '25%',
    padding: '15px 25px',
    boxSizing: 'content-box',
    fontSize: 14,
    wordBreak: 'break-word',
    maxWidth: '25%'

  },
  button: {
    float: 'right',
    margin: '2vh',
    backgroundColor: 'black',
    color: '#F7901D',
    minWidth: '100px',
    marginTop: '8px',
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

const ThemeSwitch = withStyles({
  switchBase: {
    color: 'black',
    '&$checked': {
      color: '#F7901D',
    },
    '&$checked + $track': {
      backgroundColor: '#F7901D',
    },
  },
  checked: {},
  track: {},
})(Switch);

const ViewLakeDestination = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [deleting, setDeletingFlag] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleEdit = () => {
    props.updateMode('edit');
    props.updateAllLakeDestinationValues(props.selectedRow)
    navigate("./edit")
  }

  const handleDelete = async () => {
    setDeletingFlag(true);
    try {
      const requestData = {
        target_config: {
          target_id: props.fieldValues.target_id
        }
      }
      const response = await defaultInstance.post('/target_system/delete', requestData)
      if (response.data.responseStatus) {
        props.updateFetchDataFlag(true);
        props.openSnackbar({ variant: 'success', message: response.data.responseMessage });
      } else {
        let message = response.data.responseMessage || `Failed to delete target system ID: ${props.fieldValues.target_id}!`
        props.openSnackbar({ variant: 'error', message });
      }
    }
    catch (ex) {
      props.openSnackbar({ variant: 'error', message: `Failed to delete target system ID: ${props.fieldValues.target_id}!` });

    }
    setDeletingFlag(false);
    props.updateMode('');
  }

  const handleClose = () => {
    setTabIndex(0);
    props.updateMode('');
  }

  return (
    <Dialog open={'true'} fullWidth classes={{ paperFullWidth: classes.dialogCustomizedWidth }}>
      <DialogTitle >
        <div>Target System ID: <span style={{ fontWeight: 'bold' }}> {props.fieldValues.target_id}</span></div>
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
              }} onClick={() => setTabIndex(0)}><span>Lake Destination Attributes</span></Tab>
            </TabList>
            <TabPanel>
              <div style={{ border: '1px solid #CBCBCB' }}>
                <div style={{ marginLeft: '3%', paddingTop: 10 }}>
                  <FormControl className={classes.formControl}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                      Target Id
                    </div>
                    <div>{props.fieldValues.target_id}</div>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                      Domain
                    </div>
                    <div>{props.fieldValues.domain}</div>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                      Subdomain
                    </div>
                    <div>{props.fieldValues.subdomain}</div>
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
                      Enable Redshift Stage Load
                    </div>
                    <div><ThemeSwitch checked={props.fieldValues.rs_load_ind} inputProps={{ 'aria-label': 'primary checkbox' }} /></div>
                  </FormControl>
                  {props.fieldValues.rs_load_ind &&
                    <>
                      <FormControl className={classes.formControl}>
                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                          Redshift DB Name
                        </div>
                        <div>{props.fieldValues.rs_db_nm}</div>
                      </FormControl>
                      <FormControl className={classes.formControl}>
                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                          Redshift Schema Name
                        </div>
                        <div>{props.fieldValues.rs_schema_nm}</div>
                      </FormControl>
                    </>
                  }
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </DialogContent>
      <DialogActions style={{ display: 'block' }}>
        {props.mode === 'delete' && <>
          <Checkbox
            style={{ marginLeft: '1%' }}
            color="secondary"
            checked={checked}
            onChange={(event) => setChecked(event.target.checked)}
          />
          <span style={{ paddingTop: '8px', }}>Are you sure you want to delete this Target System?</span>
        </>}
        {props.mode === 'view' && <Button onClick={handleEdit} className={classes.button}>Edit</Button>}
        {props.mode === 'delete' &&
          <Button onClick={handleDelete} disabled={deleting || !checked} className={classes.button} >
            {deleting && <>Deleting <CircularProgress size={16} style={{ marginLeft: '10px', color: 'white' }} /></>}
            {!deleting && 'Delete'}
          </Button>
        }
        <Button onClick={handleClose} disabled={deleting} className={classes.button} style={{ backgroundColor: '#A3A3A390' }} > Close </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = state => ({
  fieldValues: state.lakeDestinationState.lakeDestinationValues,
  mode: state.lakeDestinationState.updateMode.mode,

})
const mapDispatchToProps = dispatch => bindActionCreators({
  lakeDestinationFieldValue,
  updateMode,
  updateAllLakeDestinationValues,
  updateFetchDataFlag,
  openSnackbar,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ViewLakeDestination);