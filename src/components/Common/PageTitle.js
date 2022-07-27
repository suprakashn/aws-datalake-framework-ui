import { makeStyles } from '@material-ui/core';
import React from 'react';

const PageTitle = (props) => {
    const firstChar = props.children.charAt(0);
    const remainingChar = props.children.slice(1);

    const useStyles = makeStyles((theme) => ({
        heading:
        {
            fontSize: '16px',
            lineHeight: '30px',
            margin: 0
        },
        headerContainer: {
            display: 'flex',
            flexFlow: 'row',
            marginBottom: '20px',
            alignItems: 'flex-end',
            '& .info':
            {
                "color": "#00B1E8",
                "fontSize": "12px",
                "fontWeight": "bold",
                "cursor": "pointer",
                "lineHeight": "28px",
                "marginLeft": "6px"
            }
        }
    }));
    const classes = useStyles();

    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.heading}>
                <span style={{ fontSize: '19px', color: '#f7901d' }}>{firstChar}</span>
                {remainingChar}
            </h2>
            <span className="info" onClick={props.showInfo}>Info</span>
        </div>
    );
}

export default PageTitle; 