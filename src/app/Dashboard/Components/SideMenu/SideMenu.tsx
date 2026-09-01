import { use, useEffect, useState } from "react";
import AlertMessage from "../../../../components/AlertMessage/AlertMessage";
import LoadingComponent from "../../../../components/LoadingComponent/LoadingComponent";
import style from './sideMenu.module.css';
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../context/authContext";
import { index } from "../../../../services/category.service";
import { useHandleFormAccess } from "../../../../hooks/useHandleFormsAccess";

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
    const { user } = use(AuthContext);

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
                    <div className={style.userInformation}>
                        <p>{user ? user.name : ''}</p>
                    </div>
                </div>
                <div className={style.menuContainer}>
                    <h4 className={style.subtitle}>Incio</h4>
                    <ul className={style.listActions}>
                        <Link to='/dashboard' onClick={handleClose}><h6 className={style.actionItems}>Dashboard</h6></Link>
                    </ul>
                </div>
                <div className={style.menuContainer}>
                    <h4 className={style.subtitle}>Gestionar</h4>
                    <ul className={style.listActions}>
                        {
                            categories ? categories.map((category) => (
                                <Link key={category.id} to={`${category.path}`} onClick={handleClose}><h6 className={style.actionItems}>{category.name}</h6></Link>
                            ))
                                : <span>No hay categorías para mostrar</span>
                        }
                    </ul>
                </div >
                <div className={style.menuContainer}>
                    <h4 className={style.subtitle}>Contáctanos</h4>
                    <ul className={style.listActions}>
                    </ul>
                </div>
                <div className={style.menuContainer}>
                    <button data-secondary="true" className={style.btnLogout} onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            </nav >
        </>
    )
}


export default SideMenu;