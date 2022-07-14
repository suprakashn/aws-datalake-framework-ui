import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useNavigate } from 'react-router-dom';
import {
  openDataAssetDialogue, updateMode, closeDataAssetDialogue, updateAllDataAssetValues,
  resetDataAssetValues, updateDataAssetTableData
} from 'actions/dataAssetActions';
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
    color: 'white',
    marginTop: '12px',
  },
}));

const DataAssets = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = ([]);
  const [backdrop, setBackdrop] = useState(false);
  const [data, setData] = useState([{
    "asset_id": "123456",
    "src_sys_id": "269271",
    "target_id": "461725",
    "file_header": "true",
    "multipartition": "false",
    "file_type": "csv",
    "asset_nm": "demo_rankings",
    "trigger_file_pattern": "null",
    "file_delim": ",",
    "file_encryption_ind": "true",
    "asset_owner": "Sagar Das",
    "support_cntct": "sagar.das@tigeranalytics.com",
    "rs_load_ind": true
  },
  {
    "asset_id": "123456",
    "src_sys_id": "269271",
    "target_id": "461725",
    "file_header": "true",
    "multipartition": "false",
    "file_type": "csv",
    "asset_nm": "demo_rankings",
    "trigger_file_pattern": "null",
    "file_delim": ",",
    "file_encryption_ind": "true",
    "asset_owner": "Sagar Das",
    "support_cntct": "sagar.das@tigeranalytics.com",
    "rs_load_ind": true
  }, {
    "asset_id": "123456",
    "src_sys_id": "269271",
    "target_id": "461725",
    "file_header": "true",
    "multipartition": "false",
    "file_type": "csv",
    "asset_nm": "demo_rankings",
    "trigger_file_pattern": "null",
    "file_delim": ",",
    "file_encryption_ind": "true",
    "asset_owner": "Sagar Das",
    "support_cntct": "sagar.das@tigeranalytics.com",
    "rs_load_ind": true
  }, {
    "asset_id": "123456",
    "src_sys_id": "269271",
    "target_id": "461725",
    "file_header": "true",
    "multipartition": "false",
    "file_type": "csv",
    "asset_nm": "demo_rankings",
    "trigger_file_pattern": "null",
    "file_delim": ",",
    "file_encryption_ind": "true",
    "asset_owner": "Sagar Das",
    "support_cntct": "sagar.das@tigeranalytics.com",
    "rs_load_ind": true
  }, {
    "asset_id": "123456",
    "src_sys_id": "269271",
    "target_id": "461725",
    "file_header": "true",
    "multipartition": "false",
    "file_type": "csv",
    "asset_nm": "demo_rankings",
    "trigger_file_pattern": "null",
    "file_delim": ",",
    "file_encryption_ind": "true",
    "asset_owner": "Sagar Das",
    "support_cntct": "sagar.das@tigeranalytics.com",
    "rs_load_ind": true
  }
  ])

  // useEffect(() => {
  //   if (props.dataFlag) {
  //     setBackdrop(true);
  //     defaultInstance.post('/source_system/read?tasktype=read', { "fetch_limit": 'all', "src_config": { "src_sys_id": null } })
  //       .then(response => {
  //         props.updateSourceSysTableData(response.data.body.src_info);
  //         //setData(response.data.body.src_info)
  //         setBackdrop(false);
  //       })
  //       .catch(error => {
  //         console.log("error", error)
  //         props.updateSourceSysTableData([]);
  //         setBackdrop(false);
  //       })
  //   }
  // }, [])

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
            <VisibilityOutlinedIcon onClick={() => { handleAction('view', rowData) }} style={{ color: '#666', fontSize: '18px', margin: '0 0 1px 0px' }}></VisibilityOutlinedIcon>
          </Tooltip>
          <Tooltip placement='top' title="Edit">
            <EditOutlinedIcon onClick={() => { handleEdit(rowData) }} style={{ color: '#666', fontSize: '18px', margin: '0 0 1px 15px' }}></EditOutlinedIcon >
          </Tooltip>
          <Tooltip placement='top' title="Clone">
            <FileCopyOutlinedIcon onClick={() => { handleClone(rowData) }} style={{ color: '#666', fontSize: '18px', margin: '0 0 1px 15px' }}></FileCopyOutlinedIcon>
          </Tooltip>
          <Tooltip placement='top' title="Delete">
            <DeleteOutlineOutlinedIcon onClick={() => { handleAction('delete', rowData) }} style={{ color: '#666', fontSize: '18px', margin: '0 0 1px 15px' }}></DeleteOutlineOutlinedIcon>
          </Tooltip>
          <Tooltip placement='top' title="Url">
            <LaunchIcon onClick={() => { navigate("/data-asset-details") }} style={{ color: '#666', fontSize: '18px', margin: '0 0 1px 15px' }}></LaunchIcon>
          </Tooltip>
        </>
      }
    },
  ];

  const handleCreate = () => {
    props.updateMode('create');
    props.resetDataAssetValues();
  }

  const handleEdit = (selectedRow) => {
    props.updateMode('edit');
    props.updateAllDataAssetValues({ ...selectedRow })
    navigate("/create-data-asset")
  }

  const handleClone = (selectedRow) => {
    props.updateMode('clone');
    props.updateAllDataAssetValues({ ...selectedRow })
    navigate("/create-data-asset")
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
                <Link to="/create-data-asset" >
                  <Button variant="contained" className={classes.button} style={{ backgroundColor: '#00B1E8' }} onClick={() => handleCreate()}>Add New +</Button>
                </Link>
                <MTableToolbar {...toolbarProps} />
              </Box>
            ),
          }}
          // isLoading={backdrop}
          icons={tableIcons}
          title="Data Assets"
          columns={columns}
          data={data}
          options={{
            //selection: true,
            // showTextRowsSelected: false,
            paging: false,
            searchFieldAlignment: 'left',
            showTitle: false,
            draggable: false,
            actionsColumnIndex: -1,
            // toolbarButtonAlignment: "left",
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
              // padding: '0',
              textAlign: 'left'
            },
            // cellStyle: { padding: '5px 0' },
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
  updateDataAssetTableData
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DataAssets);