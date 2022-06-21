import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import tableIcons from "components/MetaData/MaterialTableIcons";
import MaterialTable from "material-table";
import { Box, Button } from '@material-ui/core';
import { MTableToolbar } from 'material-table';
import { openSourceSystemSidebar, updateMode, updateAllSourceSystemValues, resetSourceSystemValues } from 'actions/sourceSystemsAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import show from 'images/Show.png';
import edit from 'images/edit.png';
import clone from 'images/clone.png';
import remove from 'images/Remove.png';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '80vh',
    },
    table: {
        margin: '2%'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    button: {
        float: 'right',
        margin: '1vh',
        backgroundColor: '#00B1E8',
        color: 'white',
        marginTop: '12px',
        // backgroundColor: '#49494a',
        // color: '#fff',
        '&:hover': {
            backgroundColor: '#F7901D',
            color: 'white',
        }
    },
}));

const SourceSystemTable = (props) => {
    const classes = useStyles();
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
        { title: "Source System ID", field: "src_sys_id", render : (rowData)=>{
           return <span style={{color:'blue',cursor:'pointer'}} onClick={()=>handleAction('view',rowData)}>{rowData.src_sys_id}</span>
        }},
        { title: "Source System Name", field: "src_sys_nm", },
        { title: "Bucket Name", field: "bucket_name", },
    ];

    const handleCreate = () => {
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
        props.updateMode(mode);
        props.openSourceSystemSidebar();
        if (mode === 'create') {
            props.resetSourceSystemValues();
        } else {
            props.updateAllSourceSystemValues({ ...selectedRow })
        }
    }

    return (
        <>
            <div>
                <CssBaseline />
                <Paper className={classes.table}>
                    <div >
                        <MaterialTable
                            components={{
                                Toolbar: (toolbarProps) => (
                                    <Box >
                                        <Button variant="contained" className={classes.button} >Add New</Button>
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
                                    icon: () => <img src={show} style={{maxWidth :'80%'}}/>,
                                    tooltip: 'View',
                                     onClick: (event, rowData) => {
                                        handleAction('view',rowData)
                                     }
                                },
                                {
                                    icon: () => <img src={edit} style={{maxWidth :'80%'}}/>,
                                    tooltip: 'Edit',
                                    onClick: (event, rowData) => {
                                        handleAction('edit',rowData)
                                     }
                                },
                                {
                                    icon: () => <img src={clone} style={{maxWidth :'80%'}}/>,
                                    tooltip: 'Clone',
                                    onClick: (event, rowData) => {
                                        handleAction('clone',rowData)
                                     }
                                },
                                {
                                    icon: () => <img src={remove} style={{maxWidth :'80%'}}/>,
                                    tooltip: 'Delete',
                                    onClick: (event, rowData) => {
                                        handleAction('delete',rowData)
                                     }
                                }
                            ]}
                            
                            options={{
                                paging: false,
                                searchFieldAlignment: 'left',
                                showTitle: false,
                                draggable: false,
                                minBodyHeight: '59vh',
                                maxBodyHeight: '59vh',
                                actionsColumnIndex: -1,
                                toolbarButtonAlignment: "left",
                                searchFieldStyle: {
                                    backgroundColor: '#F5F5F5',
                                    color: 'black'
                                },
                                sorting: true,
                                headerStyle: {
                                    // textAlign: 'center',
                                    position: 'sticky',
                                    top: 0,
                                    backgroundColor: '#F5F5F5',
                                    //color: 'black',
                                    fontWeight: 'bold',
                                }
                            }}
                        />
                    </div>
                </Paper>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    open: state.sourceSystemState.sidebar.sidebarFlag,
})
const mapDispatchToProps = dispatch => bindActionCreators({
    openSourceSystemSidebar,
    updateMode,
    updateAllSourceSystemValues,
    resetSourceSystemValues
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SourceSystemTable);