import React from 'react';
import styles from './search-bar.module.scss';
import searchIcon from '../../assets/icons/search-icon.svg';


const GlobalSearch = () => {
    return (
        <div className={`${styles.global_search_container} d-flex`}>
            <input className="form-control me-2" type="search" placeholder="What are you looking for?" aria-label="Search" />
            <img src={searchIcon} alt='search icon' />
        </div>
    )
}

export default GlobalSearch
