import { useState, useEffect } from 'react';
import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import searchImage from 'images/search images.png';
// import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MaterialTable from "material-table";


const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
    },
    searchBox: {
        padding: "10px 10px 10px 40px",
        border: "none",
        outline: "none",
        marginBottom: '15px',
        boxShadow: '2px 1px 8px 0px #ddd',
        fontSize: '15px',
        color: '#000000',
        minWidth: '380px',
        fontFamily: 'inherit',
        borderRadius:'5px',
        '&:hover': {
            border: 'none',
        },
    },
    searchImage: {
        position: 'absolute',
        padding: '7px',

    }

}));

const SearchBar = (props) => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const classes = useStyles();
    let data = props.data;
    
    useEffect(() =>  {
        props.onChange(props.data)
    }, [props.data])

    const handleChange = (event) => {
        const keyword = event.target.value;
        setSearchKeyword(() => keyword);
        props.onChange(data?.filter(d => {
            return Object.entries(d)
                .filter(([key, value]) => value?.toString()?.includes(keyword))
                .length > 0
        }));
    }

    return (
        <div className={classes.search}>
            <img src={searchImage} style={{ maxWidth: '34px', position: 'absolute', padding: '14px 8px' }} />
            <input
                className={classes.searchBox}
                type="search"
                name="searchbox"
                placeholder='Search..'
                value={searchKeyword || ""}
                onChange={handleChange}
               
            />
             {/* <SearchOutlinedIcon/> */}
        </div>
    )
}
export default SearchBar;