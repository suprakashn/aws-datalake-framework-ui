import axios from "axios";
//https://3c82hwojlk.execute-api.us-east-2.amazonaws.com/test/sourcesystem/read?tasktype=read

const defaultInstance= axios.create({baseURL:'https://3c82hwojlk.execute-api.us-east-2.amazonaws.com/test/'});

export default defaultInstance;