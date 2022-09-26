import React from "react";
import AppContext from "../context";

export const useCartItems = () => {
    const {cartItems, setCartItems } = React.useContext(AppContext)
    const totalCartPrice = cartItems.reduce((sum, object) => object.price + sum, 0)

    return {cartItems, setCartItems, totalCartPrice}
}