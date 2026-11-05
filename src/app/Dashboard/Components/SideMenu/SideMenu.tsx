import { useEffect, useState } from "react";
import AlertMessage from "../../../../components/AlertMessage/AlertMessage";
import LoadingComponent from "../../../../components/LoadingComponent/LoadingComponent";
import style from './sideMenu.module.css';
import { Link } from "react-router-dom";
import { index } from "../../../../services/category.service";
import { useHandleFormAccess } from "../../../../hooks/useHandleFormsAccess";
import LogoutIcon from '@mui/icons-material/Logout';
import RoofingOutlinedIcon from '@mui/icons-material/RoofingOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export interface SideMenuProps {
    isOpen: boolean;
    handleClose: () => void;
};
interface CategoryInterfaces {
    id: number;
    name: string;
    path: string;
    table_name: string;
}
const SideMenu = ({ isOpen, handleClose }: SideMenuProps,) => {

    const { handleLogout, isLoading, alertMessage } = useHandleFormAccess();
    const [showMenu, setShowMenu] = useState<string>('');
    const [categories, setCategories] = useState<CategoryInterfaces[] | null>(null);

    useEffect(() => {
        const handleShowMenu = () => {
            if (isOpen) {
                setShowMenu('is-open');
            } else {
                setShowMenu('');
            }
        }
        handleShowMenu();
    }, [isOpen]);

    useEffect(() => {
        const loadCategories = async () => {
            const { data } = await index();
            setCategories(data);
        }
        loadCategories();
    }, [])

    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} success={alertMessage.success} time={alertMessage.time} />}

            <nav className={style.sideMenu} data-open={showMenu}>
                <div className={style.menuContainer}>
                    <h5 className={style.subtitle}>Dashboard</h5>
                    <ul className={style.listActions}>
                        <Link className={style.itemsContent} to='/dashboard/' onClick={handleClose}><RoofingOutlinedIcon /><p className={style.actionItems}>Home</p></Link>
                        <Link className={style.itemsContent} to='/dashboard/request' onClick={handleClose}><InsertDriveFileOutlinedIcon /><p className={style.actionItems}>Pedidos</p></Link>
                        <Link className={style.itemsContent} to='/dashboard/inventory' onClick={handleClose}><InventoryOutlinedIcon /><p className={style.actionItems}>Inventario</p></Link>
                        <Link className={style.itemsContent} to='/dashboard/invoices' onClick={handleClose}><Inventory2OutlinedIcon /><p className={style.actionItems}>Facturas</p></Link>
                    </ul>
                </div>
                <div className={style.menuContainer}>
                    <h5 className={style.subtitle}>Gestionar</h5>
                    <ul className={style.listActions}>
                        {
                            categories ? categories.map((category) => (
                                <Link className={style.itemsContent} key={category.id} to={`${category.path}`} onClick={handleClose}><p className={style.actionItems}>{category.name}</p></Link>
                            ))
                                : <span>No hay categorías para mostrar</span>
                        }
                    </ul>
                </div >
                <div className={style.menuContainer}>
                    <h5 className={style.subtitle}>Ajustes</h5>
                    <ul className={style.listActions}>
                        <Link className={style.itemsContent} to='profile_page' onClick={handleClose}><AccountCircleOutlinedIcon /><p className={style.actionItems}>Perfil</p></Link>
                    </ul>
                </div>
                <div className={style.menuContainer}>
                    <button className={style.btnLogout} onClick={handleLogout}><LogoutIcon /></button>
                </div>
            </nav >
        </>
    )
}


export default SideMenu;