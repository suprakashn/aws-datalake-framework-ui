import axios from "axios";

// const defaultInstance= axios.create({baseURL:'https://gcknss7eyl.execute-api.us-east-2.amazonaws.com/test/'});

const baseUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BASE_URL : process.env.REACT_APP_PROD_BASE_URL

const defaultInstance= axios.create({baseURL:baseUrl });

export default defaultInstance;