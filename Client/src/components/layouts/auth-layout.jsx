import React from 'react'
import PageLayout from './page-layout'
import authBanner from '../../assets/imgs/auth-banner.png';
import styles from './layouts.module.scss';


const AuthLayout = ({ children }) => {
    return (
        <PageLayout>
            <div className="container-fluid px-0">
                <div className="row m-0 p-0">
                    <div className="col-6 m-0 p-0 d-lg-block d-none">
                        <figure className={styles.auth_banner_img}>
                            <img src={authBanner} alt="" />
                        </figure>
                    </div>
                    <div className="col-lg-6 col-sm-10 col-11 mx-auto">
                        <div className={styles.form_wrapper}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

export default AuthLayout
