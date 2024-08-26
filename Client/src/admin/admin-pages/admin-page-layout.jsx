import PrimaryButton from '../../components/buttons/primary-button';
import styles from './admin-pages.module.scss';
export default function AdminPageLayout(props) {
    return <div className='p-5 mt-5'>
        <div className={styles.page_head}>
            <h2 className='fw-bold mb-3'>{props.title}</h2>
            <div className={styles.page_main_buttons}>
                {props.buttons && props.buttons.map(btn => {
                    return <div className={styles.button}>{btn}</div>
                })}
            </div>
        </div>
        {props.children}
    </div>
}