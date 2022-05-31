import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import sourceSystems from 'images/sourceSystems1.png';
import lakeDestinations from 'images/lakeDestinations.png';
import dataAssets from 'images/dataAssets.png';

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        margin: 'auto',
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(12),
        paddingRight: theme.spacing(12),
        backgroundColor: 'white'
    },
    welcomeStyle: {
        color:'#f7901d'
        // fontSize:'16px',
        // fontWeight:'500'
    },
    welcomeContent: {
        fontWeight: 400,
        fontSize: 14,
    },
    imageContainer: {
        margin: 'auto',
        //padding: theme.spacing(4),
        textAlign: 'center',
        //maxWidth:'90%',
    },
    labelStyle: {
        color: '#f7901d',
        textAlign: 'center',
        fontSize: '16px',
        fontWeight: 'bold'
    },
    contentStyle: {
        textAlign: 'center',
        wordBreak: 'break-word',
        whiteSpace: 'pre-wrap',
        padding: '0 10%'
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
        <div className={classes.mainContainer}>
            <div>
                <h2 className={classes.welcomeStyle}>Welcome to Tiger Analytics AWS DataLake!</h2>
                <div className={classes.welcomeContent}>
                    <p>We are in the midst of an exciting era where there is massive digital disruption and transformation across all industries. The key to success will be in enabling delightful, engaging, and meaningful user experiences to solve the right business problems for our clients and end-users.</p>
                </div>
            </div>
            <div className={classes.imageContainer}>
                <Grid container md={12} lg={12}>
                    <Grid item md={4} lg={4}>
                        <img src={sourceSystems} style={{maxWidth:'75%'}}/>
                        <h3 className={classes.labelStyle}>
                            Source Systems
                        </h3>
                        <div className={classes.contentStyle}>
                            Create, edit or delete a source system entity associated to various sources to consume
                        </div>
                    </Grid>
                    <Grid item md={4} lg={4}>
                        <img src={dataAssets} style={{maxWidth:'75%'}} />
                        <h3 className={classes.labelStyle}>
                            Data Assets
                        </h3>
                        <div className={classes.contentStyle}>
                            Create, edit or delete data assets associated to various source files, define columns,descriptions, dq and more
                        </div>
                    </Grid>
                    <Grid item md={4} lg={4}>
                        <img src={lakeDestinations} style={{maxWidth:'75%'}} />
                        <h3 className={classes.labelStyle}>
                            Lake Destinations
                        </h3>
                        <div className={classes.contentStyle}>
                            Create, edit or delete destinations in the data lake based on the organizational data management and organization strategy
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Dashboard;