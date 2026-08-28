import { use, useEffect, useState } from "react";
import { useHandleForm } from "../../../../hooks/useHandleForms";
import AlertMessage from "../../../../components/AlertMessage/AlertMessage";
import LoadingComponent from "../../../../components/LoadingComponent/LoadingComponent";
import style from './sideMenu.module.css';
import { logout } from "../../../../services/user.service";
import { Link } from "react-router-dom";
import { categories } from "../../../../constants/categories";
import { AuthContext } from "../../../../context/authContext";

export interface SideMenuProps {
    isOpen: boolean | null;
}


const SideMenu = ({ isOpen }: SideMenuProps) => {

    const { handleLogout, isLoading, alertMessage } = useHandleForm();
    const [showMenu, setShowMenu] = useState<string>('');
    const { user } = use(AuthContext);
    useEffect(() => {
        const handleShowMenu = () => {
            if (isOpen) {
                setShowMenu('is-open')
            } else if (isOpen === null) {
                setShowMenu('');
            }
        }
        handleShowMenu();
    }, [isOpen]);

    return (
        <>
            {isLoading && <LoadingComponent />}
            {alertMessage && <AlertMessage message={alertMessage.message} state={alertMessage.state} time={alertMessage.time} />}

            <nav className={style.sideMenu} data-open={showMenu}>
                <div className={style.menuContainer}>
                    <div className={style.userInformation}>
                        <p>{user ? user.name : ''}</p>
                    </div>
                </div>
                <div className={style.menuContainer}>
                    <h4 className={style.subtitle}>Gestionar</h4>
                    <ul className={style.listActions}>
                        {
                            categories.map((category) => (
                                <Link key={category.id} to={`${category.path}_page`}><h6 className={style.actionItems}>{category.name}</h6></Link>
                            ))
                        }
                    </ul>
                </div>
                {/* {
                    categories.map((category) => (
                        <div key={category.id} className={style.menuContainer}>
                            <h6 className={style.subtitle}>{category.name}</h6>
                            <ul className={style.listActions}>
                                <Link to={`/store_${category.path}`}><li>Crear {category.name}</li></Link>
                                <Link to={`/index_${category.path}`}><li>Lista {category.name}</li></Link>
                                <Link to={`/get_${category.path}`}><li>Buscar {category.name}</li></Link>
                                <Link to={`/destroy_${category.path}`}><li>Eliminar {category.name}</li></Link>
                            </ul>
                        </div>
                    ))
                } */}

                <div className={style.menuContainer}>
                    <button data-secondary="true" className={style.btnLogout} onClick={() => { handleLogout(logout) }}>Cerrar Sesión</button>
                </div>
            </nav >
        </>
    )
}


export default SideMenu;