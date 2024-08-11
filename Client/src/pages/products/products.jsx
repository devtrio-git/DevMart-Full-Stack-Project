import React from 'react'
import PageLayout from '../../components/layouts/page-layout'
import SectionHeading from '../../components/section-headings/section-heading'
import dummyData from "../../services/dummy-data.json"
import ProductCard from '../../components/card/product-card'
import styles from "./products.module.scss"

const ProductsPage = () => {
    return (
        <PageLayout>
            <div className={`${styles.best_product_section} container my-5 py-5`}>
                <SectionHeading title={"This Month"}>Best Selling Products</SectionHeading>
                <div className='d-flex flex-wrap justify-content-center justify-content-md-between mt-4'>
                    {
                        dummyData?.products?.map((item) => (
                            <div key={item.id} className='mt-5'>
                                <ProductCard data={item} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </PageLayout>
    )
}

export default ProductsPage
