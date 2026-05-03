import { toast } from "react-toastify";
import { endpoints } from "../apis";
import { setLoading, setToken } from "../../redux/slices/authSlice";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../redux/slices/profileSlice";
import { resetCart } from "../../redux/slices/cartSlice";
const {
    SENDOTP_API,
    LOGIN_API
} = endpoints;
export function sendOtp(email) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email, 
            });
            console.log("SENDOTP API RESPONE.....", response);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            return true;
        }catch(error) {
            console.log("SENDOTP API ERROR......", error);
            return error?.response?.data?.message || "Could Not Send OTP";
            return false;
        }finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    }
}

export function login(email, password) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            dispatch(setLoading(true));
            const response = await apiConnector("POST", LOGIN_API, {email, password});
            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            // login successfull think about what to do after login 
            // 1) save token and user in react redux state
            // 2) save in local storage also token and user 
            // 3) return true
            dispatch(setToken(response?.data?.token));
            localStorage.setItem("token", response?.data?.token);

            dispatch(setUser(response?.data?.user));
            localStorage.setItem("user", JSON.stringify(response?.data?.user));
            
            return true;
        }catch(error) {
            console.log("LOGIN API ERROR....", error);
            return error?.response?.data?.message || "Could Not Login";
        }finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function logout() {
    return async (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
    }
}