import { useEffect, useState } from "react";
import AlertMessage from "../../../../components/AlertMessage/AlertMessage";
import LoadingComponent from "../../../../components/LoadingComponent/LoadingComponent";
import style from './sideMenu.module.css';
import { Link } from "react-router-dom";
import { useHandleFormAccess } from "../../../../hooks/useHandleFormsAccess";
import LogoutIcon from '@mui/icons-material/Logout';
import RoofingOutlinedIcon from '@mui/icons-material/RoofingOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';

export interface SideMenuProps {
    isOpen: boolean;
    handleClose: () => void;
};
const SideMenu = ({ isOpen, handleClose }: SideMenuProps,) => {

    const { handleLogout, isLoading, alertMessage } = useHandleFormAccess();
    const [showMenu, setShowMenu] = useState<string>('');

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
    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} success={alertMessage.success} time={alertMessage.time} />}

            <nav className={style.sideMenu} data-open={showMenu}>
                <div className={style.menuContainer}>
                    <h5 className={style.subtitle}>Dashboard</h5>
                    <ul className={style.listActions}>
                        <Link className={style.itemsContent} to='.' onClick={handleClose}><RoofingOutlinedIcon /><p className={style.actionItems}>Home</p></Link>
                        <Link className={style.itemsContent} to='request' onClick={handleClose}><InventoryOutlinedIcon /><p className={style.actionItems}>Pedidos</p></Link>
                        <Link className={style.itemsContent} to='inventory' onClick={handleClose}><Inventory2OutlinedIcon /><p className={style.actionItems}>Inventario</p></Link>
                        <Link className={style.itemsContent} to='invoices' onClick={handleClose}><InsertDriveFileOutlinedIcon /><p className={style.actionItems}>Facturas</p></Link>
                    </ul>
                </div>
                <div className={style.menuContainer}>
                    <h5 className={style.subtitle}>Gestión</h5>
                    <ul className={style.listActions}>
                        <Link className={style.itemsContent} to='users_page' onClick={handleClose}><GroupOutlinedIcon /><p className={style.actionItems}>Usuarios</p></Link>
                        <Link className={style.itemsContent} to='products_page' onClick={handleClose}><LocalOfferOutlinedIcon /><p className={style.actionItems}>Productos</p></Link>
                        <Link className={style.itemsContent} to='roles_page' onClick={handleClose}><KeyOutlinedIcon /><p className={style.actionItems}>Roles</p></Link>
                        <Link className={style.itemsContent} to='job_titles_page' onClick={handleClose}><BusinessCenterOutlinedIcon /><p className={style.actionItems}>Cargos</p></Link>
                        {/* {
                            categories ? categories.map((category) => (
                                <Link className={style.itemsContent} key={category.id} to={`${category.path}`} onClick={handleClose}><p className={style.actionItems}>{category.name}</p></Link>
                            ))
                                : <span>No hay categorías para mostrar</span>
                        } */}
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