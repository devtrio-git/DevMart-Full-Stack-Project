import React from 'react'
import cartIcon from '../../assets/icons/cart-icon.svg';
import styles from './shopping-cart.module.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useShoppingCart from '../../hooks/use-shopping-cart';


const ShoppingCart = () => {
    const { addToCart, decreaseProductQuantityInCart, removeFromCart, getCartCount } = useShoppingCart()
    const isLogin = useSelector(state => state.user.isLogin);
    const navigate = useNavigate();
    const counter = getCartCount()
    return (
        <div className={styles.shopping_cart_icon}>
            {counter > 0 && <span className={styles.cart_products_quantity}>{counter}</span>}
            <img onClick={() => isLogin ? navigate("/checkout") : navigate("/auth/login")} src={cartIcon} alt='search icon' />
        </div>
    )
}

export default ShoppingCart
