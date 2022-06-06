import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { openSourceSystemSidebar, updateMode, closeSourceSystemSidebar } from 'actions/sourceSystemsAction';
import SourceSystemTable from 'components/SourceSystems/SourceSystemTable';
import SourceSystemSidebar from 'components/SourceSystems/SourceSystemSidebar';

const drawerWidth = 580;
const useStyles = makeStyles((theme) => ({
  customWidth: {
    maxWidth: '1060px'
  },
   drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: 0
  },
}));

const SourceSystems = (props) => {
  const classes = useStyles();
  return (
      <>
        <Drawer
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: props.open,
              [classes.drawerClose]: !props.open
            })
          }}
          anchor={'right'}
          open={props.open}
          onClose = {()=>props.closeSourceSystemSidebar()}
        >
            <SourceSystemSidebar/>
        </Drawer>
        <SourceSystemTable />
      </>
  );
}

const mapStateToProps = state => ({
    open: state.sourceSystemState.sidebar.sidebarFlag,
})
const mapDispatchToProps = dispatch => bindActionCreators({
    openSourceSystemSidebar,
    closeSourceSystemSidebar,
    updateMode,
},dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(SourceSystems);