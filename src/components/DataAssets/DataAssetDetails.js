import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from '@material-ui/core/Paper';
import Close from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Button, CircularProgress, Backdrop } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Tooltip from '@material-ui/core/Tooltip';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import defaultInstance from 'routes/defaultInstance';
import { updateMode, dqRulesFieldValue, updateAllDataAssetValues } from 'actions/dataAssetActions'
import { openSnackbar, openSideBar } from 'actions/notificationAction';
import ColumnAttributes from 'components/DataAssets/ColumnAttributes';
import Editor from "react-prism-editor";
import PageTitle from 'components/Common/PageTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles((theme) => ({
  dialogCustomizedWidth: {
    'max-width': '40%'
  },
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
    '&:hover': {
      fontWeight: 'bold',
    },
  },
  formControl: {
    minWidth: '28%',
    margin: 15,
    fontSize: 14,
    wordBreak: 'break-word',
    maxWidth: '28%'
  },
  backdrop: {
    backdropFilter: 'blur(1px)',
    zIndex: theme.zIndex.drawer + 1,
    color: 'black',
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
  const [displayField, setDisplayField] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [displayDeleteDialog, setDisplayDeleteDialog] = useState(false);

  useEffect(() => {
    getSourceSystemData();
    fetchDataAssetDetails();
  }, [])

  const getSourceSystemData = () => {
    defaultInstance.post('/source_system/read?tasktype=read', { "fetch_limit": null, "src_config": { "src_sys_id": props.assetFieldValues.src_sys_id } })
      .then(response => {
        if (response.data.responseBody.length > 0 && response.data.responseBody[0].ingstn_pattern === 'file') {
          setDisplayField(true);
        } else {
          setDisplayField(false);
        }
      })
      .catch(error => {
        console.log("error", error)
        setDisplayField(false);
      })
  }

  const fetchDataAssetDetails = () => {
    setBackdrop(true);
    defaultInstance.post('/dataasset/read', { "asset_id": props.selectedRow.asset_id, "src_sys_id": props.selectedRow.src_sys_id })
      .then(response => {
        props.updateAllDataAssetValues({ ...response.data.responseBody });
        setBackdrop(false);
      })
      .catch(error => {
        console.log("error", error)
        setBackdrop(false);
        props.openSnackbar({ variant: 'error', message: `Failed to load ${props.selectedRow.asset_id} data asset details!` });
        navigate('/data-assets');
      })
  }

  const handleEdit = () => {
    props.updateMode('edit');
    navigate("/data-assets/edit")
  }

  const handleDelete = async () => {
    try {
      setDisplayDeleteDialog(false);
      setDeletingFlag(true);
      const response = await defaultInstance.post('dataasset/delete', { asset_id: props.assetFieldValues.asset_id, src_sys_id: props.assetFieldValues.src_sys_id });
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
    <>
      <div className={classes.root}>
        <CssBaseline />
        <Backdrop className={classes.backdrop} open={backdrop} >
          <CircularProgress color="inherit" />
        </Backdrop>
        <PageTitle showInfo={() => props.openSideBar({ heading: 'Data Asset', content: 'Data Assets are the entries within the framework which holds the properties of individual files coming from the various sources. In other words, they are the metadata of source files. The metadata includes column names, datatypes, security classifications, DQ rules, data obfuscation properties etc.' })}>
          Data Asset
        </PageTitle>
        <div style={{ display: 'flex' }} onClick={handleClose}>
          <Link to="/data-assets" className={classes.link}>
            <ArrowBackIosIcon fontSize='small' />
            <span>Back</span>
          </Link>
        </div>
        <Paper className={classes.paper} elevation={3}>
          <div style={{ padding: '2% 3%' }}><Typography className={classes.heading}> Data Asset ID : <span style={{ fontWeight: 'bold' }}> {props.assetFieldValues.asset_id}</span></Typography></div>
          <Tooltip title="close">
            <Close style={{ position: 'absolute', top: 24, right: 17, cursor: 'pointer', color: '#F7901D' }} onClick={handleClose} />
          </Tooltip>
          <Tabs style={{ padding: '0 3% 3% 3%' }}>
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
                      Name
                    </div>
                    <div>{props.assetFieldValues.asset_nm}</div>
                  </FormControl>
                  {displayField &&
                    <>
                      <FormControl className={classes.formControl}>
                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                          Header
                        </div>
                        <div>{(props.assetFieldValues.file_header !== null && props.assetFieldValues.file_header !== undefined) && props.assetFieldValues.file_header.toString()}</div>
                      </FormControl>
                      <FormControl className={classes.formControl}>
                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                          Multi part file
                        </div>
                        <div>{(props.assetFieldValues.multipartition !== null && props.assetFieldValues.multipartition !== undefined) && props.assetFieldValues.multipartition.toString()}</div>
                      </FormControl>
                      <FormControl className={classes.formControl}>
                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                          File type
                        </div>
                        <div>{props.assetFieldValues.file_type}</div>
                      </FormControl>
                      {/* <FormControl className={classes.formControl}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        Trigger file pattern
                      </div>
                      <div>{props.assetFieldValues.trigger_file_pattern}</div>
                    </FormControl> */}
                      <FormControl className={classes.formControl}>
                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                          Delimiter
                        </div>
                        <div>{props.assetFieldValues.file_delim}</div>
                      </FormControl>
                    </>}
                  <FormControl className={classes.formControl}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                      Enable file encryption
                    </div>
                    <div>{(props.assetFieldValues.file_encryption_ind !== null && props.assetFieldValues.file_encryption_ind !== undefined) && props.assetFieldValues.file_encryption_ind.toString()}</div>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                      Asset Owner
                    </div>
                    <div>{props.assetFieldValues.asset_owner}</div>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                      Support Contact
                    </div>
                    <div>{props.assetFieldValues.support_cntct}</div>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                      Enable Redshift stage load
                    </div>
                    <div>{props.assetFieldValues.rs_load_ind.toString()}</div>
                  </FormControl>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div style={{ border: '1px solid #CBCBCB' }}>
                <div style={{ marginLeft: '3%', paddingTop: 10 }}>
                  {displayField &&
                    <>
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
                    </>
                  }
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
            <TabPanel>
              <Editor
                language={'jsx'}
                theme={'default'}
                code={props.dqRulesFieldValues?.join('\n') || ""}
                lineNumber={true}
                readOnly={props.mode == 'view' || props.mode == 'delete'}
                clipboard={true}
                showLanguage={true}
                changeCode={code => {
                  props.dqRulesFieldValue(code?.split('\n').filter(c => c?.trim().length > 0) || [])
                }}
              />
            </TabPanel>
          </Tabs>
        </Paper>
        <div>
          {props.mode === 'view' && <Button onClick={handleEdit} className={classes.button}>Edit</Button>}
          {props.mode === 'delete' &&
            <Button onClick={() => setDisplayDeleteDialog(true)} disabled={deleting} className={classes.button} >
              {deleting && <>Deleting <CircularProgress size={16} style={{ marginLeft: '10px', color: 'white' }} /></>}
              {!deleting && 'Delete'}
            </Button>
          }
          <Button onClick={handleClose} disabled={deleting} className={classes.button} style={{ backgroundColor: '#A3A3A390' }} >Close</Button>
        </div>
      </div>
      <Dialog open={displayDeleteDialog} fullWidth classes={{ paperFullWidth: classes.dialogCustomizedWidth }}>
        <DialogTitle style={{ backgroundColor: '#8080801a' }}>
          Delete Confirmation
          <Tooltip title="close">
            <Close style={{ position: 'absolute', top: 19, right: 17, cursor: 'pointer', color: '#F7901D' }} onClick={() => setDisplayDeleteDialog(false)} />
          </Tooltip>
        </DialogTitle>
        <DialogContent style={{paddingTop:'4%'}}>
           Are you sure you want to delete the data asset <span style={{fontWeight:'bold'}}>{props.assetFieldValues.asset_id}</span> ?
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> setDisplayDeleteDialog(false)} className={classes.button} style={{ backgroundColor: '#A3A3A390' }}>
            Cancel
          </Button>
          <Button onClick={handleDelete} className={classes.button} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const mapStateToProps = state => ({
  mode: state.dataAssetState.updateMode.mode,
  fieldValues: state.dataAssetState.dataAssetValues,
  assetFieldValues: state.dataAssetState.dataAssetValues.asset_info,
  ingestionFieldValues: state.dataAssetState.dataAssetValues.ingestion_attributes,
  dqRulesFieldValues: state.dataAssetState.dataAssetValues.adv_dq_rules,
  selectedRow: state.dataAssetState.updateSelectedRow
})
const mapDispatchToProps = dispatch => bindActionCreators({
  updateMode,
  openSnackbar,
  openSideBar,
  dqRulesFieldValue,
  updateAllDataAssetValues
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DataAssetDetails);