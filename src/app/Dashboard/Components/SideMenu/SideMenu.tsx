import { useEffect, useState } from "react";
import AlertMessage from "../../../../components/AlertMessage/AlertMessage";
import LoadingComponent from "../../../../components/LoadingComponent/LoadingComponent";
import style from './sideMenu.module.css';
import { Link } from "react-router-dom";
import { index } from "../../../../services/category.service";
import { useHandleFormAccess } from "../../../../hooks/useHandleFormsAccess";
import LogoutIcon from '@mui/icons-material/Logout';

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
                    <h4 className={style.subtitle}>Inicio</h4>
                    <ul className={style.listActions}>
                        <Link to='/dashboard/content' onClick={handleClose}><p className={style.actionItems}>Dashboard</p></Link>
                    </ul>
                </div>
                <div className={style.menuContainer}>
                    <h4 className={style.subtitle}>Gestionar</h4>
                    <ul className={style.listActions}>
                        {
                            categories ? categories.map((category) => (
                                <Link key={category.id} to={`${category.path}`} onClick={handleClose}><p className={style.actionItems}>{category.name}</p></Link>
                            ))
                                : <span>No hay categorías para mostrar</span>
                        }
                    </ul>
                </div >
                <div className={style.menuContainer}>
                    <h4 className={style.subtitle}>Ajustes</h4>
                    <ul className={style.listActions}>
                        <Link to='profile_page' onClick={handleClose}><p className={style.actionItems}>Perfil</p></Link>
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