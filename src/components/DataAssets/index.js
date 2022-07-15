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
import show from 'images/Show.png';
import edit from 'images/edit.png';
import clone from 'images/clone.png';
import remove from 'images/Remove.png';
import url from 'images/Url.png';
import tableIcons from "components/MetaData/MaterialTableIcons";
import MaterialTable from "material-table";
import { Box, Button, Tooltip } from '@material-ui/core';
import { MTableToolbar } from 'material-table';
import ViewDataAsset from 'components/DataAssets/ViewDataAsset';


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
    backgroundColor:'black',
    color: '#F7901D',
    marginTop: '12px',
    '&:hover': {
      fontWeight: '600',
      backgroundColor:'black',
    }
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
          <Tooltip placement='top' title="View"><img onClick={() => { handleAction('view', rowData) }} src={show} style={{ maxWidth: '13%', padding: '2%', marginRight: '5%' }} /></Tooltip>
          <Tooltip placement='top' title="Edit"><img onClick={() => { handleEdit(rowData) }} src={edit} style={{ maxWidth: '13%', padding: '2%', marginRight: '5%' }} /></Tooltip>
          <Tooltip placement='top' title="Clone"><img onClick={() => { handleClone(rowData) }} src={clone} style={{ maxWidth: '13%', padding: '2%', marginRight: '5%' }} /></Tooltip>
          <Tooltip placement='top' title="Delete"><img onClick={() => { handleAction('delete', rowData) }} src={remove} style={{ maxWidth: '12%', padding: '2%', marginRight: '2%' }} /></Tooltip>
          <Tooltip placement='top' title="Url"><img onClick={() => { navigate("/data-asset-details") }} src={url} style={{ maxWidth: '13%', padding: '2%', marginRight: '2%' }} /></Tooltip>
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
                  <Button variant="contained" className={classes.button} onClick={() => handleCreate()}>Add New +</Button>
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