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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { lakeDestinationFieldValue, updateAllLakeDestinationValues } from 'actions/lakeDestinationsAction'
import { useNavigate } from 'react-router';
import { updateMode } from 'actions/lakeDestinationsAction';

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
    margin: '1vh',
    color: 'white',
    minWidth: '7%',
    marginTop: '12px',
  },
}));

const ViewLakeDestination = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);

  const handleEdit = () => {
    props.updateMode('edit');
    props.updateAllLakeDestinationValues({ ...props.selectedRow })
    navigate("/create-lake-destination")
  }

  const handleDelete = () => {
    console.log("delete")
    props.updateMode('');

  }

  const handleClose = () => {
    setTabIndex(0);
    props.updateMode('');
    //props.closeSourceSystemSidebar();
  }

  return (
    <Dialog open={open} fullWidth classes={{ paperFullWidth: classes.dialogCustomizedWidth }}>
      <DialogTitle >
        <div>{props.mode === 'view' ? 'View': 'Delete'} ID: <span style={{ fontWeight: 'bold' }}> {props.fieldValues.target_id}</span></div>
        <Tooltip title="close">
          <Close style={{ position: 'absolute', top: 24, right: 17, cursor: 'pointer', color: '#F7901D' }} onClick={() => setOpen(false)} />
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
  fieldValues: state.lakeDestinationState.lakeDestinationValues,
  mode: state.lakeDestinationState.updateMode.mode,

})
const mapDispatchToProps = dispatch => bindActionCreators({
  lakeDestinationFieldValue,
  updateMode,
  updateAllLakeDestinationValues
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ViewLakeDestination);