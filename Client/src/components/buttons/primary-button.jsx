import React from 'react'
import styles from './buttons.module.scss';


const PrimaryButton = (props) => {

    const btn_color = `${props.success && styles.success} ${props.info && styles.info} ${props.danger && styles.danger}`;
    return (
        <button
            className={`${styles.button_container} ${btn_color}`}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.loading ? <>  <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span role="status"> Loading...</span> </> : props.children}
        </button>
    )
}

export default PrimaryButton
