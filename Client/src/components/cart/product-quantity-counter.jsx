import React from 'react'
import styles from './shopping-cart.module.scss';
import { IoAddOutline } from "react-icons/io5";
import { AiOutlineMinus } from "react-icons/ai";
const ProductQuantityCounter = ({qty, onIncrement, onDecrement, small}) => {
    return (
        <div className={`${styles.product_quantity_counter} ${small && styles.product_quantity_counter_small} d-flex justify-content-between align-items-center`}>
            <span className={styles.update_counter_button} onClick={onDecrement}><AiOutlineMinus size={small ? 17 : 27} /></span>
            <span className={styles.counter_value}>{qty ?? 0}</span>
            <span className={styles.update_counter_button} onClick={onIncrement}><IoAddOutline size={small ? 17: 27} /></span>
        </div>
    )
}

export default ProductQuantityCounter;
