import React, { useState } from "react"
import styles from './products.module.scss';
import AdminPageLayout from "../admin-page-layout";
import PrimaryButton from "../../../components/buttons/primary-button";
import Grid from "../../../components/grid/grid";
import useGridCore from "../../../hooks/use-grid-core";
import ApiService from "../../../services/api.service";

export default function ProductsGrid() {
    const [products, setProducts] = useState([]);
    async function fetchProducts(pagination) {
        const data = await ApiService._get('/product/all', pagination);
        setProducts(data.products);
        return data;
    }

    const { loading, error, defaultColumnProperties, onRefresh } = useGridCore({ api: fetchProducts })

    const columns = [
        { key: 'name', name: 'Product Name' },
        { key: 'price', name: 'Price' },
        { key: 'stock', name: 'Stock' },
        { key: 'rating', name: 'Rating' },
    ];

    const cols = columns.filter(c => c != null).map(c => ({ ...defaultColumnProperties, ...c }));


    function selectProduct(rowData) {
        console.log(rowData, 'row');
    }

    console.log(loading, error);


    const buttons = [<PrimaryButton success>Create New</PrimaryButton>, <PrimaryButton info onClick={onRefresh}>Refresh</PrimaryButton>];
    return <AdminPageLayout title="Products" buttons={buttons}>
        <section className={styles.category_grid_container}>
            <Grid
                row_id_field="branch_id"
                columns={cols}
                rows={products}
                onRowClick={selectProduct}
            ></Grid>
        </section>
    </AdminPageLayout>
}