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
import tableIcons from "components/MetaData/MaterialTableIcons";
import MaterialTable from "material-table";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CssBaseline from "@material-ui/core/CssBaseline";
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
  link: {
    cursor: 'pointer',
    display: 'flex',
    color: 'black',
    textDecoration: "none",
    fontSize: "12px",
    marginLeft: 0,
},
}));
            
          

const DataAssetDetails = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = ([]);
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

  const columns = [
    {
      title: "Data Asset ID", field: "asset_id"
    },
    { title: "Source System ID", field: "src_sys_id", },
    { title: "Data Asset Name", field: "asset_nm", },
    { title: "Target System ID", field: "target_id", },
    { title: "Asset Owner", field: "asset_owner", },
  ];
  const handleBack = () => {
    navigate("/data-assets");
}


  return (
    <>
      <div className={classes.table}>
        <CssBaseline />
        <div onClick={handleBack}>
          <Link style={{ display: 'flex', marginBottom: "15px" }} to="/data-assets" className={classes.link}>
            <ArrowBackIosIcon fontSize='small' />
            <span>Back</span>
          </Link>
        </div>
        <MaterialTable
          components={{
            Toolbar: (toolbarProps) => (
              <Box >
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
})
const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DataAssetDetails);