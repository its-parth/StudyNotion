import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cart : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const course = action.payload;
            const index = state.cart.findIndex((item) => item._id == course._id);

            if(index >= 0) {
                toast.error("course already in cart");
                return;
            }

            state.cart.push(course);
            state.totalItems++;
            state.total += course.price;
            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

            toast.success("Course added to cart");
        },
        removeFromCart: (state, action) => {
            const courseId = action.payload;
            // first see it is present in cart
            const index = state.cart.findIndex((item) => item._id === courseId);
            if(index == -1) {
                // not present in cart
                return;
            }
            // remove from cart
            state.totalItems--;
            state.total -= state.cart[index].price;
            state.cart = state.cart.filter((item) => item._id != courseId);
            // Update to localstorage
            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            // show toast
            toast.success("Course removed from cart")
        },
        resetCart: (state, action) => {
            state.total = 0;
            state.totalItems = 0;
            state.cart = [];
            // Update to localstorage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        },
    },
})

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;