import axios from "axios";

const defaultInstance= axios.create({baseURL:'https://gcknss7eyl.execute-api.us-east-2.amazonaws.com/test/'});

export default defaultInstance;