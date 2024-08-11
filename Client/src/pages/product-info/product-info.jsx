import PageLayout from '../../components/layouts/page-layout';
import SectionHeading from '../../components/section-headings/section-heading';
import BestProductSlider from '../../components/sliders/best-product-slider';
import { singleProduct } from '../../services/single-data';
import styles from './product-info.module.scss';
import React, { useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating';
import ProductColorsVariants from './product-color-variants';
import PrimaryButton from '../../components/buttons/primary-button';
import ProductQuantityCounter from '../../components/cart/product-quantity-counter';
import deliveryIcon from '../../assets/icons/icon-delivery.svg';
import returnIcon from '../../assets/icons/icon-return.svg';
import ProductShippingCard from './product-shipping-card';
import ProductImagesSlider from '../../components/sliders/product-imgs-slider';
import useShoppingCart from '../../hooks/use-shopping-cart';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Helpers } from '../../services/helpers';


const ProductInfoPage = () => {
    const isLogin = useSelector(state => state.user.isLogin)
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(0);
    const [activeColor, setActiveColor] = useState(singleProduct.colors?.[0] ?? null);
    const { addToCart, decreaseProductQuantityInCart, removeFromCart, getCartCount, getCartProducts, getCartProductQuantity } = useShoppingCart();

    useEffect(() => {
        const q = getCartProductQuantity(singleProduct.id);
        setQuantity(q);
    }, [getCartProductQuantity, addToCart, decreaseProductQuantityInCart]);


    return (
        <PageLayout>

            <section className={`container my-5 py-5`}>
                <div className="row">
                    <div className="col-lg-7">
                        <div className={styles.product_images_container}>
                            <figure>
                                <img src={singleProduct.images?.[0]} alt="product feature image" />
                            </figure>
                            <div className={styles.product_images_slider_container}>
                                <ProductImagesSlider images={singleProduct.images}></ProductImagesSlider>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 mt-lg-0 mt-5">
                        <div className={styles.product_content_container}>
                            <h1 className={styles.product_title}>{singleProduct.name}</h1>
                            <div className='d-flex gap-2 align-items-center'>
                                <div><Rating readonly initialValue={singleProduct.rating} size={22} /></div>
                                <span className={styles.in_stock}>In Stock</span>
                            </div>

                            <p className={styles.product_price}>{Helpers.priceFormatter(singleProduct.price)}</p>
                            <p className={styles.product_desc}>{singleProduct.description}</p>


                            <div className={`${styles.product_color_variants} d-flex gap-2 align-items-center`}>
                                <span className={styles.product_color_title}>Colors:</span>
                                <div className='d-flex gap-2 align-items-center'>
                                    {activeColor && <ProductColorsVariants colorsList={singleProduct.colors} activeColor={activeColor} onChangeColor={setActiveColor}></ProductColorsVariants>}
                                </div>
                            </div>


                            <div className={`${styles.product_buy_container} d-flex gap-3 align-items-center my-5`}>
                                <div >{quantity > 0 ? <ProductQuantityCounter qty={quantity} onIncrement={() => addToCart(singleProduct)} onDecrement={() => decreaseProductQuantityInCart(singleProduct)}></ProductQuantityCounter>
                                    : <div><PrimaryButton onClick={() => addToCart(singleProduct)}>Add to cart</PrimaryButton></div>
                                }</div>
                                <div><PrimaryButton onClick={() => null}>Buy Now</PrimaryButton></div>
                            </div>

                            <div className={`${styles.product_shipping_container} d-flex flex-column my-5`}>
                                <ProductShippingCard iconSrc={deliveryIcon} title="Free Delivery" desc="Enter your postal code for Delivery Availability"></ProductShippingCard>
                                <ProductShippingCard iconSrc={returnIcon} title="Return Delivery" desc="Free 30 Days Delivery Returns."></ProductShippingCard>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            <section className={`${styles.best_product_section} container my-5 py-5`}>
                <SectionHeading title={"Explore More"}>Related Items</SectionHeading>
                <BestProductSlider />
            </section>
        </PageLayout>
    )
}

export default ProductInfoPage
