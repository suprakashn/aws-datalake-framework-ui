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
import { MTableToolbar } from 'material-table';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import { openSourceSystemSidebar, updateMode, updateAllSourceSystemValues, resetSourceSystemValues} from 'actions/sourceSystemsAction';
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
    const [data, setData] = useState([]);
    const [backdrop, setBackdrop] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        setBackdrop(true);
        defaultInstance.post('/sourcesystem/read?tasktype=read', { "fetch_limit": 'all', "src_config": { "src_sys_id": null } })
            .then(response => {
                console.log("response in aws", response)
                setData(response.data.body.src_info)
                setBackdrop(false)
            })
            .catch(error => {
                console.log("error", error)
                setData([]);
                setBackdrop(false);
            })
    }, [])
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

    const handleRowClick = (evt, selectedRow) => {
        console.log("selected row", selectedRow)
        props.updateAllSourceSystemValues({ ...selectedRow })
        setSelectedRow(selectedRow.tableData.id)
        props.openSourceSystemSidebar();
        props.updateMode('view');
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
                                    <Box display="flex" alignItems="center">
                                        <Button
                                            className={classes.button}
                                            style={{ marginLeft: '2%', marginRight: 'auto' }}
                                            variant="contained"
                                            onClick = {handleCreate}
                                        >
                                            Create
                                        </Button>
                                        <MTableToolbar {...toolbarProps} />
                                    </Box>
                                ),
                            }}
                            isLoading={backdrop}
                            icons={tableIcons}
                            title="Data Quality"
                            columns={columns}
                            data={data}
                            onRowClick={((evt, selectedRow) => handleRowClick(evt, selectedRow))}
                            options={{
                                // rowStyle: {
                                //     overflowWrap: 'break-word'
                                // },
                                // padding: 'dense',
                                rowStyle: rowData => ({
                                    backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                                }),
                                // searchFieldAlignment: 'left',
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