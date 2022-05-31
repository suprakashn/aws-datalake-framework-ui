import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import tableIcons from "components/MetaData/MaterialTableIcons";
import MaterialTable from "material-table";
import defaultInstance from 'routes/defaultInstance';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

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
}));


const SourceSystemTable = (props) => {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [backdrop, setBackdrop] = useState(false);

    useEffect(() => {
        setBackdrop(true);
        defaultInstance.post('/sourcesystem/read?tasktype=read', { "fetch_limit": 'all', "src_config":{ "src_sys_id": null}} )
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
        { title: "Source System Id", field: "src_sys_id" ,},
        { title: "Source System Name", field: "src_sys_nm",  },
        { title: "Bucket Name", field: "bucket_name",},
    ];

    return (
        <>
            <div>
                <CssBaseline />
                <Paper  className={classes.table}>
                    <Backdrop className={classes.backdrop} open={backdrop} >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <div >
                        <MaterialTable
                            icons={tableIcons}
                            title="Data Quality"
                            columns={columns}
                            data={data}
                            options={{
                                rowStyle: {
                                    overflowWrap: 'break-word'
                                },
                               // padding: 'dense',
                                showTitle: false,
                                draggable: false,
                                minBodyHeight: '59vh',
                                maxBodyHeight: '59vh',
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

export default SourceSystemTable;