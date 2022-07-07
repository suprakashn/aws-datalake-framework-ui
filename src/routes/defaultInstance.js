import axios from "axios";
//https://3c82hwojlk.execute-api.us-east-2.amazonaws.com/test/sourcesystem/read?tasktype=read
// https://gcknss7eyl.execute-api.us-east-2.amazonaws.com/test`

const defaultInstance= axios.create({baseURL:'https://gcknss7eyl.execute-api.us-east-2.amazonaws.com/test'});

export default defaultInstance;