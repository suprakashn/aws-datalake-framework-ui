import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useNavigate } from 'react-router-dom';
import {
  openDataAssetDialogue, updateMode, closeDataAssetDialogue, updateAllDataAssetValues,
  resetDataAssetValues, updateDataAssetTableData, updateSelectedRow
} from 'actions/dataAssetActions';
import { openSnackbar } from 'actions/notificationAction';
import defaultInstance from 'routes/defaultInstance';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import tableIcons from "components/MetaData/MaterialTableIcons";
import MaterialTable from "material-table";
import { Box, Button, Tooltip } from '@material-ui/core';
import { MTableToolbar } from 'material-table';
import ViewDataAsset from 'components/DataAssets/ViewDataAsset';
import LaunchIcon from '@material-ui/icons/Launch';

const useStyles = makeStyles((theme) => ({
  customWidth: {
    maxWidth: '1060px'
  },
  table: {
    margin: '3%',
    "& .MuiBox-root+div": {
      width: '100%',
    },
    "& .MuiInput-underline:before": {
      borderBottom: 'none'
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: 'none'
    },
    "& .MuiInput-underline:after": {
      borderBottom: 'none'
    },
  },
  button: {
    float: 'right',
    margin: '15px',
    backgroundColor: 'black',
    color: '#F7901D',
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

const DataAssets = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = ([]);
  const [backdrop, setBackdrop] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setBackdrop(true);
    defaultInstance.post('/dataassetinfo/read', { "src_sys_id": null })
      .then(response => {
        setData(response.data.responseBody);
        setBackdrop(false);
      })
      .catch(error => {
        console.log("error", error)
        setData([]);
        setBackdrop(false);
      })
  }, [])


  const columns = [
    {
      title: "Data Asset ID", field: "asset_id", render: (rowData) => {
        return <span style={{ color: 'blue', cursor: 'pointer', paddingLeft: '5%' }} onClick={() => handleAction('view', rowData)}>{rowData.asset_id}</span>
      }
    },
    { title: "Source System ID", field: "src_sys_id", },
    { title: "Data Asset Name", field: "asset_nm", },
    { title: "Target System ID", field: "target_id", },
    { title: "Asset Owner", field: "asset_owner", },
    {
      title: "Actions", field: "", render: (rowData) => {
        return <>
          <Tooltip placement='top' title="View">
            <VisibilityOutlinedIcon onClick={() => { handleActionClick(rowData, 'view') }} style={{ color: '#666', fontSize: '18px', margin: '0 0 1px 0px' }}></VisibilityOutlinedIcon>
          </Tooltip>
          <Tooltip placement='top' title="Edit">
            <EditOutlinedIcon onClick={() => handleActionClick(rowData, 'edit')} style={{ color: '#666', fontSize: '18px', margin: '0 0 1px 15px' }}></EditOutlinedIcon >
          </Tooltip>
          <Tooltip placement='top' title="Clone">
            <FileCopyOutlinedIcon onClick={() => handleActionClick(rowData, 'clone')} style={{ color: '#666', fontSize: '18px', margin: '0 0 1px 15px' }}></FileCopyOutlinedIcon>
          </Tooltip>
          <Tooltip placement='top' title="Delete">
            <DeleteOutlineOutlinedIcon onClick={() => handleActionClick(rowData, 'delete')} style={{ color: '#666', fontSize: '18px', margin: '0 0 1px 15px' }}></DeleteOutlineOutlinedIcon>
          </Tooltip>
          <Tooltip placement='top' title="Catalogs">
            <LaunchIcon onClick={() => handleUrlClick(rowData)} style={{ color: '#666', fontSize: '18px', margin: '0 0 1px 15px' }}></LaunchIcon>
          </Tooltip>
        </>
      }
    },
  ];

  const fetchDataAssetDetails = (rowData, mode) => {
    defaultInstance.post('/dataasset/read', { "asset_id": rowData.asset_id, "src_sys_id": rowData.src_sys_id })
      .then(response => {
        props.updateAllDataAssetValues({ ...response.data.responseBody });
        mode === 'view' || mode === 'delete' ? navigate("/data-assets/create-data-asset") : navigate("/data-assets/data-asset-details")
      })
      .catch(error => {
        console.log("error", error)
        props.openSnackbar({ variant: 'error', message: `Failed to load ${rowData.asset_id} data asset details!` });
      })
  }

  const handleUrlClick = (rowData) => {
    props.updateSelectedRow(rowData);
    navigate("/data-assets/data-catalog-details")
  }

  const handleCreate = () => {
    props.updateMode('create');
    props.resetDataAssetValues();
  }

  const handleActionClick = (selectedRow, mode) => {
    props.resetDataAssetValues();
    props.updateMode(mode);
    fetchDataAssetDetails(selectedRow, mode);
  }

  const handleAction = (mode, selectedRow) => {
    props.updateMode(mode);
    props.openDataAssetDialogue();
    props.updateAllDataAssetValues({ ...selectedRow })
  }

  return (
    <>
      <ViewDataAsset selectedRow={selectedRow} />
      <div className={classes.table}>
        <MaterialTable
          components={{
            Toolbar: (toolbarProps) => (
              <Box >
                <Link to="/data-assets/create-data-asset" >
                  <Button variant="contained" className={classes.button} onClick={() => handleCreate()}>Add New +</Button>
                </Link>
                <MTableToolbar {...toolbarProps} />
              </Box>
            ),
          }}
          isLoading={backdrop}
          icons={tableIcons}
          title="Data Assets"
          columns={columns}
          data={data}
          options={{
            paging: false,
            searchFieldAlignment: 'left',
            showTitle: false,
            draggable: false,
            actionsColumnIndex: -1,
            searchFieldStyle: {
              backgroundColor: '#FFF',
              color: 'black',
              padding: '0.3rem 0.75rem',
              margin: '1.25rem 0',
              boxShadow: '2px 2px 4px 1px #ccc',
              "& svg.MuiSvgIconRoot": {
                fontSize: '1.75rem',
                color: '#707070'
              }
            },
            sorting: true,
            headerStyle: {
              position: 'sticky',
              top: 0,
              backgroundColor: '#F5F5F5',
              fontWeight: 'bold',
              textAlign: 'left'
            },
            actionsCellStyle: {
              minWidth: '200px',
              textAlign: 'left'
            }
          }}
        />
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  open: state.dataAssetState.dialogue.flag,
  fieldValues: state.dataAssetState.dataAssetValues,
  mode: state.dataAssetState.updateMode.mode,
  dataFlag: state.dataAssetState.updateDataFlag.dataFlag,
})
const mapDispatchToProps = dispatch => bindActionCreators({
  openDataAssetDialogue,
  closeDataAssetDialogue,
  updateMode,
  updateAllDataAssetValues,
  resetDataAssetValues,
  updateDataAssetTableData,
  updateSelectedRow,
  openSnackbar
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DataAssets);