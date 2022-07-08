import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useNavigate } from 'react-router-dom';
import {
  openSourceSystemSidebar, updateMode, closeSourceSystemSidebar, updateAllSourceSystemValues,
  resetSourceSystemValues, updateSourceSysTableData, updateDataFlag
} from 'actions/sourceSystemsAction';
import defaultInstance from 'routes/defaultInstance';
import show from 'images/Show.png';
import edit from 'images/edit.png';
import clone from 'images/clone.png';
import remove from 'images/Remove.png';
import tableIcons from "components/MetaData/MaterialTableIcons";
import MaterialTable from "material-table";
import { Box, Button, Tooltip,LinearProgress } from '@material-ui/core';
import { MTableToolbar } from 'material-table';
import ViewSourceSystem from 'components/SourceSystems/ViewSourceSystem';
import { openSnackbar } from 'actions/notificationAction';

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
    // "& svg.MuiSvgIcon-root:first-child": {
    //   fontSize: '1.75rem',
    //   color: '#707070'
    // }
  },
  button: {
    float: 'right',
    margin: '1%',
    color: 'white',
    marginTop: '12px',
  },
}));
// search: {
//   '& .MuiInput-underline:before': {
//     borderBottomColor: '#fff8', // Semi-transparent underline
//   },
//   '& .MuiInput-underline:hover:before': {
//     borderBottomColor: '#fff', // Solid underline on hover
//   },
//   '& .MuiInput-underline:after': {
//     borderBottomColor: '#fff', // Solid underline on focus
//   },
// }


const SourceSystems = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = ([]);
  const [loading, setLoading] = useState(false);  

  useEffect(() => {
    if (props.dataFlag) {
      setLoading(true);
      defaultInstance.post('/source_system/read?tasktype=read', { "fetch_limit": 'all', "src_config": { "src_sys_id": null } })
        .then(response => {
          console.log(response.data);
          props.updateSourceSysTableData(response.data.body.src_info);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          props.openSnackbar({ variant: 'error', message: 'Some error occurred while loading data' });
          console.log("error", error)
          props.updateSourceSysTableData([]);
        });
        props.updateDataFlag(false);
    }
  }, [props.dataFlag])

  const columns = [
    {
      title: "Source System ID", field: "src_sys_id", render: (rowData) => {
        return <span style={{ color: 'blue', cursor: 'pointer', paddingLeft: '5%' }} onClick={() => handleAction('view', rowData)}>{rowData.src_sys_id}</span>
      }
    },
    { title: "Source System Name", field: "src_sys_nm", },
    { title: "Bucket Name", field: "bucket_name", },
    {
      title: "Actions", field: "", render: (rowData) => {
        return <>
          <Tooltip placement='top' title="View"><img onClick={() => { handleAction('view', rowData) }} src={show} style={{ maxWidth: '10%', padding: '2%', marginRight: '5%' }} /></Tooltip>
          <Tooltip placement='top' title="Edit"><img onClick={() => { handleEdit(rowData) }} src={edit} style={{ maxWidth: '10%', padding: '2%', marginRight: '5%' }} /></Tooltip>
          <Tooltip placement='top' title="Clone"><img onClick={() => { handleClone(rowData) }} src={clone} style={{ maxWidth: '10%', padding: '2%', marginRight: '5%' }} /></Tooltip>
          <Tooltip placement='top' title="Delete"><img onClick={() => { handleAction('delete', rowData) }} src={remove} style={{ maxWidth: '9%', padding: '2%', marginRight: '2%' }} /></Tooltip>
        </>
      }
    },
  ];

  const handleCreate = () => {
    props.updateDataFlag(false);
    props.updateMode('create');
    props.resetSourceSystemValues();
  }

  const handleEdit = (selectedRow) => {
    props.updateDataFlag(false);
    props.updateMode('edit');
    props.updateAllSourceSystemValues({ ...selectedRow })
    navigate("/create-source-system")
  }

  const handleClone = (selectedRow) => {
    props.updateDataFlag(false);
    props.updateMode('clone');
    props.updateAllSourceSystemValues({ ...selectedRow })
    navigate("/create-source-system")
  }

  const handleAction = (mode, selectedRow) => {
    props.updateDataFlag(false);
    props.updateMode(mode);
    props.openSourceSystemSidebar();
    props.updateAllSourceSystemValues({ ...selectedRow })
  }

  return (
    <>
      <ViewSourceSystem selectedRow={selectedRow} />
      <div className={classes.table}>
       <LinearProgress hidden={!loading} color="secondary" /> 
        <MaterialTable
          components={{
            Toolbar: (toolbarProps) => (
              <Box >
                <Link to="/create-source-system" >
                  <Button variant="contained" className={classes.button} style={{ backgroundColor: '#00B1E8' }} onClick={() => handleCreate()}>Add New +</Button>
                </Link>
                <MTableToolbar {...toolbarProps} />
              </Box>
            ),
          }}
          icons={tableIcons}
          title="Source Systems"
          columns={columns}
          data={props.data}
          options={{
            selection: true,
            showTextRowsSelected: false,
            paging: false,
            searchFieldAlignment: 'left',
            showTitle: false,
            draggable: false, 
            actionsColumnIndex: -1,
            toolbarButtonAlignment: "left",
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
              padding: '0',
              textAlign: 'left'
            },
            cellStyle: { padding: '5px 0' },
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
  open: state.sourceSystemState.sidebar.sidebarFlag,
  fieldValues: state.sourceSystemState.sourceSystemValues,
  mode: state.sourceSystemState.updateMode.mode,
  data: state.sourceSystemState.updateSourceSysTableData.data,
  dataFlag: state.sourceSystemState.updateDataFlag.dataFlag

})
const mapDispatchToProps = dispatch => bindActionCreators({
  openSourceSystemSidebar,
  closeSourceSystemSidebar,
  updateMode,
  updateDataFlag,
  updateAllSourceSystemValues,
  resetSourceSystemValues,
  updateSourceSysTableData,
  updateDataFlag,
  openSnackbar
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SourceSystems);