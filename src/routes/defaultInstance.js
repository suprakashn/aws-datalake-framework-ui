import axios from "axios";

const baseUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BASE_URL : process.env.REACT_APP_PROD_BASE_URL

const defaultInstance = axios.create({ baseURL: baseUrl });

const replaceEmptyWithNull = (obj) => {
    const isArray = Array.isArray(obj);
    for (const k of Object.keys(obj)) {
        if (typeof obj[k] === "string" && obj[k]?.trim() === "") {
            obj[k] = null;
        } else if (obj[k] != null && obj[k] != undefined && typeof obj[k] === "object") {
            replaceEmptyWithNull(obj[k]);
        }
        if (isArray && obj.length === k) {
            replaceEmptyWithNull(obj);
        }
    }
    return obj;
}

// Add a request interceptor
defaultInstance.interceptors.request.use(
    config => {
        try{
            if (typeof config.data == "object") {
                config.data = replaceEmptyWithNull(config.data)
            }
            else if (typeof config.data == "string" && config.data === "") {
                config.data = null;
            }
        } catch(err) {
            console.error("interceptor error", err)
        }
        
        return config
    },
    error => {
        Promise.reject(error)
    }
)

export default defaultInstance;