import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  openSourceSystemSidebar, updateMode, closeSourceSystemSidebar, updateAllSourceSystemValues,
  resetSourceSystemValues
} from 'actions/sourceSystemsAction';
import show from 'images/Show.png';
import edit from 'images/edit.png';
import clone from 'images/clone.png';
import remove from 'images/Remove.png';
import tableIcons from "components/MetaData/MaterialTableIcons";
import MaterialTable from "material-table";
import { Box, Button } from '@material-ui/core';
import { MTableToolbar } from 'material-table';
import ViewSourceSystem from 'components/SourceSystems/ViewSourceSystem';
import CreateSourceSystem from 'components/SourceSystems/CreateSourceSystem';

const useStyles = makeStyles((theme) => ({
  customWidth: {
    maxWidth: '1060px'
  },
  table: {
    margin: '2%'
  },
  button: {
    float: 'right',
    margin: '1%',
    color: 'white',
    marginTop: '12px',
  },
}));

const SourceSystems = (props) => {
  const classes = useStyles();
  const [openCreateScreen, setOpenCreateScreen] = useState(false);
  const [openEditScreen, setOpenEditScreen] = useState(false);
  const [openViewScreen, setOpenViewScreen] = useState(false);
  const [openDeleteScreen, setOpenDeleteScreen] = useState(false);
  const [data, setData] = useState([
    {
      "src_sys_id": 10000,
      "bucket_name": "dl-fmwrk-10000-us-east-1",
      "src_sys_nm": "auto generated system",
      "src_sys_desc": null,
      "mechanism": "push",
      "data_owner": "Suprakash Nandy",
      "support_cntct": "suprakash.nandy@tigeranalytics.com",
      "ingstn_pattern": "database",
      "db_type": "postgres",
      "db_hostname": "dl-fmwrk-db-instance.capmtud4vnyz.us-east-2.rds.amazonaws.com",
      "db_username": "postgresadmin",
      "db_schema": "public",
      "db_port": 5432,
      "ingstn_src_bckt_nm": "2194-datastore-new",
      "db_name": "dl_fmwrk"
    },
    {
      "src_sys_id": 10000,
      "bucket_name": "dl-fmwrk-10000-us-east-1",
      "src_sys_nm": "auto generated system",
      "src_sys_desc": null,
      "mechanism": "push",
      "data_owner": "Suprakash Nandy",
      "support_cntct": "suprakash.nandy@tigeranalytics.com",
      "ingstn_pattern": "database",
      "db_type": "postgres",
      "db_hostname": "dl-fmwrk-db-instance.capmtud4vnyz.us-east-2.rds.amazonaws.com",
      "db_username": "postgresadmin",
      "db_schema": "public",
      "db_port": 5432,
      "ingstn_src_bckt_nm": "2194-datastore-new",
      "db_name": "dl_fmwrk"
    },
    {
      "src_sys_id": 10000,
      "bucket_name": "dl-fmwrk-10000-us-east-1",
      "src_sys_nm": "auto generated system",
      "src_sys_desc": null,
      "mechanism": "push",
      "data_owner": "Suprakash Nandy",
      "support_cntct": "suprakash.nandy@tigeranalytics.com",
      "ingstn_pattern": "database",
      "db_type": "postgres",
      "db_hostname": "dl-fmwrk-db-instance.capmtud4vnyz.us-east-2.rds.amazonaws.com",
      "db_username": "postgresadmin",
      "db_schema": "public",
      "db_port": 5432,
      "ingstn_src_bckt_nm": "2194-datastore-new",
      "db_name": "dl_fmwrk"
    },
    {
      "src_sys_id": 10000,
      "bucket_name": "dl-fmwrk-10000-us-east-1",
      "src_sys_nm": "auto generated system",
      "src_sys_desc": null,
      "mechanism": "push",
      "data_owner": "Suprakash Nandy",
      "support_cntct": "suprakash.nandy@tigeranalytics.com",
      "ingstn_pattern": "database",
      "db_type": "postgres",
      "db_hostname": "dl-fmwrk-db-instance.capmtud4vnyz.us-east-2.rds.amazonaws.com",
      "db_username": "postgresadmin",
      "db_schema": "public",
      "db_port": 5432,
      "ingstn_src_bckt_nm": "2194-datastore-new",
      "db_name": "dl_fmwrk"
    },
    {
      "src_sys_id": 10000,
      "bucket_name": "dl-fmwrk-10000-us-east-1",
      "src_sys_nm": "auto generated system",
      "src_sys_desc": null,
      "mechanism": "push",
      "data_owner": "Suprakash Nandy",
      "support_cntct": "suprakash.nandy@tigeranalytics.com",
      "ingstn_pattern": "database",
      "db_type": "postgres",
      "db_hostname": "dl-fmwrk-db-instance.capmtud4vnyz.us-east-2.rds.amazonaws.com",
      "db_username": "postgresadmin",
      "db_schema": "public",
      "db_port": 5432,
      "ingstn_src_bckt_nm": "2194-datastore-new",
      "db_name": "dl_fmwrk"
    },  {
      "src_sys_id": 10000,
      "bucket_name": "dl-fmwrk-10000-us-east-1",
      "src_sys_nm": "auto generated system",
      "src_sys_desc": null,
      "mechanism": "push",
      "data_owner": "Suprakash Nandy",
      "support_cntct": "suprakash.nandy@tigeranalytics.com",
      "ingstn_pattern": "database",
      "db_type": "postgres",
      "db_hostname": "dl-fmwrk-db-instance.capmtud4vnyz.us-east-2.rds.amazonaws.com",
      "db_username": "postgresadmin",
      "db_schema": "public",
      "db_port": 5432,
      "ingstn_src_bckt_nm": "2194-datastore-new",
      "db_name": "dl_fmwrk"
    },
    {
      "src_sys_id": 10000,
      "bucket_name": "dl-fmwrk-10000-us-east-1",
      "src_sys_nm": "auto generated system",
      "src_sys_desc": null,
      "mechanism": "push",
      "data_owner": "Suprakash Nandy",
      "support_cntct": "suprakash.nandy@tigeranalytics.com",
      "ingstn_pattern": "database",
      "db_type": "postgres",
      "db_hostname": "dl-fmwrk-db-instance.capmtud4vnyz.us-east-2.rds.amazonaws.com",
      "db_username": "postgresadmin",
      "db_schema": "public",
      "db_port": 5432,
      "ingstn_src_bckt_nm": "2194-datastore-new",
      "db_name": "dl_fmwrk"
    },
    {
      "src_sys_id": 10000,
      "bucket_name": "dl-fmwrk-10000-us-east-1",
      "src_sys_nm": "auto generated system",
      "src_sys_desc": null,
      "mechanism": "push",
      "data_owner": "Suprakash Nandy",
      "support_cntct": "suprakash.nandy@tigeranalytics.com",
      "ingstn_pattern": "database",
      "db_type": "postgres",
      "db_hostname": "dl-fmwrk-db-instance.capmtud4vnyz.us-east-2.rds.amazonaws.com",
      "db_username": "postgresadmin",
      "db_schema": "public",
      "db_port": 5432,
      "ingstn_src_bckt_nm": "2194-datastore-new",
      "db_name": "dl_fmwrk"
    },
    {
      "src_sys_id": 10000,
      "bucket_name": "dl-fmwrk-10000-us-east-1",
      "src_sys_nm": "auto generated system",
      "src_sys_desc": null,
      "mechanism": "push",
      "data_owner": "Suprakash Nandy",
      "support_cntct": "suprakash.nandy@tigeranalytics.com",
      "ingstn_pattern": "database",
      "db_type": "postgres",
      "db_hostname": "dl-fmwrk-db-instance.capmtud4vnyz.us-east-2.rds.amazonaws.com",
      "db_username": "postgresadmin",
      "db_schema": "public",
      "db_port": 5432,
      "ingstn_src_bckt_nm": "2194-datastore-new",
      "db_name": "dl_fmwrk"
    },
    {
      "src_sys_id": 10000,
      "bucket_name": "dl-fmwrk-10000-us-east-1",
      "src_sys_nm": "auto generated system",
      "src_sys_desc": null,
      "mechanism": "push",
      "data_owner": "Suprakash Nandy",
      "support_cntct": "suprakash.nandy@tigeranalytics.com",
      "ingstn_pattern": "database",
      "db_type": "postgres",
      "db_hostname": "dl-fmwrk-db-instance.capmtud4vnyz.us-east-2.rds.amazonaws.com",
      "db_username": "postgresadmin",
      "db_schema": "public",
      "db_port": 5432,
      "ingstn_src_bckt_nm": "2194-datastore-new",
      "db_name": "dl_fmwrk"
    },
    {
      "src_sys_id": 10000,
      "bucket_name": "dl-fmwrk-10000-us-east-1",
      "src_sys_nm": "auto generated system",
      "src_sys_desc": null,
      "mechanism": "push",
      "data_owner": "Suprakash Nandy",
      "support_cntct": "suprakash.nandy@tigeranalytics.com",
      "ingstn_pattern": "database",
      "db_type": "postgres",
      "db_hostname": "dl-fmwrk-db-instance.capmtud4vnyz.us-east-2.rds.amazonaws.com",
      "db_username": "postgresadmin",
      "db_schema": "public",
      "db_port": 5432,
      "ingstn_src_bckt_nm": "2194-datastore-new",
      "db_name": "dl_fmwrk"
    },
    {
      "src_sys_id": 10000,
      "bucket_name": "dl-fmwrk-10000-us-east-1",
      "src_sys_nm": "auto generated system",
      "src_sys_desc": null,
      "mechanism": "push",
      "data_owner": "Suprakash Nandy",
      "support_cntct": "suprakash.nandy@tigeranalytics.com",
      "ingstn_pattern": "database",
      "db_type": "postgres",
      "db_hostname": "dl-fmwrk-db-instance.capmtud4vnyz.us-east-2.rds.amazonaws.com",
      "db_username": "postgresadmin",
      "db_schema": "public",
      "db_port": 5432,
      "ingstn_src_bckt_nm": "2194-datastore-new",
      "db_name": "dl_fmwrk"
    },
    {
      "src_sys_id": 10000,
      "bucket_name": "dl-fmwrk-10000-us-east-1",
      "src_sys_nm": "auto generated system",
      "src_sys_desc": null,
      "mechanism": "push",
      "data_owner": "Suprakash Nandy",
      "support_cntct": "suprakash.nandy@tigeranalytics.com",
      "ingstn_pattern": "database",
      "db_type": "postgres",
      "db_hostname": "dl-fmwrk-db-instance.capmtud4vnyz.us-east-2.rds.amazonaws.com",
      "db_username": "postgresadmin",
      "db_schema": "public",
      "db_port": 5432,
      "ingstn_src_bckt_nm": "2194-datastore-new",
      "db_name": "dl_fmwrk"
    },
      {
      "src_sys_id": 10000,
      "bucket_name": "dl-fmwrk-10000-us-east-1",
      "src_sys_nm": "auto generated system",
      "src_sys_desc": null,
      "mechanism": "push",
      "data_owner": "Suprakash Nandy",
      "support_cntct": "suprakash.nandy@tigeranalytics.com",
      "ingstn_pattern": "database",
      "db_type": "postgres",
      "db_hostname": "dl-fmwrk-db-instance.capmtud4vnyz.us-east-2.rds.amazonaws.com",
      "db_username": "postgresadmin",
      "db_schema": "public",
      "db_port": 5432,
      "ingstn_src_bckt_nm": "2194-datastore-new",
      "db_name": "dl_fmwrk"
    },
    {
      "src_sys_id": 7416533097172425,
      "bucket_name": "dl-fmwrk-10000-us-east-1",
      "src_sys_nm": "auto generated system",
      "src_sys_desc": null,
      "mechanism": "push",
      "data_owner": "Suprakash Nandy",
      "support_cntct": "suprakash.nandy@tigeranalytics.com",
      "ingstn_pattern": "file",
      "db_type": null,
      "db_hostname": null,
      "db_username": null,
      "db_schema": null,
      "db_port": null,
      "ingstn_src_bckt_nm": "dl-fmwrk-7416533097172425-us-east-2",
      "db_name": null
    },]);
  const [backdrop, setBackdrop] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);


  const columns = [
    {
      title: "Source System ID", field: "src_sys_id", render: (rowData) => {
        return <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => handleAction('view', rowData)}>{rowData.src_sys_id}</span>
      }
    },
    { title: "Source System Name", field: "src_sys_nm", },
    { title: "Bucket Name", field: "bucket_name", },
  ];

  const handleCreate = () => {
    setOpenCreateScreen(true);
    props.openSourceSystemSidebar();
    props.updateMode('create');
    props.resetSourceSystemValues();
  }

  const handleRowClick = (evt, rowData) => {
    console.log("selected row", rowData)
    // props.updateAllSourceSystemValues({ ...selectedRow })
    setSelectedRow(rowData)
    // props.openSourceSystemSidebar();
    // props.updateMode('view');
  }

  const handleAction = (mode, selectedRow) => {
    console.log("selected row", selectedRow);
    props.updateMode(mode);
    setSelectedRow(selectedRow);
    props.openSourceSystemSidebar();
    if (mode === 'create') {
      props.resetSourceSystemValues();
    } else {
      props.updateAllSourceSystemValues({ ...selectedRow })
    }
  }

  return (
    <>
     
      {/* <SourceSystemTable /> */}
      {openCreateScreen && <CreateSourceSystem />}
      {props.mode === 'view' && <ViewSourceSystem/>}
      <div className={classes.table}>
        <MaterialTable
          components={{
            Toolbar: (toolbarProps) => (
              <Box >
                <Link to="/create-source-system" >
                <Button variant="contained" className={classes.button} style={{backgroundColor: '#00B1E8'}} onClick={()=>handleCreate()}>Add New +</Button>
                    </Link>
                <MTableToolbar {...toolbarProps} />
              </Box>
            ),
          }}
          isLoading={backdrop}
          icons={tableIcons}
          title="Source Systems"
          columns={columns}
          data={data}
          actions={[
            {
              icon: () => <img src={show} style={{ maxWidth: '70%' }} />,
              tooltip: 'View',
              onClick: (event, rowData) => {
                handleAction('view', rowData)
              }
            },
            {
              icon: () => <img src={edit} style={{ maxWidth: '70%' }} />,
              tooltip: 'Edit',
              onClick: (event, rowData) => {
                handleAction('edit', rowData)
              }
            },
            {
              icon: () => <img src={clone} style={{ maxWidth: '70%' }} />,
              tooltip: 'Clone',
              onClick: (event, rowData) => {
                handleAction('clone', rowData)
              }
            },
            {
              icon: () => <img src={remove} style={{ maxWidth: '70%' }} />,
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

})
const mapDispatchToProps = dispatch => bindActionCreators({
  openSourceSystemSidebar,
  closeSourceSystemSidebar,
  updateMode,
  updateAllSourceSystemValues,
  resetSourceSystemValues
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SourceSystems);