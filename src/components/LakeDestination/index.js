import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { resetLakeDestinationValues, updateMode, updateAllLakeDestinationValues } from 'actions/lakeDestinationsAction';
import show from 'images/Show.png';
import edit from 'images/edit.png';
import clone from 'images/clone.png';
import remove from 'images/Remove.png';
import tableIcons from "components/MetaData/MaterialTableIcons";
import MaterialTable from "material-table";
import { Box, Button } from '@material-ui/core';
import { MTableToolbar } from 'material-table';
import ViewLakeDestination from './ViewLakeDestination';

const useStyles = makeStyles((theme) => ({
  customWidth: {
    maxWidth: '1060px'
  },
  table: {
    margin: '2%',
    "& .MuiBox-root+div": {
      width: '100%',
    }
  },
  button: {
    float: 'right',
    margin: '1%',
    color: 'white',
    marginTop: '12px',
  },
}));

//const navigate = Navigate(); 
const LakeDestination = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [backdrop, setBackdrop] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([
    {
      "target_id": 461725,
      "domain": "education",
      "subdomain": "university_rankings",
      "bucket_name": "dl-fmwrk-tgt-461725-us-east-2",
      "data_owner": "Sagar Das",
      "support_cntct": "sagar.das@tigeranalytics.com"
    },
    {
      "target_id": 461726,
      "domain": "finance",
      "subdomain": "corporate_rankings",
      "bucket_name": "dl-fmwrk-tgt-461725-us-east-3",
      "data_owner": "Divya",
      "support_cntct": "divya@tigeranalytics.com"
    },
  ]);
  useEffect(() => { console.log("use effect")}, [])
  const columns = [
    {
      title: "Target ID", field: "target_id", render: (rowData) => {
        return <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => handleAction('view', rowData)}>{rowData.target_id}</span>
      }
    },
    { title: "Domain", field: "domain" },
    { title: "Subdomain", field: "subdomain" },
  ];

  const handleCreate = () => {
    props.updateMode('create');
    props.resetLakeDestinationValues();
  }

  const handleAction = (mode, selectedRow) => {
    console.log("selected row", selectedRow);
    props.updateMode(mode);
    setSelectedRow(selectedRow);
    if (mode === 'create') {
      props.resetLakeDestinationValues();
    } else {
      props.updateAllLakeDestinationValues({...selectedRow})
    }
  }

  return (
    <>
      {(props.mode === 'view' || props.mode === 'delete') && <ViewLakeDestination selectedRow={selectedRow}/>}
      <div className={classes.table}>
        <MaterialTable
          components={{
            Toolbar: (toolbarProps) => (
              <Box >
                <Link to="/create-lake-destination" >
                  <Button variant="contained" className={classes.button} style={{backgroundColor: '#00B1E8'}} onClick={()=>handleCreate()}>Add New +</Button>
                </Link>
                <MTableToolbar {...toolbarProps} />
              </Box>
            ),
          }}
          isLoading={backdrop}
          icons={tableIcons}
          title="Lake Destination"
          columns={columns}
          data={data}
          actions={[
            {
              icon: () => <img src={show} alt="view" style={{ maxWidth: '70%' }} />,
              tooltip: 'View',
              onClick: (event, rowData) => {
                handleAction('view', rowData)
              }
            },
            {
              icon: () => <img src={edit} alt="edit" style={{ maxWidth: '70%' }} />,
              tooltip: 'Edit',
              onClick: (event, rowData) => {
                handleAction('edit', rowData);
                navigate('/create-lake-destination')
              }
            },
            {
              icon: () => <img src={clone} alt="clone" style={{ maxWidth: '70%' }} />,
              tooltip: 'Clone',
              onClick: (event, rowData) => {
                handleAction('clone', rowData)
                navigate('/create-lake-destination')
              }
            },
            {
              icon: () => <img src={remove} alt="delete" style={{ maxWidth: '70%' }} />,
              tooltip: 'Delete',
              onClick: (event, rowData) => {
                handleAction('delete', rowData)
              }
            }
          ]}

          options={{
            //padding: 'dense',
            paging: false,
            searchFieldAlignment: 'left',
            showTitle: false,
            draggable: false,
            actionsColumnIndex: -1,
            toolbarButtonAlignment: "left",
            searchFieldStyle: {
              backgroundColor: '#F5F5F5',
              color: 'black'
            },
            sorting: true,
            headerStyle: {
              position: 'sticky',
              top: 0,
              backgroundColor: '#F5F5F5',
              fontWeight: 'bold',
            },
            actionsCellStyle: {
              minWidth: '200px'
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
})

const mapDispatchToProps = dispatch => bindActionCreators({
  resetLakeDestinationValues,
  updateAllLakeDestinationValues,
  updateMode,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LakeDestination);