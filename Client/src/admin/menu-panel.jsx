import React from 'react'
import styles from './admin-panel.module.scss';
import { NavLink } from 'react-router-dom';


const MenuPanel = () => {

    return (
        <aside className={styles.sidebar_container}>
            <div className={styles.sidebar_content_container}>

                <div>
                    <div className={styles.shopping_cart_container}>
                        <h2>Admin Panel</h2>
                    </div>
                </div>

                <div className={styles.nav_link_container}>
                    <ul>
                        <li><NavLink to='/admin' className={`${styles.nav_link_item} nav-link active`} >Dashboard</NavLink></li>
                        <li><NavLink to='/admin/categories' className={`${styles.nav_link_item} nav-link active`} >Categories</NavLink></li>
                        <li><NavLink to='/admin/products' className={`${styles.nav_link_item} nav-link active`} >Inventory</NavLink></li>
                    </ul>
                </div>
            </div>

        </aside>
    )
}

export default MenuPanel;
