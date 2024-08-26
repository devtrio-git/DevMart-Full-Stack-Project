import React from "react"
import styles from './categories.module.scss';
import AdminPageLayout from "../admin-page-layout";
import CategoryCard from "../../../components/card/category-card";
import { categories } from "../../../components/sliders/category-slider";
import PrimaryButton from "../../../components/buttons/primary-button";
export default function CategoryGrid() {

    const buttons = [<PrimaryButton success>Create New</PrimaryButton>];

    return <AdminPageLayout title="Categories" buttons={buttons}>
        <section className={styles.category_grid_container}>
            {categories.map((item, key) => (
                <CategoryCard icon={item.icon} title={item.title} />
            ))}
        </section>
    </AdminPageLayout>
}