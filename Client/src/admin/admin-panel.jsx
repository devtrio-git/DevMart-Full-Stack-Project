import { Outlet } from "react-router-dom";
import MenuPanel from "./menu-panel";
import styles from './admin-panel.module.scss';
import Header from "./header";

export default function AdminPanel() {
    return (<div className={styles.admin_panel_wrapper}>
        <aside><MenuPanel></MenuPanel></aside>
        <main>
            <Header></Header>
            <Outlet></Outlet>
        </main>
    </div>);
}