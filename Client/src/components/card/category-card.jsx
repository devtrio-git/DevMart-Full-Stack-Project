import React from 'react'
import styles from './cards.module.scss'
import icon from '../../assets/imgs/c1.png'
const CategoryCard = (props) => {
  return (
    <div className={`${styles.category_card_container}`}>
        <img src={props.icon} alt="" />
        <p>{props.title}</p>
    </div>
  )
}

export default CategoryCard
