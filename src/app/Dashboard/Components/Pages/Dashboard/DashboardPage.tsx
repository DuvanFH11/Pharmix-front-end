import RoofingOutlinedIcon from '@mui/icons-material/RoofingOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import style from "./dashboard.module.css";
import { Link, Outlet } from 'react-router-dom';
const DashboardPage = () => {

    return (
        <>
            <nav className={style.menuNavigation}>
                <div className={style.menuNavigationIcon}>
                    <Link to="."><RoofingOutlinedIcon className={style.icons} /></Link>
                </div>
                <div className={style.menuNavigationIcon}>
                    <Link to="request"><InventoryOutlinedIcon className={style.icons} /></Link>
                </div>
                <div className={style.menuNavigationIcon}>
                    <Link to="invoices"><InsertDriveFileOutlinedIcon className={style.icons} /></Link>
                </div>
                <div className={style.menuNavigationIcon}>
                    <Link to="inventory"><Inventory2OutlinedIcon className={style.icons} /></Link>
                </div>
            </nav >
            <section className="section__">
                {/* Se cargan las páginas del Dashboard */}
                <Outlet />
            </section >
        </>
    )
}

export default DashboardPage;