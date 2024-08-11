import React from 'react'
import styles from './product-info.module.scss';

const ProductShippingCard = (props) => {
    return (
        <div className={styles.shipping_card}>
            <figure><img src={props.iconSrc} alt="delivery" /></figure>
            <div className={styles.shipping_card_content}>
                <h5>{props.title}</h5>
                <p>{props.desc}</p>
            </div>
        </div>
    )
}

export default ProductShippingCard
