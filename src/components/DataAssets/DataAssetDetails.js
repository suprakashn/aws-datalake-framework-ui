import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from '@material-ui/core/Paper';
import Close from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Button, CircularProgress } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Tooltip from '@material-ui/core/Tooltip';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import defaultInstance from 'routes/defaultInstance';
import {updateMode} from 'actions/dataAssetActions'
import { openSnackbar } from 'actions/notificationAction';
import ColumnAttributes from 'components/DataAssets/ColumnAttributes';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5),
    marginTop: theme.spacing(2)
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
  },
  paper: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
    position: 'relative',
    margin: theme.spacing(2),
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
    minWidth: '28%',
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
}));

const DataAssetDetails = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [deleting, setDeletingFlag] = useState(false);

  const handleEdit = () => {
    props.updateMode('edit');
    navigate("/data-assets/create-data-asset")
  }

  const handleDelete = async () => {
    try {
      setDeletingFlag(true);
      const response = await defaultInstance.post('dataasset/delete', {asset_id:props.assetFieldValues.asset_id, src_sys_id:props.assetFieldValues.src_sys_id});
      setDeletingFlag(false);
      if (response.data.responseStatus) {
        props.openSnackbar({ variant: 'success', message: `${response.data.responseMessage}` });
      } else {
        props.openSnackbar({ variant: 'error', message: `${response.data.responseMessage}` });
      }
      navigate("/data-assets");
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
    navigate("/data-assets");
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div style={{ display: 'flex' }} onClick={handleClose}>
        <Link to="/data-assets" className={classes.link}>
          <ArrowBackIosIcon fontSize='small' />
          <span>Back</span>
        </Link></div>
      <Paper className={classes.paper} elevation={3}>
        <div style={{padding: '2% 3%'}}><Typography className={classes.heading}> Data Asset ID : <span style={{ fontWeight: 'bold' }}> {props.assetFieldValues.asset_id}</span></Typography></div>
        <Tooltip title="close">
          <Close style={{ position: 'absolute', top: 24, right: 17, cursor: 'pointer', color: '#F7901D' }} onClick={handleClose} />
        </Tooltip>
        <Tabs style={{padding: '0 3% 3% 3%'}}>
          {['Asset Attributes', 'Ingestion Attributes', 'Column Attributes', 'DQ Rules'].map((tab, index) => {
            return <Tab style={{
              fontWeight: tabIndex === index ? 'bold' : '',
              border: 'none',
              borderBottom: tabIndex === index ? '5px solid #F7901D' : ''
            }} onClick={() => setTabIndex(index)}><span>{tab}</span></Tab>
          })}
          <TabPanel>
            <div style={{ border: '1px solid #CBCBCB' }}>
              <div style={{ marginLeft: '3%', paddingTop: 10 }}>
                <FormControl className={classes.formControl}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    ID
                  </div>
                  <div>{props.assetFieldValues.asset_id}</div>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    Source System ID
                  </div>
                  <div>{props.assetFieldValues.src_sys_id}</div>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    Target ID
                  </div>
                  <div>{props.assetFieldValues.target_id}</div>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    Header
                  </div>
                  <div>{props.assetFieldValues.file_header}</div>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    Multi part file
                  </div>
                  <div>{props.assetFieldValues.multipartition}</div>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    File type
                  </div>
                  <div>{props.assetFieldValues.file_type}</div>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    Name
                  </div>
                  <div>{props.assetFieldValues.asset_nm}</div>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    Trigger file pattern
                  </div>
                  <div>{props.assetFieldValues.trigger_file_pattern}</div>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    Delimiter
                  </div>
                  <div>{props.assetFieldValues.file_delim}</div>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    Enable file encryption
                  </div>
                  <div>{props.assetFieldValues.file_encryption_ind}</div>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    Asset Owner
                  </div>
                  <div>{props.fieldValues.asset_owner}</div>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    Support Contact
                  </div>
                  <div>{props.fieldValues.support_cntct}</div>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    Enable Redshift stage load
                  </div>
                  <div>{props.fieldValues.rs_load_ind}</div>
                </FormControl>

              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div style={{ border: '1px solid #CBCBCB' }}>
              <div style={{ marginLeft: '3%', paddingTop: 10 }}>
                <FormControl className={classes.formControl}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    Source Table Name
                  </div>
                  <div>{props.ingestionFieldValues.src_table_name}</div>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    Source SQL Query
                  </div>
                  <div>{props.ingestionFieldValues.src_sql_query}</div>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    Ingestion Source Path
                  </div>
                  <div>{props.ingestionFieldValues.ingstn_src_path}</div>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    Trigger Mechanism
                  </div>
                  <div>{props.ingestionFieldValues.trigger_mechanism}</div>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    Frequency
                  </div>
                  <div>{props.ingestionFieldValues.frequency}</div>
                </FormControl>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <ColumnAttributes />
          </TabPanel>
        </Tabs>
      </Paper>
      <div>
        {props.mode === 'view' && <Button onClick={handleEdit} className={classes.button}>Edit</Button>}
        {props.mode === 'delete' &&
          <Button onClick={handleDelete} disabled={deleting} className={classes.button} >
            {deleting && <>Deleting <CircularProgress size={16} style={{ marginLeft: '10px', color: 'white' }} /></>}
            {!deleting && 'Delete'}
          </Button>
        }
        <Button onClick={handleClose} disabled={deleting} className={classes.button} style={{ backgroundColor: '#A3A3A390' }} >Close</Button>
        </div>
    </div>
  );
}

const mapStateToProps = state => ({
  mode: state.dataAssetState.updateMode.mode,
  fieldValues: state.dataAssetState.dataAssetValues,
  assetFieldValues: state.dataAssetState.dataAssetValues.asset_info,
  ingestionFieldValues: state.dataAssetState.dataAssetValues.ingestion_attributes,
})
const mapDispatchToProps = dispatch => bindActionCreators({
  updateMode,
  openSnackbar
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DataAssetDetails);