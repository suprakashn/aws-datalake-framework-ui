/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import awsLogo from 'images/AWS logo.png';
import sourceSystemIcon from 'images/sourceSystemIcon.png';
import dataAssetIcon from 'images/dataAssetIcon.png';
import lakeDestinationIcon from 'images/lakeDestinationIcon.png';
import backgroundImage from 'images/background.png';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundImage: 'url(' + backgroundImage + ')',
        "padding": "80px 20px",
        "color": "white",
        "margin": "auto",
        "fontSize": "35px",
        "textAlign": "center",
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 490px'
    },
    pageHeader: {
        fontSize: '35px',
        margin: 0,
        padding: '30px 20px 10px',
        '& img': {
            "width": "auto",
            "verticalAlign": "-webkit-baseline-middle",
            "padding": "0 14px 0 5px"
        }
    },
    pageDesc: {
        "fontSize": "16px",
        "width": "50%",
        "margin": "auto",
        "marginBottom": "30px",
        "marginTop": "20px"
    },
    boxContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '70px',
        '& > a:nth-child(2)': {
            "background": "linear-gradient(to bottom, #959595 50%, #000 50%)",
            color: 'white'
        }
    },
    box: {
        "width": "20%",
        "maxWidth": "275px",
        "background": "linear-gradient(to bottom, #fff 50%, #000 50%)",
        "color": "black",
        "fontSize": "20px",
        "padding": "40px 20px",
        "borderRadius": "25px",
        "textAlign": "center",
        //"height": "100%",
        "minHeight": "370px",
        "display": "flex",
        "flexDirection": "column",
        "margin": "0 20px",
        "position": 'relative',
        textDecoration: 'none',
        '&:hover': {
            boxShadow: '0px 10px 7px 0px #555'
        },
        '&:hover div::after': {
            display: 'block'
        },
        '&:hover img': {
            transform: 'scale(1.1)'
        }
    },
    boxTop: {
        '& h3': {
            margin: '5px 0px 15px',
            paddingBottom: '35px',
            textDecoration: 'none',

        },
        '& img': {
            transition: 'transform .2s',
            width: '75px'
        }
    },
    boxBottom: {
        color: 'white',
        fontSize: '15px',
        minHeight: '120px',
        position: 'relative',
        '&::after': {
            display: 'none',
            position: 'absolute',
            bottom: '-5px',
            content: '""',
            left: 'calc(50% - 10px)',
            width: '20px',
            backgroundColor: 'white',
            height: '2px'
        }
    }
}));

const Dashboard = (props) => {
    const classes = useStyles();
    // return (
    //     <Grid container md={12} lg={12}>
    //         <Grid item md={8} lg={8}>
    //             Landing Page
    //         </Grid>
    //     </Grid>)
    return (
        <div className={classes.container}>
            <h1 className={classes.pageHeader}>
                Welcome to Tiger Analytics <img style={{ width: "92px" }} src={awsLogo} />DataLake!
            </h1>
            <p className={classes.pageDesc}>
                Framework powered by AWS services and self-service portal to ingest, cleanse and mask data. Build your datalake without a fuss and let the Tiger Analytics AWS Data Lake take care of the complexities in the background.
            </p>
            <div className={classes.boxContainer}>
                <Link className={classes.box} to={"/source-systems"}>
                    <div className={classes.boxTop}>
                        <img src={sourceSystemIcon} />
                        <h3>Source Systems</h3>
                    </div>
                    <div className={classes.boxBottom}>
                        Connect with multiple sources including databases and kinesis data streams
                    </div>
                </Link>
                <Link className={classes.box} to={"/data-assets"}>
                    <div className={classes.boxTop}>
                        <img src={dataAssetIcon} />
                        <h3>Data Assets</h3>
                    </div>
                    <div className={classes.boxBottom}>
                        Define the data asset properties, sensitive data properties and data quality rules
                    </div>
                </Link>
                <Link className={classes.box} to={"/lake-destinations"}>
                    <div className={classes.boxTop}>
                        <img src={lakeDestinationIcon} />
                        <h3>Lake Destinations</h3>
                    </div>
                    <div className={classes.boxBottom}>
                        Organize data in the lake to better control accesses & permissions
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Dashboard;