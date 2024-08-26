import PrimaryButton from '../components/buttons/primary-button';
import styles from './admin-panel.module.scss';

export default function Header() {
    return <div className={styles.panel_header}>
        <div>
            <div className={styles.logout_btn}><PrimaryButton>Logout</PrimaryButton></div>
        </div>
    </div>
}