import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import defaultInstance from 'routes/defaultInstance';
import tableIcons from "components/MetaData/MaterialTableIcons";
import MaterialTable from "material-table";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CssBaseline from "@material-ui/core/CssBaseline";
import { Box } from '@material-ui/core';
import { MTableToolbar } from 'material-table';
import { Breadcrumbs, Typography, Link } from '@material-ui/core'

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
  const [data, setData] = useState([]);

  const columns = [
    { title: "Data Asset ID", field: "asset_id" },
    { title: "Source System ID", field: "src_sys_id", },
    { title: "Data Asset Name", field: "asset_nm", },
    { title: "Target System ID", field: "target_id", },
    { title: "Asset Owner", field: "asset_owner", },
  ];

  // useEffect(() => {
  //   defaultInstance.post('/dataassetinfo/read', { "src_sys_id": props.selectedRow.src_sys_id })
  //     .then(response => {
  //       console.log("response for data assets read", response)
  //     })
  //     .catch(error => {
  //       console.log("error", error)
  //     })
  // }, [])

  return (
    <>
      <CssBaseline />
      <div className={classes.table}>
        <div style={{ display: 'flex', marginBottom: "15px" }}>
          <ArrowBackIosIcon fontSize='small' />
          <Breadcrumbs aria-label='Breadcrumb'>
            <Link component={RouterLink} to='/data-assets' style={{ color: 'blue' }}>
              Data Assets
            </Link>
            <Link style={{ textDecoration: 'none', color: 'black' }}>
              Data Asset Details - {props.selectedRow.src_sys_id}
            </Link>
          </Breadcrumbs>
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

export default connect(mapStateToProps, mapDispatchToProps)(DataAssetDetails);