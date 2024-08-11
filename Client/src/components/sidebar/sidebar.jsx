import React, { useContext } from 'react'
import styles from './sidebar.module.scss';
import { sidebarContext } from '../../contexts/sidebar.context';
import { RxCross1 } from "react-icons/rx";
import { NavLink } from 'react-router-dom';
import GlobalSearch from '../search-bar/global-search-bar';
import ShoppingCart from '../cart/shopping-cart';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../redux/features/user-slice';


const Sidebar = () => {
    const { is_sidebar, sidebarOpen, sidebarClose } = useContext(sidebarContext);

    const is_sidebar_active = is_sidebar ? `${styles.sidebar_container} ${styles.active}` : `${styles.sidebar_container}`
    const isLogin = useSelector(state => state.user.isLogin);
    const dispatch = useDispatch();
    console.log(isLogin)
    const signOut = () => {
        dispatch(removeUser())
    }
    return (
        <aside className={is_sidebar_active}>
            <span className={styles.close_sidebar_icon} onClick={() => sidebarClose()}><RxCross1 /></span>

            <div className={styles.sidebar_content_container}>

                <div>
                    <div className={styles.global_search_wrapper}><GlobalSearch></GlobalSearch></div>
                    <div className={styles.shopping_cart_container}><h5>My Shopping</h5>
                        <ShoppingCart></ShoppingCart>
                    </div>
                </div>

                <div className={styles.nav_link_container}>
                    <ul>
                        <li><NavLink to='/' className={`${styles.nav_link_item} nav-link active`} >Home</NavLink></li>
                        <li><NavLink to='/contact' className={`${styles.nav_link_item} nav-link active`} >Contact</NavLink></li>
                        <li><NavLink to='/about' className={`${styles.nav_link_item} nav-link active`} >About</NavLink></li>
                        {
                            isLogin ?
                                <li><NavLink onClick={signOut} className={`${styles.nav_link_item} nav-link active`}  >Sign Out</NavLink></li>
                                :
                                <li><NavLink to='/auth/sign-up' className={`${styles.nav_link_item} nav-link active`}  >Sign Up</NavLink></li>
                        }
                    </ul>
                </div>
            </div>

        </aside>
    )
}

export default Sidebar
