import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import {Link as RouterLink } from 'react-router-dom';
import defaultInstance from 'routes/defaultInstance';
import tableIcons from "components/MetaData/MaterialTableIcons";
import MaterialTable from "material-table";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CssBaseline from "@material-ui/core/CssBaseline";
import { Breadcrumbs, Link } from '@material-ui/core';
import ViewCatalog from 'components/DataAssets/ViewCatalog';

const useStyles = makeStyles((theme) => ({
  customWidth: {
    maxWidth: '1060px'
  },
  table: {
    margin: '2%',
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
  idHeader:{
    color: '#00B1E8',
    cursor: 'pointer',
    paddingLeft: '5%',
    '&:hover': {
      color: '#ff8700',
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

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const DataCatalogDetails = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [data,setData] = useState([]);
  const [backdrop,setBackdrop] = useState(false);

  const columns = [
    {
      title: "Execution ID", field: "exec_id", render: (rowData) => {
        return <span className={classes.idHeader} onClick={() => handleAction(rowData)}>{rowData.exec_id}</span>
      }
    },
    { title: "Asset ID", field: "asset_id" },
    { title: "DQ Indicator", field: "dq_validation", },
    { title: "Publish Indicator", field: "data_publish", },
    { title: "Masking", field: "data_masking", },
    { title: "Start Time", field: "proc_start_ts", },
  ];

  useEffect(() => {
    setBackdrop(true);
    defaultInstance.post('/dataassetcatalog/read', { "src_sys_id": params.src_sys_id, "asset_id": params.asset_id })
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

  const handleAction = (rowData) => {
    setOpen(true);
    setSelectedRow({...rowData})
  }

  return (
    <>
      <CssBaseline />
     {open && <ViewCatalog open={open} setOpen={setOpen} fieldValues={selectedRow}/>} 
      <div className={classes.table}>
        <div style={{ display: 'flex', marginBottom: "15px" }}>
          <ArrowBackIosIcon fontSize='small' />
          <Breadcrumbs aria-label='Breadcrumb'>
            <Link component={RouterLink} to='/data-assets' style={{ color: '#00B1E8' }}>
              Data Assets
            </Link>
            <Link style={{ textDecoration: 'none', color: 'black' }}>
              Data Catalog Details
            </Link>
          </Breadcrumbs>
        </div>
        <MaterialTable
          isLoading={backdrop}
          icons={tableIcons}
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
  selectedRow: state.dataAssetState.updateSelectedRow
})
const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DataCatalogDetails);