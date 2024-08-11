import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addProductIntoCart, decreaseProductQuantity, removeAllProducts, removeProductFromCart } from '../redux/features/cart-slice';
import { useNavigate } from 'react-router-dom'

const useShoppingCart = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.cart.products) ?? []
    const isLogin = useSelector(state=> state.user.isLogin)
    const navigate = useNavigate();

    function addToCart(p) {
        if (!isLogin) {
            navigate("/auth/sign-up");
            return;
        };
        if (!p) return;
        dispatch(addProductIntoCart(p));
    }

    function decreaseProductQuantityInCart(p) {
        if (!p) return;
        dispatch(decreaseProductQuantity(p));
    }

    function removeFromCart(p) {
        if (!p) return;
        dispatch(removeProductFromCart(p));
    }

    function clearCart() {
        dispatch(removeAllProducts());
    }

    function getCartCount() {
        return products.reduce((acc, item) => acc+=item.quantity, 0);
    }

    function getCartProducts() {
        return products;
    }

    function getCartProductQuantity(id) {
        if (!id) return;
        return products.find(item => item.product_id === id)?.quantity ?? 0;
    }

    function getCartSingleProduct(id) {
        if (!id) return;
        return products.find(item => item.product_id === id);
    }



  return {addToCart, decreaseProductQuantityInCart, removeFromCart, getCartCount, getCartProducts, getCartProductQuantity,   getCartSingleProduct, clearCart};
}

export default useShoppingCart
