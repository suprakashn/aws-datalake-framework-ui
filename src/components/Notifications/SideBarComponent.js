import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeSideBar } from 'actions/notificationAction';
import { makeStyles } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { useLocation } from 'react-router';

const useStyles = makeStyles((theme) => ({
    sideBar: {
        background: '#fff',
        border: '1px solid #ccc',
        width: '200px',
        position: 'fixed',
        right: '0',
        height: '100%',
        padding: '0'
    },
    heading: {
        display:'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #ccc',
        padding: '0 5px 0 20px',
        alignItems: 'center',
        '& h3': {
            'word-break': 'break-word',
            'margin-right': '5px'
        }
    },
    content: {
        padding: '20px',
        overflow: 'auto',
        maxHeight: '100%'
    },
    close: {
        cursor: 'pointer'        
    }
}));

const SideBarComponent = (props) => {
    const classes = useStyles();
    const location = useLocation();
    
    useEffect(() => {
        props.closeSideBar();
    }, [location])

    return <>
        {
            props.open && <div className={classes.sideBar}>
                <div className={classes.heading}>
                    <h3>{props.heading}</h3>
                    <CloseOutlinedIcon className={classes.close} onClick={props.closeSideBar}></CloseOutlinedIcon>
                </div>
                <p className={classes.content}>
                    {props.content}
                </p>
            </div>
        }
    </>

}

const mapStateToProps = state => ({
    open: state.notificationState.openSideBar.open,
    content: state.notificationState.openSideBar.info.content,
    heading: state.notificationState.openSideBar.info.heading,
})
const mapDispatchToProps = dispatch => bindActionCreators({
    closeSideBar
},dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(SideBarComponent);