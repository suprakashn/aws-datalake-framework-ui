import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useNavigate } from 'react-router-dom';
import {
  resetLakeDestinationValues, updateMode, updateAllLakeDestinationValues,
  updateFetchDataFlag, updateLakeDestinationTableData
} from 'actions/lakeDestinationsAction';
import show from 'images/Show.png';
import edit from 'images/edit.png';
import clone from 'images/clone.png';
import remove from 'images/Remove.png';
import tableIcons from "components/MetaData/MaterialTableIcons";
import MaterialTable from "material-table";
import { Box, Button, LinearProgress } from '@material-ui/core';
import { MTableToolbar } from 'material-table';
import ViewLakeDestination from 'components/LakeDestination/ViewLakeDestination';
import defaultInstance from 'routes/defaultInstance';
import { openSnackbar ,openSideBar} from 'actions/notificationAction';
import PageTitle from 'components/Common/PageTitle';

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
  idHeader:{
    color: '#00B1E8',
    cursor: 'pointer',
    paddingLeft: '5%',
    '&:hover': {
      color: '#ff8700',
    },
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
    }
},
}));

const LakeDestination = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  
  useEffect(() => {
    if (props.fetchDataFlag) {
      setLoading(true);
      defaultInstance.post('/targetsystem/read', { "fetch_limit": 'all', "target_config": { "target_id": null } })
        .then(response => {
          setLoading(false);
          if(response.data.responseStatus){
            props.updateLakeDestinationTableData(response.data.responseBody);
           // props.openSnackbar({ variant: 'success', message: response.data.responseMessage });
          }else{
            props.updateLakeDestinationTableData([]);
            // const message = response.data.responseMessage || 'Failed to load Target System data!'
            // props.openSnackbar({ variant: 'error', message});
          }
        })
        .catch(error => {
          setLoading(false);
          // props.openSnackbar({ variant: 'error', message: 'Failed to load Target System data!' });
          // console.log("error", error);
          props.updateLakeDestinationTableData([]);
        });
      props.updateFetchDataFlag(false);
    }

  }, [props.fetchDataFlag])

  const columns = [
    {
      title: "Target ID", field: "target_id", render: (rowData) => {
        return <span className={classes.idHeader} onClick={() => handleAction('view', rowData)}>{rowData.target_id}</span>
      }
    },
    { title: "Domain", field: "domain", },
    { title: "Subdomain", field: "subdomain" },
  ];

  const handleCreate = () => {
    props.updateMode('create');
    props.resetLakeDestinationValues();
  }

  const handleAction = (mode, selectedRow) => {
    props.updateMode(mode);
    setSelectedRow(selectedRow);
    if (mode === 'create') {
      props.resetLakeDestinationValues();
    } else {
      props.updateAllLakeDestinationValues(selectedRow)
    }
  }

  return (
    <>
      {(props.mode === 'view' || props.mode === 'delete') && <ViewLakeDestination selectedRow={selectedRow} />}
      <div className={classes.table}>
        <PageTitle showInfo={() => props.openSideBar({heading: 'Lake Destination', content: 'Lake Destination Content'})}>Lake Destination</PageTitle>
        {/* <LinearProgress hidden={!loading} color="secondary" /> */}
        <MaterialTable
          components={{
            Toolbar: (toolbarProps) => (
              <Box >
                <Link to="./create" >
                  <Button variant="contained" className={classes.button} onClick={() => handleCreate()}>Add New +</Button>
                </Link>
                <MTableToolbar {...toolbarProps} />
              </Box>
            ),
          }}
          icons={tableIcons}
          title="Lake Destination"
          columns={columns}
          data={props.tableData}          
          actions={[
            {
              icon: () => <img src={show} alt="view" style={{ maxWidth: '70%' }} />,
              tooltip: 'View',
              position: 'row', // 'auto' | 'toolbar' | 'toolbarOnSelect' | 'row'
              onClick: (event, rowData) => {
                handleAction('view', rowData)
              }
            },
            {
              icon: () => <img src={edit} alt="edit" style={{ maxWidth: '70%' }} />,
              tooltip: 'Edit',
              position: 'row',
              onClick: (event, rowData) => {
                handleAction('edit', rowData);
                navigate('./edit')
              }
            },
            {
              icon: () => <img src={clone} alt="clone" style={{ maxWidth: '70%' }} />,
              tooltip: 'Clone',
              position: 'row',
              onClick: (event, rowData) => {
                handleAction('clone', rowData)
                navigate('./create')
              }
            },
            {
              icon: () => <img src={remove} alt="delete" style={{ maxWidth: '70%' }} />,
              tooltip: 'Delete',
              position: 'row',
              onClick: (event, rowData) => {
                handleAction('delete', rowData)
              }
            },
            {
              icon: () => <img src={remove} alt="delete" style={{ maxWidth: '70%' }} />,
              tooltip: 'Delete',
              //isFreeAction: true,
              position: 'toolbarOnSelect',
              onClick: (event, rowData) => {
                handleAction('delete', rowData)
              }
            }
          ]}
          isLoading={loading}
          options={{
            //selection: true,
            //showTextRowsSelected: false,
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
  fieldValues: state.lakeDestinationState.lakeDestinationValues,
  mode: state.lakeDestinationState.updateMode.mode,
  fetchDataFlag: state.lakeDestinationState.updateFetchDataFlag.dataFlag,
  tableData: state.lakeDestinationState.updateLakeDestinationTableData.data,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  resetLakeDestinationValues,
  updateAllLakeDestinationValues,
  updateLakeDestinationTableData,
  updateFetchDataFlag,
  updateMode,
  openSnackbar,
  openSideBar
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LakeDestination);