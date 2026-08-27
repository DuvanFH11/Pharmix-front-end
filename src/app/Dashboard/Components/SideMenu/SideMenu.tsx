import { useEffect, useState } from "react";
import { useHandleForm } from "../../../../hooks/useHandleForms";
import AlertMessage from "../../../../components/AlertMessage/AlertMessage";
import LoadingComponent from "../../../../components/LoadingComponent/LoadingComponent";
import style from './sideMenu.module.css';
import { logout } from "../../../../services/user.service";
import { Link } from "react-router-dom";
import { categories } from "../../../../constants/categories";

export interface SideMenuProps {
    isOpen: boolean | null;
}


const SideMenu = ({ isOpen }: SideMenuProps) => {

    const { handleLogout, isLoading, alertMessage } = useHandleForm();
    const [showMenu, setShowMenu] = useState<string>('');

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
                {
                    categories.map((category) => (
                        <div key={category.id} className={style.menuContainer}>
                            <details>
                                <summary><h5 className={style.subtitle}>{category.name}</h5></summary>
                                <ul>
                                    <Link to={`/store_${category.path}`}><li>Crear {category.name}</li></Link>
                                    <Link to={`/index_${category.path}`}><li>Lista {category.name}</li></Link>
                                    <Link to={`/get_${category.path}`}><li>Buscar {category.name}</li></Link>
                                    <Link to={`/destroy_${category.path}`}><li>Eliminar {category.name}</li></Link>
                                </ul>
                            </details>
                        </div>
                    ))
                }

                <div className={style.menuContainer}>
                    <button data-secondary="true" className={style.btnLogout} onClick={() => { handleLogout(logout) }}>Cerrar Sesión</button>
                </div>
            </nav >
        </>
    )
}


export default SideMenu;