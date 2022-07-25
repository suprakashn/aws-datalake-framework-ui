import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { CssBaseline } from "@material-ui/core";
import HeaderBackground from 'images/abstract-black.jpg'
import SnackbarComponent from 'components/Notifications/SnackBarComponent';
import Main from 'routes/Main';
import logo from 'images/tigerLogo.png';
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
    logo: {
        display:'inline-block',
        fontSize: '20px',
        cursor: "pointer",
        marginRight: theme.spacing(5),
        textDecoration: "none",
        color: "white",
    },
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "13px",
        margin: theme.spacing(2),
        "&:hover": {
            color: "#fffc"
        },
    },
}));

const Layout = (props) => {
    const classes = useStyles();
    const [activePageIndex, setActivePageIndex] = useState(0);
    
    const location = useLocation();
    const { pathname } = location;
    const handleOnclick = (index) => {
        setActivePageIndex(index);
    }
    const listOfNavItems = [
        { name: 'Home', icon: <i class="fas fa-layer-group fa-lg"></i>, url: '/' },
        { name: 'Source Systems', icon: <i class="fas fa-layer-group fa-lg"></i>, url: '/source-systems' },
        { name: 'Data Assets', icon: <i class="fas fa-database fa-lg"></i>, url: '/data-assets' },
        { name: 'Lake Destinations', icon: <i class="fas fa-warehouse fa-lg"></i>, url: '/lake-destinations' }
    ]
    
    useEffect(() => {
        listOfNavItems.forEach((nav, i) => {
            if(pathname.includes(nav.url)){
                setActivePageIndex(i);
            }
        })
    });

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="sticky">
                <CssBaseline />
                {/* <Toolbar style={{ backgroundImage: `url("${HeaderBackground}")` }}> */}
                <Toolbar style={{ backgroundColor: 'black',display:'flex', justifyContent:'space-between' }}>
                    {/* <div>
                            <img src={logo}  style={{maxWidth: '5%'}}/>
                        </div> */}
                    <Link to="/" className={classes.logo}>
                        TIGER ANALYTICS <span style={{color:'#F7901D'}}>AWS</span> DATA LAKE
                    </Link>
                    <div className="font-link">
                        {listOfNavItems.map((item,index) => {
                            return <Link key={index} to={item.url} className={classes.link} style={index === activePageIndex ? {'paddingBottom': 8, 'borderBottom':'4px solid #F7901D'}:{}} onClick={()=>handleOnclick(index)}>{item.name} </Link>
                        })}
                    </div>
                </Toolbar>
            </AppBar>
            <main className={classes.content} style={{marginBottom:20}}>
                {/* <Toolbar /> */}
                <Main />
                <SnackbarComponent />
            </main>
            {/* <AppBar position="static">
                <CssBaseline />
                <Toolbar>
                    <div style={{ margin: 'auto'}}>
                    Copyright © 2022, Tiger Analytics Inc. All rights reserved.
                    </div>
                </Toolbar>
            </AppBar> */}
        </div>
    );
}
export default Layout;
