import { toast } from "react-toastify";
import { endpoints } from "../apis";
import { setLoading, setToken } from "../../redux/slices/authSlice";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../redux/slices/profileSlice";
import { resetCart } from "../../redux/slices/cartSlice";
const {
    SENDOTP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
    SIGNUP_API,
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

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            return true;
        } catch (error) {
            console.log("SENDOTP API ERROR......", error);
            return error?.response?.data?.message || "Could Not Send OTP";
        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    }
}

export function signup(signupData) {
    return async function (dispatch) {
        const toastId = toast.loading("Loading...");
        try {
            dispatch(setLoading(true));
            const response = await apiConnector("POST", SIGNUP_API, signupData);
            if(!response.data.success) {
                throw new Error(response.data.message);
            }
            // signup successfull
            // move to login page
            return true;
        }catch(error) {
            console.log("SIGNUP API ERROR: ", err);
            
            toast.error(error?.response?.data?.message || error?.message || "Could Not SignUp");
            return false;
        }finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}
const delay = (ms) => new Promise((res) => setTimeout(res, ms)); 
export function login(email, password) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            dispatch(setLoading(true));
            const response = await apiConnector("POST", LOGIN_API, { email, password });
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            // await delay(5000);
            // login successfull think about what to do after login 
            // 1) save token and user in react redux state
            // 2) save in local storage also token and user 
            // 3) return true
            dispatch(setToken(response?.data?.token));
            localStorage.setItem("token", response?.data?.token);

            dispatch(setUser(response?.data?.user));
            localStorage.setItem("user", JSON.stringify(response?.data?.user));

            return true;
        } catch (error) {
            console.log("LOGIN API ERROR....", error);
            return error?.response?.data?.message || "Could Not Login";
        } finally {
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
export function sendPasswordResetEmail(email, setEmailSent) {
    return async (dispatch) => {
        const toastId = toast.success("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", RESETPASSTOKEN_API, {
                email
            });
            console.log("RESET PASSWORD TOKEN API RESPONSE: ", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Reset Password Email Is Sent");
            setEmailSent(true);
        } catch (error) {
            console.log("RESET PASSWORD TOKEN API ERRROR: ", error);
            toast.error(error?.response?.data?.message || "Could Not Send Reset Password Email")
        } finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function updatePassword(password, confirmPassword, urlToken) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            setLoading(true);
            const response = await apiConnector("POST", RESETPASSWORD_API, {
                password,
                confirmPassword,
                urlToken
            });
            console.log("RESET PASSSWORD API RESPONSE: ", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            // it means password updated successfully
            toast.success("Password Reset Successfully!");
            return true;
        } catch (error) {
            console.log("UPDATE PASSWORD API ERROR: ", error);
            toast.error(error?.response?.data?.message || error?.message ||  "Could Not Update Password")
        } finally {
            toast.dismiss(toastId);
            setLoading(false);
        }
    }
}