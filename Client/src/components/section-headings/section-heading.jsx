import React from 'react'
import sqIcon from "../../assets/imgs/sq1.png"
import styles from "./section-heading.module.scss"
const SectionHeading = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={sqIcon} alt="" />
        <p>{props.children}</p>
      </div>
      <h2 className={styles.title}>
        {props.title}
      </h2>
    </div>
  )
}

export default SectionHeading
