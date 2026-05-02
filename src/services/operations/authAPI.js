import { toast } from "react-toastify";
import { endpoints } from "../apis";
import { setLoading } from "../../redux/slices/authSlice";
import { apiConnector } from "../apiConnector";

const {
    SENDOTP_API
} = endpoints;

export function sendOtp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email, 
            });
            console.log("SENDOTP API RESPONE.....", response);
            console.log(response.data.success);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("OTP Sent Successfully");
            navigate("/verify-email");

            return true;
        }catch(error) {
            console.log("SENDOTP API ERROR......", error);
            toast.error(error?.response?.data?.message || "Could Not Send OTP");
            return false;
        }finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    }
}