import axios from "axios";
import { logout } from "./operations/authAPI";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { store } from '../redux/store'
export const axiosInstance = axios.create({});
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("i am here in interceptor");
        const status = error.response?.status;
        const message = error.response?.data?.message;
        if(status === 401 && message?.toLowerCase() === "Invalid Token".toLowerCase()) {
            toast.error("Session Expired....");
            store.dispatch(logout());
        }
        return Promise.reject(error);
    }
)

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method,
        url,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null,
    });
};