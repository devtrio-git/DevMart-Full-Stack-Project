import React from 'react'
import styles from './checkout.module.scss'
import crossIcon from '../../assets/imgs/crossIcon.png'
import proImg from '../../assets/imgs/pc1.png'
import ProductQuantityCounter from '../../components/cart/product-quantity-counter'
import useShoppingCart from '../../hooks/use-shopping-cart'
import { Helpers } from '../../services/helpers'
const CartProduct = ({ data }) => {
    const { addToCart, decreaseProductQuantityInCart, removeFromCart, getCartCount, getCartProducts, getCartProductQuantity, getCartSingleProduct, clearCart } = useShoppingCart()
    const total_price = data.product.price * data.quantity;
    return (
        <tr className={`${styles.table_row}`}>
            <td>
                <div className={`${styles.product_cell}`}>
                    <div className={`${styles.img_container}`}>
                        <img className={`${styles.product_img}`} src={data.product?.images?.[0]} alt='' />
                        <img className={`${styles.cross_icon}`} src={crossIcon} alt="crossIcon" onClick={() => removeFromCart(data.product)} />
                    </div>
                    <p className='m-0 ps-2'>{data.product.name}</p>
                </div>
            </td>
            <td>{Helpers.priceFormatter(data.product.price)}</td>
            <td>
                <ProductQuantityCounter small qty={data.quantity} onIncrement={() => addToCart(data?.product)} onDecrement={() => decreaseProductQuantityInCart(data?.product)}></ProductQuantityCounter>
            </td>
            <td>{Helpers.priceFormatter(total_price)}</td>
        </tr>
    )
}

export default CartProduct
