import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import tableIcons from "components/MetaData/MaterialTableIcons";
import MaterialTable from "material-table";
import defaultInstance from 'routes/defaultInstance';
import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Fab from '@material-ui/core/Fab';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import EditIcon from '@material-ui/icons/Edit';
import { MTableToolbar } from 'material-table';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import { openSourceSystemSidebar, updateMode, updateAllSourceSystemValues, resetSourceSystemValues } from 'actions/sourceSystemsAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';

const drawerWidth = 500;
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
        backgroundColor: '#49494a',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#F7901D',
            color: 'white',
        }
    },
}));

const ThreeDotsMenu = ({ props, rowData }) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleMenuClick(mode) {
        props.openSourceSystemSidebar();
        setAnchorEl(null);
        props.updateMode(mode);
    }
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    return (
        <React.Fragment>
            <Tooltip title="Action">
                <MoreVertIcon onClick={handleClick} /></Tooltip>
            <Menu
                id="card-actions-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {/* <MenuItem onClick={() => handleMenuClick('')}>View</MenuItem> */}
                <MenuItem onClick={() => handleMenuClick('edit')}>Edit</MenuItem>
                <MenuItem onClick={() => handleMenuClick('clone')}>Clone</MenuItem>
                <MenuItem onClick={() => handleMenuClick('delete')}>Delete</MenuItem>
            </Menu>
        </React.Fragment>
    )
}

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

    // useEffect(() => {
    //     setBackdrop(true);
    //     defaultInstance.post('/sourcesystem/read?tasktype=read', { "fetch_limit": 'all', "src_config": { "src_sys_id": null } })
    //         .then(response => {
    //             console.log("response in aws", response)
    //             setData(response.data.body.src_info)
    //             setBackdrop(false)
    //         })
    //         .catch(error => {
    //             console.log("error", error)
    //             setData([]);
    //             setBackdrop(false);
    //         })
    // }, [])
    const columns = [
        // {
        //     title: "", field: "", cellStyle: {
        //         minWidth: 25,
        //         maxWidth: 25
        //     },
        //     headerStyle: {
        //         minWidth: 25,
        //         maxWidth: 25
        //     },
        //     render: rowData => {
        //         return <>
        //             <ThreeDotsMenu rowData={rowData} props={props} />
        //         </>
        //     }
        // },
        { title: "Source System Id", field: "src_sys_id", },
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

    const handleAction = (mode) => {
        props.updateMode(mode);
        props.openSourceSystemSidebar();
        if(mode === 'create'){  
            props.resetSourceSystemValues();
        }else {
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
                                         <Tooltip title="Delete" >
                                            <Fab size="small" color="primary" className={classes.button} onClick={()=>handleAction('delete')}>
                                                <DeleteIcon style={{ color: 'white' }} />
                                            </Fab>
                                        </Tooltip>
                                        <Tooltip title="Clone" >
                                            <Fab size="small" color="primary" className={classes.button} onClick={()=>handleAction('clone')}>
                                                <FileCopyIcon style={{ color: 'white' }} />
                                            </Fab>
                                        </Tooltip>
                                        <Tooltip title="Edit" >
                                            <Fab size="small" color="primary" className={classes.button} onClick={()=>handleAction('edit')}>
                                                <EditIcon style={{ color: 'white' }} />
                                            </Fab>
                                        </Tooltip>
                                        <Tooltip title="Create" >
                                            <Fab size="small" color="primary" className={classes.button} onClick={()=>handleAction('create')}>
                                                <AddCircleIcon style={{ color: 'white' }} />
                                            </Fab>
                                        </Tooltip>
                                        <MTableToolbar {...toolbarProps} />
                                    </Box>
                                ),
                            }}
                            isLoading={backdrop}
                            icons={tableIcons}
                            title="Data Quality"
                            columns={columns}
                            data={data}
                            onRowClick={((evt, rowData) => handleRowClick(evt, rowData))}
                            options={{
                                // rowStyle: {
                                //     overflowWrap: 'break-word'
                                // },
                                // padding: 'dense',
                                rowStyle: rowData => ({
                                    backgroundColor: (selectedRow && selectedRow.tableData.id === rowData.tableData.id) ? '#FBC181' : '#FFF'
                                }),
                                searchFieldAlignment: 'left',
                                showTitle: false,
                                draggable: false,
                                minBodyHeight: '59vh',
                                maxBodyHeight: '59vh',
                                actionsColumnIndex: -1,
                                toolbarButtonAlignment: "left",
                                searchFieldStyle: {
                                    backgroundColor: '#49494A',
                                    color: 'white'
                                },
                                sorting: true,
                                headerStyle: {
                                    // textAlign: 'center',
                                    position: 'sticky',
                                    top: 0,
                                    backgroundColor: '#49494A',
                                    color: 'white',
                                    // fontWeight: 'bold',
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
    // mode: state.manageTaskState.updateMode.mode,

})
const mapDispatchToProps = dispatch => bindActionCreators({
    openSourceSystemSidebar,
    updateMode,
    updateAllSourceSystemValues,
    resetSourceSystemValues
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SourceSystemTable);